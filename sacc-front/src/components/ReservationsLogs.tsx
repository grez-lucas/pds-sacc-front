import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ReservationsLogs() {
  const JASON = {
    message: "Reservation state history found",
    reservation_state_history: [
      {
        id: 4,
        state: "FIN",
        transition_date: "2023-11-22T19:36:31.368573Z",
        reservation: 1,
        manager: null,
      },
      {
        id: 3,
        state: "LOA",
        transition_date: "2023-11-22T19:36:11.816621Z",
        reservation: 1,
        manager: null,
      },
      {
        id: 2,
        state: "CON",
        transition_date: "2023-11-22T19:35:54.964727Z",
        reservation: 1,
        manager: null,
      },
      {
        id: 1,
        state: "RES",
        transition_date: "2023-11-22T19:35:33.879219Z",
        reservation: 1,
        manager: null,
      },
    ],
  };

  return (
    <main className="w-[83%] h-full bg-white flex flex-col items-center">
      <div className="bg-gray-600 w-full h-12 flex items-center justify-center text-white">
        Reservations
      </div>
      <div className="bg-gray-600 w-75 h-12 flex items-center justify-center text-white mt-10">
        Reservation Name
      </div>
      <div className="d-flex justify-content-center mt-4">
        <table className="table w-75">
          <thead>
            <tr>
              <th>ID</th>
              <th>State</th>
              <th>Transition Date</th>
              <th>Reservation</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {JASON.reservation_state_history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.state}</td>
                <td>{item.transition_date}</td>
                <td>{item.reservation}</td>
                <td>{item.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ReservationsLogs;
