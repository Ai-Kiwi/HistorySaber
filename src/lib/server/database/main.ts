import { DATABASE_URL } from '$env/static/private';
import type { Score } from '$lib/types';
import { formatNumberShort } from '$lib/utils';
import pg from 'pg'
import { calculatePP } from '../ppCalculator';
const { Client } = pg
export const client = new Client(DATABASE_URL)
await client.connect()

console.log("created postgresql connection")


export async function getTableInfo() {
    // Query sizes for both tables at once
    const size_query = {
      name: 'fetch-timescaledb-hypertable-sizes',
      text: `
        SELECT 
          hypertable_name,
          pg_size_pretty(hypertable_size(hypertable_name::regclass)) AS total_size,
          hypertable_size(hypertable_name::regclass) AS total_size_bytes
        FROM timescaledb_information.hypertables
        WHERE hypertable_name IN ('player_history', 'scores')
        ORDER BY hypertable_name;
      `,
    };
  
    // Query counts for both tables (two queries, can be combined with UNION)
    const count_query = {
      name: 'fetch-table-row-counts',
      text: `
        SELECT 'player_history' AS table_name, COUNT(*) AS row_count, COUNT(DISTINCT player_id) AS unique_players FROM player_history
        UNION ALL
        SELECT 'scores' AS table_name, COUNT(*) AS row_count, NULL AS unique_players FROM scores;
      `,
    };
  
    const size_response = await client.query(size_query);
    const count_response = await client.query(count_query);
  
    const info: Record<string, any> = {};
  
    for (const row of size_response.rows) {
      info[row.hypertable_name] = {
        total_size: row.total_size,
        total_size_bytes: parseInt(row.total_size_bytes, 10),
        row_count: 0, // will fill later
      };
    }
  
    for (const row of count_response.rows) {
      if (info[row.table_name]) {
        info[row.table_name].row_count = parseInt(row.row_count, 10);
        info[row.table_name].unique_players = row.unique_players
        ? parseInt(row.unique_players, 10)
        : 0;
      }
    }
  
    return {
      player_history_size: info['player_history']?.total_size,
      player_history_count: info['player_history']?.row_count,
      player_history_unique_players: info['player_history']?.unique_players,
  
      player_scores_size: info['scores']?.total_size,
      player_scores_count: info['scores']?.row_count,
    };
  }


export async function fetchAllScoresDuplicatedPaged(page : number, page_size : number): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-all-scores-duplicated',
        text: `
        WITH latest_ratings AS (
            SELECT DISTINCT ON (r.leaderboard_id)
                r.leaderboard_id,
                r.stars,
                r.updated_at
            FROM leaderboard_rating_update r
            ORDER BY r.leaderboard_id, r.updated_at DESC
        )
        SELECT 
            s.id AS score_id,
            s.leaderboard_id,
            s.accuracy,
            s.score,
            s.modified_score,
            s.time,
            s.player_id,
            s.max_combo,
            s.full_combo,
            s.bad_cuts,
            s.missed_notes,
            s.mods,
            s.hmd,
            s.device_hmd,
            s.device_controller_left,
            s.device_controller_right,
            r.stars,
            ml.map_hash,
            ml.difficulty,
            ml.difficultyRaw,
            ml.maxscore,
            m.song_name,
            m.song_sub_name,
            m.song_author_name,
            m.level_author_name
        FROM scores s
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        ORDER BY s.time DESC
        LIMIT $1 OFFSET $2;
        `,
        values: [page_size,(page - 1) * page_size,],
    }

    const response = await client.query(query);
    const scores: Score[] = response.rows.map((row: any) => {
        let accuracy = (row.score / row.maxscore) * 100.0
        if (row.maxscore == 0) {
            accuracy = 0
        }
        //accuracy = Math.round(accuracy * 100) / 100
        let pp = calculatePP(row.stars,accuracy)
        //pp = Math.round(pp * 100) / 100

        return {
            score_id: row.score_id,
            leaderboard_id: row.leaderboard_id,
            accuracy: accuracy,
            score: row.score,
            modified_score: row.modified_score,
            time: row.time,
            stars: row.stars,
            pp: pp,
            map_hash: row.map_hash,
            difficulty: row.difficulty,
            difficultyraw: row.difficultyraw,
            maxscore: row.maxscore,
            song_name: row.song_name,
            song_sub_name: row.song_sub_name,
            song_author_name: row.song_author_name,
            level_author_name: row.level_author_name,
            player_id: row.player_id,
            max_combo: row.max_combo,
            full_combo: row.full_combo,
            bad_cuts: row.bad_cuts,
            missed_notes: row.missed_notes,
            bad_cuts_and_misses : row.bad_cuts + row.missed_notes,
            mods: row.mods,
            hmd: row.hmd,
            device_hmd: row.device_hmd,
            device_controller_left: row.device_controller_left,
            device_controller_right: row.device_controller_right,
        }
    })
    return scores;
}