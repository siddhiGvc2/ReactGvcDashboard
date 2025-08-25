// import 'bootstrap-switch-button/dist/bootstrap3/bootstrap-switch-button.min.css';
import $ from "jquery";
import moment from "moment";
import { useState, useEffect,useCallback} from 'react';
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
import { GetClentInfoDetails,GetClentNameDetails} from 'src/_mock/customers';

import TableHeader from "./dailyReportComponents/tableHeader";




// const sr=1;
export default function DailyReports(){
    // const tblDataRef = useRef(null);
    const [reportData,setReportData]=useState(null);
    const [sDate,setSdate]=useState(moment().format('YYYY-MM-DD'));
    const [eDate,setEdate]=useState(moment().format('YYYY-MM-DD'));
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    const [cities,setCities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
    const [cInfo,setCInfo]=useState(["City","Zone","Ward","Beat"]);
    const [zones,setZones]=useState([]);
    const [wards,setWards]=useState([]);
    const [beats,setBeats]=useState([]);
    const [machines,setMachines]=useState([])
    const [numbDaysArray,setNumDaysArray]=useState([]);
    const [cityName, setCitiesName] = useState(['Mumbai']);
    const [zoneName,setZonesName]=useState([]);
    const [wardName,setWardsName]=useState([]);
    const [beatName,setBeatsName]=useState([]);
    const [machineName,setMachineName]=useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [machineType,setMachineType]=useState('');

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  
  useEffect(()=>{
    const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
  
    console.log(UserInfo);
    if (!UserInfo.isAdmin) {
                                      
      if (UserInfo.city)
        //  console.log("user cities:" + typeof(window.appuser.city));
      console.log(UserInfo.city);
         const Cities=(UserInfo.city).split(',')
        setCitiesName(Cities);
        setCities(Cities);
        sessionStorage.setItem("cities",JSON.stringify(Cities));
        $('#city').remove();

       
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
         console.log(r);
         const Data=r.data;
         setMachineType(Data[0].MachineType);
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
            console.log(res);
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


           const start = useCallback(() => moment(startDate), [startDate]);
           const end = useCallback(() => moment(endDate), [endDate]);
      
           const numDays = useCallback(() =>
           isChecked ? moment(end()).diff(start(), 'day') + 1 : 0
         , [start, end, isChecked]);
      

           
          
         
        
           
        
             
                   const setArray=useCallback(() =>{
                    const Length=numDays();
                    const numArray=[]
                    for(let i=0;i<Length;i+=1)
                    {
                        numArray.push(i+1);
                    }
                    setStartDate(sDate);
                    setEndDate(eDate);
                   
                    setNumDaysArray(numArray)

                    // console.log(numbDaysArray);
                },[numDays,sDate,eDate])
        
                useEffect(()=>{
                
                    // setReportData({machines:[]});
                //   setNumDaysArray([])
                    setArray();
                },[setArray])

          
                useEffect(()=>{
                    setReportData({machines:[]});

                },[cityName,zoneName,wardName,beatName,machineName,startDate,endDate])


           
           const LoadReport=()=>{
            // setReportData({machines:[]});
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
                        <h5 className="text-primary d-inline">{cInfo[0]}:</h5>
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
                                           {
                                            cities.map((elem)=>
                                                <MenuItem value={elem}>
                                                <Checkbox checked={cityName.indexOf(elem) > -1} />
                                                {elem}
                                            </MenuItem>

                                            )
                                            }
                                                                        
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
                        <h5 className="text-primary d-inline">{cInfo[1]}:</h5>
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
                                                    <h5 className="text-primary d-inline">{cInfo[2]}:</h5>
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
                        <h5 className="text-primary d-inline">{cInfo[3]}:</h5>
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
                                                    <MenuItem value={elem} key={elem.label}>
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
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="startDate" min="2023-07-08" onChange={(e)=>setSdate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>End Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="endDate" min="2023-07-08" onChange={(e)=>setEdate(e.target.value)}/>
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
           {reportData && reportData.machines.length >0 ? 
  <TableHeader
    data={reportData}
    zones={zones.filter(item => !zoneName.includes(item))}
    wards={wards.filter(item => !wardName.includes(item))}
    beats={beats.filter(item => !beatName.includes(item))}
    numbDaysArray={numbDaysArray}
    startDate={startDate}
    endDate={(endDate)}
    checked={isChecked}
    MachineType={machineType}
  />
:null}
              




                
      
    </Container>
    </Card>
    
    
    )
}