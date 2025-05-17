import { DATABASE_URL } from '$env/static/private';
import pg from 'pg'
const { Client } = pg
export const client = new Client(DATABASE_URL)
await client.connect()

console.log("created postgresql connection")


export async function getTableInfo() {
    // Query sizes for both tables at once
    const sizeQuery = {
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
    const countQuery = {
      name: 'fetch-table-row-counts',
      text: `
        SELECT 'player_history' AS table_name, COUNT(*) AS row_count FROM player_history
        UNION ALL
        SELECT 'scores' AS table_name, COUNT(*) AS row_count FROM scores;
      `,
    };
  
    const sizeRes = await client.query(sizeQuery);
    const countRes = await client.query(countQuery);
  
    const info: Record<string, any> = {};
  
    for (const row of sizeRes.rows) {
      info[row.hypertable_name] = {
        total_size: row.total_size,
        total_size_bytes: parseInt(row.total_size_bytes, 10),
        row_count: 0, // will fill later
      };
    }
  
    for (const row of countRes.rows) {
      if (info[row.table_name]) {
        info[row.table_name].row_count = parseInt(row.row_count, 10);
      }
    }
  
    return {
      player_history_size: info['player_history']?.total_size,
      player_history_count: info['player_history']?.row_count,
  
      player_scores_size: info['scores']?.total_size,
      player_scores_count: info['scores']?.row_count,
    };
  }