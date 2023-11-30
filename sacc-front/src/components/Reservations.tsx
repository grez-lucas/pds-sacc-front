import React, { useEffect, useState } from "react";
import {
  GetReservations,
  UpdateReservation,
} from "../services/ReservationService";
import * as HeroIcons from "@heroicons/react/20/solid";

export interface ReservationData {
  id: number;
  reservation_date: string;
  expiration_date: string;
  state: string;
  locker_slot: number;
  item: number;
  station: number;
  operator: number;
}

interface ReservationsProps {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  setSelectedReservationId: React.Dispatch<React.SetStateAction<number>>;
}

function Reservations({
  setSelectedMenu,
  setSelectedReservationId,
}: ReservationsProps) {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogsClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setSelectedMenu("ReservationsLogs");
  };

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (reservationId: number) => {
    setOpenDropdownId(openDropdownId === reservationId ? null : reservationId);
  };

  const handleConfirm = async (reservationId: number) => {
    handleToggleDropdown(0);
    console.log("Confirming reservation:", reservationId);
    alert(`Reservation ${reservationId} confirmed.`);

    const updatedData = {
      id: reservationId,
      reservation_date: "2023-11-24T20:03:20.740573Z",
      expiration_date: "2023-12-10T01:47:00Z",
      state: "CON",
      locker_slot: 1,
      item: 7,
      station: 1,
      operator: 4,
    };

    try {
      await UpdateReservation(reservationId, updatedData);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, state: "CON" }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = async (reservationId: number) => {
    handleToggleDropdown(0);
    console.log("Canceling reservation:", reservationId);
    alert(`Are you sure you want to cancel reservation ${reservationId}?`);

    const updatedData = {
      id: reservationId,
      reservation_date: "2023-11-24T20:03:20.740573Z",
      expiration_date: "2023-12-10T01:47:00Z",
      state: "CAN",
      locker_slot: 1,
      item: 7,
      station: 1,
      operator: 4,
    };

    try {
      await UpdateReservation(reservationId, updatedData);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, state: "CAN" }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const hideDropdown = () => {
      setOpenDropdownId(null);
    };

    const dropdownDelayTimeout = setTimeout(hideDropdown, 4000);

    return () => {
      clearTimeout(dropdownDelayTimeout);
    };
  }, [openDropdownId]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await GetReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="w-[83%] h-full bg-white flex flex-col items-center">
      <div className="bg-gray-600 w-full h-12 flex items-center justify-center text-white">
        Reservations
      </div>

      <div className="flex justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-100 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Reservation Date</th>
                <th className="px-4 py-2">Expiration Date</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Locker Slot</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Station</th>
                <th className="px-4 py-2">Operator</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">Logs</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="even:bg-gray-100">
                  <td className="border px-4 py-2 text-center">
                    {reservation.id}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.reservation_date}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.expiration_date}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.state}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.locker_slot}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.item}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.station}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {reservation.operator}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    <div className="flex justify-between">
                      <div className="relative flex">
                        <HeroIcons.PencilIcon
                          className="h-5 w-5 text-gray-500 cursor-pointer"
                          onClick={() => handleToggleDropdown(reservation.id)}
                        />
                        {openDropdownId === reservation.id && (
                          <div
                            className="absolute left-5 mt-2 w-25 bg-gray-500 text-white border border-gray-200 rounded shadow-black-100 opacity-100"
                            style={{ top: "-8px" }}
                          >
                            <ul className="text-sm text-gray-700 dark:text-gray-200">
                              {reservation.state === "RES" && (
                                <li
                                  className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  onClick={() => handleConfirm(reservation.id)}
                                >
                                  <HeroIcons.CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                                  Confirm
                                </li>
                              )}
                              {reservation.state === "RES" && (
                                <li
                                  className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  onClick={() => handleCancel(reservation.id)}
                                >
                                  <HeroIcons.XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                  Cancel
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-between">
                      <HeroIcons.ClipboardDocumentListIcon
                        className="h-5 w-5 text-blue-500 cursor-pointer"
                        onClick={() => handleLogsClick(reservation.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reservations;
