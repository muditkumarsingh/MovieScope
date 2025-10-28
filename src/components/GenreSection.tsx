import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext"
import { fetchMovieByGenre } from "../api/api";
import MovieLoader from "./MovieLoader";
import Card from "./Card";

const GenreSection = () => {

    const { loading, genre } = useMovies();
    const [selectedGenre, setSelectedGenre] = useState<any>(null);
    const [loadingGenreMovie, setLoadingGenreMovie] = useState(false);
    const [genreMovie, setGenreMovie] = useState<any>(null);
    const showGenre = genre.slice(0, 10);

    useEffect(() => {
        if (genre.length > 0) {
            setSelectedGenre(genre[0].id);
        }
    }, [loading, genre])


    useEffect(() => {
        const loadGenre = async () => {
            if (!selectedGenre) return;

            setLoadingGenreMovie(true);
            const movie = await fetchMovieByGenre(selectedGenre);

            setGenreMovie(movie.slice(0, 8));

            setInterval(() => {

                setLoadingGenreMovie(false)
            }, 500);



        }
        loadGenre()
    }, [selectedGenre])


    return (
        <div className='w-full mt-10 md:px-0 px-2 bg-back py-6 ' id="genre">
            <div className='w-full container mx-auto'>
                <div >
                    <h1 className='text-white font-extrabold text-3xl'>
                        Browse by <span className='text-custom'>Genre</span>
                    </h1>
                </div>

                {/* Genres */}
                <div className="flex gap-2 overflow-x-auto pb-3 mt-3 mb-6">
                    {showGenre.map((gen: any, index: number) => (
                        <div
                            key={index}
                            className={`text-white px-4 py-1 text-sm  rounded-md cursor-pointer ${gen.id === selectedGenre ? "bg-custom" : "bg-gray-800"}    
                            `}
                            onClick={() => setSelectedGenre(gen.id)}
                            
                        >{gen.name}</div>
                    ))}
                </div>

                {loadingGenreMovie ?
                    <MovieLoader />
                    :

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {genreMovie?.map((moviecontent: any) => (
                            <Card key={moviecontent.id} movie={moviecontent} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default GenreSection
