import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites">
                <div className="favorites-empty">
                    <div className="empty-icon">♥</div>
                    <h2>No favorites yet</h2>
                    <p>Browse movies and hit the heart icon to save them here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites">
            <div className="favorites-header">
                <h2>Your Favorites</h2>
                <span className="favorites-count">{favorites.length}</span>
            </div>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
