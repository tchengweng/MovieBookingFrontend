import React, { useState, useCallback } from "react";
import MovieSeat from "./MovieSeat";

const GetSeatMatrix = (hallDetails) => {
  let seatIds = Array.from(Array(hallDetails.seatCapacity).keys());
  const seatsSplitArray = [];
  while (seatIds.length > 0) {
    seatsSplitArray.push(seatIds.splice(0, hallDetails.row));
  }

  return seatsSplitArray;
};

const MovieSeatSelector = (props) => {
  const [seatsChosen, setSeatsChosen] = useState([]);

  const seatsMatrix = GetSeatMatrix(props.hallDetails);

  const setSeatHandler = (seatId) => {
    console.log(seatId);
    const isSelected = seatsChosen.includes(seatId);
    if (isSelected) {
      setSeatsChosen(
        seatsChosen.filter((selectedSeat) => selectedSeat !== seatId)
      );
    } else {
      setSeatsChosen([...seatsChosen, seatId]);
    }
  };

  const sendReserveSeatsRequest = useCallback(async () => {
    try {
      const jsonBody = JSON.stringify({
        name: "tcw",
        email: "tcwcheng@hotmail.com",
        seats: seatsChosen,
        screeningId: props.screeningDetails.id,
      });

      console.log(jsonBody);

      const response = await fetch(
        "https://movie-booking-backend-cw.herokuapp.com/ReserveSeats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonBody,
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [props.screeningDetails.id, seatsChosen]);

  const submitForm = () => {
    sendReserveSeatsRequest();
  };

  return (
    <div>
      <p>Hall: {props.hallDetails.name}</p>
      {seatsMatrix.map((seatsColArray) => {
        return (
          <div key={seatsColArray[0]}>
            {seatsColArray.map((index) => {
              let seatStatus = 0;

              if (seatsChosen.includes(index)) {
                seatStatus = 1;
              }

              if (props.screeningDetails.seatStatus[index] === "RESERVED") {
                seatStatus = 2;
              }

              return (
                <MovieSeat
                  key={index}
                  seatStatus={seatStatus}
                  setSeatsChosen={setSeatHandler.bind(null, index)}
                ></MovieSeat>
              );
            })}
          </div>
        );
      })}
      <div>
        <p>Screen Here</p>
      </div>
      {seatsChosen.length > 0 && (
        <div>
          <p>
            {seatsChosen
              .map(function (x) {
                return parseInt(x + 1);
              })
              .toString()}
          </p>
          <button onClick={submitForm}>submit</button>
        </div>
      )}
    </div>
  );
};

export default MovieSeatSelector;
