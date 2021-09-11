import React from "react";

import classes from "./MoviePoster.module.css"

const MoviePoster = (props) => {
  return (
    <img
      className={classes.poster}
      src={props.movie.imageUrl}
      alt="movie poster"
    ></img>
  );
};

export default MoviePoster;
