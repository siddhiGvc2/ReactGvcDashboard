// import ListItemButton from '@mui/material/ListItemButton';
// import { accordionActionsClasses } from "@mui/material";
import $ from "jquery";
import { useEffect } from "react";
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { account } from 'src/_mock/account';

// import Typography from '@mui/material/Typography';


import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';
// import { usePathname } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';




export default function SideBar(){

    useEffect(()=>{

        const clientName=window.sessionStorage.getItem("clientName") || '';
        // const isAdmin= window.sessionStorage.getItem("isAdmin")===true;
        const displayName=window.sessionStorage.getItem("name") || "Siddhi";

        if(displayName!=="Demo")
        {
            // console.log("isAdmin :",window.sessionStorage.getItem("isAdmin"));
        if (window.sessionStorage.getItem("isAdmin")==='false') {
 
            $('.metismenu .ra').remove(); 
          

        }
          else if (window.sessionStorage.getItem("isAdmin")==='true'){
            if(clientName)
            {
               $('.superAdmin').text(account.clientName)  
            }
            else{
                $('.metismenu .da').remove(); 
            }
           
          } 

          $('.metismenu .da').remove(); 
        }
       
         else if(displayName==="Demo")
          {
             $('.metismenu .us').remove(); 
               $('.metismenu .set').remove(); 
          }


    },[])

    const handleKeyPress = (event) => {
        // Check if the 'Enter' key is pressed
        if (event.key === 'Enter') {
          OpenLocationMap();
        }
      };


    const OpenLocationMap=()=>{
        window.open(`https://maps.google.com?q=${sessionStorage.getItem("Lattitude")},${sessionStorage.getItem("Longitude")}`);
    }


    return(
        <div className="quixnav">
        <div className="quixnav-scroll">
            <ul className="metismenu" id="menu" >
              
               <li className="mt-1">
                     <NavItem path="/dashboard" icon={ <i className="fa-solid fa-chart-line" />} title='Dashboard'/>
                </li>

                <li  className="ra mt-1">
                      <NavItem path="/machines" icon={ <i className="fa-solid fa-fan" />} title='Machines'/>
                 </li>
                 <li className="ra mt-1">
                       <NavItem  path="/customers" icon={ <i className="fa-solid fa-people-group"/>} title='Customers'/>
                  </li>
                  <li className=" mt-1"> 
                        <NavItem  path="/machineData" icon={ <i className="fa-solid fa-database"/>} title='Machine Data'/>
                  </li>
                  <li className=" mt-1">
                     <NavItem  path="/machineMap" icon={ <i className="fa-solid fa-location-dot"/>} title='Machine Map'/>
                 </li>
                 <li className="ra mt-1">
                     <NavItem  path="/user" icon={ <i className="fa-solid fa-users-line"/>} title='Users'/>
                 </li>
                 <li className="mt-1">
                     <NavItem  path="/inventory" icon={ <i className="fa-solid fa-hand-holding-dollar" />} title='Inventory'/>
                  </li>
                  <li>
                  <a className="mt-3" role="button" tabIndex={0} onClick={OpenLocationMap}   onKeyPress={handleKeyPress}>
                  <NavItem  icon={ <i className="fa-solid fa-globe" />} title={`${sessionStorage.getItem("Lattitude")},${sessionStorage.getItem("Longitude")}`}/>
                  </a>
                  </li>
                 
                 
                 
                 <li className="nav-item dropdown mt-1">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reports
                    </a>
                    <div className="dropdown-menu row direction-col" aria-labelledby="navbarDropdown" >
                        <ul>
                           <li className="mt-0">
                             <NavItem  color='#343957' path="/dailyReports" icon={ <i className="fa-regular fa-file-lines"/>} title='Daily Reports'/>
                           </li>
                           <li  className="ra mt-0">
                            <NavItem color='#343957' path="/loginLogs" icon={ <i className="fa-solid fa-arrow-right-to-bracket" />} title='Login Logs'/>
                            </li>
                            <li className="ra mt-0">
                             <NavItem  color='#343957' path="/svLogs" icon={   <i className="fa-solid fa-chart-simple"/>} title='SV Logs'/>
                             </li>
                             <li className="ra mt-0">
                           <NavItem  color='#343957' path="/lockLogs" icon={ <i className="fa-solid fa-road-lock" />} title='Lock Logs'/>
                           </li>
                           <li className="ra mt-0">
                             <NavItem  color='#343957' path="/paytmTransactions" icon={  <i className="fa-solid fa-credit-card" />} title='Paytm Transactions'/>
                             </li>
                             <li className="ra mt-0">
                            <NavItem  color='#343957' path="/hourlyReport" icon={ <i className="fa-solid fa-clock" />} title='Hourly Report'/>
                            </li>
                            <li className="mt-0">
                             <NavItem  color='#343957' path="/faultReport" icon={ <i className="fa-solid fa-wrench" />} title='Technician Report'/>
                             </li>
                             <li className="ra mt-0">
                             <NavItem  color='#343957' path="/ssnReport" icon={ <i className="fa-solid fa-list-ol"/>} title='SSN Report'/>
                             </li>
                    </ul>
                    </div>
                </li> 
                <li className="nav-item dropdown mt-1">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Settings
                    </a>
                          <div className="dropdown-menu row direction-col" aria-labelledby="navbarDropdown" >
                                <li className="ra mt-1">
                                  <NavItem color='#343957' path="/machineSetting" icon={   <i className="fa-solid fa-gear" />} title='Machine Setting'/>
                                </li>
                                <li className=" mt-1">
                                <NavItem color='#343957'  path="/machineSetting" icon={   <i className="fa-solid fa-gear" />} title='Machine Setting'/>
                                </li>
                                <li className="ra mt-1">
                                <NavItem color='#343957' path="/colorSetting" icon={ <i className="fa-solid fa-palette" />} title='Color Setting'/>
                                </li>
                            </div>
                  </li>
               
                </ul>
            </div>
        </div>
   
    )
}




function NavItem({path,icon,title,color }) {

 
    const pathname = usePathname();
  
  const active = path && path === pathname || false;
  const Color= color || null
   
    return (
      <ListItemButton
   
      component={RouterLink}
      href={path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'grey',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'white',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.16),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            color:'white'
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2,color:Color }}>
        {icon}
      </Box>
  
      <Box component="span" style={{ color: Color}}>{title}</Box>
    
     
  
   
  
    
  
     
  
     
  
    </ListItemButton>
    );
  }
  
  NavItem.propTypes = {
    path: PropTypes.any,
    icon:PropTypes.any,
    title:PropTypes.any,
    color:PropTypes.any
  };