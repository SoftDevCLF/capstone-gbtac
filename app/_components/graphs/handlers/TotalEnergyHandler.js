"use client";

import Chart from "chart.js/auto";
import { CategoryScale, TimeScale } from "chart.js";
import { useState, useEffect } from "react";
import LineChart from "../LineChart";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(CategoryScale, TimeScale, zoomPlugin);

const API_ENDPOINT = "http://127.0.0.1:8000";

export default function TotalEnergyHandler({
  sensorCode = "30000_TL342",
  startDate,
  endDate,
  graphTitle = "Total Energy Consumption",
  yTitle = "Energy (kWh)",
  xTitle = "Month",
  xUnit = "month",
  chartMode = "stackedBar",
}) {
  const [sensorName, setSensorName] = useState(sensorCode);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSensorName = async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/graphs/name/${sensorCode}`);
        const name = await res.json();
        setSensorName(name);
      } catch {
        setSensorName(sensorCode);
      }
    };

    fetchSensorName();
  }, [sensorCode]);

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const res = await fetch(
          `${API_ENDPOINT}/graphs/natural-gas-vs/${sensorCode}?start=${startDate}&end=${endDate}`
        );
        const raw = await res.json();

        const filtered = raw.filter(
          (item) =>
            item.natural_gas_kwh !== null ||
            item.electricity_kwh !== null ||
            item.total_energy_kwh !== null
        );

        const labels =
            chartMode === "stackedBar"
                ? filtered.map((item) => {
                    const date = new Date(`${item.month}-01`);
                    return date.toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                    });
                })
                : filtered.map((item) => new Date(`${item.month}-01`));

        const naturalGasData = filtered.map((item) => item.natural_gas_kwh ?? 0);
        const electricityData = filtered.map((item) => item.electricity_kwh ?? 0);
        const totalEnergyData = filtered.map((item) => item.total_energy_kwh ?? 0);

        if (chartMode === "stackedBar") {
          setGraphData({
            labels,
            datasets: [
              {
                type: "bar",
                label: "Natural Gas (kWh)",
                data: naturalGasData,
                borderColor: "#DA291C",
                backgroundColor: "#DA291C",
                borderWidth: 1,
              },
              {
                type: "bar",
                label: `${sensorName} (kWh)`,
                data: electricityData,
                borderColor: "#005EB8",
                backgroundColor: "#005EB8",
                borderWidth: 1,
              },
            ],
          });
        } else {
          setGraphData({
            labels,
            datasets: [
              {
                type: "line",
                label: "Total Energy Consumption (kWh)",
                data: totalEnergyData,
                borderColor: "#6D2077",
                backgroundColor: "#6D2077",
                borderWidth: 2,
              },
            ],
          });
        }
      } catch (e) {
        console.log("Error fetching total energy data", e);
      }
    };

    if (startDate && endDate) {
      fetchEnergyData();
    }
  }, [sensorCode, sensorName, startDate, endDate, chartMode]);

  const graphOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: chartMode === "stackedBar",
        title: {
          display: true,
          text: xTitle,
        },
        type: chartMode === "stackedBar" ? "category" : "time",
        time:
          chartMode === "stackedBar"
            ? undefined
            : {
                unit: xUnit,
              },
      },
      y: {
        stacked: chartMode === "stackedBar",
        title: {
          display: true,
          text: yTitle,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: graphTitle,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.3,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div>
      <LineChart options={graphOptions} data={graphData} />
    </div>
  );
}