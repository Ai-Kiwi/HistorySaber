export interface UserType {
  player_id: string,
  snapshot_date: string,
  name: string,
  bio: String | null,
  country: string,
  pp: number,
  rank: number,
  country_rank: number,
  badges: JSON,
  banned: boolean,
  inactive: boolean,
  total_score: number,
  total_ranked_score: number,
  average_ranked_accuracy: number,
  total_play_count: number,
  ranked_play_count: number
}

export interface LeaderboardSelections {
  country: String[],
  date_moved_forward: number,
  page: number,
}

export interface LeaderboardData { 
  selection : LeaderboardSelections,
  users : UserType[]
}

export interface Score { 
  score_id: number,
  leaderboard_id: string,
  accuracy: number,
  score: number,
  modified_score: number,
  time: Date,
  stars: number,
  pp: number,
  map_hash: string,
  difficulty: number,
  difficultyraw: string,
  maxscore: number,
  song_name: string,
  song_sub_name: string,
  song_author_name: string,
  level_author_name: string,
  player_id: string,
  max_combo: number,
  full_combo: boolean,
  bad_cuts: number,
  missed_notes: number,
  bad_cuts_and_misses: number,
  mods: string,
  hmd: number
  device_hmd: string,
  device_controller_left: string,
  device_controller_right : string,
}

export interface MapLeaderboard {
  leaderboard_id: string,
  stars: number,
  map_hash: string,
  difficulty: number,
  difficultyraw: string,
  maxscore: number,
  song_name: string,
  song_sub_name: string,
  song_author_name: string,
  level_author_name: string,
}