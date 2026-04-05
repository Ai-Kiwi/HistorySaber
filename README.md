# Historysaber Shutdown Notice
Historysaber ran from 3rd March 2025 to 4th March 2026; during this time, it captured daily leaderboard data for every active user, including info like their point values. From April onwards, it captured all scores for all active players, including keeping old data for dates and not overriding new data. Originally, this was hosted on my own computer with a custom PostgreSQL installation; however, it later had to be moved to a cloud host after the server suffered a drive failure. During this time over 60 million scores were recorded and over a years worth of player data accounting for over 11GB of data, if you are intressted in having this data contact me at contact@aikiwi.dev. 

![Website Logo](https://historysaber.com/images/medium-logo.png)

Track historical ScoreSaber rankings, player scores, and top player performance over time.

HistorySaber is a tool for exploring historical data from ScoreSaber, the global Beat Saber ranking platform. It lets you dive deep into how players’ rankings, performance points (pp), and top scores have evolved — features not currently offered in depth by ScoreSaber itself.

<p float="center">
<img src="https://github.com/user-attachments/assets/721f1dc1-0dce-4fac-9777-6c28cde12135" width="400" />
<img src="https://github.com/user-attachments/assets/ac6fbd92-afdb-488b-a48a-882cb023dcdf" width="400" />
<img src="https://github.com/user-attachments/assets/22d95945-87a9-437a-9fbc-44be453c1fb7" width="400" />
<img src="https://github.com/user-attachments/assets/701459f8-9f39-4da1-80bd-c8c9bfc3d8a0" width="400" />
<img src="https://github.com/user-attachments/assets/414e1834-c7b9-48e4-9080-56ac1ef240b1" width="400" />
<img src="https://github.com/user-attachments/assets/3f327b93-a157-4997-a7a9-e824d921a0c9" width="400" />
<img src="https://github.com/user-attachments/assets/042fe35b-8ac1-434e-8087-91ab7f7e0151" width="400" />
<img src="https://github.com/user-attachments/assets/21776c3c-6055-49f7-81d5-7aa9da87402c" width="400" />
</p>


## Features

- View changes in player rank, pp, and top scores over time all in easy to use interactive graph
- View complete daily snapshots of leaderboard ranks back till March 10th, 2025  
- View all past scores for any player (apart from scores overidden before May 4th, 2025) including date accurate information such as star rating and how much pp it was worth  
- Historical tracking of global, country, and regional rankings  
- Explore past top player scores and leaderboard snapshots  
- Discover what maps were ranked at in the past    
- Stores and organizes historical data for long-term access  

## Website

Visit the live site: https://historysaber.com  

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
