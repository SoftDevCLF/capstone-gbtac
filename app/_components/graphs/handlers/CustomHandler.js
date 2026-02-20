"use client"

import { useState } from "react"
import LineHandler from "./LineHandler"

export default function CustomHandler({selectedSensors, dateRange, settings}){
    try{
        const [sensors, setSensors] = useState(selectedSensors.map(sensor => sensor.code))
        // add use effect so everytime selected changes it sets sensors
        // console.log(sensors)
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
                    {/* <p>Line!</p> */}
                </div>
            )
        }else{
            return(
                <div>
                    <p>no.</p>
                </div>
            )
        }

    } catch(e){
        console.log(e)
        return(
            <div>
                <p>i didnt like that</p>
            </div>
        )
    }

}