import L from 'leaflet';
import moment from 'moment';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

 // Import Leaflet CSS

import Card from '@mui/material/Card';
import { Container } from '@mui/system';

let map;
export default function Map({cs,ls}){
   // Declare a variable to store the map instance

   const amountText = amt => {
    amt = amt || 0;
 
    if(amt>=10000000) {
        const cr = parseInt(amt / 100000, 10) / 100;
        const Cr = parseFloat(cr.toFixed(2));
        return `${Cr} Cr`;
    } 
    if(amt>=1000000) {
        const l = parseInt(amt / 1000 ,10) / 100;
        const Lak = parseFloat(l.toFixed(6));
        return  `${Lak} L`;
    } 
    if(amt>=1000) {
        const k = parseInt(amt / 10 ,10) / 100;
        const K = parseFloat(k.toFixed(2));
        return  `${K} K`;
    }

    // Remove the unnecessary else statement
    return amt;

}



  const loadMap=(center,locations)=>{
   
    // Function to format amount text
   
   

        let Length = 0;
  const locationsData = localStorage.getItem("Locations");
  const locationsArray=JSON.parse(locationsData);
  
  if (locationsData) {
   
    
    if (Array.isArray(locationsArray)) {
      Length = locationsArray.length;
    } else {
      console.error("Data in 'Locations' is not a valid array:", locationsArray);
    }
  } else {
    console.log("No data found in 'Locations' key.");
  }
 if(locations.length!== Length){
     if (map) {
    // Remove existing map and its container
    map.remove();
   
  }

 }
   localStorage.setItem("Locations",JSON.stringify(locations));
  map = L.map('map', {
    center,
    zoom: 9,
    scrollWheelZoom: false  // Disable scroll wheel zoom
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const bounds = calculateBounds(center, locations);
  map.fitBounds(bounds);

  locations.forEach(location => {
    let Status;
    const st=moment().diff(moment.utc((location.data.lastHeartbeatTime || location.data.lastOnTime).replace('Z', '')), 'minute') < 5;

    if(st)
    {
        Status="Online"
    }
    else{
        Status="Offline"
    }
       
    const marker = L.marker(location.coordinates).addTo(map);
 
    marker.bindPopup(`
         <b style="font-size: 1.25em;">${location.data.uid} ${location.data.machineId}</b>
                        <table class="table">
                            <tbody> 
                                  <tr><th style="color: #444">Status</th><td style="color: #444" class="text-${st ? 'success' : 'danger'}">${Status}</td></tr>
                                <tr><th style="color: #444">IMSI</th><td style="color: #444">${location.data.sim_number}</td></tr>
                                <tr><th style="color: #444">RSSI</th><td style="color: #444">${location.data.rssi}</td></tr>
                                <tr><th style="color: #444">Collection</th><td style="color: #444">&#8377;&nbsp;${location.data.cashCurrent} <span class="text-muted">[ &#8377;&nbsp;${amountText(location.data.cashLife + location.data.cashCurrent)} ]</span></td></tr>
                                <tr><th style="color: #444">Items Dispensed</th><td style="color: #444">${location.data.qtyCurrent} <span class="text-muted">[ ${amountText(location.data.qtyLife + location.data.qtyCurrent)} ]</span></td></tr>
                                
                                <tr id="itemsBurntRow" ><th style="color: #444;" >Items Burnt</th><td style="color: #444" >${location.data.doorCurrent} <span class="text-muted ">[ ${amountText(location.data.doorLife + location.data.doorCurrent)} ]</span></td></tr>
                                <tr id="burningCyclesRow"><th style="color: #444;" >Burning Cycles</th><td style="color: #444">${location.data.burnCycleCurrent} <span class="text-muted ">[ ${amountText(location.data.burnCycleLife + location.data.burnCycleCurrent)} ]</span></td></tr>
                        
                                <tr><th style="color: #444">On Since</th><td style="color: #444">${moment.utc((location.data.lastOnTime || location.data.lastHeartbeatTime).replace('Z', '')).local().format('DD-MMM-YYYY<br/>hh:mm a')}</td></tr>
                                {{!-- <tr class="${st ? 'd-none' : ''}"><th style="color: #444">Last Online At</th><td style="color: #444">${location.data.lastHeartbeatTime ? moment.utc(location.data.lastHeartbeatTime.replace('Z', '')).local().format('DD-MMM-YYYY<br/>hh:mm a') : 'NA'}</td></tr> --}}
                            </tbody>
                        </table>
    `);
          })
    

  }

  useEffect(() => {
    // Function to calculate bounds
  
   
    // Call the loadMap function when the component mounts or when center/locations change
    const cleanup = loadMap(cs, ls);

    // Cleanup the map on component unmou
    return cleanup;
  }, []);


  const calculateBounds = (c, lo) => {
    const padding = 0.02;
    const bounds = L.latLngBounds([
      [c[0] - padding, c[1] - padding],
      ...lo.map(location => [
        location.coordinates[0],
        location.coordinates[1]
      ])
    ]);
    return bounds;
  };

    return(
        <Card>
            <Container maxWidth='xxl'>
            <div id="map" style={{ height: '600px', marginTop:'20px' }}/>
            </Container>
         </Card>
      
    )
}


Map.propTypes = {
    cs: PropTypes.any,
    ls:PropTypes.any
  };