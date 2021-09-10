import React, { useState, useCallback, useEffect,useContext } from "react";
import Card from "../components/UI/Card";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import MovieSeatSelector from "../components/SeatSelector/MovieSeatSelector";
import { sendRequestPOST } from "../components/Requests/RequestAPIs";
import { useHistory } from 'react-router';
import SeatContext from "../components/Store/Seat-context";

const Screenings = (props) => {
  //Get screening id
  const params = useParams();
  const { screeningId } = params;

  const [screening, setScreening] = useState([]);
  const [isScreeningLoaded, setIsScreeningLoaded] = useState(false);

  const [hallDetails, setHallDetails] = useState([]);
  const [isHallDetailsLoaded, setIsHallDetailsLoaded] = useState(false);

  const seatCtx = useContext(SeatContext);

  const history = useHistory();

  //Fetch screening and hall details
  const fetchScreeningDetails = useCallback(async () => {
    let requestBody = { screeningId: screeningId };
    let returnData = await sendRequestPOST(
      "https://movie-booking-backend-cw.herokuapp.com/ScreeningById",
      requestBody
    );

    if (returnData !== "Error") {
      if (returnData.status !== "query success") {
        history.push({
          pathname: "/AllMovies"
        });
      } else {
        console.log(returnData.payload);
        setScreening(returnData.payload);
        setIsScreeningLoaded(true);
      }
    } else {
      console.log("Error!");
    }
  }, [screeningId,history]);

  const fetchHallDetails = useCallback(async () => {
    let requestBody = { screeningId: screeningId };
    let returnData = await sendRequestPOST(
      "https://movie-booking-backend-cw.herokuapp.com/HallByScreeningId",
      requestBody
    );

    console.log(returnData);

    if (returnData !== "Error") {
      if (returnData.status !== "query success") {
        history.push({
          pathname: "/AllMovies"
        });
      } else {
        console.log(returnData.payload);
        setHallDetails(returnData.payload);
        setIsHallDetailsLoaded(true);
      }
    } else {
      console.log("Error!");
    }
  }, [screeningId,history]);


  //Load initial data
  useEffect(() => {
    setIsScreeningLoaded(false);
    setIsHallDetailsLoaded(false);
    fetchScreeningDetails();
    fetchHallDetails();
    seatCtx.clearSeats();
    console.log("gettinging movie details!");
  }, [fetchScreeningDetails, fetchHallDetails,seatCtx]);

  //Display loading spinner if data is not fully loaded
  if (!isScreeningLoaded || !isHallDetailsLoaded) {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <Card>
      <MovieSeatSelector
        hallDetails={hallDetails}
        screeningDetails={screening}
      ></MovieSeatSelector>
    </Card>
  );
};

export default Screenings;
