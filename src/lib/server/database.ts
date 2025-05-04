import { DATABASE_URL } from '$env/static/private';
import type { UserType } from '$lib/types';
import { getDateWithoutTime } from '$lib/utils';
import pg from 'pg'
const { Client } = pg
const client = new Client(DATABASE_URL)
await client.connect()

console.log("created postgresql connection")


function clean_user(input_user: UserType) {
    let user = input_user
    if (user.player_id == 76561198392945548 && user.name == "Floffy") {
        user.name = "Fluffy"
    }
    return user
}


export async function getLeaderboardPage(page : number,date : String) {
    //console.log(`getting database leaderboard data page ${page}, date ${date}`)
    const query = {
        // give the query a unique name
        name: 'fetch-leaderboard-ranks',
        text: `SELECT * 
            FROM player_history
            WHERE inactive = FALSE AND CAST(snapshot_date AS DATE) = $1
            ORDER BY rank ASC
            LIMIT 50
            OFFSET $2;
        `,
        values: [date,(page - 1) * 50],
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

    const returning_users: UserType[] = res.rows.map((row: any) => (clean_user({
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
    })));
    return returning_users
}

export async function getCountryLeaderboardPage(page : number,date : String,countrys: String[]) {

    const query = {
        // give the query a unique name
        name: 'fetch-country-leaderboard-ranks',
        text: `SELECT * 
            FROM player_history
            WHERE inactive = FALSE AND CAST(snapshot_date AS DATE) = $1 AND country = ANY ($2)
            ORDER BY rank ASC
            LIMIT 50
            OFFSET $3;
        `,
        values: [date,countrys,(page - 1) * 50],
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

    const returning_users: UserType[] = res.rows.map((row: any) => (clean_user({
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
    })));
    return returning_users
}

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
    const res = await client.query(query)

    let pp_values : (Number | null)[] = []
    let rank_values : (Number | null)[] = []
    let country_values : (Number | null)[] = []
    let total_score_values : (Number | null)[] = []
    let total_ranked_score_value : (Number | null)[] = []
    let average_ranked_accuracy_value : (Number | null)[] = []
    let total_play_count_value : (Number | null)[] = []
    let ranked_play_count_value : (Number | null)[] = []

    const dates: Date[] = [];
    const currentDate = new Date();

    for (let i = 0; i < limit; i++) {
        var pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - (limit - i - 1)); // Subtract i days
        pastDate = getDateWithoutTime(pastDate)
        dates.push(new Date(pastDate)); // Format as YYYY-MM-DD

        let found_match = false;
        res.rows.forEach((row: any) => {
            if (pastDate.getTime() == row.snapshot_date.getTime()) {
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
    const res = await client.query(query)

    let pp_values : Number[] = []

    let player_data: UserType = {
        player_id: res.rows[0].player_id,
        snapshot_date: res.rows[0].snapshot_date,
        name: res.rows[0].name,
        bio: res.rows[0].bio,
        country: res.rows[0].country,
        pp: res.rows[0].pp,
        rank: res.rows[0].rank,
        country_rank: res.rows[0].country_rank,
        badges: res.rows[0].badges,
        banned: res.rows[0].banned,
        inactive: res.rows[0].inactive,
        total_score: res.rows[0].total_score,
        total_ranked_score: res.rows[0].total_ranked_score,
        average_ranked_accuracy: res.rows[0].average_ranked_accuracy,
        total_play_count: res.rows[0].total_play_count,
        ranked_play_count: res.rows[0].ranked_play_count
    }
    return clean_user(player_data)
}

export async function getTableInfo() {
    const query = {
        name: 'fetch-table-size-info',
        text: `
            SELECT 
                pg_size_pretty(pg_total_relation_size('player_history')) AS total_size,
                COUNT(*) AS row_count
            FROM player_history;
        `,
    }
    const res = await client.query(query);

    const query2 = {
        name: 'fetch-scores-size-info',
        text: `
            SELECT 
                pg_size_pretty(pg_total_relation_size('scores')) AS total_size,
                COUNT(*) AS row_count
            FROM scores;
        `,
    };

    const res2 = await client.query(query2);

    return {
        player_history_size: res.rows[0].total_size,
        player_history_count: res.rows[0].row_count,

        player_scores_size: res2.rows[0].total_size,
        player_scores_count: res2.rows[0].row_count,
    };
}



//console.log(await getTableInfo())
//getLeaderboardPage(1)