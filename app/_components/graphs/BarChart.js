"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Bar Chart component
 * 
 * Displays a bar chart using react-chartjs-2. 
 * Options and data are passed in by LineHandler.js
 * 
 * @param {object} options - Chart configuration options
 * @param {object} data - Chart data including labels and datasets 
 * 
 * Notes:
 * - Options and data props are passed in by LineHandler, as line and bar graphs have the same structure for both
 * 
 * @returns A bar graph
 * 
 * @author Kiera Johnson
 */
export default function BarChart({ options, data }) {
  return <Bar data={data} options={options} />;
}