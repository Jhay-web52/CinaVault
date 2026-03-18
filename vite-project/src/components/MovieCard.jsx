import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    const score = movie.vote_average ? movie.vote_average.toFixed(1) : null

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                />
                {score && (
                    <div className="movie-score">
                        ★ {score}
                    </div>
                )}
                <button
                    className={`favorite-btn ${favorite ? "active" : ""}`}
                    onClick={onFavoriteClick}
                    title={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                    ♥
                </button>
                <div className="movie-overlay" />
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard
