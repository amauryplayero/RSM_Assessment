import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';




export default function Map(props) {
    let latitude = props.coordinates.latitude
    let longitude = props.coordinates.longitude


    if(latitude && longitude === undefined){
        latitude = 0
        longitude = 0
    }else {

    }
    

       
    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      };
      
// console.log(center)
   
  return (
      <>
    <div>Map</div>
    <LoadScript
        googleMapsApiKey="AIzaSyA24d9fZWIHid1RGcM649JMkas26tC5Qvk"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}>
          <Marker position={{lat:center.lat, lng:center.lng}} />
          <></>
        </GoogleMap>
      </LoadScript>
  
      </>
  )
}
