import { Star } from "lucide-react"
import { getImageUrl } from "../api/api"
import { useMovies } from "../context/MovieContext"

const Card = ({ movie }: { movie: any }) => {

    const { setSelectedMovie, setIsModalOpen } = useMovies();

    const rating = (rate) => {
        return (Math.round(rate * 10) / 10).toFixed(1)
    }



    const handleClick = () => {

        setSelectedMovie(movie.id)
        setIsModalOpen(true)
    }

    return (
        <div className="min-w-[160px] md:min-w-[200px]" onClick={handleClick}>
            <div className=" w-full">
                <div className=" group w-full relative overflow-hidden">
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt=""
                        className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
                    />
                    <div className="absolute z-10 inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute z-12 w-full px-4 bottom-5">
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="text-white/80 text-sm">
                                        {movie.release_date.substring(0, 4)}
                                    </p>
                                    <div className="text-yellow-300 flex items-center text-sm">
                                        <Star fill="yellow" stroke="0" size={18} />
                                        {rating(movie.vote_average)}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-2">
                                <button
                                    className="w-full py-1 rounded-lg bg-custom text-white"

                                >
                                    Know more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-white font-bold w-full truncate">{movie.title}</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-white/80 text-sm">
                            {movie.release_date.substring(0, 4)}
                        </p>
                        <div className="text-yellow-300 flex items-center text-sm">
                            <Star fill="yellow" stroke="0" size={18} />
                            {rating(movie.vote_average)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
