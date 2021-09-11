import SeatContext from './Seat-context';

const defaultSeatState = {
    seats: [],
    screeningId: "",
    movieName: "",
    hallName: "",
    dateAndTimeInfoStr: "",
};

//Reserve seat context, used for saving movie,screening and seats chosen
const SeatContextProvider = (props) => {
  const clearSeats = () => {
    seatContext.seats = defaultSeatState.seats;
    seatContext.screeningId = defaultSeatState.screeningId;
    seatContext.movieName = defaultSeatState.movieName;
    seatContext.hallName = defaultSeatState.hallName;
    seatContext.dateAndTimeInfoStr = defaultSeatState.dateAndTimeInfoStr;
  }

  const seatContext = {
    seats: [],
    screeningId: "",
    movieName: "",
    hallName: "",
    dateAndTimeInfoStr: "",
    clearSeats: clearSeats
  };

  return (
    <SeatContext.Provider value={seatContext}>
      {props.children}
    </SeatContext.Provider>
  );
};

export default SeatContextProvider;
