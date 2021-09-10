import React, { useState, useContext } from "react";
import MovieSeat from "./MovieSeat";
import { useHistory } from "react-router";
import SeatContext from "../Store/Seat-context";
import classes from "./MovieSeatSelector.module.css";

const GetSeatMatrix = (hallDetails) => {
  let seatIds = Array.from(Array(hallDetails.seatCapacity).keys());
  const seatsSplitArray = [];
  while (seatIds.length > 0) {
    seatsSplitArray.push(seatIds.splice(0, hallDetails.row));
  }

  return seatsSplitArray;
};

const MovieSeatSelector = (props) => {
  const history = useHistory();
  const seatCtx = useContext(SeatContext);

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

  const reserveSeatHandler = () => {
    seatCtx.seats = seatsChosen;
    seatCtx.screeningId = props.screeningDetails.id;
    seatCtx.movieName = props.movieDetails.name;
    seatCtx.hallName = props.hallDetails.name;

    let startDate = new Date(props.screeningDetails.startTime);
    let startDateStr = startDate.toLocaleString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    let endDate = new Date(props.screeningDetails.endTime);
    let endDateStr = endDate.toLocaleString("en-UK", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    seatCtx.dateAndTimeInfoStr = startDateStr + " - " + endDateStr;
    history.push({
      pathname: "/Reserve",
    });
  };

  let seatsChosenSorted = seatsChosen
    .map(function (x) {
      return parseInt(x + 1);
    })
    .sort((a, b) => a - b)
    .toString();

  return (
    <div>
      <h1>{props.movieDetails.name}</h1>
      <h3>Hall: {props.hallDetails.name}</h3>
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
        <h1>Screen</h1>
      </div>
      {seatsChosen.length > 0 && (
        <div>
          <h3>Seats Selected</h3>
          <p>{seatsChosenSorted}</p>
          <button className={classes.button} onClick={reserveSeatHandler}>
            Reserve
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSeatSelector;
