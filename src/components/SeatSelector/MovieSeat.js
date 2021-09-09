import React from "react";
import classes from "./MovieSeat.module.css";

const MovieSeat = (props) => {
  let style = classes.seatEmpty;

  switch (props.seatStatus) {
    case 1:
      style = classes.seatSel;
      break;
    case 2:
      style = classes.seatRes;
      break;
    case 0:
    default:
      style = classes.seatEmpty;
      break;
  }

  return (
    <img
      className={style}
      src="https://img.icons8.com/ios/50/000000/sleeper-chair.png"
      alt="seat"
      onClick={(props.seatStatus!==2)?props.setSeatsChosen:()=>{}}
    />
  );
};

export default MovieSeat;
