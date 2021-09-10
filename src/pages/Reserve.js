import React, { useContext, useCallback, useState } from "react";
import Card from "../components/UI/Card";
import InputForm from "../components/Forms/InputForm";
import { sendRequestPOST } from "../components/Requests/RequestAPIs";
import SeatContext from "../components/Store/Seat-context";
import { Fragment } from "react/cjs/react.production.min";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

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
      <p>{msg}</p>
      <button>
        <Link to={`/AllMovies`}>{linkMsg}</Link>
      </button>
    </Fragment>
  );
};

const Reserve = (props) => {
  const [reserveState, setReserveState] = useState(ReserveSeatStatus.ERROR);
  const [submitedForm, setSubmitedForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const seatCtx = useContext(SeatContext);
  const seatsChosen = seatCtx.seats;
  const screeningId = seatCtx.screeningId;

  console.log(seatCtx);

  if (seatsChosen === [] || screeningId === "") {
    history.push({
      pathname: "/AllMovies"
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
          <div>Reserve Seats</div>
          <div>Screening Id: {screeningId}</div>
          <div>Seats: {seatsChosenSorted}</div>
          <InputForm submitFormHandler={submitForm}></InputForm>
        </Fragment>
      )}
      {isLoading && submitedForm && <LoadingSpinner></LoadingSpinner>}
      {!isLoading && submitedForm && CreateLink(reserveState)}
    </Card>
  );
};

export default Reserve;
