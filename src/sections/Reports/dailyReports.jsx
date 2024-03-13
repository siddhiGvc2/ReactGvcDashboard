// import 'bootstrap-switch-button/dist/bootstrap3/bootstrap-switch-button.min.css';
import moment from "moment";
import { useState, useEffect} from 'react';
// import * as XLSX from 'xlsx';
import SwitchButton from 'bootstrap-switch-button-react';

// import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

import { ReportData } from "src/_mock/dailyReportData";
import {zoneData,wardData,beatData,Machines} from 'src/_mock/fildData';

import TableHeader from "./dailyReportComponents/tableHeader";





export default function DailyReports(){
    // const tblDataRef = useRef(null);
    const [reportData,setReportData]=useState(null);
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    const [cities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
    const [zones,setZones]=useState([]);
    const [wards,setWards]=useState([]);
    const [beats,setBeats]=useState([]);
    const [machines,setMachines]=useState([])
  
    const [cityName, setCitiesName] = useState(['Mumbai']);
    const [zoneName,setZonesName]=useState([]);
    const [wardName,setWardsName]=useState([]);
    const [beatName,setBeatsName]=useState([]);
    const [machineName,setMachineName]=useState([]);
    const [isChecked, setIsChecked] = useState(true);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  

 

  // getting data from file "src/_mock/reportData"
    useEffect(()=>{
   
        zoneData(cityName).then((res)=>{
            setZones(res);

        })
        wardData(cityName,zoneName).then((res)=>{
            setWards(res);
        });
        beatData(cityName,zoneName,wardName).then((res)=>{
           setBeats(res);
        });
        Machines(cityName,zoneName,wardName,beatName).then((res)=>{
            setMachines(res);
        })
       
      
       },[cityName,zoneName,wardName,beatName])

         useEffect(()=>{
            zoneData(cityName).then((res)=>{
               setZonesName(res);
              
            })
      
        },[cityName])
      
        
      useEffect(()=>{
        
          wardData(cityName,zoneName).then((res)=>{
            
            setWardsName(res);
          });
      
      },[cityName,zoneName])
       
      useEffect(()=>{
       
          beatData(cityName,zoneName,wardName).then((res)=>{
          setBeatsName(res);
            
          });
    
      },[cityName,zoneName,wardName])

      useEffect(()=>{
      
        Machines(cityName,zoneName,wardName,beatName).then((res)=>{
          
            // const formattedData = res.map(option => ({
            //     value: option.serial,
            //     label: option.serial
            //   }));
            setMachineName(res);
        })
    

       },[cityName,zoneName,wardName,beatName])
       
       
      
        const handleCityChange = (event) => {
         setCitiesName(event.target.value);
        };
        const handleZoneChange = (event) => {
          setZonesName(event.target.value);
         };
        const handleWardChange = (event) => {
           setWardsName(event.target.value);
         };
        const handleBeatChange = (event) => {
         setBeatsName(event.target.value);
        };

        const handleMachineChange=(event)=>{
            setMachineName(event.target.value);
        }
       
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
        
        const selectAllMachines=()=>{
            setMachineName(machines)
           }
           const selectNoneMachines=()=>{
             setMachineName([])
           }

           
           const LoadReport=()=>{
            // setReportData([]);
            console.log(machineName);
            const serialNumbers = machineName.map(option => option.value);
            console.log("Serials",serialNumbers);
            ReportData(cityName,zoneName,wardName,beatName,serialNumbers,startDate,endDate).then((res)=>{
                console.log("Report Data", res);
                setReportData(res);
            })
           }
           
           


    return (
        <Card >
    <Container maxWidth='xxl' >
     
    
        <div className="row"  >
                {/* City selection ui */}
                    <div className=" col-xl-3 col-lg-3 col-md-6 col-12 my-2">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">City:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                       onClick={selectAllCities} ><i className="fa fa-check"/></button>
                                     <Select
                                            multiple
                                            value={cityName}
                                            onChange={handleCityChange}
                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                            renderValue={(items) => {
                                            if (items.length===cities.length) {
                                                return`All Selected(${items.length})`;
                                            } 
                                            if(items.length===0) {
                                                return 'None Selected';
                                            }
                                            if(items.length===1)
                                            {
                                                return `${items[0]}`
                                            }
                                            return `${items.length} Selected`
                                        }}
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
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                       onClick={selectNoneCities} ><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Zone selection Ui */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12 my-2 ">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Zone:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                      onClick={selectAllZones}><i className="fa fa-check"/></button>
                                      <Select
                                            multiple
                                            value={zoneName}
                                            onChange={handleZoneChange}
                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                            renderValue={(items) => {
                                            if (items.length===zones.length) {
                                                return`All Selected(${items.length})`;
                                            } 
                                            if(items.length===0) {
                                                return 'None Selected';
                                            }
                                            if(items.length===1)
                                            {
                                                return `${items[0]}`
                                            }
                                            return `${items.length} Selected`
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
                                                                <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                                                onClick={selectNoneZones} ><i className="fa fa-times"/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Ward selection ui */}
                                                <div className="col-xl-3 col-lg-3 col-md-6 col-12 my-2">
                                                    <div className="form-group my-2">
                                                    <h5 className="text-primary d-inline">Ward:</h5>
                                                        <div className="row">
                                                            <div className="col-12 d-flex">
                                                                <button type="button" className="btn btn-sm btn-success text-white my-auto"
                                                                    onClick={selectAllWards}><i className="fa fa-check"/></button>
                                                                <Select
                                                            multiple
                                                            value={wardName}
                                                            onChange={handleWardChange}
                                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                                            renderValue={(items) => {
                                                            if (items.length===wards.length) {
                                                                return`All Selected(${items.length})`;
                                                            } 
                                                            if(items.length===0) {
                                                                return 'None Selected';
                                                            }
                                                            if(items.length===1)
                                                            {
                                                                return `${items[0]}`
                                                            }
                                                            return `${items.length} Selected`
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
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                        onClick={selectNoneWards}><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Beat selection ui */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12 my-2">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Beat:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type="button" className="btn btn-sm btn-success text-white my-auto"
                                        onClick={selectAllBeats}><i className="fa fa-check"/></button>
                                      <Select
                                            multiple
                                            value={beatName}
                                            onChange={handleBeatChange}
                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                            renderValue={(items) => {
                                            if (items.length===beats.length) {
                                                return`All Selected(${items.length})`;
                                            } 
                                            if(items.length===0) {
                                                return 'None Selected';
                                            }
                                            if(items.length===1)
                                            {
                                                return `${items[0]}`
                                            }
                                            return `${items.length} Selected`
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
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneBeats}><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                     {/* Machine selection ui */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12 my-2 ">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Machines:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                      onClick={selectAllMachines}><i className="fa fa-check"/></button>
                                      <Select
                                            multiple
                                    
                                            value={machineName}
                                            onChange={handleMachineChange}
                                            style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                                            renderValue={(items) => {
                                            if (items.length===machines.length) {
                                                return`All Selected(${items.length})`;
                                            } 
                                            if(items.length===0) {
                                                return 'None Selected';
                                            }
                                            if(items.length===1)
                                            {
                                                return `${items[0].label}`
                                            }
                                            return `${items.length} Selected`
                                        }}
                                        >

                                        
                                                {
                                               machines.map((elem) => (
                                                    <MenuItem value={elem}>
                                                    <Checkbox checked={machineName.indexOf(elem) > -1} />
                                                    {elem.label}
                                                    </MenuItem>
                                                ))
                                                }

                                        
                                        
                                        </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                       onClick={selectNoneMachines} ><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                  {/* daily switch button ui */}
                    <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                        <h5>Summary Type:</h5>
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="Daily"
                                    offlabel="Totals Only"
                                    onstyle='success'
                                    offstyle='info'
                                    width={220}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                 {/* date selection ui */}
            
                <div className="row mt-2">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>Start Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="startDate" min="2023-07-08" onChange={(e)=>setStartDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>End Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="endDate" min="2023-07-08" onChange={(e)=>setEndDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                 
                    
                </div>
                <div  style={{display:'flex',justifyContent:'flex-end'}}>
                    <div >
                        <p >
                            <button type="button" className="btn btn-success text-white" onClick={LoadReport}>Load
                                Report
                            </button>
                        </p>
                    </div>
                </div>

                
               
           {/* report teble ui */}
           {reportData && (
  <TableHeader
    data={reportData}
    zones={zones.filter(item => !zoneName.includes(item))}
    wards={wards.filter(item => !wardName.includes(item))}
    beats={beats.filter(item => !beatName.includes(item))}
    startDate={startDate}
    endDate={endDate}
    checked={isChecked}
  />
)}
              




                
      
    </Container>
    </Card>
    
    
    )
}