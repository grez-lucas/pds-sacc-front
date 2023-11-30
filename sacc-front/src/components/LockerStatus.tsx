import React, { useState, useEffect } from "react";
import { GetLockerStates, GetStations } from "../services/StationService";

interface Station {
  id: number;
  thing_name: string;
  shadow_name: string;
  address: string;
  roleARN: string;
  active: string;
}

interface Locker {
  OccupiedPhysycal: boolean;
  OccupiedVirtual: boolean;
  ReservationState: string;
  Client: string;
  Operator: string;
}

function LockerStatus() {
  const [stations, setStations] = useState<Station[]>([]);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await GetStations();
        console.log(data);
        console.log("Fetched stations:", data);
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleChange = async (id: number) => {
    try {
      console.log(id);
      const data = await GetLockerStates(id);
      console.log(data);
      console.log("Fetched locker states:", data);
      setLockers(data.slots);
      setSelectedStation(id);
    } catch (error) {
      console.error("Error fetching locker states:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[83%] h-full bg-white flex flex-col items-center">
      <div className="bg-gray-600 w-full h-12 flex items-center justify-center text-white">
        Locker States
      </div>
      <div className="bg-gray-600 w-500 h-12 flex items-center justify-center text-white mt-10">
        <h2>Lockers</h2>
      </div>
      <div className="flex justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="stationDropdown" className="mr-2">
                Select a Station:
              </label>
              <select
                id="stationDropdown"
                onChange={(e) => handleChange(parseInt(e.target.value))}
                value={selectedStation || ""}
              >
                <option value="" disabled>
                  Choose a station
                </option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.address}
                  </option>
                ))}
              </select>
            </div>

            <table className="w-100 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Occupied Physical</th>
                  <th className="px-4 py-2">Occupied Virtual</th>
                  <th className="px-4 py-2">Reservation State</th>
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Operator</th>
                </tr>
              </thead>
              <tbody>
                {lockers?.map((locker, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{locker.OccupiedPhysycal.toString()}</td>
                    <td className="border px-4 py-2">{locker.OccupiedVirtual.toString()}</td>
                    <td className="border px-4 py-2">{locker.ReservationState}</td>
                    <td className="border px-4 py-2">{locker.Client}</td>
                    <td className="border px-4 py-2">{locker.Operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </main>
  );
}

export default LockerStatus;
