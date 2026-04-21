/**
 * Content Safety function
 * 
 * Passes provided string to the backend API where Azure Content Safety returns severities
 * Checks if any severity is above 0 and returns false if so
 * 
 * @param {string} text - text to check for safety
 * 
 * @returns boolean value indicated if safety check was passed
 * 
 * @author Kiera Johnson
 */

let lastChecked = "";
let lastResult = true;

export async function checkSafety(text){
    
    if(text.length > 0 && text != lastChecked){
        lastChecked = text;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/safety?text=${text}`, {credentials: "include"});
        const data = await res.json()
    
        let pass = true
    
        data.forEach(cat => {
            if(cat.severity > 0) pass = false
        });
        lastResult = pass;
        return pass
    }else if(text == lastChecked){
        return lastResult
    }
    return true
}