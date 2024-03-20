import $ from 'jquery';
import PropTypes from 'prop-types';
import React, {  useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import {zoneData,wardData,beatData,getAllData } from 'src/_mock/fildData';
import { GetClentInfoDetails,GetClentNameDetails} from 'src/_mock/customers';

function FieldSelection({ sx, ...other }) {
  const [cities,setCities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
  const [zones,setZones]=useState([]);
  const [wards,setWards]=useState([]);
  const [beats,setBeats]=useState([]);
  const [cInfo,setCInfo]=useState(["City","Zone","Ward","Beat"]);
  const [cityName, setCitiesName] = useState(['Mumbai']);
  const [zoneName,setZonesName]=useState([]);
  const [wardName,setWardsName]=useState([]);
  const [beatName,setBeatsName]=useState([]);
  // const [machineType,setMachineType]=useState([]);
 
  // Other state variables for stock status, burn status, door status, etc.


  useEffect(()=>{
    const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
  
    // console.log(UserInfo);
    if (!UserInfo.isAdmin) {
                                      
      if (UserInfo.city){
        
       const Cities=(UserInfo.city).split(',')
        setCitiesName(Cities);
        setCities(Cities);
        sessionStorage.setItem("cities",JSON.stringify(Cities));
        $('#city').remove();
      }

       
  }
  if(UserInfo.clientName)
  {
    const obj={
      clientName:UserInfo.clientName
    }
     GetClentInfoDetails(obj).then((r)=>{
        //  console.log(r);
         setCities([]);
         setCitiesName([]);
         const cityArray=[];
           r.data.map((elem)=>
            cityArray.push(elem.City)
           )
           setCities(cityArray);
           setCitiesName(cityArray)
     })

     GetClentNameDetails(obj).then((r)=>{
        //  console.log(r);
         const Data=r.data;
         $('.CInfo1').text(Data[0].CInfo1);
         if(Data[0].CInfo1===''){
            $('.City').remove();
         }
         $('.CInfo2').text(Data[0].CInfo2);
          if(Data[0].CInfo2===''){
            $('.Zone').remove();
         }
         $('.CInfo3').text(Data[0].CInfo3);
          if(Data[0].CInfo3===''){
            $('.Ward').remove();
         }
         $('.CInfo4').text(Data[0].CInfo4);
          if(Data[0].CInfo4===''){
            $('.Beat').remove();
         }
          setCInfo([]);
          const CInfos=[];
           CInfos.push(r.data[0].CInfo1);
           CInfos.push(r.data[0].CInfo2);
           CInfos.push(r.data[0].CInfo3);
           CInfos.push(r.data[0].CInfo4);

           setCInfo(CInfos)
     })
  }


  },[])
 
 
 useEffect(()=>{

  zoneData(cityName).then((res)=>{
    // console.log(res);
    setZones(res);
  })
  wardData(cityName,zoneName).then((res)=>{
    // console.log(res);
    setWards(res);
  
  });
  beatData(cityName,zoneName,wardName).then((res)=>{
    // console.log(res);
    setBeats(res);
  
  });

  getAllData();

   

 },[cityName,zoneName,wardName,beatName])
  

  useEffect(()=>{
   
      zoneData(cityName).then((res)=>{
        // console.log(res);
        sessionStorage.setItem("zones",JSON.stringify(res));
        setZonesName(res);
        
      })

  },[cityName])

  
useEffect(()=>{
  
    wardData(cityName,zoneName).then((res)=>{
      // console.log(res);
      sessionStorage.setItem("wards",JSON.stringify(res));
      setWardsName(res);
     
    
    });

  

},[cityName,zoneName])
 
useEffect(()=>{
 
    beatData(cityName,zoneName,wardName).then((res)=>{
      // console.log(res);
      sessionStorage.setItem("beats",JSON.stringify(res));
      setBeatsName(res);
      
    });

  

},[cityName,zoneName,wardName])
 
 

  const handleCityChange = (event) => {
    sessionStorage.setItem("cities",JSON.stringify(event.target.value));
    setCitiesName(event.target.value);
  
    // Handle other logic as needed
  };
  const handleZoneChange = (event) => {
    sessionStorage.setItem("zones",JSON.stringify(event.target.value));
    setZonesName(event.target.value);
   
    // Handle other logic as needed
  };
  const handleWardChange = (event) => {
    sessionStorage.setItem("wards",JSON.stringify(event.target.value));
    setWardsName(event.target.value);
   
    // Handle other logic as needed
  };
  const handleBeatChange = (event) => {
    sessionStorage.setItem("beats",JSON.stringify(event.target.value));
    setBeatsName(event.target.value);
   
    // Handle other logic as needed
  };
 
  const selectAllCities=()=>{
    sessionStorage.setItem("cities",JSON.stringify(cities));
    setCitiesName(cities)

  }
  const selectNoneCities=()=>{
    sessionStorage.setItem("cities",JSON.stringify([]));
    setCitiesName([])
  }


  const selectAllZones=()=>{
    sessionStorage.setItem("zones",JSON.stringify(zones));
    setZonesName(zones)

  }
  const selectNoneZones=()=>{
    sessionStorage.setItem("zones",JSON.stringify([]));
    setZonesName([])
  }
  const selectAllWards=()=>{
    sessionStorage.setItem("wards",JSON.stringify(wards));
    setWardsName(wards)
  }
  const selectNoneWards=()=>{
    sessionStorage.setItem("wards",JSON.stringify([]));
    setWardsName([])
  }

  const selectAllBeats=()=>{
    sessionStorage.setItem("beats",JSON.stringify(beats));
    setBeatsName(beats)
  }
  const selectNoneBeats=()=>{
    sessionStorage.setItem("beats",JSON.stringify([]));
    setBeatsName([])
  }


  return (
    <Card
      component={Stack}
      spacing={1}
      direction="column"
      sx={{
        px: 1,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.5}>
        {/* Machine Status Dropdown */}
        <div className="mt-2 pb-2 border-bottom-1" id="city">
          <h5 className="text-primary d-inline">{cInfo[0]}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllCities} ><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={cityName}
                onChange={handleCityChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(selected) => {
                  if (selected.length===cities.length) {
                       return`All Selected(${selected.length})`;
                  } 
                  if(selected.length===0) {
                       return 'None Selected';
                  }
                  if(selected.length===1)
                  {
                    return `${selected[0]}`
                  }
                  return `${selected.length} Selected`
              }}
              >
                
                {
                  cities.map((elem)=>
                     <MenuItem value={elem}>
                    <Checkbox checked={cityName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
             
              </Select>
              <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneCities}><i
                                    className="fa fa-times"/></button>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">{cInfo[1]}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllZones}><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={zoneName}
                onChange={handleZoneChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(selected) => {
                  if (selected.length===zones.length) {
                       return`All Selected(${selected.length})`;
                  } 
                  if(selected.length===0) {
                       return 'None Selected';
                  }
                  if(selected.length===1)
                  {
                    return `${selected[0]}`
                  }
                  return `${selected.length} Selected`
              }}
              >

                {
                  zones.map((elem)=>
                     <MenuItem value={elem}>
                    <Checkbox checked={zoneName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
             
               
              </Select>
              <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneZones}><i
                                    className="fa fa-times"/></button>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">{cInfo[2]}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllWards}><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={wardName}
                onChange={handleWardChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(selected) => {
                  if (selected.length===wards.length) {
                       return`All Selected(${selected.length})`;
                  } 
                  if(selected.length===0) {
                       return 'None Selected';
                  }
                  if(selected.length===1)
                  {
                    return `${selected[0]}`
                  }
                  return `${selected.length} Selected`
              }}
              >

                {
                  wards.map((elem)=>
                    <MenuItem value={elem}>
                    <Checkbox checked={wardName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
                
              </Select>
              <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneWards} ><i
                                    className="fa fa-times"/></button>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">{cInfo[3]}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto"onClick={selectAllBeats} ><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={beatName}
                onChange={handleBeatChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(selected) => {
                  if (selected.length===beats.length) {
                       return`All Selected(${selected.length})`;
                  } 
                  if(selected.length===0) {
                       return 'None Selected';
                  }
                  if(selected.length===1)
                  {
                    return `${selected[0]}`
                  }
                  return `${selected.length} Selected`
              }}
              >

               {
                  beats.map((elem)=>
                   <MenuItem value={elem}>
                    <Checkbox checked={beatName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
                  
              </Select>
              <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneBeats} ><i
                                    className="fa fa-times"/></button>
            </div>
          </div>
        </div>

        {/* Other Dropdowns */}
        {/* ... */}
      </Stack>
    </Card>
  );
}

FieldSelection.propTypes = {
  sx: PropTypes.object,
};

export default FieldSelection;