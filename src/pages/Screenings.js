import React, { useState, useCallback, useEffect } from "react";
import Card from "../components/UI/Card";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import MovieSeatSelector from "../components/SeatSelector/MovieSeatSelector";

const Screenings = (props) => {
  const params = useParams();
  const { screeningId } = params;

  const [screening, setScreening] = useState([]);
  const [isScreeningLoaded, setIsScreeningLoaded] = useState(false);

  const [hallDetails, setHallDetails] = useState([]);
  const [isHallDetailsLoaded, setIsHallDetailsLoaded] = useState(false);

  const fetchScreeningDetails = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/ScreeningById",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            screeningId: screeningId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data.payload);

      setScreening(data.payload);
      setIsScreeningLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [screeningId]);

  const fetchHallDetails = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/HallByScreeningId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            screeningId: screeningId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data.payload);

      setHallDetails(data.payload);
      setIsHallDetailsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [screeningId]);

  useEffect(() => {
    setIsScreeningLoaded(false);
    setIsHallDetailsLoaded(false);
    fetchScreeningDetails();
    fetchHallDetails();
    console.log("gettinging movie details!");
  }, [fetchScreeningDetails, fetchHallDetails]);

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
