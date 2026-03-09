//This fetches all charts, and deletes charts as well

import { db } from "../_utils/firebase"
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";

//Fetch all charts for a user
export async function fetchUserCharts(userEmail) {
  const snapshot = await getDocs(
    collection(db, "allowedUsers", userEmail, "charts")
  );
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Fetch a single chart by ID
export async function fetchChartById(userEmail, chartId) {
  const snapshot = await getDoc(
    doc(db, "allowedUsers", userEmail, "charts", chartId)
  );
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

// Delete a chart by ID
export async function deleteChart(userEmail, chartId) {
  await deleteDoc(
    doc(db, "allowedUsers", userEmail, "charts", chartId)
  );
}