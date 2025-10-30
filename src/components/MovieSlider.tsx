
import { useRef } from 'react'
import Card from './Card'
import { useMovies } from '../context/MovieContext';
import MovieLoader from './MovieLoader';

const MovieSlider = ({ id, title, subtitle }: { id: string, title: string, subtitle: string }) => {

    const moviesContext = useMovies();
    if (!moviesContext) {
        return null;
    }
    const { trendingMovies, popularMovies, upcomingMovies, loading } = moviesContext;

    const sliderRef = useRef<HTMLDivElement | null>(null);
    


    let movies: any = trendingMovies;



    switch (title) {
        case "Trending Now":
            movies = trendingMovies;
            break;

        case "Popular Movies":
            movies = popularMovies;
            break;
        case "Upcoming Movies":
            movies = upcomingMovies;
            break;
    }
    if (loading || movies.length === 0) {
        return (
            <div className='w-full mt-10 ' id={id}>
                <div className='w-full container mx-auto'>
                    <div >
                        <h1 className='text-white font-extrabold text-3xl'>
                            {title.split(" ")[0]} <span className='text-custom'>{title.split(" ")[1]}</span>
                        </h1>
                        <h2 className='text-white font-bold text-sm mt-1'>{subtitle}</h2>
                    </div>

                    <MovieLoader height='10vh' />
                </div>
            </div>
        )
    }


    return (
        <div className='w-full mt-10 md:px-0 px-2 ' id={id}>
            <div className='w-full container mx-auto'>




                <div >
                    <h1 className='text-white font-extrabold text-3xl'>
                        {title.split(" ")[0]} <span className='text-custom'>{title.split(" ")[1]}</span>
                    </h1>
                    <h2 className='text-white font-bold text-sm mt-1'>{subtitle}</h2>
                </div>



                <div className='flex w-full overflow-x-auto mx-auto gap-3 scrollbar-hide snap-x mt-10'
                    ref={sliderRef}
                    style={{ scrollbarWidth: "none" }}
                >
                    {movies.map((movie:any) => (
                        <Card key={movie.id} movie={movie} />
                    ))}


                </div>

            </div>
        </div>
    )
}

export default MovieSlider
