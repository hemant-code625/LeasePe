/* eslint-disable react/no-unknown-property */

import {  useState } from "react";

const ZonePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [locationOff, setLocationOff] = useState(false);
  const [speed, setSpeed] = useState(null);
  const [accuracy, setAccuracy] = useState(null);


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
  
    return (distance/1000) ;     // in meters
    }
  

// getting location from the user: 
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(position => {
    // setLatitude( position.coords.latitude);
    // setLongitude(position.coords.longitude);
//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     setLocationOff(false)
//   }, error => {
//     setLocationOff(true);
//     console.error(error.message);
//   },
//   { enableHighAccuracy: true }
//   );
// } else {
  
//   console.error('Geolocation is not supported by this browser.');
// }
function buttonClickHandler() {
  // Cancel the updates when the user clicks a button.
  navigator.geolocation.clearWatch(watchId);
}
const watchId = navigator.geolocation.watchPosition(position => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setSpeed(position.coords.speed);
    setAccuracy( position.coords.accuracy);

});

 const userLocation = { latitude, longitude};  // 19.875441919332864, 75.3392820182348
 const requestLocation = { latitude: 19.875441919332864, longitude: 75.3392820182348 }; 
 
 const proximityThreshold = 0.1;               // 100 meters in kilometers
 
 const distance = calculateDistance(
   userLocation.latitude,
   userLocation.longitude,
   requestLocation.latitude,
   requestLocation.longitude
 );
 
 if (distance <= proximityThreshold) {
   console.log('The user is within 100 meters of the request location.');
 } else {
   console.log('The user is not within 100 meters of the request location.');
 }

  return (
    // <div>
    //   {
    //     latitude && longitude &&
    //       <div>
    //       <p>Latitude: {latitude}</p>
    //       <p>Longitude: {longitude}</p>
    //       </div>
    //     }
    //   {distance <= proximityThreshold ? <div> Within 100 meters</div> : <div> Not within 100 meters</div>}
    //   {
    //     locationOff && <div>Turn on your location</div>
    //   }
    // </div>
    <>
    <iframe width={1000} height={500} src={`https://nominatim.openstreetmap.org?q=${latitude},${longitude}&amp;z=15&amp;output=embed`}>
    </iframe>
    <div>
      <button onClick={()=> buttonClickHandler}>
        Stop watching location
      </button>
    </div>
    <div>
      <p>Request user: lat:  19.875441919332864, long:75.3392820182348 </p>
      <p>Speed of current user: {speed}</p>
      <p>Accuracy of current user: {accuracy}</p>
        {distance <= proximityThreshold ? <div> Within 100 meters</div> : <div> Not within 100 meters</div>}
    </div>
    </>
  )  
}

export default ZonePage;

