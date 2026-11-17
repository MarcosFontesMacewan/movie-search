/* ======================================================
    Lab 8 - App.jsx starter
====================================================== */

import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";

export default function App() {
  // TODO 3 DONE: 
  // Create state variables using useState: 
  // - movies: empty array -> [useState([])]
  // - isLoading: true -> [useState(true)]
  // - error: empty string -> [useState("")]
  // - searchTerm: "Batman" -> [useState("Batman")]
  // - watchlist: empty array -> [useState([])]
  var [movies, setMovies] = useState([]);
  var [isLoading, setIsLoading] = useState(true);
  var [error, setError] = useState("");
  var [searchTerm, setSearchTerm] = useState("Batman");
  var [watchlist, setWatchlist] = useState([]);

  const API_KEY = "374e4c61";


  const fetchMovies = async (query) => {
    // TODO 4 DONE: 
    // Before fetching: 
    // - set isLoading to true 
    // - clear the error message
    setIsLoading(true);
    setError("");

    if (!API_KEY || API_KEY === "") {
      // Makes movies empty such as setMovies([]) 
      setMovies([]);
      // Call setError with your error message such as “No API key” 
      setError("Invalid/No API key provided.");
      // Set isLoading to false; 
      setIsLoading(false);
      return;
    }

    try {
      const url =
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      // TODO 5 DONE: 
      // If data.Response is True, store data.Search in movies, use setMovies. 
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
      // Otherwise: 
      // - set movies to [] (like TODO 4) 
      // - set error to data.Error or “No movies found” 

    } catch (err) {
      // TODO 6 DONE: 
      // Set error to "Failed to fetch movies." 
      setError("Failed to fetch movies.");
      setMovies([]);
      // Set movies to [] 
    } finally {
      // TODO 7 DONE: 
      setIsLoading(false);
      // Set isLoading to false  
    }
  };

  useEffect(() => {
    // TODO 8 DONE: 
    // Call fetchMovies with searchTerm 
    fetchMovies(searchTerm);
    // This should run on first load and when searchTerm changes. 
  }, [searchTerm]);

  const handleSearch = (newSearchTerm) => {
    // TODO 9 DONE: 
    // Update searchTerm using the value received from SearchBar. 
    setSearchTerm(newSearchTerm);
    // Do not call fetchMovies directly here. 
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const alreadyExists = prevWatchlist.some(
        (item) => item.imdbID === movie.imdbID
      );
      if (alreadyExists) {
        return prevWatchlist;
      }
      return [...prevWatchlist, movie];
    });
  };

  return (
    <div className="page">
      <Header title="Movie Search" searchTerm={searchTerm} />

      {/* TODO 10 DONE: 
          Render SearchBar and pass handleSearch as onSearch
          
      */
        <SearchBar onSearch={handleSearch} />
      }

      <main className="panel">
        {/* TODO 11A DONE: 
            Conditional rendering: 
            - If isLoading is true, show <p className="status">Loading...</p> 
            - Else if error is not empty, show <p className="status error">{error}</p> 
            - Else if movies.length === 0, show 
              <p className="status">No movies found.</p> 
            - Otherwise render <MovieGrid movies={movies} addToWatchlist={addToWatchlist} /> 
        */}
        {isLoading ? (
          <p className="status">Loading...</p>
        ) : error ? (
          <p className="status error">{error}</p>
        ) : movies.length === 0 ? (
          <p className="status">No movies found.</p>
        ) : (
          <MovieGrid movies={movies} addToWatchlist={addToWatchlist} />
        )}

        {/* TODO 11B DONE: 
            Add a watchlist section below the search results. 
            - Show a heading such as "My Watchlist" 
            - If watchlist.length === 0, show "No movies in watchlist yet." 
            - Otherwise map through watchlist and render each saved movie 
        */
        <section className="watchlist">
          <h2>My Watchlist</h2>
          {watchlist.length === 0 ? (
            <p>No movies in watchlist yet.</p>
          ) : (
            <ul>
              {watchlist.map((movie) => (
                <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
              ))}
            </ul>
          )}
        </section>
          } 
      </main>
    </div>
  );
}