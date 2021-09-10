import React from 'react';

const SeatContext = React.createContext({
  seats: [],
  screeningId: "",
  movieName: "",
  hallName: "",
  dateAndTimeInfoStr: "",
  clearSeats: () => {}
});

export default SeatContext;