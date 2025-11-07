import type { Score, UserType } from "$lib/types"
import { getDateWithoutTime } from "$lib/utils"
import { calculatePP } from "../ppCalculator"
import { client } from "./main"

export async function getPlayerPastPpValues(player_id: String,limit : number) {
    const query = {
        // give the query a unique name
        name: 'fetch-player-past-pp',
        text: `SELECT *
            FROM player_history
            WHERE player_id = $1
            ORDER BY snapshot_date ASC
            LIMIT $2;
        `,
        values: [player_id,limit,],
        //`SELECT * 
        //    FROM player_history
        //    WHERE rank BETWEEN 50 AND 100
        //    ORDER BY rank
        //    LIMIT 20
        //    OFFSET 20;
        //`
        //SELECT * FROM user WHERE id = $1',
    }
    const response = await client.query(query)

    let pp_values : (Number | null)[] = []
    let rank_values : (Number | null)[] = []
    let country_values : (Number | null)[] = []
    let total_score_values : (Number | null)[] = []
    let total_ranked_score_value : (Number | null)[] = []
    let average_ranked_accuracy_value : (Number | null)[] = []
    let total_play_count_value : (Number | null)[] = []
    let ranked_play_count_value : (Number | null)[] = []

    const dates: Date[] = [];
    const current_date = new Date();

    for (let i = 0; i < limit; i++) {
        let past_date = new Date(current_date);
        past_date.setDate(current_date.getDate() - (limit - i - 1)); // Subtract i days
        past_date = getDateWithoutTime(past_date)
        dates.push(new Date(past_date)); // Format as YYYY-MM-DD

        let found_match = false;
        response.rows.forEach((row: any) => {
            if (past_date.getTime() == row.snapshot_date.getTime()) {
                pp_values.push(row.pp)
                rank_values.push(row.rank)
                country_values.push(row.country_rank)
                total_score_values.push(row.total_score)
                total_ranked_score_value.push(row.total_ranked_score)
                average_ranked_accuracy_value.push(row.average_ranked_accuracy)
                total_play_count_value.push(row.total_play_count)
                ranked_play_count_value.push(row.ranked_play_count)
                found_match = true;
            }
        })
        if (found_match == false) {
            pp_values.push(null)
            rank_values.push(null)
            country_values.push(null)
            total_score_values.push(null)
            total_ranked_score_value.push(null)
            average_ranked_accuracy_value.push(null)
            total_play_count_value.push(null)
            ranked_play_count_value.push(null)
        }
    }

    return {
        pp_values : pp_values,
        dates : dates,
        rank_values : rank_values,
        country_values : country_values,
        total_score_values : total_score_values,
        total_ranked_score_value : total_ranked_score_value,
        average_ranked_accuracy_value : average_ranked_accuracy_value,
        total_play_count_value : total_play_count_value,
        ranked_play_count_value : ranked_play_count_value,
    }
}


export async function getPlayerInfo(player_id: String) {
    const query = {
        // give the query a unique name
        name: 'fetch-player-info',
        text: `SELECT * 
            FROM player_history
            WHERE player_id = $1
            ORDER BY snapshot_date ASC
            LIMIT 1;
        `,
        values: [player_id,],
    }
    const response = await client.query(query)

    let pp_values : Number[] = []

    let player_data: UserType = {
        player_id: response.rows[0].player_id,
        snapshot_date: response.rows[0].snapshot_date,
        name: response.rows[0].name,
        bio: response.rows[0].bio,
        country: response.rows[0].country,
        pp: response.rows[0].pp,
        rank: response.rows[0].rank,
        country_rank: response.rows[0].country_rank,
        badges: response.rows[0].badges,
        banned: response.rows[0].banned,
        inactive: response.rows[0].inactive,
        total_score: response.rows[0].total_score,
        total_ranked_score: response.rows[0].total_ranked_score,
        average_ranked_accuracy: response.rows[0].average_ranked_accuracy,
        total_play_count: response.rows[0].total_play_count,
        ranked_play_count: response.rows[0].ranked_play_count
    }
    return player_data
}


export async function fetchPlayerScoresOnMap(player_id : string, leaderboard_id : string): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-player-scores-for-leaderboard',
        text: `
        WITH latest_scores AS (
            SELECT s.*
            FROM scores s
            WHERE s.player_id = $1 AND s.leaderboard_id = $2
            ORDER BY s.time DESC
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
        FROM latest_scores s
        LEFT JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        ORDER BY s.time DESC;
        `,
        values: [player_id,leaderboard_id,],
    }


    const res = await client.query(query);
    let scores: Score[] = res.rows.map((row: any) => {
        let accuracy = (row.score / row.maxscore) * 100.0
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
            bad_cuts_and_misses: row.missed_notes + row.bad_cuts,
            mods: row.mods,
            hmd: row.hmd,
            device_hmd: row.device_hmd,
            device_controller_left: row.device_controller_left,
            device_controller_right: row.device_controller_right,
        }
    })

    return scores;
}

export async function searchForUser(text : string, page : number, page_size : number) {
    const offset = (page - 1) * page_size;

    const query = {
        name: 'fetch-player-latest-matching-page',
        text: `
            SELECT *, similarity(name, $1) AS score
            FROM (
                SELECT DISTINCT ON (player_id) *
                FROM player_history
                WHERE name % $1
                ORDER BY player_id, snapshot_date DESC
            ) latest
            ORDER BY score DESC, rank ASC
            OFFSET $3
            LIMIT $2;
        `,
        values: [`%${text}%`, page_size, offset],
    };

    const response = await client.query(query);
    const rows = response.rows;

    let users: UserType[] = response.rows.map((row: any) => {
        return {
            player_id: row.player_id,
            snapshot_date: row.snapshot_date,
            name: row.name,
            bio: row.bio,
            country: row.country,
            pp: row.pp,
            rank: row.rank,
            country_rank: row.country_rank,
            badges: row.badges,
            banned: row.banned,
            inactive: row.inactive,
            total_score: row.total_score,
            total_ranked_score: row.total_ranked_score,
            average_ranked_accuracy: row.average_ranked_accuracy,
            total_play_count: row.total_play_count,
            ranked_play_count: row.total_play_count,
        }
    })

    return users
}