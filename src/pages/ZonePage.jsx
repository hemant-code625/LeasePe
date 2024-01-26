
/* eslint-disable react/no-unknown-property */

import {  useState } from "react";

const ZonePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [altitude, setAltitude] = useState(null);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
  
    // Convert coordinates to radians
    const lat1Rad = Math.PI * lat1 / 180;
    const lon1Rad = Math.PI * lon1 / 180;
    const lat2Rad = Math.PI * lat2 / 180;
    const lon2Rad = Math.PI * lon2 / 180;
  
    // Apply the Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    return (distance) ;     
    }


navigator.geolocation.watchPosition(position => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setSpeed(position.coords.speed);
    setAccuracy( position.coords.accuracy);
    setAltitude(position.coords.altitude);
    console.log(position.coords);

});

 const userLocation = { latitude, longitude};  
 const requestLocation = { latitude: 19.875441919332864, longitude: 75.3392820182348 }; 
 
 const proximityThreshold = 0.1;      // 100 meters in kilometers
 
 const distance = calculateDistance(
   userLocation.latitude,
   userLocation.longitude,
   requestLocation.latitude,
   requestLocation.longitude
 );

  return (
    <>
    <iframe src={`https://nominatim.openstreetmap.org?q=${latitude},${longitude}&amp;z=15&amp;output=embed`}>
    </iframe>
    <div>
      <p>Your coordinates lat: {latitude}, long: {longitude} </p>
      <p>Your Speed: {speed}</p>
      <p>Your Altitude: {altitude} </p>
      <p>Accuracy of current user: {accuracy}</p>
        {distance <= proximityThreshold ? <div> Within 100 meters</div> : <div> Not within 100 meters</div>}
    </div>
    </>
  )  
}

export default ZonePage;

