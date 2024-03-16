/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext.js";
import { useSocketContext } from "../context/SocketContext";
import RequestBox from "../components/requests/RequestNav.jsx";
import { useNavigate } from "react-router-dom";
import Container from "../components/requests/Container.jsx";
import Navbar from "../components/Navbar.jsx";
import RequestNav from "../components/requests/RequestNav.jsx";

const ZonePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const user = useUserContext().user;
  const socket = useSocketContext().socket;
  const proximity = 100; // hardcoded value for now

  // getRequest from the server
  useEffect(() => {
    const getRequests = async () => {
      try {
        // const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_HOST}/zone?longitude=${longitude}&latitude=${latitude}&proximity=${proximity}`);

        // sending a hardcoded value for now for testing purposes
        const res = await fetch(
          `http://localhost:8080/zone?longitude=19.8798306&latitude=75.3566968&proximity=100`
        );
        const data = await res.json();

        setRequests(data);
        console.log(data);
      } catch (error) {
        console.log("Error in useGetRequest", error);
      }
    };
    getRequests();
  }, [latitude, longitude]);

  // listen to the server for new requests
  useEffect(() => {
    if (socket) {
      const handleGetRequests = (newRequests) => {
        setRequests((prevRequests) => [...prevRequests, newRequests]);
      };

      socket.on("newRequest", handleGetRequests);

      // Clean up event listener
      return () => {
        socket.off("newRequest", handleGetRequests);
      };
    }
  }, [socket]);

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setAccuracy(position.coords.accuracy);
    setAltitude(position.coords.altitude);
  });

  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  const extractTime =(dateString)=> {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }
  const extractDate =(timestamp)=> {
    var date = new Date(timestamp);
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var offset = 330 * 60000;
    var ist = new Date(utc + offset);
    var day = ist.getDate();
    var month = ist.getMonth() + 1; // Months are zero-based, so we add 1
    var year = ist.getFullYear();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    return `${day}-${month}-${year}`;
  }

  return (
    <>
    <Navbar/>
    
    <div className="container m-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {requests.map((request, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg p-4 flex flex-col justify-between"
            >
              <div className=" text-gray-500">
                {/* for user info who created this request */}
                <span className="flex flex-col items-start justify-center">
                  <h2>{request.user?.name}</h2>      
                <img src={request.user?.picture} alt="profile-picture"  className="rounded-full size-12"/>
                <p>Time: { extractTime(request.timestamp) }</p>
                <p>Date: {extractDate(request.timestamp)}</p>
                </span>
              </div>
              <div className="text-black">
                <p className=" text-xl">{request.requestTitle}</p>
                <p>Description: {request.requestDescription}</p>
              </div>
              <div className="flex justify-end">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Accept
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default ZonePage;
