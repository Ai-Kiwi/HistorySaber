import type { MapLeaderboard, Score } from "$lib/types"
import { calculatePP } from "../ppCalculator"
import { client } from "./main"

export async function getLeaderboardInfo(leaderboard_id : string, date : Date) {
    const query = {
        // give the query a unique name
        name: 'fetch-leaderboard-info',
        text: `
        WITH latest_ratings AS (
            SELECT DISTINCT ON (r.leaderboard_id)
                r.leaderboard_id,
                r.stars,
                r.updated_at
            FROM leaderboard_rating_update r
            WHERE r.updated_at <= $2
            ORDER BY r.leaderboard_id, r.updated_at DESC
        )
        SELECT 
            COALESCE(r.stars, 0) AS stars,
            ml.map_hash,
            ml.difficulty,
            ml.difficultyraw,
            ml.maxscore,
            m.song_name,
            m.song_sub_name,
            m.song_author_name,
            m.level_author_name
        FROM map_leaderboard AS ml
        LEFT JOIN latest_ratings r ON ml.leaderboard_id = r.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        WHERE ml.leaderboard_id = $1;
        `,
        values: [leaderboard_id,date,],
    }
    const res = await client.query(query)
    if (res.rowCount == 0) {
        return undefined
    }
    let leaderboard_data: MapLeaderboard = {
        leaderboard_id: leaderboard_id,
        stars: res.rows[0].stars,
        map_hash: res.rows[0].map_hash,
        difficulty: res.rows[0].difficulty,
        difficultyraw: res.rows[0].difficultyraw,
        maxscore: res.rows[0].maxscore,
        song_name: res.rows[0].song_name,
        song_sub_name: res.rows[0].song_sub_name,
        song_author_name: res.rows[0].song_author_name,
        level_author_name: res.rows[0].song_author_name,
    }
    return leaderboard_data
}


export async function fetchPastTopScoresOnMap(leaderboard_id : string): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    const query = {
        name: 'fetch-past-top-scores-for-leaderboard',
        text: `
        WITH ordered_scores AS (
            SELECT *,
                MAX(score) OVER (
                    PARTITION BY leaderboard_id
                    ORDER BY time
                    ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
                ) AS prev_best
            FROM scores
            WHERE leaderboard_id = $1
        ),
        score_beats AS (
            SELECT *
            FROM ordered_scores
            WHERE prev_best IS NOT NULL AND score > prev_best
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
        FROM score_beats s
        LEFT JOIN latest_ratings r ON s.leaderboard_id = r.leaderboard_id
        JOIN map_leaderboard ml ON s.leaderboard_id = ml.leaderboard_id
        JOIN map m ON ml.map_hash = m.map_hash
        ORDER BY s.time DESC;
        `,
        values: [leaderboard_id,],
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
            mods: row.mods,
            hmd: row.hmd,
            device_hmd: row.device_hmd,
            device_controller_left: row.device_controller_left,
            device_controller_right: row.device_controller_right,
        }
    })

    let oldest_date = new Date("2021-5-5")
    for(var i = 0; i < scores.length; i++) {
        var score = scores[i];
        if (score.time.getTime() < new Date("2025-5-5").getTime()) {
            oldest_date = score.time
            break
        }
    }

    //console.log(oldest_date)
    scores = scores.filter(score => {
        //console.log(`${score.time.getTime()} ${oldest_date.getTime()}`)
        return score.time.getTime() >= oldest_date.getTime()
    })

    return scores;
}