"use client"

import Chart from "chart.js/auto";
import { CategoryScale, TimeScale } from "chart.js";
import { useState, useEffect } from "react";
import LineChart from "../LineChart"
import "chartjs-adapter-date-fns";

Chart.register(CategoryScale, TimeScale);

const API_ENDPOINT = "http://127.0.0.1:8000";

export default function LineHandler({sensorList, startDate, endDate, graphTitle, yTitle, xTitle, xUnit}){
    
    // sensor id (array position) and sensor code (part after SaitSolarLab_)
    const [sensors, setSensors] = useState(() =>
        sensorList.map((code, i) => ({
            id: i, 
            code: code, 
            name: null
        }))
    );
    
    const [fetched, setFetched] = useState(false); // if data has been fetched or not
    const [sensorData, setSensorData] = useState([]); // holds all the sensor data
    
    // takes sensors array and fetches data based off of codes, puts it in the sensorData array
    // ** NOTE: add warning if no data is available (no sensor data during time period) 
    const fetchData = async () => {
        try {
            let arr = [];
            
            for(let i = 0; i < sensors.length; i++){
                const res = await fetch(`${API_ENDPOINT}/data/${sensors[i].code}?start=${startDate}&end=${endDate}`);
                const data = await res.json();
                arr.push(data);
            }
            
            setSensorData(arr);
            setFetched(true);
            
        } catch(e){
            console.log("Error fetching data");
            // ** should probably display an error to user ?
        }
    }

    const fetchNames = async () => {
        try{
            const named = await Promise.all(
                sensors.map(async (sensor) =>{
                    try{
                        const res = await fetch(`${API_ENDPOINT}/name/${sensor.code}`);
                        const data = await res.json();
                        return {...sensor, name: data}
                    } catch {
                        return {...sensor, name: sensor.code}
                    }
                })
            )
            setSensors(named)

        } catch (e){
            console.log("error fetching sensor name")
        }
    }

    // fetches data on render and date changes
    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    useEffect(() => {
        fetchNames();
    }, [sensorList]);
    
    // sets defaults
    const labels = 0; // x axis labels
    const colours = ["#FF0000", "#0000FF", "#00FF00"]; // colours for lines, will need to add more
    const [graphData, setGraphData] = useState({labels, datasets: [{}]}); // data to be passed on to LineChart component

    // runs when sensorData is changed (so just on fetch at the moment)
    useEffect(() => {
        if(fetched){
        // ** might change so it reflects more than just the one dataset?
        const labels = sensorData[0].map(d => new Date(d.ts));

        // for each sensor in sensors array it sets the line label, data, and colour
        const dataset = sensors.map(sensor => ({
            label: sensor.name,
            data: sensorData[sensor.id].map(d => d.data),
            borderColor: colours[sensor.id],
            backgroundColor: colours[sensor.id],
            borderWidth: 2
        }));
        
        setGraphData({
            labels,
            datasets: dataset
        });
        }
    }, [sensorData]);

    // options for graph display to be passed on to LineChart component
    const graphOptions = {
        scales: {
        x: {
            title: {
            display: true,
            text: xTitle
            },
            type: "time",
            time: {
            unit: xUnit, // ** might change to scale automatically
            }
        },
        y: {
            title: {
            display: true,
            text: yTitle
            }
        }
        },
        plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: graphTitle
        },
        },
    };

    // passes graph info onto LineChart component and displays it
    return (
        <div>
        <LineChart options={graphOptions} data={graphData}/>
        </div>
    )
}