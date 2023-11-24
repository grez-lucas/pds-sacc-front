import configData from "./config.json";

export async function GetReservations() {
  return fetch(`${configData.SACC_URL}/reservation/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => 
       response.json()
    )
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
    .then((response) => 
        response.json()
    )
    .then((data) => {
        console.log("Success:", data);
        return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
