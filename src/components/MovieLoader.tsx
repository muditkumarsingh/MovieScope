
const MovieLoader = ({height="100vh"}) => {
    return (
        <div className={`w-full  bg-dark flex items-center justify-center`}
        style={{height:height}}
        >
            <div className='flex flex-col items-center '>
                <div className='w-24 h-24 rounded-full border-2 border-custom border-t-transparent animate-spin'></div>
                <div className='text-white mt-8'>Loading Movie...</div>
            </div>
        </div>
    )
}

export default MovieLoader
