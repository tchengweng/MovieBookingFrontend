import React from 'react';

const SeatContext = React.createContext({
  seats: [],
  screeningId: "",
  movieName: "",
  hallName: "",
  startDate: 0,
  clearSeats: () => {}
});

export default SeatContext;