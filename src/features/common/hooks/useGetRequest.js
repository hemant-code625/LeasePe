/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"


const useGetRequest = ({longitude, latitude, proximity}) => {
    const [requests, setRequests] = useState([]);
    useEffect(()=> {
        const getRequests = async () => {
            try {
                // const res = await fetch(`http://localhost:8080/zone?longitude=${longitude}&latitude=${latitude}&proximity=${proximity}`);
               
                // sending a hardcoded value for now for testing purposes 
                const res = await fetch(`http://localhost:8080/zone?longitude=19.8798306&latitude=75.3566968&proximity=100`);
                const data = await res.json();
              
                setRequests(data); 
            } catch (error) {
                console.log("Error in useGetRequest",error);
            }
        }
        getRequests();
    },[latitude, longitude, proximity])
    return {requests}
}

export default useGetRequest
