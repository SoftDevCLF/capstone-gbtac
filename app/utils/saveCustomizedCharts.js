//This utils component saves a chart to Firestore

import { db } from "../_utils/firebase";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";

//Save or update a chart for a user
export async function saveCustomDashboard({ userEmail, chartId, settings, dateRange, selectedSensors }) {
  const chartsRef = collection(db, "allowedUsers", userEmail, "charts");

  //If chartId exists, update the existing chart
  if (chartId) {
    await setDoc(doc(chartsRef, chartId), {
      title: settings.chartTitle,
      settings,
      dateRange,
      selectedSensors,
      updatedAt: serverTimestamp()
    });
    return chartId;
  }

  //Else create a new chart
  const docRef = await addDoc(chartsRef, {
    title: settings.chartTitle,
    settings,
    dateRange,
    selectedSensors,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}
