import "../css/Favorites.css"
import { useMovieContext } from "../Contexts/MovieContext";
import MovieCard from "../Components/MovieCard";
function Favorites(){
    const {Favorites} = useMovieContext();
    if(Favorites){
        return (
            <div className="Favorites">
                <h2>Your Favorites</h2>
        <div className="movies-grid">
            {Favorites.map((movie)=>(
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
        </div>
        );
    }
    return(
        <div className="Favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start Adding Movies Here And They Will Appear Here</p>
        </div>
    );  
}

export default Favorites;