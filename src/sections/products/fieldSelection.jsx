import PropTypes from 'prop-types';
import React, {  useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import {zoneData,wardData,beatData,getAllData } from 'src/_mock/fildData';

function FieldSelection({ sx, ...other }) {
  const [cities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
  const [zones,setZones]=useState([]);
  const [wards,setWards]=useState([]);
  const [beats,setBeats]=useState([]);

  const [cityName, setCitiesName] = useState(['Mumbai']);
  const [zoneName,setZonesName]=useState([]);
  const [wardName,setWardsName]=useState([]);
  const [beatName,setBeatsName]=useState([]);
 
  // Other state variables for stock status, burn status, door status, etc.
 
 
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

  getAllData(cityName,zoneName,wardName,beatName)

   

 },[cityName,zoneName,wardName,beatName])
  

  useEffect(()=>{
   
      zoneData(cityName).then((res)=>{
        // console.log(res);
        setZonesName(res);
      })

  },[cityName])

  
useEffect(()=>{
  
    wardData(cityName,zoneName).then((res)=>{
      // console.log(res);
      setWardsName(res);
    
    });

  

},[cityName,zoneName])
 
useEffect(()=>{
 
    beatData(cityName,zoneName,wardName).then((res)=>{
      // console.log(res);
      setBeatsName(res);
    
    });

  

},[cityName,zoneName,wardName])
 
 

  const handleCityChange = (event) => {
    setCitiesName(event.target.value);
  
    // Handle other logic as needed
  };
  const handleZoneChange = (event) => {
    setZonesName(event.target.value);
  
    // Handle other logic as needed
  };
  const handleWardChange = (event) => {
    setWardsName(event.target.value);
  
    // Handle other logic as needed
  };
  const handleBeatChange = (event) => {
    setBeatsName(event.target.value);
    
    // Handle other logic as needed
  };
 
  const selectAllCities=()=>{
    setCitiesName(cities)

  }
  const selectNoneCities=()=>{
    setCitiesName([])
  }


  const selectAllZones=()=>{
    setZonesName(zones)

  }
  const selectNoneZones=()=>{
    setZonesName([])
  }
  const selectAllWards=()=>{
    setWardsName(wards)
  }
  const selectNoneWards=()=>{
    setWardsName([])
  }

  const selectAllBeats=()=>{
    setBeatsName(beats)
  }
  const selectNoneBeats=()=>{
    setBeatsName([])
  }

  // useEffect(()=>{
  //   zoneData(city).then((res)=>{
  //     setZones(res);
    
  //   });

  // },[zones])
  

  // Other similar handler functions for different dropdowns

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
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">City</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllCities} ><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={cityName}
                onChange={handleCityChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
              >
                 <MenuItem value="Mumbai">
                  <Checkbox checked={cityName.indexOf('Mumbai') > -1} />
                  Mumbai
                </MenuItem>
                <MenuItem value="Delhi">
                  <Checkbox checked={cityName.indexOf('Delhi') > -1} />
                  Delhi
                </MenuItem>
                <MenuItem value="SS-UK">
                  <Checkbox checked={cityName.indexOf('SS-UK') > -1} />
                  SS-UK
                </MenuItem>
                <MenuItem value="DoE-HAR">
                  <Checkbox checked={cityName.indexOf('DoE-HAR') > -1} />
                  DoE-HAR
                </MenuItem>
              </Select>
              <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneCities}><i
                                    className="fa fa-times"/></button>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">Zone</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllZones}><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={zoneName}
                onChange={handleZoneChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
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
          <h5 className="text-primary d-inline">Ward</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto" onClick={selectAllWards}><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={wardName}
                onChange={handleWardChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
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
          <h5 className="text-primary d-inline">Beat</h5>
          <div className="row">
            <div className="col-12 d-flex">
            <button type='button' className="btn btn-sm btn-success text-white my-auto"onClick={selectAllBeats} ><i
                                    className="fa fa-check"/></button>
              <Select
                multiple
                value={beatName}
                onChange={handleBeatChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
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