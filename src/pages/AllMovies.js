import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import MovieSldier from "../components/MovieDisplay/MovieSlider";
import MovieDetails from "../components/MovieDisplay/MovieDetails";
import LoadingSpinner from "../components/Layout/LoadingSpinner";
import { sendRequestGET } from "../components/Requests/RequestAPIs";
import SeatContext from "../components/Store/Seat-context";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);

  const [screenings, setScreenings] = useState([]);
  const [isScreeningsLoaded, setIsScreeningsLoaded] = useState(false);

  const [halls, setHalls] = useState([]);
  const [isHallsLoaded, setIsHallsLoaded] = useState(false);

  const [currMovId, setCurrMovId] = useState(0);

  const seatCtx = useContext(SeatContext);

  const fetchMoviesHandler = useCallback(async () => {
    let returnData = await sendRequestGET(
      "https://movie-booking-backend-cw.herokuapp.com/AllMovies"
    );
    if (returnData !== "Error") {
      const loadedMovies = [];
      for (const index in returnData.payload) {
        loadedMovies.push({
          id: returnData.payload[index].id,
          title: returnData.payload[index].name,
          description: returnData.payload[index].description,
          length: returnData.payload[index].length,
          imageUrl: returnData.payload[index].imageUrl,
        });
      }
      // console.log(loadedMovies);
      setMovies(loadedMovies);
      setIsMoviesLoaded(true);
    } else {
      console.log("Error!");
    }
  }, []);

  const fetchScreeningsHandler = useCallback(async () => {
    let returnData = await sendRequestGET(
      "https://movie-booking-backend-cw.herokuapp.com/AllScreenings"
    );
    if (returnData !== "Error") {
      const loadedScreenings = [];

      for (const index in returnData.payload) {
        loadedScreenings.push({
          id: returnData.payload[index].id,
          movieId: returnData.payload[index].movieId,
          hallId: returnData.payload[index].hallId,
          startTime: returnData.payload[index].startTime,
          endTime: returnData.payload[index].endTime,
          seatStatus: returnData.payload[index].seatStatus,
        });
      }
      // console.log(loadedScreenings);
      setScreenings(loadedScreenings);
      setIsScreeningsLoaded(true);
    } else {
      console.log("Error!");
    }
  }, []);

  const fetchHallsHandler = useCallback(async () => {
    let returnData = await sendRequestGET(
      "https://movie-booking-backend-cw.herokuapp.com/AllHalls"
    );
    if (returnData !== "Error") {
      const loadedHalls = [];

      for (const index in returnData.payload) {
        loadedHalls.push({
          id: returnData.payload[index].id,
          name: returnData.payload[index].name,
          seatCapacity: returnData.payload[index].seatCapacity,
          row: returnData.payload[index].row,
          col: returnData.payload[index].col,
        });
      }

      setHalls(loadedHalls);
      setIsHallsLoaded(true);
    } else {
      console.log("Error!");
    }
  }, []);

    //Load initial data
  useEffect(() => {
    setIsMoviesLoaded(false);
    setIsScreeningsLoaded(false);
    setIsHallsLoaded(false);
    fetchMoviesHandler();
    fetchScreeningsHandler();
    fetchHallsHandler();
    seatCtx.clearSeats();
  }, [fetchMoviesHandler, fetchScreeningsHandler, fetchHallsHandler, seatCtx]);

    //Display loading spinner if data is not fully loaded
  if (!isMoviesLoaded || !isScreeningsLoaded || !isHallsLoaded) {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <Fragment>
      <MovieSldier
        isLoaded={isMoviesLoaded}
        movies={movies}
        setCurrMovId={setCurrMovId}
      ></MovieSldier>
      <MovieDetails
        isLoaded={isScreeningsLoaded}
        movies={movies}
        currMovId={currMovId}
        screenings={screenings}
        halls={halls}
      ></MovieDetails>
    </Fragment>
  );
};

export default AllMovies;
