import Chart from "chart.js/auto";
import { CategoryScale} from "chart.js";
import { useState, useEffect } from "react";
import PieChart from "../PieChart"

Chart.register(CategoryScale);

/**
 * Pie Chart handler component
 * 
 * Handles data fetching and processing for pie charts 
 * Configures display options for pie charts
 * Handles loading and error states for pie charts
 * 
 * @param {Array} sensorList - List of sensor codes to fetch and display
 * @param {string} startDate - Start date for data fetching in YYYY-MM-DD format
 * @param {string} endDate - End date for data fetching in YYYY-MM-DD format
 * @param {string} graphTitle - Title to display on the graph
 * @param {string} label - units for data being displayed
 * @param {number} [multiplier=1] - value to multiply data by for unit conversions
 * @returns Pie chart component from PieChart.js or loading/error state
 * 
 * @author Kiera Johnson
 */

export default function PieHandler({sensorList, startDate, endDate, graphTitle, label, multiplier = 1}){
    const canFetch =
        Array.isArray(sensorList) &&
        sensorList.length > 0 &&
        startDate &&
        endDate;

    const sensorKey = sensorList.join(",");
    
    const [sensors, setSensors] = useState(() =>
        sensorList.map((code, i) => ({
            id: i, 
            code: code, 
            name: null,
            sum: 0
        }))
    );
    
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true); // loading state for UI
    
    // fetches sensor names and sums 
    // if no name is found, the name defaults to the code
    const fetchData = async (list = sensorList) => {
        try {
            setLoading(true);
            setFetched(false);
            const withData = await Promise.all(
                list.map(async (code, i) =>{
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/energy/sum/${code}?start=${startDate}&end=${endDate}`, {credentials: "include",});
                    const data = await res.json();
                    let name = code
                    try{
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphs/name/${code}`, {credentials: "include",});
                        const data = await res.json();
                        name = data
                    } catch {
                        console.log("name error")
                    }

                    return { id: i, code, name, sum: data }
                })
            )
            setSensors(withData)
            setFetched(true)
            
        } catch(e){
            console.log("Error fetching data");
        } finally {
            setLoading(false);
        }
    }


    // fetches data on render and date changes
    useEffect(() => {
        if (!canFetch) {
            setSensors(sensorList.map((code, i) => ({ id: i, code, name: null, sum: 0 })));
            setFetched(false);
            setLoading(false);
            return;
        }
        fetchData(sensorList);
    }, [sensorKey, startDate, endDate, canFetch]);

    
    // sets defaults
    const labels = []; 
    const colours = [
        "#E63946", // red
        "#2196F3", // blue
        "#2A9D8F", // teal
        "#F4A261", // orange
        "#6A0572", // purple
        "#4CAF50", // green
        "#FF9800", // amber
        "#00BCD4", // cyan
        "#9C27B0", // violet
        "#F06292", // pink
        "#795548", // brown
        "#607D8B", // steel blue
        "#CDDC39", // lime
        "#FF5722", // deep orange
        "#3F51B5", // indigo
        "#009688", // dark teal
        "#1D3557", // navy
        "#FFD54F", // yellow
        "#C62828", // dark red
        "#8BC34A", // light green
        "#FF1493", // hot pink
    ];
    const [graphData, setGraphData] = useState({labels, datasets: [{}]}); 

    useEffect(() => {
        if(fetched){
            const labels = sensors.map(sensor => sensor.name);
            
            setGraphData({
                labels,
                datasets: [
                    {
                        label: label,
                        data: sensors.map((sensor) => sensor.sum * multiplier),
                        borderColor: colours,
                        backgroundColor: colours,
                        borderWidth: 2,
                        radius: '90%'
                    }
                ]
            });
        }
    }, [sensors, multiplier, label]);

    const graphOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: graphTitle
            },
        },
    };

    if (!canFetch) {
        return (
            <div className="relative min-h-75 flex items-center justify-center text-gray-400 text-sm">
                Graph Placeholder
            </div>
        );
    }

    const hasData = sensors.some((sensor) => sensor.sum != null);

    return (
        <div className="relative min-h-75">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded">
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                        <svg className="animate-spin h-8 w-8 text-[#6D2077]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        <span className="text-sm font-medium">Loading data...</span>
                    </div>
                </div>
            )}
            {!loading && fetched && !hasData && (
                <div className="flex items-center justify-center h-75 text-gray-400 text-sm">
                    No data available for the selected date range.
                </div>
            )}
            {!loading && hasData && <PieChart options={graphOptions} data={graphData}/>}
        </div>
    )
}