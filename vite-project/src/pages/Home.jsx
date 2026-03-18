import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

const SKELETON_COUNT = 18;

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-poster" />
            <div className="skeleton-info">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
            </div>
        </div>
    );
}

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sectionLabel, setSectionLabel] = useState("Popular Right Now");

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setSectionLabel(`Results for "${searchQuery}"`);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <div className="search-section">
                <h1 className="search-heading">Find your next favourite film</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search movies, shows..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="movies-grid-skeleton">
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="section-label">{sectionLabel}</div>
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
