// import ListItemButton from '@mui/material/ListItemButton';
// import { accordionActionsClasses } from "@mui/material";
import $ from "jquery";
import { useEffect } from "react";

import { account } from 'src/_mock/account';


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
              
                <li className="mt-2">
                    <a className="" href="/dashboard">
                    <i className="fa-solid fa-chart-line" /><span className="nav-text">Dashboard</span>
                    </a>
                </li>
                

                <li className="ra mt-3">
                    <a className="" href="/machines">
                    <i className="fa-solid fa-fan" /><span className="nav-text">Machines</span>
                    </a>
                </li>
                <li className="ra mt-3">
                    <a className="" href="/customers">
                        <i className="fa-solid fa-people-group"/><span className="nav-text">Customers</span>
                    </a>
                </li>
                <li  className="mt-3">
                    <a className="" href="/machineData">
                    <i className="fa-solid fa-database"/><span className="nav-text">Machine Data</span>
                    </a>
                </li>
              <li  className="mt-3">
                  
                    <a className="" href="/machineMap" >
                       <i className="fa-solid fa-location-dot"/><span className="nav-text">Machine Map</span>
                    </a>
                </li>
                 <li  className="mt-3">
                    <a className="ra us" href="/user" >
                    <i className="fa-solid fa-users-line"/><span className="nav-text">Users</span>
                    </a>
                </li>
                  <li  className="mt-3">
                    <a href="/inventory">
                        <i className="fa-solid fa-hand-holding-dollar" /><span className="nav-text">Inventory</span>
                    </a>
                </li>
                 {/* <li  className="mt-3">
                    <a className="ra set " href="/machineSetting">
                        <i className="fa-solid fa-gear" /><span className="nav-text">Machine Setting</span>
                    </a>
                </li> */}
                 <li className="mt-3">
                    <a className="da" href="/machineSetting">
                        <i className="fa-solid fa-gear" /><span className="nav-text">Machine Setting</span>
                    </a>
                </li>
                  <li  className="mt-3">
                    <a className="ra" href="/colorSetting">
                        <i className="fa-solid fa-palette" /><span className="nav-text">Color Setting</span>
                    </a>
                </li>
                  <li  className="mt-3">
                    <a style={{cursor: 'pointer',color:'#BDBDC7'}} id="locationLink" onClick={OpenLocationMap}
                     onKeyPress={handleKeyPress}
                     role="button"
                     tabIndex={0}
                    >
                        <i className="fa-solid fa-globe" /><span className="nav-text" >{`${sessionStorage.getItem("Lattitude")},${sessionStorage.getItem("Longitude")}`}</span>
                    </a>
                </li>
                 <li className="nav-item dropdown mt-3">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reports
                    </a>
                    <div className="dropdown-menu row direction-col" aria-labelledby="navbarDropdown" >
                        <ul>
                            <li className="mt-3">
                          <a className="mt-2" href="/dailyReports" style={{color:'#343957'}}>
                          <i className="fa-regular fa-file-lines"/><span className="nav-text" > Daily Reports</span>
                           </a>
                           </li>
                           <li  className="mt-3">
                         <a className="ra mt-2" href="/loginLogs"  style={{color:'#343957'}}>
                        <i className="fa-solid fa-arrow-right-to-bracket" /><span className="nav-text">Login Logs</span>
                        </a>
                        </li>
                        <li  className="mt-3">
                      <a className="ra" href="/svLogs"  style={{color:'#343957'}} >
                        <i className="fa-solid fa-chart-simple"/><span className="nav-text">SV Logs</span>
                    </a>
                    </li>
                      <li  className="mt-3">
                     <a className="ra" href="/lockLog"  style={{color:'#343957'}} >
                        <i className="fa-solid fa-road-lock" /><span className="nav-text">Lock Logs</span>
                    </a>
                    </li>
                      <li  className="mt-3">
                     <a className="ra" href="/paytmLog"  style={{color:'#343957'}}>
                        <i className="fa-solid fa-credit-card" /><span className="nav-text">Paytm Transactions</span>
                    </a>
                    </li>
                     <li  className="mt-3">
                      <a className="ra" href="/hourlyReport"  style={{color:'#343957'}}>
                        <i className="fa-solid fa-clock" /><span className="nav-text">Hourly Report</span>
                    </a>
                    </li>
                    <li  className="mt-3">
                     <a href="/faultReport"  style={{color:'#343957'}}>
                        <i className="fa-solid fa-wrench" /><span className="nav-text">Technician Report</span>
                    </a>
                    </li>
                     <li  className="mt-3">
                     <a href="/ssnReport"  style={{color:'#343957'}}>
                        <i className="fa-solid fa-list-ol"/><span className="nav-text">SSN Report</span>
                    </a>
                    </li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>
        </div>
   
    )
}