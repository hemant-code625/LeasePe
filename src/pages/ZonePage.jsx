/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {useUserContext} from "../hooks/useUserContext.js";
import {useSocketContext} from "../context/SocketContext";
import RequestBox from "../components/Requests/RequestBox.jsx";
import Requests from "../components/Requests/Requests.jsx";

const ZonePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [altitude, setAltitude] = useState(null);
  
  const [requests, setRequests] = useState([]);
  const user = useUserContext().user;
  const socket = useSocketContext().socket;
  const proximity = 100;            // hardcoded value for now

  // getRequest from the server
    useEffect(()=> {
      const getRequests = async () => {
          try {
              // const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_HOST}/zone?longitude=${longitude}&latitude=${latitude}&proximity=${proximity}`);
             
              // sending a hardcoded value for now for testing purposes 
              const res = await fetch(`http://localhost:8080/zone?longitude=19.8798306&latitude=75.3566968&proximity=100`);
              const data = await res.json();
            
              setRequests(data); 
          } catch (error) {
              console.log("Error in useGetRequest",error);
          }
      }
      getRequests();
  },[latitude, longitude]);

// listen to the server for new requests
useEffect(() => {
    if(socket){
        const handleGetRequests = (newRequests) => {
            setRequests((prevRequests) => [...prevRequests, newRequests]);
        };

        socket.on("newRequest", handleGetRequests);

        // Clean up event listener
        return () => {
          socket.off("newRequest", handleGetRequests);
      };
    }
  
},[socket])
  

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setAccuracy(position.coords.accuracy);
    setAltitude(position.coords.altitude);
  });

  return (
    <>
      <div className="absolute">
        <h3>Requests</h3>
        {requests.map((request) => (
          <div key={request._id}>
            <h4>{request.requestTitle}</h4>
            <p>{request.requestDescription}</p>
          </div>
        ))}
      </div>

      
      <RequestBox user ={user}/>
      {/* <Requests/> */}
    </>
  );
};

export default ZonePage;

