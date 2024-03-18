// import $ from 'jquery'
import moment from "moment";
import { useState} from 'react';

// import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import { FaultReportData } from "src/_mock/faultReportData";

import FaultReportView from "./ReportListTables/view/faultReport";


export default function FaultReport(){
    const [selectedOption, setSelectedOption] = useState('Option 1');
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
        FaultReportData(startDate,endDate).then((res)=>{
           
            let filteredData;
            if(selectedOption=== "Option 1")
            {
             filteredData=res.obj.filter((elem)=>
              elem.faultStatus=== "Completed"
            )
              setData(filteredData);
            }
            else if(selectedOption==="Option 2"){
             filteredData=res.obj.filter((elem)=>
             elem.faultStatus=== "Pending"
            )
              setData(filteredData);
            }
            else{
              filteredData=res.obj;
              setData(filteredData);
            }
           
           
        })

    }
    
    const handleButtonClick = (option) => {
        // Update the selected option in the state
        setSelectedOption(option);
    
        // Perform actions based on the selected option
        console.log(`Selected Option: ${option}`);
    
        // You can add more logic here based on the selected option
      };

    return(
    <Card>
        <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 ,mt:2}}>
        Technician  Report
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
                    <div className="col-xl-2 col-lg-4 col-md-6 col-12 col-12 my-2">
                        <h5>Select Status:</h5>
                        <div className="row">
                              <div className="col-12 sw-parent">
                             <div  className="btn-group entry" role="group" aria-label="Three Option Switch">
                                <button type="button" 
                                 className={selectedOption === 'Option 1' ? 'btn btn-success activeButton' : 'btn btn-success text-black'}
                                 onClick={() => handleButtonClick('Option 1')}
                                >Completed</button>
                                <button type="button" 
                                 className={selectedOption === 'Option 2' ? 'btn btn-info activeButton' : 'btn btn-info text-black'}
                                 onClick={() => handleButtonClick('Option 2')}

                                >Pending</button>
                                <button type="button"
                                  className={selectedOption === 'Option 3' ? 'btn btn-warning activeButton' : 'btn btn-warning text-black'}
                                  onClick={() => handleButtonClick('Option 3')}
                                
                                >BOTH</button>
                            </div>
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
               
                 { data && <FaultReportView users={data} />}
                
                
                 </div>
               
                </Container>
    </Card>
    
    )
}