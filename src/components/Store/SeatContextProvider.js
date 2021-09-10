import SeatContext from './Seat-context';

const defaultSeatState = {
    seats: [],
    screeningId: "",
    movieName: "",
    hallName: "",
    startDate: 0,
};

const SeatContextProvider = (props) => {
  const clearSeats = () => {
    seatContext.seats = defaultSeatState.seats;
    seatContext.screeningId = defaultSeatState.screeningId;
    seatContext.movieName = defaultSeatState.movieName;
    seatContext.hallName = defaultSeatState.hallName;
    seatContext.startDate = 0;
  }

  const seatContext = {
    seats: [],
    screeningId: "",
    movieName: "",
    hallName: "",
    startDate: 0,
    clearSeats: clearSeats
  };

  return (
    <SeatContext.Provider value={seatContext}>
      {props.children}
    </SeatContext.Provider>
  );
};

export default SeatContextProvider;
