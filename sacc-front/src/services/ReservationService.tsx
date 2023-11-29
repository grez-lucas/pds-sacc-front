import configData from "./config.json";
import {ReservationData} from "../components/Reservations";

export async function GetReservations() {
  // Returns all reservations in the database
  return fetch(`${configData.SACC_URL}/reservation/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function GetReservation(id: number) {
  return fetch(`${configData.SACC_URL}/reservation/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function GetReservationLog(id: number) {
  // Gets the reservation log for a given reservation id

  return fetch(
    `${configData.SACC_URL}/reservation-state-history/get_reservation_log/?reservation_id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function UpdateReservation(id: number, updatedData: ReservationData) {
  // Updates a reservation in the API with the provided data
  return fetch(`${configData.SACC_URL}/reservation/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
