import React, { Fragment } from "react";

import Card from "../UI/Card";

const MovieDetails = (props) => {
  let hour = 0;
  let minute = 0;

  let duration = "";

  if (props.isLoaded) {
    hour = +props.movies[props.currMovId].length / 60;
    hour = Math.floor(hour);
    minute = +props.movies[props.currMovId].length % 60;

    duration = hour + "H " + minute + "M";
  }

  //Get screenings
  const screeningDetails = props.screenings
    .reduce((finalScreening, screening) => {
      if (screening.movieId === props.movies[props.currMovId].id) {
        finalScreening.push(screening);
      }
      return finalScreening;
    }, [])
    .map((screening) => (
      <div>
        <div>{screening.movieId}</div>
        <div>{screening.hallId}</div>
        <div>{screening.startTime}</div>
        <div>{screening.endTime}</div>
        <div>{screening.seatStatus}</div>
      </div>
    ));

  return (
    <Fragment>
      {props.isLoaded && (
        <Card>
          <h1>{props.movies[props.currMovId].title}</h1>
          <p>{props.movies[props.currMovId].description}</p>
          <p>{duration}</p>
          <div>{screeningDetails}</div>
        </Card>
      )}
    </Fragment>
  );
};

export default MovieDetails;
