import { Clock, Keyboard, Languages, Loader, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMovies } from '../context/MovieContext'
import MovieLoader from './MovieLoader';
import { getImageUrl } from '../api/api';
import { languages } from '../assets/language';

const HeroSection = () => {


    const { loading, trendingMovies, genre , setIsModalOpen,setSelectedMovie } = useMovies();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const featuredMovies = trendingMovies.slice(0, 8);





    const genreName = Object.fromEntries(
        genre.map((obj:any) => [obj.id, obj.name])
    )

    // console.log(genreName.12);




    const currentMovie = (featuredMovies[currentSlide]);

    useEffect(() => {
        if (featuredMovies.length === 0) return;
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
                setIsTransitioning(false);
            }, 500);
        }, 8000);
        return () => clearInterval(interval)
    }, [loading, featuredMovies.length,currentMovie])



    if (loading || featuredMovies.length === 0) {
        return (
            <MovieLoader height='100vh' />
        )
    }

    const handleClick = (movieId:number)=>{
        setIsModalOpen(true);
        setSelectedMovie(movieId)
    }




    const ratings = (rate:number) => {
        return (Math.round(rate * 10) / 10).toFixed(1)
    }


    return (
        <div className={`w-full h-screen relative 
        
        `}>
            <div
                className={`absolute w-full h-full inset-0 bg-cover bg-center bg-no-repeat transition-all duration-200
                    ${isTransitioning ? "opacity-0" : ""}
                    `}
            >
                <div className='absolute inset-0 bg-black/50'>
                    <img
                        src={getImageUrl(currentMovie.backdrop_path)}
                        className='w-full h-full object-cover'
                    /></div>
                <div className='absolute inset-0 bg-black/50'></div>
            </div>


            <div className={`absolute inset-0 flex items-center container mx-auto transition-all duration-200
                    ${isTransitioning ? "opacity-0" : ""}`}
            >
                <div className='max-w-6xl'>
                    {/* Movie content */}
                    <div className=' flex items-center  '>
                        <div className='hidden  md:block'>
                            <img
                                src={getImageUrl(currentMovie.poster_path)}
                                alt=""
                                className='min-w-[240px] max-w-80 aspect-[2/3] object-cover'
                            />
                        </div>
                        <div className='flex flex-col justify-between md:ml-15 mx-3'>
                            <div className='text-white'>
                                {currentMovie.release_date.substring(0, 4)}
                            </div>
                            <div
                                className='font-extrabold text-white text-3xl md:text-6xl mt-2'
                            >{currentMovie.title}</div>

                            <div className='text-white flex items-center gap-2 md:gap-8 text-xs md:text-md mt-3'>
                                {currentMovie.genre_ids.map((genre, index) => (
                                    <div key={index} className='p-2 bg-back rounded-md'>{genreName[genre]}</div>
                                ))}

                            </div>
                            <div className='mt-3'>
                                <p className='text-white max-w-2xl line-clamp-4 md:line-clamp-5'>
                                    {currentMovie.overview}
                                </p>
                            </div>

                            {/* icons */}
                            <div className='text-white mt-4 flex gap-4 max-w-md'>
                                <div className='flex gap-2 items-center'>
                                    <Languages size={30} /> <p className='text-md md:text-xl'>{languages[currentMovie.original_language]}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <Star size={25} color='#FC0103' fill='#FC0103' stroke='0' />
                                    <p className='text-md md:text-xl'>Ratings: <b>{ratings(currentMovie.vote_average)}/10</b></p>
                                </div>
                            </div>

                            <div className='mt-5 flex gap-3 md:gap-5'>
                                <button className='px-4 py-2 bg-custom text-white font-bold rounded-lg '>
                                    Watch Later
                                </button>
                                <button className='px-4 py-2 border-2 border-white text-white font-bold rounded-lg ' onClick={()=>handleClick(currentMovie.id)}>
                                    Know More...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* pagination */}
            <div className='absolute z-10 bottom-10 left-0 right-0 flex justify-center gap-2'>
                {[...Array(featuredMovies.length)].map((_, index) => (
                    <button
                        key={index}
                        className={`h-1.5  rounded-full bg-[#B8B8B8] transition-all duration-200 cursor-pointer ${currentSlide === index ? "w-8 bg-custom" : "w-5"
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    >
                    </button>
                ))}
            </div>



        </div>
    )
}

export default HeroSection
