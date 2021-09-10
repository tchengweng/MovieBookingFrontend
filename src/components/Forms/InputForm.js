import useInput from "../Hooks/useInput";
import classes from "./InputForm.module.css";

const InputForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => /\S+@\S+\.\S+/.test(value));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    props.submitFormHandler(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={formSubmissionHandler} className={classes.form}>
      <div>
        <label className={classes.label} htmlFor="name">
          Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        <p></p>
        {nameInputHasError && (
          <p className={classes.p}>Name must not be empty.</p>
        )}
      </div>
      <div>
        <label className={classes.label} htmlFor="email">
          E-Mail Address:{" "}
        </label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        <p></p>
        {emailInputHasError && <p className={classes.p}>Email is invalid.</p>}
      </div>
      <div>
        <p></p>
        <button className={classes.button} disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputForm;
