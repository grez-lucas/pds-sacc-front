import "./App.css";
import SideBar from "./components/Sidebar";
import Dashboards from "./components/dashboards/Dashboards";
import { useState } from "react";
import ReservationsLogs from "./components/ReservationsLogs";
import Reservations from "./components/Reservations";
import LockerStations from "./components/LockerStations";
import EditStations from "./components/LockerStationsEdit";
import LockerStatus from "./components/LockerStatus"

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Locker Stations");
  const [selectedReservationId, setSelectedReservationId] = useState(0);
  const [selectedStationId, setSelectedStationId] = useState(0);

  return (
    <div className="w-screen h-screen flex">
      <SideBar setSelectedMenu={setSelectedMenu} />
      {selectedMenu === "Locker Stations" && (
        <LockerStations 
          selectedStationId={setSelectedStationId}
          setSelectedMenu={setSelectedMenu}/>
          )}
      {selectedMenu === "Edit Locker Stations" && <EditStations id={selectedStationId} />}
      {selectedMenu === "Locker States" && <LockerStatus/>}
      {selectedMenu === "Dashboards" && <Dashboards />}
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
