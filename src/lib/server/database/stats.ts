import type { PlayerImprovementType, UserType } from "$lib/types";
import { DATABASE_CACHE, DATABASE_POOL, DISPLAY_CACHE_MISS } from "./main";

export async function getMostImprovedPlayers() {
    if (DATABASE_CACHE.has(`getMostImprovedPlayers`)) {
        return DATABASE_CACHE.get(`getMostImprovedPlayers`)
    }else if (DISPLAY_CACHE_MISS) {
        console.log(`cache miss getMostImprovedPlayers`)
    }
    //console.log(`getting database leaderboard data page ${page}, date ${date}`)
    const query = {
        // give the query a unique name
        name: 'fetch-leaderboard-ranks',
        text: `WITH
        week_ago_snapshots AS (
            SELECT *
            FROM player_history
            WHERE snapshot_date = (SELECT MAX(snapshot_date) - INTERVAL '7 days' FROM player_history)
            AND rank <= 5000
            AND banned = FALSE
            AND inactive = FALSE
        ),
        latest_snapshots AS (
            SELECT *
            FROM player_history
            WHERE snapshot_date = (SELECT MAX(snapshot_date) FROM player_history)
            AND banned = FALSE
            AND inactive = FALSE
        ),
        joined AS (
            SELECT
                old.player_id,
                old.name AS old_name,
                new.name AS current_name,
                old.rank AS old_rank,
                new.rank AS new_rank,
                old.country
            FROM week_ago_snapshots old
            JOIN latest_snapshots new ON old.player_id = new.player_id
            WHERE old.rank > new.rank  -- only improvements
        )
        SELECT
            player_id,
            current_name,
            country,
            old_rank,
            new_rank,
            (old_rank - new_rank) AS rank_gain
        FROM joined
        ORDER BY rank_gain DESC
        LIMIT 5;
        `,
        values: [],
        //`SELECT * 
        //    FROM player_history
        //    WHERE rank BETWEEN 50 AND 100
        //    ORDER BY rank
        //    LIMIT 20
        //    OFFSET 20;
        //`
        //SELECT * FROM user WHERE id = $1',
    }
    const response = await DATABASE_POOL.query(query)
    //console.log(res.rows)

    const returning_users: PlayerImprovementType[] = response.rows.map((row: any) => ({
        current_name: row.current_name,
        country: row.country,
        old_rank: row.old_rank,
        new_rank: row.new_rank,
        rank_gain: row.rank_gain,
    }));
    DATABASE_CACHE.set(`getMostImprovedPlayers`, returning_users,{
        ttl : 1000 * 60 * 60 * 24 * 7 //1 week
    })
    return returning_users
}