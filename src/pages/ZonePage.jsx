/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext.js";
import { useSocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {  getChatRoomId } from "../utils/chatRoom.js";
import { extractDate, extractTime } from "../utils/extractTime.js";

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

  const handleAcceptRequest = (acceptedRequest) => {
      // send friendId to the server
      // save it in the database
      // remove the request from the list
      // join them in a chat room
    const friend = {name :acceptedRequest.user.name,id: acceptedRequest.user.id, picture: acceptedRequest.user.picture};
    navigate(`/chat?with=${JSON.stringify(friend)}`);
    
  };

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setAccuracy(position.coords.accuracy);
    setAltitude(position.coords.altitude);
  });



  return (
    <>
    <Navbar/>
    
    <div className="container m-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          { 
          requests.length === 0 ? 
          <div className="text-center text-2xl">
            No requests found at your place.
          </div> :
          requests.map((request, index) => (
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
                <button onClick={()=>handleAcceptRequest(request)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
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
