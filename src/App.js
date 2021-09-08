import React, { useEffect, useCallback } from "react";
// import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  // const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/AllMovies",
        {
          method: "GET",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      const data = await response.json();

      console.log(data);
  
      // const loadedMovies = [];
  
      // for (const key in data) {
      //   loadedMovies.push({
      //     id: key,
      //     title: data[key].title,
      //     openingText: data[key].openingText,
      //     releaseDate: data[key].releaseDate,
      //   });
      // }
  
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return <div className="App">Test app</div>;
}

export default App;


