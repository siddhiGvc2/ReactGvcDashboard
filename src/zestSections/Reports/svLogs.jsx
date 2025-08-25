// import $ from 'jquery'
import moment from "moment";
import { useState} from 'react';

// import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import { SvLogsData } from "src/_mock/svLogs";

import SvLogReportView from "./ReportListTables/view/svLogReport";


export default function SvLogs(){
  
    const [data,setData]=useState(null);
    // const [last,setLast]=useState(null);
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    // const [isChecked, setIsChecked] = useState(true);
  


    
    
   

    // const handleChange = () => {
    //   setIsChecked(!isChecked);
    // };
    
    const LoadData=()=>{
        setData([]);
        SvLogsData(startDate,endDate).then((res)=>{
            console.log(res);
           setData(res);
           
        })

    }
   
    return(
    <Card>
        <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 ,mt:2}}>
        SV Logs
      </Typography>
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
                            <button type="button" className="btn btn-success text-white" onClick={LoadData}>Load
                                Report
                            </button>
                        </p>
                    </div>
                </div>
                 <div>
               
                 { data && <SvLogReportView users={data} />}
                
                
                 </div>
               
                </Container>
    </Card>
    
    )
}