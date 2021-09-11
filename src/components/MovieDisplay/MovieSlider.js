import React, { Fragment} from "react";
import MoviePoster from "./MoviePoster";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./MovieSlider.module.css";

//Netflix style movie slider
const MovieSldier = (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,//show only one movie at a time
    slidesToScroll: 1,
    afterChange: (current) => props.setCurrMovId(current),
  };

  return (
    <Fragment>
      {props.isLoaded && (
        <div className={classes.MovieSlider}>
          <Slider {...settings}>
            {props.movies.map((movie) => (
              <div key={movie.id}>
                <MoviePoster key={movie.id} movie={movie}/>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </Fragment>
  );
};

export default MovieSldier;
