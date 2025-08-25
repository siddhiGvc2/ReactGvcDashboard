// import $ from 'jquery'
import moment from "moment";
import { useState} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import { GetHourlyData } from "src/_mock/hourlyReport";

// import FaultReportView from "./ReportListTables/view/faultReport";
import HourlyWardTable from "./HourlyReport/hourlyWardReportTable";
import HourlyZoneTable from "./HourlyReport/hourlyZoneReportTable";


export default function HourlyReport(){
    // const [selectedOption, setSelectedOption] = useState('Option 1');
    const [data,setData]=useState(null);
    const [data1,setData1]=useState(null);
    const [data2,setData2]=useState(null);
    const [data3,setData3]=useState(null);
    const [data4,setData4]=useState(null);
    const [data5,setData5]=useState(null);
   
 
   
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
  
    const [isChecked, setIsChecked] = useState(true);

   

    const handleChange = () => {
      setIsChecked(!isChecked);
    };

   
    // Hourly report data function started from here
    const LoadData=()=>{
        setData([]);
        setData1([]);
        setData2([])
        setData3([]);
        setData4([]);
        setData5([]);
        const startDateValue = startDate;

         // Create a Date object using the obtained date string
        const start = new Date(startDateValue);

        // Subtract one day from the date
        start.setDate(start.getDate() - 1);

        // Update the "startDate" property with the new date value
        const date = start.toISOString();
    
        GetHourlyData(date,"18:00").then((res)=>{
           
            
             GetHourlyData(startDate,"10:00").then((res1)=>{
              
                
                 GetHourlyData(startDate,"12:00").then((res2)=>{
                   
                   
                     GetHourlyData(startDate,"14:00").then((res3)=>{
                         console.log(res3)
                        
                         GetHourlyData(startDate,"16:00").then((res4)=>{
                           
                             
                               GetHourlyData(startDate,"18:00").then((res5)=>{
                                   setData(res);
                                   setData1(res1);
                                   setData2(res2);
                                   setData3(res3);
                                   setData4(res4);
                                   setData5(res5);
                                
                            })
                            
                        })
                        
                    })
                
                })
             })
        })

       
       
      
       
       

    }
    
  

    return(
    <Card>
        <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 ,mt:2}}>
        Hourly Report
      </Typography>
    <div className="row mt-2">
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>Select Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="startDate" min="2023-07-08" onChange={(e)=>setStartDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                  
                    <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                        <h5>Select:</h5>
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="Ward"
                                    offlabel="Zone"
                                    onstyle='success'
                                    offstyle='info'
                                    width={100}
                                />
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div  style={{display:'flex',justifyContent:'flex-end'}}>
                    <div >
                        <p >
                            <button type="button" className="btn btn-success text-white" onClick={LoadData}>Load
                                Report
                            </button>
                        </p>
                    </div>
                </div>
                 <div>
               
                 { data5 && isChecked &&<HourlyWardTable data={data} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5}/>}
                
                 { data5 && !isChecked &&<HourlyZoneTable data={data} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5}/>}
                 </div>
               
                </Container>
    </Card>
    
    )
}