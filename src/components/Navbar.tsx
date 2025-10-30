import { Menu, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getImageUrl, searchMovies } from '../api/api';
import { useMovies } from '../context/MovieContext';
import type { MovieInterface } from '../types/MovieTypes';

const Navbar = () => {

    const moviesContext = useMovies();
    if (!moviesContext) {
        return null;
    }
    const { setIsModalOpen, setSelectedMovie } = moviesContext;

    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const [isScrolled, setIsScrolled] = useState(false);



    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchQuery, setSearchQuery] = useState<any>(null);
    const [searchResult, setSearchResult] = useState<any>(null);




    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    })


    useEffect(() => {
        const searchFunction = async () => {
            if (searchQuery?.trim().length > 2) {
                setIsSearching(true)

                try {
                    const result = await searchMovies(searchQuery);
                    setSearchResult(result ? result.slice(0, 5) : []);
                }
                catch (err) {
                    console.log("error: ", err);
                }
                finally {
                    setIsSearching(false);
                }
            }
        }

        const debouncer = setTimeout(() => {
            searchFunction();
        }, 500);

        return () => clearTimeout(debouncer)
    }, [searchQuery])


    useEffect(() => {
        if (searchQuery?.trim().length > 2) {
            setShowSearchResult(true);
        }
        else {
            setShowSearchResult(false)
        }
    }, [searchQuery])
    console.log(searchQuery)



    const handleSearchClick = (movieId: number) => {
        setSelectedMovie(movieId);
        setIsModalOpen(true);
        setSearchQuery("");
        setIsMenuOpen(false);
    }

    console.log(searchResult)







    return (
        <nav className={`w-full fixed transition-all duration-300 z-100 
            ${isScrolled || isMenuOpen ? "bg-black shadow-2xl shadow-black " : "bg-transparent"}`
        }>

            <div className='relative'>
                <div className='w-full container mx-auto py-4 flex justify-between items-center px-2 relative'>


                    {/* Logo */}
                    <div className='font-poppins text-2xl font-extrabold text-white'>
                        Movie<span className='text-custom'>Scope</span>
                    </div>


                    {/* Desktop navigation */}
                    <div className='hidden md:flex items-center gap-5 flex-wrap text-white '>
                        <a
                            href='#'
                            className='block hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom'
                        >Home</a>
                        <a
                            href='#popular'
                            className='block hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom'
                        >Popular</a>
                        <a
                            href='#genre'
                            className='block hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom'
                        >Genre</a>
                        <a
                            href='#trending'
                            className='block hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom'
                        >Trending</a>
                        <a
                            href='#upcoming'
                            className='block hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom'
                        >Upcoming</a>
                    </div>




                    {/* Search bar */}
                    <div className='hidden md:block'>
                        <div className='relative'>
                            <div>
                                <input type="text"
                                    placeholder='Search Movies...'
                                    className='text-white bg-[#2c2c2c] px-4 py-2 rounded-full outline-none text-sm w-50 focus:w-60 focus:border-1 border-[#8d8d8d] transition-all duration-300'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className='absolute top-1.5 right-2.5 text-[#818181] w-5 ' />
                            </div>


                            {/* conditional rendering */}
                            {!isSearching && searchResult && showSearchResult &&

                                <div className='absolute w-full  top-12 bg-pop rounded-md  divide-y divide-neutral-700'>

                                    {searchResult?.map((movie:MovieInterface) => (
                                        <div className='w-full flex py-2 gap-2 hover:bg-back px-2 cursor-pointer ' onClick={() => handleSearchClick(movie.id)}>
                                            <div className='w-10 h-10 flex-shrink-0 rounded-md bg-black overflow-hidden'>
                                                {movie.poster_path ?
                                                    <img
                                                        src={getImageUrl(movie.poster_path)}
                                                        className='w-full h-full object-cover'
                                                    />
                                                    :
                                                    <div className='w-full h-full bg-neutral-900 text-xs text-gray-400 flex items-center'>
                                                        No Image
                                                    </div>
                                                }
                                            </div>
                                            <div className='w-full overflow-hidden flex-col'>
                                                <p className='text-gray-200 font-bold text-sm truncate'>{movie.title}</p>
                                                <p className='text-gray-400 text-xs'>{movie.release_date.slice(0, 4)}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            }


                        </div>
                    </div>


                    {/* mobile dropdown */}
                    <div className='md:hidden'>
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className='text-white' />
                        </div>
                    </div>

                </div>



                {isMenuOpen &&
                    <div className='md:hidden absolute w-full bg-black '>
                        <div className=' w-full flex flex-col px-2 py-2 gap-3  '>
                            <a
                                href='#'
                                className='block text-white hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom p-2 '
                            >Home</a>
                            <a
                                href='#popular'
                                className='block text-white hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom p-2 '
                            >Popular</a>
                            <a
                                href='#genre'
                                className='block text-white hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom p-2 '
                            >Genre</a>
                            <a
                                href='#trending'
                                className='block text-white hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom p-2 '
                            >Trending</a>
                            <a
                                href='#upcoming'
                                className='block text-white hover:text-custom transition-color duration-200 border-b-1 border-transparent hover:border-custom p-2 '
                            >Upcoming</a>
                        </div>
                        <div className="search p-2 relative">
                            <div className='relative w-full h-full'>
                                <input type="text"
                                    placeholder='Search Movies...'
                                    className='text-white bg-[#2c2c2c] px-4 py-2 rounded-full outline-none text-sm w-full border-1 border-[#8d8d8d] transition-all duration-300'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className='absolute top-1.5 right-4.5 text-[#818181] w-5 ' />
                                {!isSearching && searchResult && showSearchResult &&

                                    <div className='absolute w-full  top-12 bg-pop rounded-md  divide-y divide-neutral-700'>

                                        {searchResult?.map((movie:MovieInterface) => (
                                            <div className='w-full flex py-2 gap-2 hover:bg-back px-2 cursor-pointer ' onClick={() => handleSearchClick(movie.id)}>
                                                <div className='w-10 h-10 flex-shrink-0 rounded-md bg-black overflow-hidden'>
                                                    {movie.poster_path ?
                                                        <img
                                                            src={getImageUrl(movie.poster_path)}
                                                            className='w-full h-full object-cover'
                                                        />
                                                        :
                                                        <div className='w-full h-full bg-neutral-900 text-xs text-gray-400 flex items-center'>
                                                            No Image
                                                        </div>
                                                    }
                                                </div>
                                                <div className='w-full overflow-hidden flex-col'>
                                                    <p className='text-gray-200 font-bold text-sm truncate'>{movie.title}</p>
                                                    <p className='text-gray-400 text-xs'>{movie.release_date.slice(0, 4)}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav >
    )
}

export default Navbar
