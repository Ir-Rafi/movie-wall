import MovieCard from "../Components/MovieCard";
import {useEffect, useState} from "react";
import "../css/Home.css"
import { getPopularMovies, searchMovies } from "../Services/api";


function Home(){
    const [searchQuery,setsearchQuery] = useState("");
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const loadpopularmovies = async ()=>{
            try{
                const popularmovies = await getPopularMovies()
                setMovies(popularmovies);
            }catch(err){
                console.log(err);
                setError("Failed to Load Movies.....");
            }
            finally {
                setLoading(false);
            }
        }
        loadpopularmovies();
    },[])
    const handlesearch = async (e)=>{
        e.preventDefault();
       if(!searchQuery.trim())return;
       if(loading) return;
       setLoading(true);
       setError(null);
       try{
           const searchResults = await searchMovies(searchQuery);
           setMovies(searchResults);
       }catch(err){
             console.log(err);
             setError("Failed to Load Movies.....");
       }finally{
          setLoading(false);
       }
    };

    return(
   <div className="home">
    <form onSubmit={handlesearch} className="search-form">
        <input type="text"
        placeholder="Search For Movies...."
        value={searchQuery}
        onChange={(e)=>setsearchQuery(e.target.value)}
       className="Search-Input"/>
    <button type="submit" className="search-button">Search</button>
    </form>
    {error && <div className="error-message">{error}</div>}
    {loading ? <div className="loading">Loading....</div>:  <div className="movies-grid">
        {movies.map((movie)=>
            movie.title.toLowerCase().startsWith(searchQuery) && (
        <MovieCard movie={movie} key={movie.id}/>
        ))}
    </div>
}
</div>
    );
}

export default Home