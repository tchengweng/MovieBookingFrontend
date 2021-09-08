import React, { Fragment, useState, useCallback, useEffect } from "react";
import MovieSldier from "../components/Movie/MovieSlider";
import MovieDetails from "../components/Movie/MovieDetails";

const AllMovies = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currMovId, setCurrMovId] = useState(0);
  const [screenings, setScreenings] = useState([]);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/AllMovies",
        {
          method: "GET",
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
      console.log(data.payload);

      const loadedMovies = [];

      for (const index in data.payload) {
        loadedMovies.push({
          id: data.payload[index].id,
          title: data.payload[index].name,
          description: data.payload[index].description,
          length: data.payload[index].length,
          imageUrl: data.payload[index].imageUrl,
        });
      }

      console.log(loadedMovies);
      setMovies(loadedMovies);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchScreeningsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/AllScreenings",
        {
          method: "GET",
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
      console.log(data.payload);

      const loadedScreenings = [];

      for (const index in data.payload) {
        loadedScreenings.push({
          id: data.payload[index].id,
          movieId: data.payload[index].movieId,
          hallId: data.payload[index].hallId,
          startTime: data.payload[index].startTime,
          endTime: data.payload[index].endTime,
          seatStatus: data.payload[index].seatStatus,
        });
      }

      console.log(loadedScreenings);
      setScreenings(loadedScreenings);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
    fetchScreeningsHandler();
  }, [fetchMoviesHandler, fetchScreeningsHandler]);

  //   <div>
  //   <Card>
  //     <h1>Active movie id: {props.movies[currMovId].id}</h1>
  //     <h1>Active movie title: {props.movies[currMovId].title}</h1>
  //   </Card>
  // </div>

  return (
    <Fragment>
      <MovieSldier
        isLoaded={isLoaded}
        movies={movies}
        setCurrMovId={setCurrMovId}
      ></MovieSldier>
      <MovieDetails
        isLoaded={isLoaded}
        movies={movies}
        currMovId={currMovId}
        screenings={screenings}
      ></MovieDetails>
    </Fragment>
  );
};

export default AllMovies;
