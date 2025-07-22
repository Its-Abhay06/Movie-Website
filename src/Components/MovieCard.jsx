import React from 'react'

const MovieCard = ({movie:{title,vote_average,poster_path,release_date,original_language}}) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/no-movie.png';
  const votes = vote_average ? vote_average.toFixed(1) : 'N/A';
  const year = new Date(release_date).getFullYear();

  return (
    <div className='movie-card'>
      <img src={imageUrl} alt={title} />

      <div className='mt-4'>
        <h3>{title}</h3>

        <div className="content">
            <div className="rating">
                <img src="/star.svg" alt="Star Icon" />
                <p>{votes}</p>
            </div>

            <span>.</span>
            <p className="lang">{original_language}</p>

            <span>.</span>
            <p className='year'>{year}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
