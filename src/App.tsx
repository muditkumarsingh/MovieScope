
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import { MovieProvider } from './context/MovieContext'
import MovieSlider from './components/MovieSlider'
import GenreSection from './components/GenreSection'
import MovieModal from './components/MovieModal'
import Footer from './components/Footer'

const App = () => {




  return (
    <MovieProvider>
      <div className='font-poppins bg-dark relative'>
        <Navbar />
        <MovieModal />
        <div>
          <HeroSection />
        </div>
        <MovieSlider id="popular" title="Popular Movies" subtitle="Stay updated with what everyone's watching" />
        <GenreSection />
        <MovieSlider id="trending" title="Trending Now" subtitle="Stay updated with what everyone's watching" />
        <MovieSlider id="upcoming" title="Upcoming Movies" subtitle="Stay updated with what everyone's watching" />
        <Footer/>
      </div>

    </MovieProvider>
  )
}

export default App
