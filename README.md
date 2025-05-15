![Website Logo](https://historysaber.com/images/medium-logo.png)

Track historical ScoreSaber rankings, player scores, and top player performance over time.

HistorySaber is a tool for exploring historical data from ScoreSaber, the global Beat Saber ranking platform. It lets you dive deep into how players’ rankings, performance points (pp), and top scores have evolved — features not currently offered in depth by ScoreSaber itself.

<p float="center">
  <img src="https://github.com/user-attachments/assets/35d08ae6-236e-4652-93f4-2127a8f1562a" width="400" />
  <img src="https://github.com/user-attachments/assets/b9719e7f-0596-4748-8a14-57ddbbb0a75f" width="400" />
  <img src="https://github.com/user-attachments/assets/594b16c5-e86a-40f4-99c3-385285e7ee5c" width="400" />
  <img src="https://github.com/user-attachments/assets/094a1751-432a-4793-b8b0-cd9966a28275" width="400" />
  <img src="https://github.com/user-attachments/assets/8365b6ee-9bae-4a9b-8efd-08d447b73416" width="400" />
</p>

## Features

- View changes in player rank, pp, and top scores over time  
- Historical tracking of global, country, and regional rankings  
- Explore past top player scores and leaderboard snapshots  
- Country-based filters to analyze regional performance trends  
- Stores and organizes historical data for long-term access  

## Website

Visit the live site: https://historysaber.com  

## How It Works

1. A Python script periodically fetches player and score data using the ScoreSaber API. (currently not shared)
2. Data is stored in a PostgreSQL database using timescaledb.  
3. The website displays this data in an easy-to-read historical format.

## Use Cases

- Track how top players and their scores progress over time  
- Compare performance trends and rankings between countries  
- Explore historical leaderboard snapshots  
- See how global and regional Beat Saber rankings have changed

## Contributing

Contributions are welcome! To get started:

1. Clone the repo  
2. Install dependencies  
3. Set up a PostgreSQL instance  
4. Run the fetch script to populate the database (currently not shared, so this step may be limited)  
5. Start the web server

Feel free to open an issue or submit a pull request for improvements or fixes.
