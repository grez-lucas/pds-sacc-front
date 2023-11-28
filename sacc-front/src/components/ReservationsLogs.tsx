import React, { useState, useEffect } from "react";
import { GetReservationLog } from "../services/ReservationService";

interface ReservationLogItem {
  id: number;
  state: string;
  transition_date: string;
  reservation: string;
  manager: string;
}

interface ReservationLog {
  reservation_state_history: ReservationLogItem[];
}

function ReservationsLogs({ id }: { id: number }) {
  const [reservationLog, setReservationLog] = useState<ReservationLog | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationLog = async () => {
      try {
        const data = await GetReservationLog(id);
        console.log("Fetched reservation log:", data);
        setReservationLog(data);
      } catch (error) {
        console.error("Error fetching reservation log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationLog();
  }, [id]);

  return (
    <main className="w-[83%] h-full bg-white flex flex-col items-center">
      <div className="bg-gray-600 w-full h-12 flex items-center justify-center text-white">
        Reservations
      </div>
      <div className="bg-gray-600 w-100 h-12 flex items-center justify-center text-white mt-10">
        Reservation Name
      </div>
      <div className="flex justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-100 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Transition Date</th>
                <th className="px-4 py-2">Reservation</th>
                <th className="px-4 py-2">Manager</th>
              </tr>
            </thead>
            <tbody>
              {reservationLog?.reservation_state_history.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.state}</td>
                  <td className="border px-4 py-2">{item.transition_date}</td>
                  <td className="border px-4 py-2">{item.reservation}</td>
                  <td className="border px-4 py-2">{item.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default ReservationsLogs;
