import React, { useState, useEffect } from "react";
import { DeleteStation, GetStations } from "../services/StationService";

interface Station {
    id: number;
    thing_name: string;
    shadow_name: string;
    address: string;
    roleARN: string;
    active: string; // Assuming 'active' is a property in your data
    // Add other properties as needed
  }

  interface LockerProps {
    selectedStationId: React.Dispatch<React.SetStateAction<number>>;
    setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  }

function LockerStations({ selectedStationId,setSelectedMenu }: LockerProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await GetStations();
        console.log(data)
        console.log("Fetched reservation log:", data);
        setStations(data);
      } catch (error) {
        console.error("Error fetching reservation log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  },);

  const handleDelete = async (id: number) => {
    try {
        const data = await DeleteStation(8);
        console.log(data)
        const updatedStations = stations.filter((item) => item.id !== id);
        setStations(updatedStations);
      } catch (error) {
        console.error("Error fetching reservation log:", error);
      } finally {
        setLoading(false);
      }
  };

  const handleEditClick = (id: number) => {
    selectedStationId(id);
    setSelectedMenu("Edit Locker Stations");
  };

  

  return (
    <main className="w-[83%] h-full bg-white flex flex-col items-center">
      <div className="bg-gray-600 w-full h-12 flex items-center justify-center text-white">
        Locker Stations
      </div>
      <div className="bg-gray-600 w-500 h-12 flex items-center justify-center text-white mt-10">
        Manage stations
      </div>
      <div className="flex justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-100 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Adress</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations?.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.address}</td>
                  <td className="border px-4 py-2">{item.active ? 'Active right now' : 'Inactive'}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditClick(item.id)}
                      className="bg-blue-500 text-white px-3 py-1"
                    >
                      Edit
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default LockerStations;