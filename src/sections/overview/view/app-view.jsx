import moment from "moment";
// import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';

// import { useLocation } from 'react-router-dom';
// import { useState} from 'react';


import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

// import Typography from '@mui/material/Typography';
// import { useRouter } from 'src/routes/hooks';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
import {fetchData} from "../../../_mock/machineData";
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------


// started function of dashboard ui here
export default function AppView() {
  
  const [pathName,setPathName]=useState({data:[],dataAll:[]});
 

  // calling for api data
  const LoadData=()=>{
    fetchData().then((res)=>{
      setPathName(res);
    
    });
   
  }

  // calling loadData every 5 seconds
  useEffect(() => {
 
   
   
    // setPathName(1);
    LoadData();
    setInterval(()=>{
      LoadData();
    },5000)
  },[]);

  
  
 
  const theme = useTheme('...');
  // const router=useRouter();


  // filtering onlines machines
  const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  
  // const online = m => moment().diff(moment.utc((m.lastHeartbeatTime || m.lastOnTime).replace('Z', '')), 'minute') < 5;


  // converting value in the form of lacks, thousand ,Coror
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



 // calulating some of two numbers
 const sum = (a, b) => a + b;

  


  return (
    <Container maxWidth="xxl" >
      

      <Grid container spacing={3} onClick={()=> setPathName(1)}>
        {/* total Machines */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Machines"
            total={pathName.dataAll.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
          />
        </Grid>
         {/* online machines */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Online Machines"
            total={pathName.data.filter(filterOnline).length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/online.png" />}
          />
        </Grid>
        {/* total collection */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Collections"
            total={pathName.data.length ?amountText(pathName.dataAll.map(q => (q.cashCurrent + q.cashLife)).reduce(sum)):'...'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/collection.png" />}
          />
        </Grid>
           {/* item dispensed */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Despensed"
            total={pathName.data.length ?(pathName.dataAll.map(q => (q.qtyCurrent +  q.qtyLife)).reduce(sum)):'...'}
            color="error"
            icon={<img alt="icon" src="/assets/icons/items.png" />}
          />
        </Grid>

        {/* Machine Status */}
        <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title="Machine Status"
            chart={{
              series: [
                { label: 'Online', value:pathName.data.filter(filterOnline).length||0 },
                { label: 'Offline', value:(pathName.data.length - pathName.data.filter(filterOnline).length) ||0},
             
              ],
              colors:[
                theme.palette.success.main,
                theme.palette.error.main,
              ]
            }}
          />
        </Grid>
       
        {/* Stcok Status */}
        <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title="Stock Status"
            chart={{
              series: [
                { label: 'Ok', value: pathName.data.filter(filterOnline).filter(m => m.spiral_a_status === 3).length ||0},  // Example color
                { label: 'Low', value: pathName.data.filter(filterOnline).filter(m => m.spiral_a_status === 1).length ||0},
                { label: 'Empty', value: pathName.data.filter(filterOnline).filter(m => m.spiral_a_status === 0).length ||0 },
                { label: 'Unknown', value:pathName.data.filter(filterOnline).filter(m => m.spiral_a_status === 2).length ||0},
              ],
              colors:[
                theme.palette.success.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.info.main,
               
               
               ]
             
            }}
          />
        </Grid>
     </Grid>
        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid> */}
    </Container>
  );
}
