import Search from './Components/Search'
import { useState,useEffect } from 'react'
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';
import { useDebounce } from 'react-use';
import { useActionState } from 'react';
import { updateSearchCount } from './appwrite';


const API_Base_Url='https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const[searchTerm,setSearchTerm]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const[movieList,setMovieList]=useState([]);
  const[isloading,setIsLoading]=useState(false);
  const[debouncedSearchTerm,setDebouncedSearchTerm]=useState('');

  // This function debounce the Search Term to prevent making too many api request by waiting for the user to stop typing for 500 ms.
  useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

  const fetchMovie = async (query) => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query ? `${API_Base_Url}/search/movie?query=${query}`
      : `${API_Base_Url}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error(data.status_message);
      }
      const data = await response.json();
      
      if(data.response === 'False'){
        setErrorMessage(data.error || 'Failed to fetch movies.');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      
      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
    }catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie(debouncedSearchTerm);
  },[debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        
        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>

          {isloading ? ( 
            <Spinner />
          ) : errorMessage ? ( 
            <p className="text-white">{errorMessage}</p>
          ) : ( 
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul> 
          )}
        </section>
      </div>
    </main>
  )
}

export default App