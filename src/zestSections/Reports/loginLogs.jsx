import moment from "moment";
import { useState} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import { useRouter } from "src/routes/hooks";

import { LogInfo } from "src/_mock/loginLogsData";

import { UserView } from "./ReportListTables/view";
import LastEntry from "./ReportListTables/view/lastEntry";



export default function LoginLogs(){
  
    const [data,setData]=useState(null);
    const [last,setLast]=useState(null);
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    const [isChecked, setIsChecked] = useState(true);

   const router=useRouter();

    const handleChange = () => {
      setIsChecked(!isChecked);
    };

    const SelfMap=()=>{
        router.push("/selfMap")
    }

    const ViewMap=()=>{
        router.push("/viewMap")
    }
    
    const LoadData=()=>{
        setData([]);
        setLast([]);
        LogInfo(startDate,endDate).then((res)=>{
            if(!isChecked)
            {
            

              const uniqueEntries = res.obj.reduce((acc, entry) => {
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
                // console.log(uniqueEntries);
                const resultArray = Object.values(uniqueEntries);
             
              const results=[];
               
            for(let i=0;i<resultArray.length; i += 1)
            {
                
              
              
                resultArray[i].firstEntry.lastLocationLat = resultArray[i].lastEntry.loginLat;

                resultArray[i].firstEntry.deviceModel=resultArray[i].lastEntry.deviceModel;
                resultArray[i].firstEntry.lastLocationLong=resultArray[i].lastEntry.loginLong;
                resultArray[i].firstEntry.lastDateTime=resultArray[i].lastEntry.createdAt;
                results.push(resultArray[i].firstEntry);
              
            }
            results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log(results)
            setLast(results);
            }
            else{
                res.obj.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setData(res.obj);
            }
           
        })

 

    }


    return(
    <Card>
        <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5,mt:2 ,display:'flex',justifyContent:'space-between'}}>
        Login Logs
        <Typography sx={{display:'flex',mt:0,alignItems:'center',gap:2,justifyContent:'flex-end'}}>
                  <div >
                        <p >
                        <button type="button" className="btn btn-primary text-white" onClick={SelfMap}>Self Map 
                                    <i className="fa-solid fa-globe"  />
                                </button>
                        </p>
                    </div>
                    <div >
                        <p >
                        <button type="button" className="btn btn-primary text-white" onClick={ViewMap}>View On Map 
                                    <i className="fa-solid fa-globe " />
                                </button>
                        </p>
                    </div>
      </Typography>
                   
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
                    <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                        <h5>Select:</h5>
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="All"
                                    offlabel="First & Last Only"
                                    onstyle='success'
                                    offstyle='info'
                                    width={180}
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
               
                {/* All entry loginLogs ui */}
                 {isChecked && data && <UserView  users={data} />}
                
                {/* Last Entry login logs ui */}
                 {!isChecked && last && <LastEntry users={last}/>}
                 </div>
               
                </Container>
    </Card>
    
    )
}