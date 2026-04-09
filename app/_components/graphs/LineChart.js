"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

/**
 * Line Chart component
 * 
 * Displays a line chart using react-chartjs-2. 
 * Options and data are passed in by LineHandler.js
 * 
 * @param {object} options - Chart configuration options
 * @param {object} data - Chart data including labels and datasets 
 * 
 * @returns A line graph
 * 
 * @author Kiera Johnson
 */
export default function LineChart({ options, data }) {
  return <Line data={data} options={options} />;
}