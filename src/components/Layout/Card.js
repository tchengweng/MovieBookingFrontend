import classes from "./Card.module.css";

//Layout wrapper around components
const Card = (props) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
