import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./MovieDetails.module.css";
import linkClasses from "../CommonStyles/link.module.css";

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
  let screeningDetails = "";
  if (props.isLoaded) {
    screeningDetails = props.screenings
      .reduce((finalScreening, screening) => {
        if (screening.movieId === props.movies[props.currMovId].id) {
          finalScreening.push(screening);
        }
        return finalScreening;
      }, [])
      .map((screening) => {
        let startDate = new Date(screening.startTime);
        let startDateStr = startDate.toLocaleString("en-UK", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        let endDate = new Date(screening.endTime);
        let endDateStr = endDate.toLocaleString("en-UK", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        let hallName = props.halls.find(
          (hall) => hall.id === screening.hallId
        ).name;

        return (
          <li key={screening.id} className={classes.li}>
            <h3>Hall: {hallName}</h3>
            <h3>
              {startDateStr} - {endDateStr}
            </h3>
            <Link
              style={{ textDecoration: "none" }}
              className={linkClasses.Link}
              to={`/AllMovies/${screening.id}`}
            >
              Book Tickets
            </Link>
            <p></p>
          </li>
        );
      });
  }

  return (
    <Fragment>
      {props.isLoaded && (
        <Card>
          <h1>{props.movies[props.currMovId].title}</h1>
          <p>{props.movies[props.currMovId].description}</p>
          <p>{duration}</p>
          <ul>{screeningDetails}</ul>
        </Card>
      )}
    </Fragment>
  );
};

export default MovieDetails;
