import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchGenre, fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/api";
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
interface MovieContextType {
  trendingMovies: MovieInterface[];
  popularMovies: MovieInterface[];
  upcomingMovies: MovieInterface[];
  loading: boolean;
  error: any;
  genre: any[];
  isModalOpen: boolean;
  setIsModalOpen: (value:boolean) => void;
  selectedMovie: any;
  setSelectedMovie: (value:number|null) => void;
}

const MovieContext = createContext<MovieContextType | null>(null);
export const useMovies = () => useContext(MovieContext);





export const MovieProvider = ({ children }: { children: ReactNode }) => {

  const [trendingMovies, setTrendingMovies] = useState<any>([]);
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [genre, setGenre] = useState<any>([])


  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [trending, popular, upcoming, genreList] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
          fetchGenre(),

        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setUpcomingMovies(upcoming)
        setGenre(genreList);

      }
      catch (err) {
        console.log("error fetching ", err);
      }
      finally {
        setLoading(false)
      }
    }

    fetchMovieData();
  }, [])



  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        popularMovies,
        upcomingMovies,
        loading,
        genre,
        error,
        isModalOpen,
        setIsModalOpen,
        selectedMovie,
        setSelectedMovie,
      
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
