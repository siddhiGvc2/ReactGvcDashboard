import moment from "moment";
import {  useState ,useEffect} from 'react';

// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { products } from 'src/_mock/products';
import { getAllData } from "src/_mock/fildData";

import { UserView } from 'src/sections/machineDataTable/view';

import MachineCard from '../machine-card';
import { store } from "../../../Redux/store";
import FieldSelection from "../fieldSelection"
import StatusSelection from '../statusSelection';
// import { getAllCustomerInfo } from "src/_mock/customers";

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
export default function ProductsView() {
  const [data,setData]=useState({data:[],dataAll:[]})
 
  // getting data from file 'src/Redux/store'
  store.subscribe(() => {
    // store in data hook
    setData(store.getState().data);
   
  });

  useEffect(() => {
    getAllData();
  
    const interval=setInterval(()=>{
     getAllData();
    },5000)

    return ()=>{
      clearInterval(interval)
    }
  },[]);



  useEffect(()=>{
       console.log(data);
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
        Machine Data
      </Typography>
     <Grid container spacing={2} maxWidth='xxl'>
        {/* all status selection ui machine status ,burn status, stock sttaus, door status in StatusSelection component */}
       <Grid xs={12} md={12} lg={2.7}>
         
        <StatusSelection/>
       </Grid>
  
      <Grid   xs={12} md={12} lg={9.3} >
        <Stack  container spacing='1' display='flex' flexWrap='wrap' direction='row' justifyContent='space-evenly' >
          {/* total machines ui */}
        <Grid  xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Machines"
            total={data.dataAll.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
          />
        </Grid>
          {/* online machines ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Online Machines"
            total={data.data.filter(filterOnline).length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/online.png" />}
          />
        </Grid>
         
         {/* total collection ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Collections"
            total={data.data.length ?amountText(data.dataAll.map(q => (q.cashCurrent + q.cashLife)).reduce(sum)):'...'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/collection.png" />}
          />
        </Grid>
        
        {/* item dispensed ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Item Despensed"
            total={data.data.length ?(data.dataAll.map(q => (q.qtyCurrent +  q.qtyLife)).reduce(sum)):'...'}
            color="error"
            icon={<img alt="icon" src="/assets/icons/items.png" />}
          />
        </Grid>
        </Stack>
        <Stack  container spacing="1" display='flex' flexWrap='wrap' direction='row' justifyContent='space-evenly'>
           {/* emty stock ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Stock Empty"
            total={data.data.filter(online).filter(m => m.spiral_a_status === 0).map(q => 1).length?data.data.filter(online).filter(m => m.spiral_a_status === 0).map(q => 1).reduce(sum):0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/EmptyStock.png" />}
          />
        </Grid>
         
         {/* low stock ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Low Stock"
            total={data.data.filter(online).filter(m => m.spiral_a_status === 1).map(q => 1).length?data.data.filter(online).filter(m => m.spiral_a_status === 1).map(q => 1).reduce(sum):0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/LowStock.png" />}
          />
        </Grid>
        
        {/* burning enabled ui */}
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Burning Enabled"
            total={data.data.filter(online).filter(m => m.burn_status === 1).map(q => 1).length?data.data.filter(online).filter(m => m.burn_status === 1).map(q => 1).reduce(sum):0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/Burning.png" />}
          />
        </Grid>

        {/* burning cycles ui */}

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Burning Cycles"
            total={data.data.map(q => (q.burnCycleCurrent+q.burnCycleLife)).length ?  data.data.map(q => (q.burnCycleCurrent+q.burnCycleLife)).reduce(sum):0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/BurningCycles.png" />}
          />
        </Grid>
        </Stack>
      </Grid>
      </Grid>
  {/* ******************************* */}

  <Grid container spacing={1} maxWidth='xxl'>
       {/* zone , ward , beat selection in FieldSelection component */}
       <Grid xs={12} md={12} lg={2.7}>
         
        <FieldSelection/>
       </Grid>
  

       {/* table of machineDat in UserView componet */}
      <Grid   xs={12} md={12} lg={9.3} >
        <UserView />
      </Grid>
      </Grid>
      {/* <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid> */}

    
    </Container>
  );
}
