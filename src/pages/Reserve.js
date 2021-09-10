import React, { useContext, useCallback, useState } from "react";
import Card from "../components/UI/Card";
import InputForm from "../components/Forms/InputForm";
import { sendRequestPOST } from "../components/Requests/RequestAPIs";
import SeatContext from "../components/Store/Seat-context";
import { Fragment } from "react/cjs/react.production.min";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import linkClasses from "../components/CommonStyles/link.module.css";

const ReserveSeatStatus = {
  RESERVED: "RESERVED",
  SEATS_TAKEN: "SEATS_TAKEN",
  ERROR: "ERROR",
};

const CreateLink = (reserveSeatStatus) => {
  let msg = "";
  let linkMsg = "";

  switch (reserveSeatStatus) {
    case ReserveSeatStatus.RESERVED:
      msg = "Seats successfully reserved, check your email for more details.";
      linkMsg = "Return";
      break;
    case ReserveSeatStatus.SEATS_TAKEN:
      msg = "One or more seats are taken! Select other seats.";
      linkMsg = "Return";
      break;
    case ReserveSeatStatus.ERROR:
      msg = "Failed to process request!";
      linkMsg = "Return";
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <p></p>
      <h2>{msg}</h2>
      <p></p>
      <Link
        className={linkClasses.Link}
        style={{ textDecoration: "none" }}
        to={`/AllMovies`}
      >
        {linkMsg}
      </Link>
      <p></p>
    </Fragment>
  );
};

const Reserve = (props) => {
  const [reserveState, setReserveState] = useState(ReserveSeatStatus.ERROR);
  const [submitedForm, setSubmitedForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const seatCtx = useContext(SeatContext);
  const {
    screeningId,
    seats: seatsChosen,
    movieName,
    hallName,
    dateAndTimeInfoStr,
  } = seatCtx;

  console.log(seatCtx);

  if (seatsChosen === [] || screeningId === "") {
    history.push({
      pathname: "/AllMovies",
    });
  }

  const sendReserveSeatsRequest = useCallback(
    async (name, email) => {
      let requestBody = {
        name: name,
        email: email,
        seats: seatsChosen
          .map(function (x) {
            return parseInt(x);
          })
          .sort((a, b) => a - b),
        screeningId: screeningId,
      };

      console.log(requestBody);
      setSubmitedForm(true);
      let returnData = await sendRequestPOST(
        "https://movie-booking-backend-cw.herokuapp.com/ReserveSeats",
        requestBody
      );

      if (returnData !== "Error") {
        console.log(returnData);
        if (returnData.payload === "Seats Reserved") {
          setReserveState(ReserveSeatStatus.RESERVED);
        }

        if (returnData.payload === "Seats Taken") {
          setReserveState(ReserveSeatStatus.SEATS_TAKEN);
        }
      } else {
        console.log("Error!");
        setReserveState(ReserveSeatStatus.ERROR);
      }

      setIsLoading(false);
    },
    [screeningId, seatsChosen]
  );

  const submitForm = (name, email) => {
    setIsLoading(true);
    sendReserveSeatsRequest(name, email);
  };

  let seatsChosenSorted = seatsChosen
    .map(function (x) {
      return parseInt(x + 1);
    })
    .sort((a, b) => a - b)
    .toString();

  return (
    <Card>
      {!submitedForm && (
        <Fragment>
          <h1>Reserve Seats</h1>
          <h3>{movieName}</h3>
          <h3>Hall: {hallName}</h3>
          <h3>{dateAndTimeInfoStr}</h3>
          <h3>Seats: {seatsChosenSorted}</h3>
          <br></br>
          <h2>Fill in your details.</h2>
          <InputForm submitFormHandler={submitForm}></InputForm>
        </Fragment>
      )}
      {isLoading && submitedForm && <LoadingSpinner></LoadingSpinner>}
      {!isLoading && submitedForm && CreateLink(reserveState)}
    </Card>
  );
};

export default Reserve;
