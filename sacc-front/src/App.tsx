import "./App.css";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import ReservationsLogs from "./components/ReservationsLogs";
import Reservations from "./components/Reservations";
import LockerStations from "./components/LockerStations";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Locker Stations");
  const [selectedReservationId, setSelectedReservationId] = useState(0);

  return (
    <div className="w-screen h-screen flex">
      <SideBar setSelectedMenu={setSelectedMenu} />
      {selectedMenu === "Locker Stations" && <LockerStations/>}
      {selectedMenu === "Locker States" && <h1>Locker States</h1>}
      {selectedMenu === "Dashboards" && <h1>Dashboards</h1>}
      {selectedMenu === "Reservations" && (
        <Reservations
          setSelectedMenu={setSelectedMenu}
          setSelectedReservationId={setSelectedReservationId}
        />
      )}
      {selectedMenu === "ReservationsLogs" && (
        <ReservationsLogs id={selectedReservationId} />
      )}
    </div>
  );
}

export default App;
