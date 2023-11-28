import "./App.css";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import ReservationsLogs from "./components/ReservationsLogs";
import Reservations from "./components/Reservations";

function App() {
  const [selectedMenu, setSelectedMenu] = useState<string>("ReservationsLogs");

  return (
    <div className="w-screen h-screen flex">
      <SideBar setSelectedMenu={setSelectedMenu} />
      {selectedMenu === "Locker Stations" && <h1>Locker Stations</h1>}
      {selectedMenu === "Locker States" && <h1>Locker States</h1>}
      {selectedMenu === "Dashboards" && <h1>Dashboards</h1>}
      {selectedMenu === "Reservations" && <Reservations/>}
      {selectedMenu === "ReservationsLogs" && <ReservationsLogs id={1}/>}
    </div>
  );
}

export default App;
