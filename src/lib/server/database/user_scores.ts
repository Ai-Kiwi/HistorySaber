import type { Score } from "$lib/types"
import { calculatePP } from "../ppCalculator"
import { client } from "./main"

export async function fetchPlayerRankedScores(player_id : string, date : Date): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-player-ranked-scores-for-date',
        text: `
        WITH latest_scores AS (
            SELECT DISTINCT ON (s.leaderboard_id)
                s.*
            FROM scores s
            WHERE s.player_id = $1 AND s.time <= $2
            ORDER BY s.leaderboard_id, s.time DESC
        ),
        latest_ratings AS (
            SELECT DISTINCT ON (r.leaderboard_id)
                r.leaderboard_id,
                r.stars,
                r.updated_at
            FROM leaderboard_rating_update r
            WHERE r.updated_at <= $2
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
        FROM latest_scores s
        JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        `,
        values: [player_id,date,],
    }
    const res = await client.query(query);
    const scores: Score[] = res.rows.map((row: any) => {
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
            mods: row.mods,
            hmd: row.hmd,
            bad_cuts_and_misses : row.bad_cuts + row.missed_notes,
            device_hmd: row.device_hmd,
            device_controller_left: row.device_controller_left,
            device_controller_right: row.device_controller_right,
        }
    })
    return scores;
}

export async function fetchAllPlayerScores(player_id : string, date : Date): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-player-scores-for-date',
        text: `
        WITH latest_scores AS (
            SELECT DISTINCT ON (s.leaderboard_id)
                s.*
            FROM scores s
            WHERE s.player_id = $1 AND s.time <= $2
            ORDER BY s.leaderboard_id, s.time DESC
        ),
        latest_ratings AS (
            SELECT DISTINCT ON (r.leaderboard_id)
                r.leaderboard_id,
                r.stars,
                r.updated_at
            FROM leaderboard_rating_update r
            WHERE r.updated_at <= $2
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
        FROM latest_scores s
        LEFT JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        `,
        values: [player_id,date,],
    }

    const res = await client.query(query);
    const scores: Score[] = res.rows.map((row: any) => {
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

export async function getPlayerScoresFiltered(player_id : string, date : Date, page : number, page_size : number, sort_by : keyof Score, reverse : boolean, only_ranked : boolean) {
    let scores = only_ranked == true ? await fetchPlayerRankedScores(player_id, date) : await fetchAllPlayerScores(player_id, date)

    scores.sort((a, b) => {
        const aVal = sort_by === "time" ? a.time.getTime() : a[sort_by];
        const bVal = sort_by === "time" ? b.time.getTime() : b[sort_by];
        
        if (aVal < bVal) return reverse == false ? 1 : -1;
        if (aVal > bVal) return reverse == false ? -1 : 1;
        return 0;
    });

    if (page > 1){
        scores = scores.slice((page - 1) * page_size, page * page_size);
    }else{
        scores = scores.slice(0,page_size);
    }

    return scores;

}


export async function fetchAllPlayerScoresDuplicatedPaged(player_id : string, page : number, page_size : number): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-all-player-scores-duplicated',
        text: `
        WITH paged_scores AS (
            SELECT *
            FROM scores
            WHERE player_id = $1
            ORDER BY time DESC
            LIMIT $2 OFFSET $3
        ),
        latest_ratings AS (
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
        FROM paged_scores s
        LEFT JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        `,
        values: [player_id,page_size,(page - 1) * page_size,],
    }

    const res = await client.query(query);
    const scores: Score[] = res.rows.map((row: any) => {
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