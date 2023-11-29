import configData from "./config.json";

export async function GetStations() {
    // Returns all stations in the database
  return fetch(`${configData.SACC_URL}/station/`, {
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

export async function DeleteStation(id: number) {
  // Returns all stations in the database
  return fetch(`${configData.SACC_URL}/station/${id}`, {
    method: "DELETE",
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

export async function GetLockerStates(stationId : number) {
    // Returns all locker states for a given station id
    return fetch(`${configData.SACC_URL}/station/${stationId}/verify_slots/`, {
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
    })    
}