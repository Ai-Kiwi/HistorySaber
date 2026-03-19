import type { MapLeaderboard, UserType } from "$lib/types";
import { DATABASE_CACHE, DATABASE_POOL, DISPLAY_CACHE_MISS } from "./main";

export async function getLeaderboardPage(page : number,unrounded_date : Date, page_size : number) {
    const date = new Date(unrounded_date.getFullYear(), unrounded_date.getMonth(), unrounded_date.getDate());
    if (DATABASE_CACHE.has(`getLeaderboardPage-${page},${date},${page_size}`)) {
        return DATABASE_CACHE.get(`getLeaderboardPage-${page},${date},${page_size}`)
    }else if (DISPLAY_CACHE_MISS) {
        console.log(`cache miss getLeaderboardPage-${page},${date},${page_size}`)
    }
    //console.log(`getting database leaderboard data page ${page}, date ${date}`)
    const query = {
        // give the query a unique name
        name: 'fetch-leaderboard-ranks',
        text: `SELECT * 
            FROM player_history
            WHERE inactive = FALSE AND CAST(snapshot_date AS DATE) = $1
            ORDER BY rank ASC
            LIMIT $3
            OFFSET $2;
        `,
        values: [date,(page - 1) * 50, page_size],
        //`SELECT * 
        //    FROM player_history
        //    WHERE rank BETWEEN 50 AND 100
        //    ORDER BY rank
        //    LIMIT 20
        //    OFFSET 20;
        //`
        //SELECT * FROM user WHERE id = $1',
    }
    const res = await DATABASE_POOL.query(query)
    //console.log(res.rows)

    const returning_users: UserType[] = res.rows.map((row: any) => ({
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
        ranked_play_count: row.ranked_play_count
    }));
    DATABASE_CACHE.set(`getLeaderboardPage-${page},${date},${page_size}`,returning_users);
    return returning_users
}


export async function getOtherLeaderboardDifficulties(map_hash : String) {
    if (DATABASE_CACHE.has(`getOtherLeaderboardDifficulties-${map_hash}`)) {
        return DATABASE_CACHE.get(`getOtherLeaderboardDifficulties-${map_hash}`)
    }else if (DISPLAY_CACHE_MISS) {
        console.log(`cache miss getOtherLeaderboardDifficulties-${map_hash}`)
    }
    //console.log(`getting database leaderboard data page ${page}, date ${date}`)
    const query = {
        // give the query a unique name
        name: 'fetch-other-map-leaderboard-difficulties',
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
                COALESCE(r.stars, 0) AS stars,
                ml.map_hash,
                ml.difficulty,
                ml.difficultyraw,
                ml.maxscore,
                ml.leaderboard_id,
                m.song_name,
                m.song_sub_name,
                m.song_author_name,
                m.level_author_name
            FROM map_leaderboard AS ml
            LEFT JOIN latest_ratings r ON ml.leaderboard_id = r.leaderboard_id
            JOIN map m ON ml.map_hash = m.map_hash
            WHERE ml.map_hash = $1
            ORDER BY ml.difficulty, ml.leaderboard_id ASC;
        `,
        values: [map_hash],
    }
    const res = await DATABASE_POOL.query(query)
    //console.log(res.rows)

    const returning_leaderboards: MapLeaderboard[] = res.rows.map((row: any) => ({
        leaderboard_id: row.leaderboard_id,
        stars: row.stars,
        map_hash: row.map_hash,
        difficulty: row.difficulty,
        difficultyraw: row.difficultyraw,
        maxscore: row.maxscore,
        song_name: row.song_name,
        song_sub_name: row.song_sub_name,
        song_author_name: row.song_author_name,
        level_author_name: row.song_author_name,
    }));
    DATABASE_CACHE.set(`getOtherLeaderboardDifficulties-${map_hash}`,returning_leaderboards);
    return returning_leaderboards
}


export async function getCountryLeaderboardPage(page : number,unrounded_date : Date, countrys: String[], page_size : number) {
    const date = new Date(unrounded_date.getFullYear(), unrounded_date.getMonth(), unrounded_date.getDate());
    if (DATABASE_CACHE.has(`getCountryLeaderboardPage-${page},${date},${countrys},${page_size}`)) {
        return DATABASE_CACHE.get(`getCountryLeaderboardPage-${page},${date},${countrys},${page_size}`)
    }else if (DISPLAY_CACHE_MISS) {
        console.log(`cache miss getCountryLeaderboardPage-${page},${date},${countrys},${page_size}`)
    }
    const query = {
        // give the query a unique name
        name: 'fetch-country-leaderboard-ranks',
        text: `SELECT * 
            FROM player_history
            WHERE inactive = FALSE AND CAST(snapshot_date AS DATE) = $1 AND country = ANY ($2)
            ORDER BY rank ASC
            LIMIT $4
            OFFSET $3;
        `,
        values: [date,countrys,(page - 1) * 50, page_size],
        //`SELECT * 
        //    FROM player_history
        //    WHERE rank BETWEEN 50 AND 100
        //    ORDER BY rank
        //    LIMIT 20
        //    OFFSET 20;
        //`
        //SELECT * FROM user WHERE id = $1',
    }
    const res = await DATABASE_POOL.query(query)
    //console.log(res.rows)

    const returning_users: UserType[] = res.rows.map((row: any) => ({
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
        ranked_play_count: row.ranked_play_count
    }));
    DATABASE_CACHE.set(`getCountryLeaderboardPage-${page},${date},${countrys},${page_size}`,returning_users)
    return returning_users
}

export async function fetchListOfAllLeaderboards() {
    const query = {
        name: 'fetch-all-leaderboard-list',
        text: `
        SELECT DISTINCT leaderboard_id
        FROM map_leaderboard;
        `,
        values: [],
    }


    const res = await DATABASE_POOL.query(query);
    let leaderboards = res.rows.map((row: any) => {
        return row.leaderboard_id
    })
    return leaderboards;
}