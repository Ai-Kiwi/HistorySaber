import { DATABASE_URL } from '$env/static/private';
import type { Score, UserType } from '$lib/types';
import { getDateWithoutTime } from '$lib/utils';
import pg from 'pg'
import { calculatePP } from './ppCalculator'
const { Client } = pg
const client = new Client(DATABASE_URL)
await client.connect()

console.log("created postgresql connection")


function clean_user(input_user: UserType) {
    let user = input_user
    if (user.player_id == "76561198392945548" && user.name == "Floffy") {
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



export async function fetchPlayerRankedScores(player_id : string, date : Date): Promise<any[]> {
    //set date to 3 as thats when leaderboards are collected
    let timed_date = new Date(date)
    date.setHours(3)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
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
        values: [player_id,timed_date,],
    }
    const res = await client.query(query);
    const scores: Score[] = res.rows.map((row: any) => {
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
            level_author_name: row.level_author_name
        }
    })
    return scores;
}




export async function getPlayerTopPlays(player_id : string, date : Date, page : number, page_size : number) {
    let scores = await fetchPlayerRankedScores(player_id, date);//

    scores.sort(function(score_a, score_b){
        return score_b.pp - score_a.pp;
    });
    if (page > 1){
        scores = scores.slice((page - 1) * page_size, page * page_size);
    }else{
        scores = scores.slice(0,page_size);
    }
    return scores
}

//console.log(await getPlayerTopPlays("76561198424686859",new Date("May 5, 2025 03:0:00"), 1, 3))


//console.log(await getTableInfo())
//getLeaderboardPage(1)