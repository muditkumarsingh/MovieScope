import { X } from "lucide-react"
import { useMovies } from "../context/MovieContext"
import { useEffect, useState } from "react";
import { fetchMovieDetails, getImageUrl } from "../api/api";
import { languages } from "../assets/language";
import MovieLoader from "./MovieLoader";

const MovieModal = () => {

    const context = useMovies();
    if (!context) return null;
    const { isModalOpen, setIsModalOpen, selectedMovie, setSelectedMovie } = context;


    const [movie, setMovie] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    
    useEffect(() => {
        async function getData() {

            try {
                setLoading(true);
                const movieData = await fetchMovieDetails(selectedMovie);
                setMovie(movieData)
                setLoading(false)
                setTimeout(() => {

                }, 500)
            }
            catch (err) {
                setError(err);
                console.log("error: ", error)

            }
        }
        getData();
    }, [selectedMovie])


    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    }

    const rating = (rate: number) => {
        return (Math.round(rate * 10) / 10).toFixed(1)
    }

    const handlePropagationClick = (e: any) => {
        e.stopPropagation();
    }



  

    if (!isModalOpen) {

        return null
    }




    return (



        <div className="fixed inset-0 bg-black/90 text-white z-100 md:px-30 lg:px-50  md:py-20 py-3 px-3" onClick={handleClose} >
            {loading ? <MovieLoader /> :

                <div
                    className="w-full h-full bg-back overflow-y-auto rounded-2xl relative "
                    style={{ scrollbarWidth: "none" }}
                    onClick={handlePropagationClick}
                >
                    <div className="absolute right-2 rounded-md top-3 z-10 p-1 bg-custom/50" onClick={handleClose}>
                        <X />
                    </div>
                    <div className="w-full text-black  ">
                        {/* backdrop */}
                        <div className="backdrop w-full h-70 md:h-80 relative">
                            <img
                                src={getImageUrl(movie.backdrop_path)}
                                alt=""
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 z-1 bg-black/50"></div>
                        </div>
                        <div className="w-full z-10 -mt-20 md:-mt-35 px-5 lg:px-20 relative flex gap-4 md:gap-10">
                            <div className="min-w-30 w-30 md:w-50 aspect-2/3 flex-grow-0 " >
                                <img
                                    src={getImageUrl(movie.poster_path)}
                                    alt=""
                                    className="w-full h-full object-cover rounded-lg flex-grow-0"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-5 justify-center w-full">
                                <p className="text-white text-xs">2017</p>
                                <h1
                                    className="text-2xl md:text-5xl font-extrabold text-white"
                                >
                                    {movie?.title}
                                </h1>
                                <div className="flex gap-1">

                                    <h3 className="text-white">Ratings: {rating(movie.vote_average)}/10</h3>
                                </div>
                                <div className="text-white text-sm">
                                    <span className="font-bold">Language</span> : {languages[movie.original_language as keyof typeof languages] ?? movie.original_language}
                                </div>
                                <div className="flex flex-wrap gap-2 w-full mt-1">

                                    {movie?.genres?.map((genre:{name:string,id:number}) => (
                                        <div className="text-white font-bold text-xs px-2 py-1 bg-gray-800 rounded-md">{genre.name}</div>

                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="w-full px-5 lg:px-20 mt-5">
                            <h1 className="text-lg md:text-2xl text-white font-extrabold px-2">Over<span className="text-custom px-[2px]">view</span> </h1>
                            <div className="mt-2 w-full h-[0.5px] bg-gray-500 rounded-full"></div>
                            <div className="px-2 mt-3 text-white text-xs md:text-md font-light leading-5">
                                {movie.overview}
                            </div>
                        </div>

                        <div className="flex justify-around md:justify-center gap-5 md:gap-10 w-full px-5 lg:px-20 mt-5 ">
                            <div className="h-auto hidden md:block w-[1px] bg-gray-500"></div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-white font-bold text-lg">Status</h1>
                                <p className="text-sm text-gray-500">{movie.status}</p>
                            </div>
                            <div className="h-auto hidden md:block w-[1px] bg-gray-500"></div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-white font-bold text-lg">RunTime</h1>
                                <p className="text-sm text-gray-500">{movie.runtime} mins</p>
                            </div>
                            <div className="h-auto hidden md:block w-[1px] bg-gray-500"></div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-white font-bold text-lg">Revenue</h1>
                                <p className="text-sm text-gray-500">$ {movie.revenue}</p>
                            </div>
                            <div className="h-auto hidden md:block w-[1px] bg-gray-500"></div>
                        </div>
                    </div>
                </div>
            }
        </div >

    )
}

export default MovieModal
