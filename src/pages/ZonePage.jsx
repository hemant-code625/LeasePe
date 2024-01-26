/* eslint-disable react/no-unknown-property */

import {  useState } from "react";

const ZonePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [locationOff, setLocationOff] = useState(false);

  // Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;                                // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;                       // Distance in kilometers
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
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
  
});

 const userLocation = { latitude, longitude };  // 19.875441919332864, 75.3392820182348
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
    </>
  )
}

export default ZonePage;

