import { DATABASE_URL } from '$env/static/private';
import { formatNumberShort } from '$lib/utils';
import pg from 'pg'
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