![Website Logo](https://historysaber.com/images/medium-logo.png)

Track historical ScoreSaber rankings, player data, and performance over time.

HistorySaber is a tool for viewing historical data from ScoreSaber, the global Beat Saber ranking platform. It lets you explore how players' rankings and performance points (pp) have changed over time — something ScoreSaber itself doesn’t currently offer in depth.

<p float="left">
  <img src="https://github.com/user-attachments/assets/35d08ae6-236e-4652-93f4-2127a8f1562a" width="200" />
  <img src="https://github.com/user-attachments/assets/b9719e7f-0596-4748-8a14-57ddbbb0a75f" width="200" />
  <img src="https://github.com/user-attachments/assets/594b16c5-e86a-40f4-99c3-385285e7ee5c" width="200" />
  <img src="https://github.com/user-attachments/assets/094a1751-432a-4793-b8b0-cd9966a28275" width="200" />
  <img src="https://github.com/user-attachments/assets/8365b6ee-9bae-4a9b-8efd-08d447b73416" width="200" />
</p>

## Features

- View changes in player rank and pp over time  
- Historical tracking of global, country, and regional rankings  
- Stores and organizes historical data for long-term access  
- Country-based filters to view regional performance trends  
- Built with Python and PostgreSQL for efficient data handling

## Website

Visit the live site: https://historysaber.com  

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
