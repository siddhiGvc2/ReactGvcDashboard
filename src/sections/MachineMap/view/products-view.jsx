import $ from 'jquery';
import moment from "moment";
import {  useState,useEffect } from 'react';

// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { getAllData } from "src/_mock/fildData";
// import { products } from 'src/_mock/products';
// import { UserView } from 'src/sections/machineDataTable/view';
import {GetClentNameDetails} from 'src/_mock/customers';

import Map from "../map";
import MachineCard from '../machine-card';
import { store } from "../../../Redux/store";
import FieldSelection from "../fieldSelection"
import StatusSelection from '../statusSelection';


// import { useState } from 'react';
// import UserTableToolbar from 'src/sections/user/user-table-toolbar';


// import { Stack } from '@mui/material';
// import { Stack } from '@mui/material';
// import ProductCard from '../product-card';
// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------



// machineData ui componet started here
export default function MachineMapView() {
  const [data,setData]=useState({data:[],dataAll:[]})
  // const [mapData,setMapData]=useState(null);
  const [center,setCenter]=useState(null);
  const [locations,setLocations]=useState(null);
  const [machineType,setMachineType]=useState('');
  // getting data from file 'src/Redux/store'
  store.subscribe(() => {
    // store in data hook
    setData(store.getState().data);
    // setMapData(store.getState().data.data);
    // const Data=store.getState().data.data;
      // console.log(Data);
                   
   
  });

  


  useEffect(()=>{
    const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
     const Obj={
      clientName:UserInfo.clientName
     }
    GetClentNameDetails(Obj).then((r)=>{
      // const MachineType=r.data[0].MachineType
      const [{ MachineType }] = r.data;
      if(MachineType==="Incinerator")
      {
        $('.vending').remove();
      }
      else if(MachineType==="Vending")
      {
        $('.incinerator').remove();
      }
      setMachineType(MachineType);

    })
      setTimeout(()=>{
        if(data.data.length>0)
        {
        const Data=data.data;
        const index = Data.length > 0 ? parseInt(Data.length / 2 ,10) : 0;
                if(Data.length>0)
                {
        const Lat=Data[index].lat;
       const Lon=Data[index].lon;
       const centers=[Lat,Lon];

        const location=[];
       for(let i=0;i<Data.length;i+=1)
       {
       
       const obj={ data:Data[i], coordinates: [Data[i].lat,Data[i].lon] }
       location.push(obj);

       }
    //  console.log(location)
     setCenter(centers);
     setLocations(location)
      }
      }
      },3000)
    
  },[data])


  // filtering online machines
  const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  
  //  caheckin machine is online or not
  const online = m => moment().diff(moment.utc((m.lastHeartbeatTime || m.lastOnTime).replace('Z', '')), 'minute') < 5;


  // calculated amount as lacks , coror, thound
  const amountText = amt => {
    amt = amt || 0;
 
    if(amt>=10000000) {
        const cr = parseInt(amt / 100000, 10) / 100;
        const Cr = parseFloat(cr.toFixed(2));
        return `${Cr} Cr`;
    } 
    if(amt>=1000000) {
        const l = parseInt(amt / 1000 ,10) / 100;
        const L = parseFloat(l.toFixed(6));
        return  `${L} L`;
    } 
    if(amt>=1000) {
        const k = parseInt(amt / 10 ,10) / 100;
        const K = parseFloat(k.toFixed(2));
        return  `${K} K`;
    }

    // Remove the unnecessary else statement
    return amt;
}




const sum = (a, b) => a + b;

  return (
    <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Machine Map
      </Typography>
     <Grid container spacing={2} maxWidth='xxl'>
        {/* all status selection ui machine status ,burn status, stock sttaus, door status in StatusSelection component */}
       <Grid xs={12} md={12} lg={2.7}>
         
        <StatusSelection MachineType={machineType}/>
       </Grid>
  
      <Grid   xs={12} md={12} lg={9.3} >
        <Stack  container spacing='1' display='flex' flexWrap='wrap' direction='row' justifyContent='space-evenly' >
          {/* total machines ui */}
        <Grid  xs={12} sm={6} md={machineType==="Vending" ? 4 :3}>
         
          <MachineCard
            title="Total Machines"
            total={data.dataAll.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
          />
           
        </Grid>
          {/* online machines ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3}>
          <MachineCard
            title="Online Machines"
            total={data.data.filter(filterOnline).length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/online.png" />}
          />
        </Grid>
         
         {/* total collection ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="vending">
          <div className="vending">
          <MachineCard
            title={machineType ==="RECD" ? "Defective Sensor":"Total Collection"}
            total={data.data.length ?amountText(data.dataAll.map(q => (q.cashCurrent + q.cashLife)).reduce(sum)):'...'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/collection.png" />}
          />
           </div>
        </Grid>
        
        {/* item dispensed ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="vending">
        <div className="vending">
          <MachineCard
            title={machineType ==="RECD" ? "Tempered":"Item Dispensed"}
            total={data.data.length ?(data.dataAll.map(q => (q.qtyCurrent +  q.qtyLife)).reduce(sum)):'...'}
            color="error"
            icon={<img alt="icon" src="/assets/icons/items.png" />}
          />
          </div>
        </Grid>
        {/* </Stack> */}
        {/* <Stack  container spacing="1" display='flex' flexWrap='wrap' direction='row' justifyContent='space-evenly'> */}
           {/* emty stock ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="vending">
          <div className="vending">
          <MachineCard
            title="Stock Empty"
            total={data.data.filter(online).filter(m => m.spiral_a_status === 0).map(q => 1).length?data.data.filter(online).filter(m => m.spiral_a_status === 0).map(q => 1).reduce(sum):0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/EmptyStock.png" />}
          />
            </div>
        </Grid>
         
         {/* low stock ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="vending">
          <div className="vending">
          <MachineCard
            title="Low Stock"
            total={data.data.filter(online).filter(m => m.spiral_a_status === 1).map(q => 1).length?data.data.filter(online).filter(m => m.spiral_a_status === 1).map(q => 1).reduce(sum):0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/LowStock.png" />}
          />
          </div>
        </Grid>
        
        {/* burning enabled ui */}
        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="incinerator">
        <div className="incinerator">
          <MachineCard
            title="Burning Enabled"
            total={data.data.filter(online).filter(m => m.burn_status === 1).map(q => 1).length?data.data.filter(online).filter(m => m.burn_status === 1).map(q => 1).reduce(sum):0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/Burning.png" />}
          />
          </div>
        </Grid>

        {/* burning cycles ui */}

        <Grid xs={12} sm={6} md={machineType==="Vending" ? 4 :3} className="incinerator">
        <div className="incinerator">
          <MachineCard
            title="Total Burning Cycles"
            total={data.data.map(q => (q.burnCycleCurrent+q.burnCycleLife)).length ?  data.data.map(q => (q.burnCycleCurrent+q.burnCycleLife)).reduce(sum):0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/BurningCycles.png" />}
          />
          </div>
        </Grid>
        </Stack>
      </Grid>
      </Grid>
  {/* ******************************* */}

     <Grid container spacing={1} maxWidth='xxl' >
       {/* zone , ward , beat selection in FieldSelection component */}
       <Grid xs={12} md={12} lg={2.7} >
         
        <FieldSelection/>
       </Grid>
  

       {/* map ui componet */}
      <Grid   xs={12} md={12} lg={9.3} >
        {locations && <Map center={center} locations={locations} MachineType={machineType}/>}
      </Grid>
      </Grid>
    

    
    </Container>
  );
}
