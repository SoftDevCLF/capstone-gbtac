"use client"

import { useState, useEffect } from "react"
import LineHandler from "./LineHandler"
import PieHandler from "./PieHandler"

export default function CustomHandler({selectedSensors, dateRange, settings}){
    try{
        const [sensors, setSensors] = useState(selectedSensors.map(sensor => sensor.code))
        useEffect(() => {
            setSensors(selectedSensors.map(sensor => sensor.code))
        }, [selectedSensors])

        if(sensors.length > 0){
            
            if(settings.chartType == "line"){
                return(
                    <div>
                        <LineHandler
                            sensorList={sensors}
                            startDate={dateRange.from}
                            endDate={dateRange.to}
                            graphTitle={settings.chartTitle}
                            yTitle={settings.xAxisTitle}
                            xTitle={settings.yAxisTitle}
                            xUnit={"hour"}
                        />
                    </div>
                )
            }else if(settings.chartType == "pie"){
                <div>
                    <p>pie chart goes here</p>
                    {/* <PieHandler
                        sensorList={sensors}
                        startDate={dateRange.from}
                        endDate={dateRange.to}
                        graphTitle={settings.chartTitle}
                        label={settings.xAxisTitle} //**temporary
                    /> */}
                    {/* <PieHandler
                            sensorList={[
                                "30000_TL252", // PV-CarportSolar_Total
                                "30000_TL253", // PV-RooftopSolar_Total
                            ]}
                            startDate={"2025-12-31"}
                            endDate={"2025-12-31"}
                            graphTitle={"Solar Panel Generation"}
                            label={"kWh"} // **check: unsure if right unit
                    /> */}
                </div>
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