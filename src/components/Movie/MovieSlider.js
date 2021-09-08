import React, { Fragment} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "./Movie";
import classes from "./MovieSlider.module.css";

const MovieSldier = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
                <Movie key={movie.id} movie={movie}></Movie>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </Fragment>
  );
};

export default MovieSldier;
