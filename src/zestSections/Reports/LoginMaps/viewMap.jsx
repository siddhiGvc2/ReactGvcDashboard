import $ from 'jquery';
import L from 'leaflet';
import moment from 'moment';
import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import {useState, useEffect,useCallback } from 'react';

import { Card } from "@mui/material"
import { Container } from "@mui/system"

import { LogInfo } from 'src/_mock/loginLogsData';
// import { useCallback } from 'react';




const PrimaryTime=import.meta.env.VITE_REACT_APP_PRIMARY_TIME;
const SecondaryTime=import.meta.env.VITE_REACT_APP_SECONDARY_TIME;
const Faulty=import.meta.env.VITE_REACT_APP_FAULTY;
const Primary=import.meta.env.VITE_REACT_APP_PRIMARY;
const Secondary=import.meta.env.VITE_REACT_APP_SECONDARY;

let map;

export default function ViemMap(){

const [setRunningFlag]=useState(false);
const [setRunningPause]=useState(false);
const [selectedOption, setSelectedOption] = useState([]);
const [options,setOptions]=useState([]);

const handleSelectChange = (elem) => {
    setSelectedOption(elem);
  };


const LoadMap=useCallback((center, locations)=>{
    // console.log(LastCheckOut);
  
//  let   LastCheckInTime ;
//  let   LastLogOutTime ;
//  let   LastLogInTime ;
//  let    LastCheckOutTime;



// if(LastCheckIn.length !==0)
// {
//   LastCheckInTime = GetIndianTime( LastCheckIn[0].createdAt);
// }
// if(LastLogOut.length !==0)
// {

//  LastLogOutTime =  GetIndianTime( LastLogOut[0].createdAt);
// }
// if(LastLogIn.length !==0)
// {

// LastLogInTime =  GetIndianTime( LastLogIn[0].createdAt);
// }

// if(LastCheckOut.length !==0)
// {

//  LastCheckOutTime =  GetIndianTime( LastCheckOut[0].createdAt);
// } 
//  let Length = 0;
//  let length=0;
const locationsData = sessionStorage.getItem("Locations");
const locationsArray=JSON.parse(locationsData);
//    const centerData = sessionStorage.getItem("Center");
//   const centerArray=JSON.parse(centerData);



if(JSON.stringify(locations) !== JSON.stringify(locationsArray)){

if(map)
{

map.remove();

}
}



sessionStorage.setItem("Locations",JSON.stringify(locations));
sessionStorage.setItem("Center",JSON.stringify(center));
const storedZoom = sessionStorage.getItem('mapZoom');


const initialZoom = storedZoom !== null ? parseInt(storedZoom , 10) : 9;
map = L.map('map', {
center,
zoom: initialZoom,
scrollWheelZoom: false  // Disable scroll wheel zoom
});



//  {{!-- if(!RunningFalg)
//   {

//   const bounds = calculateBounds(center, locations);
//   map.fitBounds(bounds);
//   } --}}

const textIcon = L.divIcon({
className: 'div-icon',
html: '<div></div>',
iconSize: [40, 40], 
iconAnchor: [5,5] // Adjust the size according to your text
});
function updateText(newText,color) {
textIcon.options.html = `<div class="mapMarker"  style="background-color:${color};">${newText}</div>`;

}


// Create a polyline and add it to the map


if(locations)
{
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

locations.forEach(location => {
   const PT=PrimaryTime;
   const ST=SecondaryTime;
   const time=$('[name="timeInput"]').val();
   
   const selectedTimeParts = time.split(':');
   const currentDate = new Date();
   const currentTime=currentDate.setHours(parseInt(selectedTimeParts[0], 10), parseInt(selectedTimeParts[1], 10), 0, 0);
   
  const thirtyMinutesAgo = new Date(currentTime - ST * 60 * 1000); 
  const elevenMinutesAgo = new Date(currentTime - PT * 60 * 1000); 
   const initials = location.data.userName.split(' ').map(word => word.charAt(0)).join('');
   const date=new Date(location.data.createdAt)
  if(date < thirtyMinutesAgo)
  {
       updateText(initials,Faulty);
  }
  else if(date < elevenMinutesAgo){
       updateText(initials,Secondary);

  }
  else if(date > elevenMinutesAgo){
        updateText(initials,Primary);
  }

   const marker= L.marker(location.coordinates, {icon: textIcon}).addTo(map);

marker.bindPopup(`
<div >
<p >${location.data.userName}</p>
</di>
`);

// marker.openPopup();


});

}


map.on('zoomend', () =>{
const currentZoom = map.getZoom();
sessionStorage.setItem('mapZoom', currentZoom.toString());
});
//   function calculateBounds(cen, loc) {
//     const padding = 0.20;
//     const bounds = L.latLngBounds([
//       [cen[0] - padding, cen[1] - padding],
//       ...loc.map(location => [
//         location.coordinates[0],
//         location.coordinates[1]
//       ])
//     ]);
//     return bounds;
//   }


  },[])




const LoadData=useCallback((time)=>{
    LogInfo(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')).then((r)=>{
    //    const userInfo=JSON.parse(sessionStorage.getItem("userInfo")) || [];
    //    console.log(userInfo);
        const response=r.obj;
                  
        function filterDataBySelectedTime(results, userSelectedTime) {
            // Get the current date
            const currentDate = new Date();

            // Parse the user-selected time and set it on the current date
            const selectedTimeParts = userSelectedTime.split(':');
            currentDate.setHours(parseInt(selectedTimeParts[0], 10), parseInt(selectedTimeParts[1], 10), 0, 0);

            // Filter the results based on the user-selected time
            const filteredResults = results.filter(item => {
              const createdAtTime = new Date(item.createdAt);
              return createdAtTime <= currentDate;
            });

            return filteredResults;
          }

          const responseData=filterDataBySelectedTime(response,time);
            const uniqueEntries1 = responseData.reduce((acc, entry) => {
              const { userName, Remark, createdAt } = entry;

              // Create unique keys for userName and remark separately
            //   const userKey = userName;
            //   const remarkKey = Remark;

              // Create a unique key for the combination of userName and remark
              const combinedKey = `${userName}_${Remark}`;

           
              // Check for uniqueness based on the combination of userName and remark
              if (!acc[combinedKey]) {
                  acc[combinedKey] = { firstEntry: entry, lastEntry: entry };
              } else {
                  acc[combinedKey].lastEntry = entry;

                  // Check if the createdAt of the current entry is earlier than the firstEntry
                  if (createdAt < acc[combinedKey].firstEntry.createdAt) {
                      acc[combinedKey].firstEntry = entry;
                  }
              }

              return acc;
          }, {});
    
           const resultArray1 = Object.values(uniqueEntries1);
        
          
                 const results1=[];
      for(let i=0;i<resultArray1.length;i+=1)
      {
         
         
          results1.push(resultArray1[i].lastEntry);
      }
     
    
         
            //   const filteredUserLastCheckIn=results1.filter((elem)=>
            //      elem.userName === userInfo.name && elem.Remark==="CheckIn"
            //   )
            //     const filteredUserLogOut=results1.filter((elem)=>
            //      elem.userName === userInfo.name && elem.Remark==="Logout"
            //   )
            //      const filteredUserCheckOut=results1.filter((elem)=>
            //     //  console.log(elem)
            //        elem.userName === userInfo.name && elem.Remark==="CheckOut"
            //   )
            //   const filteredUserLogIn=results1.filter((elem)=>
            //        elem.userName === userInfo.name && elem.Remark==="Login"
            //   )
  
        const uniqueEntries = responseData.reduce((acc, entry) => {
          const { userName, createdAt } = entry;

         
          if (!acc[userName]) {
              acc[userName] = { firstEntry: entry, lastEntry: entry };
          } else {
              
              acc[userName].lastEntry = entry;

             
              if (createdAt < acc[userName].firstEntry.createdAt) {
              acc[userName].firstEntry = entry;
              }
          }

          return acc;
          }, {});
          const resultArray = Object.values(uniqueEntries);
     
        let results=[];
      for(let i=0;i<resultArray.length;i+=1)
      {
         
         
          results.push(resultArray[i].lastEntry);
      }
       results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
     
         
       if($('[name="searchInput"]').val().length>0)
       {
         
              const filteredUser=results.filter((elem)=>
                   elem.userName === $('[name="searchInput"]').val()
              )
              if(filteredUser.length>0)
              {
                    results=filteredUser;
              }
           
              
       }
       

       const Data=results;
      
        if(Data.length>0)
        {
      const index = Data.length > 0 ? parseInt(Data.length / 2 , 10) : 0;

      const Lat=Data[index].loginLat;
      const Lon=Data[index].loginLong;
      const center=[Lat,Lon];

       const locations=[];
      for(let i=0;i<Data.length;i+=1)
      {
      
      const obj={ data:Data[i], coordinates: [Data[i].loginLat,Data[i].loginLong] }
      locations.push(obj);
      }
        

    //   console.log(filteredUserCheckOut);
 
     LoadMap(center,locations);
    
        }
        else{
        //   LoadMap([19.1513,19.1619],[{data:{userName:''},coordinates:[0,0]}]);
        LoadMap([],[]);

        }
     


    })
      
},[LoadMap])

    // setting time hiding show button 
    useEffect(()=>{
        $('.stopButton').hide();
        $('.runButton').show();

        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        
        const initialTime = `${hours}:${minutes}`;
        
        $('[name="timeInput"]').val( initialTime);
        sessionStorage.setItem("time",initialTime);
        const minTime = '09:00';
        const maxTime = '18:00';
      
           $('[name="timeInput"]').on('change',()=> {
            // Set the minimum and maximum time for the input dynamically
            $('[name="timeInput"]').setAttribute('min', minTime);
            $('[name="timeInput"]').setAttribute('max', maxTime);
          });

          LoadData($('[name="timeInput"]').val());
          LoadUsersDDL();
          setInterval(()=>{

 
  

            LoadData(sessionStorage.getItem("time"));
         
         },2000)

    },[LoadData])


    
        
   let interval;



    // run time function
    const RunTime=()=>{
      
       LogInfo(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')).then((r)=>{


                        const response=r.obj;



                                    
                                
                        const uniqueEntries = response.reduce((acc, entry) => {
                        const { userName, createdAt } = entry;

                        
                        if (!acc[userName]) {
                            acc[userName] = { firstEntry: entry, lastEntry: entry };
                        } else {
                            
                            acc[userName].lastEntry = entry;

                            
                            if (createdAt < acc[userName].firstEntry.createdAt) {
                            acc[userName].firstEntry = entry;
                            }
                        }

                        return acc;
                        }, {});
                        const resultArray = Object.values(uniqueEntries);
                    
                            const results=[];
                            for(let i=0;i<resultArray.length;i+=1)
                            {
                                
                                
                                results.push(resultArray[i].firstEntry);
                            }
                    
                            const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
                        
                            const filteredUser=results.filter((elem)=>
                                 elem.userName === userInfo.name
                            )
                        
                        
                            const [{ createdAt }] = filteredUser;

                            const date = new Date(createdAt);
                            // const option = { timeZone: 'Asia/Kolkata' };
                            const indianTime = date.toLocaleString('en-US', options);

                            

                            const [, timePart] = indianTime.match(/(\d+:\d+)/) || [];
                        
                        
                            let [hours, minutes] = timePart.split(':').map(Number);
                            minutes += 1;
                            if (minutes === 60) {
                                minutes = 0;
                                hours += 1;
                            }
                            const updatedTimePart = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                           
                            let initial=updatedTimePart;
                            $('.stopButton').show();
                           
                            $('[name="timeInput"]').val(initial);
                            sessionStorage.setItem("time",initial)
                            // setRunningFlag(true);
                          interval= setInterval(()=>{
                            // console.log(initial);
                            const currentTime = new Date(`2000-01-01T${initial}`);
                            currentTime.setMinutes(currentTime.getMinutes() + 10);
                  
                            // Format the time as 'HH:mm'
                            const updatedTime = currentTime.toTimeString().slice(0, 5);
                            initial=updatedTime;
                            // console.log(initial);
                            const currT=new Date(); 
                            const specificDateTime = new Date(`${currT.toDateString()} ${updatedTime}`);
                            if(specificDateTime> currT)
                            {
                            const cT = new Date();
                            const hrs =cT.getHours().toString().padStart(2, '0');
                            const min = cT.getMinutes().toString().padStart(2, '0');

                            const initialTime = `${hrs}:${min}`;
                            // console.log(initialTime);

                            $('[name="timeInput"]').val( initialTime);
                            sessionStorage.setItem("time",initialTime);
                            // setRunningFlag(false);
                            // setRunningPause(false);

                            $('.stopButton').hide();
                            $('.searchInput').show();
                            return clearInterval(interval);
                            }
                            // console.log(initial);
                            $('[name="timeInput"]').val(initial);
                            sessionStorage.setItem("time",initial)
                            return(()=>{
                                clearInterval(interval);
                            })
                        },2000)

       })

    }



    // stop time function

    const StopTime=()=>{
        clearInterval(interval);
       setRunningFlag(true);
       setRunningPause(true);
          $('.stopButton').hide();
         $('.searchInput').show();
        const currentTime = new Date();
       const hours = currentTime.getHours().toString().padStart(2, '0');
       const minutes = currentTime.getMinutes().toString().padStart(2, '0');
       
       const initialTime = `${hours}:${minutes}`;
            //  console.log(initialTime);
    
           $('[name="timeInput"]').val( initialTime);
        sessionStorage.setItem("time",initialTime)
      
       

    }

 // Loading map data

   

/// indian time function
    // function GetIndianTime(ct){
    //     const createdAt = ct;
    //        const date = new Date(createdAt);
    //        const options = { timeZone: 'Asia/Kolkata' };
    //        return date.toLocaleString('en-US', options);
     
     
    //  }

     function LoadOnChangeTime(){
        sessionStorage.setItem("time", $('[name="timeInput"]').val())
        
      }


      const LoadUsersDDL=()=>{
        LogInfo(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'))
      .then(response => {
        console.log(response);
        const data = response.obj;
        const uniqueEntries = data.reduce((acc, entry) => {
            const { userName, createdAt } = entry;

           
            if (!acc[userName]) {
                acc[userName] = { firstEntry: entry, lastEntry: entry };
            } else {
                
                acc[userName].lastEntry = entry;

               
                if (createdAt < acc[userName].firstEntry.createdAt) {
                acc[userName].firstEntry = entry;
                }
            }

            return acc;
            }, {});
            const resultArray = Object.values(uniqueEntries);
       
          const results=[];
        for(let i=0;i<resultArray.length;i+=1)
        {
           
           
            results.push(resultArray[i].lastEntry);
        }
  
        // Transform data into the format expected by Select2
        const formattedData = results.map(option => ({
          value: option.userName,
          label: option.userName
        }));
  
        // Set the options for the dropdown
        setOptions(formattedData);
  
        // Cleanup Select2 when the component unmounts
        return () => {
          $('#to').select2('destroy');
        };
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });

      }



    //   LoadMap function starting from here
    
     
      

    return (
<Card>
    <Container maxWidth='xxl' sx={{padding:2}}>

    <div className="col-lg-12">
           <div className="card-header">
                <h4 className="card-title w-100" style={{display:'flex',justifyContent:'space-between'}}>
                    Login Map
                   <div>
                    <button type="button" className="btn btn-sm btn-warning mx-2 text-white float-right stopButton" onClick={StopTime}>Stop <i className="fa-regular fa-circle-pause" /></button>
                       <button type="button" className="btn btn-sm btn-primary mx-2 text-white float-right runButton" onClick={RunTime}>Run   <i className="fa-regular fa-circle-play" /></button>
                       </div>
                </h4>
            </div>
            <div className="card-body" >
                 
            <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2 text-20">
                        <h5>Select Time:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="time" className="form-control" name="timeInput"  min="09:00" max="18:00" onInput={LoadOnChangeTime}/>
                            </div>
                        </div>
                    </div>
                  
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2 " style={{position:'relative'}}>
                        <h5>Search User:</h5>
                        <div className="row">
                            <div className="col-12 ">
                           
                                {/* <input type="search" className="form-control" name="searchInput" /> */}
                                <Select
                                name="searchInput"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                options={options}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                                style={{
                                  height:'100px',
                                  marginBottom:'-100px'
                                }}
                                menuPosition="fixed"
                                

                            />
                            
                             <div className="invalid-feedback"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="map" />
               </div>
                 
                </div>
                
           
            
        
      </Container>
    </Card>

    
    
  )
}