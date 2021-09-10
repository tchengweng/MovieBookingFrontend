import React, { useState,useContext } from "react";
import MovieSeat from "./MovieSeat";
import { useHistory } from 'react-router';
import SeatContext from "../Store/Seat-context";

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
      setSeatsChosen(seatsChosen.filter(
        (selectedSeat) => selectedSeat !== seatId
      ));
    } else {
      setSeatsChosen([...seatsChosen, seatId]);
    }
  };

  const reserveSeatHandler = () => {
    seatCtx.seats = seatsChosen;
    seatCtx.screeningId = props.screeningDetails.id;
    history.push({
      pathname: "/Reserve",
    });
    //sendReserveSeatsRequest(name, email);
  };

  let seatsChosenSorted = seatsChosen
    .map(function (x) {
      return parseInt(x + 1);
    })
    .sort((a, b) => a - b)
    .toString();

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
          <p>{seatsChosenSorted}</p>
          <button onClick={reserveSeatHandler}>submit</button>
        </div>
      )}
    </div>
  );
};

export default MovieSeatSelector;
