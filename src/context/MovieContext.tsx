import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchGenre, fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/api";


const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);


export const MovieProvider = ({ children }: { children: ReactNode }) => {

  const [trendingMovies, setTrendingMovies] = useState<any>([]);
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [genre, setGenre] = useState([])


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



  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMovie ,setSelectedMovie] = useState<any>(null);

  return (
    <MovieContext
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
        setSelectedMovie
      }}
    >
      {children}
    </MovieContext>
  )
}
