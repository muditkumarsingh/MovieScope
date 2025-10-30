import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-neutral-400 border-1 border-neutral-800 mt-8">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <a href="/" className="inline-block mb-6">
                            <div className='font-poppins text-2xl font-extrabold text-white'>
                        Movie<span className='text-custom'>Scope</span>
                    </div>
                        </a>
                        <p className="mb-4 text-sm">
                            Discover andexplore the latest movies from all around the world.
                            CineMax gives you access to a vast collection of films across all genres.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-neutral-500 hover:text-custom transition-all">
                                <Instagram />
                            </a>
                            <a href="#" className="text-neutral-500 hover:text-custom transition-all">
                                <Facebook />
                            </a>
                            <a href="#" className="text-neutral-500 hover:text-custom transition-all">
                                <Twitter />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="hover:text-custom transition-all">Home</a>
                            </li>
                            <li>
                                <a href="#trending" className="hover:text-custom transition-all">Trending</a>
                            </li>
                            <li>
                                <a href="#popluar" className="hover:text-custom transition-all">Popular</a>
                            </li>
                            <li>
                                <a href="#top-rated" className="hover:text-custom transition-all">Top Rated</a>
                            </li>
                            <li>
                                <a href="#genere" className="hover:text-custom transition-all">Browse by genre</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-custom">About</a></li>
                            <li><a href="#" className="hover:text-custom">Contact</a></li>
                            <li><a href="#" className="hover:text-custom">Blog</a></li>
                            <li><a href="#" className="hover:text-custom">FAQ</a></li>
                            <li><a href="#" className="hover:text-custom">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">NewsLetter</h3>
                        <p className="text-sm mb-4">
                            Stay up to date with the latest movies and news
                        </p>
                        <form className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your Email address"
                                    className="w-full bg-neutral-800 border-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-purple-500/50 text-sm"
                                />
                            </div>
                            <button className="w-full bg-custom hover:bg-custom/80 text-white py-2 rounded-lg transition-all text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>


                </div>
                    <div className="border-t border-neutral-800 mt-10 p-6 flex flex-col md:flex-row justify-between">
                        <p className="text-xs">
                            &copy; MovieScope. All right reserved <br className="md:hidden" />
                            <span className="hidden md:inline">.</span>
                            Powered by{" "}
                            <a href="#" className="text-custom hover:text-purple-300">
                                TMDB API
                            </a>
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
                            <a href="Privacy Policy" className="hover:text-custom transition-all">Privacy Policy</a>
                            <a href="Privacy Policy" className="hover:text-custom transition-all">Terms of service</a>
                            <a href="Privacy Policy" className="hover:text-custom transition-all">Cookie Policy</a>

                        </div>
                    </div>
            </div>
        </footer>
    )
}

export default Footer
