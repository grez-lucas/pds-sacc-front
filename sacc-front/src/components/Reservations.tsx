import React, { useEffect, useState } from 'react';
import { GetReservations } from "../services/ReservationService";
// import { Link } from 'react-router-dom';
import * as HeroIcons from '@heroicons/react/20/solid';

interface Reservation {
  id: number;
  reservation_date: string;
  expiration_date: string;
  state: string;
  locker_slot: number;
  item: number;
  station: number;
  operator: number;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Dropdown menu (Cancel/Confirm)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (reservationId: number) => {
    setOpenDropdownId(openDropdownId === reservationId ? null : reservationId);
  };

  const handleConfirm = (reservationId: number) => {
    handleToggleDropdown(0);
    console.log('Canceling reservation:', reservationId)
    alert(`Reservation ${reservationId} confirmed.`);
  };

  const handleCancel = (reservationId: number) => {
    handleToggleDropdown(0);
    console.log('Canceling reservation:', reservationId)
    alert(`Are you sure you want to cancel reservation ${reservationId}?`);
  };

  useEffect(() => {
    const hideDropdown = () => {
      setOpenDropdownId(null);
    };

    const dropdownDelayTimeout = setTimeout(hideDropdown, 4000); // Cambia el valor de 500 a la cantidad de milisegundos que desees

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
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto bg-gradient-to-b from-blue-000 flex-1">
      <h1 className="text-5xl font-bold">Reservations</h1>
      {loading ? (
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="text-gray-900">Loading...</span>
        </div>
      ) : (
      <table className="table-fixed min-w-auto bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">ID</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Reservation Date</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Expiration Date</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">State</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Locker Slot</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Item</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Station</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Operator</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Actions</th>
            <th className="py-2 px-4 border-b bg-gray-500 text-white w-1/8">Logs</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="even:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{reservation.id}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.reservation_date}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.expiration_date}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.state}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.locker_slot}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.item}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.station}</td>
              <td className="py-2 px-4 border-b text-center">{reservation.operator}</td>
              {/* <td>
                <Link to={`/reservationsLogs/${reservation.id}`}>Ver Logs</Link>
              </td> */}

              <td className="py-2 px-10 border-b text-right">
                <div className="flex justify-between">
                  <div className="relative flex">
                    <HeroIcons.PencilIcon
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      onClick={() => handleToggleDropdown(reservation.id)}
                    />
                    {/* <span className="ml-10 text-sm font-medium text-gray-900">Actions</span> */}
                    {openDropdownId === reservation.id && (
                      <div className="absolute left-5 mt-2 w-25 bg-gray-500 text-white border border-gray-200 rounded shadow-black-100 opacity-100" style={{ top: '-8px' }}>
                        <ul className="text-sm text-gray-700 dark:text-gray-200">
                          <li
                            className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleConfirm(reservation.id)}
                          >
                            <HeroIcons.CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                            Confirm
                          </li>
                          <li
                            className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            <HeroIcons.XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                            Cancel
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </td>

              <td className="py-2 px-4 border-b text-center">
                <div className="flex justify-between">
                  <HeroIcons.ClipboardDocumentListIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                    onClick={() => alert('LOGS')}
                    />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Reservations;
