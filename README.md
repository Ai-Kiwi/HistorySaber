# HistorySaber

Track historical ScoreSaber rankings, player data, and performance over time.

HistorySaber is a tool for viewing historical data from ScoreSaber, the global Beat Saber ranking platform. It lets you explore how players' rankings and performance points (pp) have changed over time — something ScoreSaber itself doesn’t currently offer in depth.

## Features

- View changes in player rank and pp over time  
- Historical tracking of global, country, and regional rankings  
- Stores and organizes historical data for long-term access  
- Country-based filters to view regional performance trends  
- Built with Python and PostgreSQL for efficient data handling

## Website

Visit the live site: https://historysaber.com  
(*Replace this with the correct URL if different*)

## How It Works

1. A Python script periodically fetches player and score data using the ScoreSaber API. (currently not shared)
2. Data is stored in a PostgreSQL database.  
3. The website displays this data in an easy-to-read historical format.

## Use Cases

- Track how top players progress 
- Compare performance trends between countries  
- Look back at rankings during certain dates
- See how leaderboards have changed over time

## Contributing

Contributions are welcome! To get started:

1. Clone the repo  
2. Install dependencies  
3. Set up a PostgreSQL instance  
4. Run the fetch script to populate the database (currently isn't shared so you may have a problem here) 
5. Start the web server

Feel free to open an issue or submit a pull request if you want anything changed.

## License

MIT License — see LICENSE for details.
