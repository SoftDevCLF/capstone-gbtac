import {Pie} from 'react-chartjs-2';

/**
 * Pie Chart component
 * 
 * Displays a pie chart using react-chartjs-2. 
 * Options and data are passed in by PieHandler.js
 * 
 * @param {object} options - Chart configuration options
 * @param {object} data - Chart data including labels and datasets 
 * 
 * @returns A pie graph
 * 
 * @author Kiera Johnson
 */
export default function PieChart({options, data }){
    return (
        <div className="bg-white p-5 m-5 min-h-150">
            <Pie
                data= {data}
                options={options}
            />
        </div>
    );
}