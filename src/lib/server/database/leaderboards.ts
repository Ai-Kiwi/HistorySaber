import type { UserType } from "$lib/types";
import { client } from "./main";

export async function getLeaderboardPage(page : number,date : String, page_size : number) {
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
    const res = await client.query(query)
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
    return returning_users
}


export async function getCountryLeaderboardPage(page : number,date : String,countrys: String[], page_size : number) {

    const query = {
        // give the query a unique name
        name: 'fetch-country-leaderboard-ranks',
        text: `SELECT * 
            FROM player_history
            WHERE inactive = FALSE AND CAST(snapshot_date AS DATE) = $1 AND country = ANY ($2)
            ORDER BY rank ASC
            LIMIT $3
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
    const res = await client.query(query)
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
    return returning_users
}