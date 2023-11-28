import configData from "./config.json";


export async function GetDashboards() {
    // Returns all dashboard data required for the dashboard page
    return fetch(`${configData.SACC_URL}/dashboard/`, {
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