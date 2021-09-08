import classes from './HeaderButton.module.css';

const HeaderButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>{props.title}</span>
    </button>
  );
};

export default HeaderButton;
