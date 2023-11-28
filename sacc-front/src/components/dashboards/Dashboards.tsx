import { GetDashboards } from "../../services/DashboardService";
import { useEffect, useState } from "react";
import SimpleData from "./SimpleData";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface StationData {
  occupied_percentage: number;
  unnocupied_percentage: number;
}

interface AverageOccupancyData {
  stations: Record<string, StationData>;
  average_occupancy: number;
}

interface AverageLoadTimeData {
  stations: Record<string, number>;
  average_confirmation_load_time: number;
}

interface ApiResponse {
  pending_reservations: number;
  unclaimed_packages: number;
  unclaimed_packages_long: number;
  average_occupancy_data: AverageOccupancyData;
  average_reservation_load_time: AverageLoadTimeData;
  average_load_claim_time: AverageLoadTimeData;
}

function Dashboards() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<ApiResponse>({
    pending_reservations: 0,
    unclaimed_packages: 0,
    unclaimed_packages_long: 0,
    average_occupancy_data: {
      stations: {},
      average_occupancy: 0.0,
    },
    average_reservation_load_time: {
      stations: {
        "San Carlos de Bariloche, Argentina": 0.01,
      },
      average_confirmation_load_time: 0.01,
    },
    average_load_claim_time: {
      stations: {
        "San Carlos de Bariloche, Argentina": 0.41,
      },
      average_confirmation_load_time: 0.41,
    },
  });

  // Extract station names and data from the average_occupancy_data
  const stationNames = Object.keys(
    dashboardData.average_occupancy_data.stations
  );
  const stationData = stationNames.map(
    (station) => dashboardData.average_occupancy_data.stations[station]
  );

    // Extract station names and data from the average_reservation_load_time
    const reservationLoadTimeData = dashboardData.average_reservation_load_time.stations;
    const reservationLoadTimeLabels = Object.keys(reservationLoadTimeData);
    const reservationLoadTimeValues = reservationLoadTimeLabels.map((station) => reservationLoadTimeData[station]);
  
    // Extract station names and data from the average_load_claim_time
    const reservationClaimTimeData = dashboardData.average_load_claim_time.stations;
    const reservationClaimTimeLabels = Object.keys(reservationClaimTimeData);
    const reservationClaimTimeValues = reservationClaimTimeLabels.map((station) => reservationClaimTimeData[station]);

  useEffect(() => {
    GetDashboards().then((data) => {
      setDashboardData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <main className="w-[83%] h-full flex items-center justify-center ">
          <article className="h-[95%] w-[85%]  flex flex-col gap-4">
            <section className=" h-[25%]  grid grid-cols-3 gap-5">
              <div className=" h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="Pending reservations"
                  measurement=""
                  variant="blue"
                />
              </div>
              <div className=" h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="Unclaimed packages"
                  measurement=""
                  variant="warning"
                />
              </div>
              <div className="h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="7+ Days Unclaimed Packages"
                  measurement=""
                  variant="error"
                />
              </div>
            </section>
            <section className="w-full h-[50%] grid grid-cols-10 gap-1">
              <div className="col-span-4 h-full bg-[#ededed] rounded-lg flex items-center justify-items-center">
                {/* Stacked Bar Chart */}
                <Bar
                  data={{
                    labels: stationNames,
                    datasets: [
                      {
                        label: "Occupied Percentage",
                        data: stationData.map(
                          (data) => data.occupied_percentage
                        ),
                        backgroundColor: "#2f49d0",
                        maxBarThickness: 40,
                      },
                      {
                        label: "Unnocupied Percentage",
                        data: stationData.map(
                          (data) => data.unnocupied_percentage
                        ),
                        backgroundColor: "#00f0ff",
                        maxBarThickness: 40,

                      },
                      
                    ],
                  }}
                  options={{
                    plugins: {
                        legend: {
                            position: 'bottom' as const,
                            labels: {
                            }
                                
                        },
                      title: {
                        display: true,
                        text: "Virtual Occupancy Per Station",
                        font: {
                          size: 20,
                          weight: 'bold'
                        },
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                      },
                      y: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        min: 0,
                        max: 100,
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div className="col-span-3 h-full bg-[#ededed] rounded-lg flex items-center justify-items-center">
                {/* Bar Chart for Average Reservation Load Time */}
                <Bar
                  data={{
                    labels: reservationLoadTimeLabels,
                    datasets: [
                      {
                        label: "Average Reservation Load Time",
                        data: reservationLoadTimeValues,
                        backgroundColor: "#ffd700", // Yellow color
                        maxBarThickness: 40,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                        labels: {}
                      },
                      title: {
                        display: true,
                        text: "Average Reservation Load Time",
                        font: {
                          size: 20,
                          weight: 'bold'
                        },
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                        min: 0,
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div className="col-span-3 h-full bg-[#ededed] rounded-lg flex items-center justify-items-center">
                {/* Bar Chart for Average Reservation Claim Time */}
                <Bar
                  data={{
                    labels: reservationClaimTimeLabels,
                    datasets: [
                      {
                        label: "Average Reservation Claim Time",
                        data: reservationClaimTimeValues,
                        backgroundColor: "#ffd700", // Yellow color
                        maxBarThickness: 40,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                        labels: {}
                      },
                      title: {
                        display: true,
                        text: "Average Reservation Claim Time",
                        font: {
                          size: 20,
                          weight: 'bold'
                        },
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        stacked: true,
                        grid: {
                          display: false,
                        },
                        min: 0,
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </section>
            <section className=" h-[25%] grid grid-cols-3 gap-5">
              <div className=" h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="Average Occupancy"
                  measurement="%"
                  variant="regular"
                />
              </div>
              <div className=" h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="Average Reservation-Load Time"
                  measurement="H"
                  variant="regular"
                />
              </div>
              <div className=" h-full bg-[#ededed] rounded-lg">
                <SimpleData
                  value={1}
                  title="Average Load-Claim Time"
                  measurement="H"
                  variant="regular"
                />
              </div>
            </section>
          </article>
        </main>
      )}
    </>
  );
}

export default Dashboards;
