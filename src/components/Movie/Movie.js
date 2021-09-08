import React from "react";

import classes from "./Movie.module.css"

const Movie = (props) => {
  const onClicked = (event) => {
    console.log("Clicked on: " + props.movie.title);
  };
  return (
    <img
      className={classes.poster}
      onClick={onClicked}
      src={props.movie.imageUrl}
      alt="movie poster"
    ></img>
  );

  //   return (
  //     <div>
  //         <h2>{props.movie.title}</h2>
  //         <img className={classes.poster} onClick={onClicked} src={props.movie.imageUrl} alt="movie"></img>
  //         <div>{props.movie.description}</div>
  //         <div>Running Time: {props.movie.length} Minutes</div>
  //     </div>
  //   );
};

export default Movie;
