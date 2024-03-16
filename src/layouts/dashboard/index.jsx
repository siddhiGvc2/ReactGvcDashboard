import PropTypes from 'prop-types';
import { useState , useEffect} from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import { getLatLon, sendLattLon } from 'src/_mock/loginLogsData';

import {Nav} from './nav';
import Main from './main';
import Header from './header';


// ----------------------------------------------------------------------

// main componet of sidepanel
// const API =import.meta.env.VITE_REACT_APP_API;
const GEOLOCATION=import.meta.env.VITE_REACT_APP_GEOLOCATION;
const Time=import.meta.env.VITE_REACT_APP_LOCATION_TRACKING_TIME;
export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const router=useRouter();
 

  useEffect(() => {
    let interval1;
    let interval2;
    if(!sessionStorage.getItem("token"))
    {
      router.push("/");
    }
    else  if (GEOLOCATION){
     
   
        getLatLon();
        interval1 = setInterval(() => {
          getLatLon();
        }, 5000);
    
        sendLattLon();
        interval2 = setInterval(() => {
          sendLattLon("Login");
        }, Time);
    
        return () => {
          clearInterval(interval2);
          clearInterval(interval1);
        };
      

    }


   
    return () => {
      clearInterval(interval2);
      clearInterval(interval1);
    };
  }, [router]); // Include GEOLOCATION in the dependency array
  


  

  return (
    <>
      <Header onOpenNav={()=>setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={()=>setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
