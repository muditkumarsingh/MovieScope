interface MovieInterface {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string; // or "movie" | "tv" if known set
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string; // could use Date if you parse it
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type { MovieInterface };