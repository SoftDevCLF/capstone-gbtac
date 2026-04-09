"use client"

import { useState, useEffect } from "react"
import LineHandler from "./LineHandler"

/**
 * Graph Handler for Custom Page
 * 
 * This component serves as a wrapper for the various graph handlers, allowing
 * for dynamic rendering based on user choices on Custom Dashboard
 * Props are passed in from GraphContainer component
 * 
 * Notes:
 * - this component is now somewhat redundant now due to the handler grouping of line and bar graphs, unless more types are added
 * - GraphContainer could possibly be removed as a middle man due to changes removing extra functionality
 * 
 * @param {Array} selectedSensors - List of sensor objects to plot on the chart
 * @param {object} dateRange - Date range for filtering data, with from and to fields in YYYY-MM-DD format
 * @param {object} settings - Chart display settings including title, type, and axis labels
 * @param {object} aggSettings - Aggregation settings including time interval and aggregation type
 * 
 * @returns Bar or Line graph based on settings or loading/error state
 * 
 * @author Kiera Johnson
 */

export default function CustomHandler({selectedSensors, dateRange, settings, aggSettings}){
    try{
        const [sensors, setSensors] = useState(selectedSensors.map(sensor => sensor.code))
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setSensors(selectedSensors.map(sensor => sensor.code))
        }, [selectedSensors])

        if(sensors.length > 0){
            
            if(settings.chartType == "line" || settings.chartType == "bar"){
                return(
                    <div className="w-full h-full">
                        <LineHandler
                            chartType={settings.chartType}
                            sensorList={sensors}
                            startDate={dateRange.from}
                            endDate={dateRange.to}
                            graphTitle={settings.chartTitle ?? ""}
                            yTitle={settings.yAxisTitle ?? ""}
                            xTitle={settings.xAxisTitle ?? ""}
                            aggTime={aggSettings.time}
                            aggType={aggSettings.type}                            
                        />
                    </div>
                )
            }else{
                return(
                    <div>
                        <p>Invalid graph type</p>
                    </div>
                )
            }
        }else{
            <div>Enter graph info and press apply</div>
        }

    } catch(e){
        console.log(e)
        return(
            <div>
                <p>Enter information and press apply</p>
            </div>
        )
    }

}