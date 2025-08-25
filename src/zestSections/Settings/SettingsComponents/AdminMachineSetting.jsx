import $ from 'jquery'
import React, {useState, useEffect } from "react"

// import { Card, Container } from "@mui/material";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import {GET,SET,SetModel,SetPrice,SetModelName,SetTemperature,SetIncinerator,} from "src/_mock/machineSetting"

const MaxDailyCount=import.meta.env.VITE_REACT_APP_MAXIMUM_DAILY_COUNT;
const MaxTotalCount=import.meta.env.VITE_REACT_APP_MAXIMUM_TOTAL_COUNT;
const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));
const MachineNumber=import.meta.VITE_REACT_APP_MACHINE_NUMBER;

export default function UserMachineSetting(){
    const [showAlert, setShowAlert] = useState(false);
    const [message,setMessage]=useState("");
    const [type,setType]=useState("");
    const showAlertMessage = () => {
        setShowAlert(true);
    
        // You can optionally set a timeout to hide the alert after a few seconds
        setTimeout(() => {
        setShowAlert(false);
        }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
    };
   
    useEffect(()=>{
        const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        const machineNumber = MachineNumber;
        
        // Assuming $('[name="machineID"]').val() is the value of an input field with name "machineID"
        const inputFieldValue = $('[name="machineID"]').val();
         if(!userInfo.superAdmin)
    {
        $('.na').css({
            'visibility': machineNumber !== inputFieldValue ? 'hidden' : 'visible'
        });
    }
    },[])

    const Get=()=>{

        if(!$('[name="machineID"]').val())
        {
          
           showAlertMessage();
           setType("warning");
           setMessage("Please Enter Serial Number")  
        }
        else{
            $('[name="price"]').val("??");
            $('[name="modelName"]').val("??");
            $('[name="model"]').val("??");
            $('[name="minTempA"]').val("??");
            $('[name="minTempB"]').val("??");
            $('[name="maxTempA"]').val("??");
            $('[name="maxTempB"]').val("??");
            $('[name="maxDoorCount"]').val("??");
            $('[name="maxBurningTime"]').val("??");
            $('[name="alarmTime"]').val("??");

            GET($('[name="machineID"]').val()).then((r)=>{
                console.log(r);
                if(r==="MachineOff")
                {
                    showAlertMessage();
                    setType("error");
                    setMessage("Machine is off")
                  $('[name="price"]').val("");
                 $('[name="modelName"]').val("");
                 $('[name="model"]').val("");
                 $('[name="minTempA"]').val("");
                 $('[name="minTempB"]').val("");
                 $('[name="maxTempA"]').val("");
                 $('[name="maxTempB"]').val("");
                 $('[name="maxDoorCount"]').val("");
                 $('[name="maxBurningTime"]').val("");
                 $('[name="alarmTime"]').val("");
                }
                else{
                
                  showAlertMessage();
                  setType("success");
                  setMessage("Fetched Succesfully")   
                 $('[name="price"]').text(r.ProductPrice);
                 $('[name="minTempA"]').text(r.minA);
                 $('[name="minTempB"]').text(r.minB);
                 $('[name="maxTempA"]').text(r.maxA);
                 $('[name="maxTempB"]').text(r.maxB);
                 $('[name="maxDoorCount"]').text(r.maxDoorCount);
                 $('[name="maxBurningTime"]').text(r.maxProcessTime);
                 $('[name="alarmTime"]').text(r.alarmTime);
 
                }
               

            })
            .catch((err)=>{
                showAlertMessage();
                setType("error");
                setMessage("Error:Occured")  

            })

        }
       

    }


    const Set=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
        else if(localStorage.getItem("dailyCount")===MaxDailyCount || localStorage.getItem("totalCount")===MaxTotalCount)
        {
            showAlertMessage();
            setType("error");
            setMessage("SetLimit Exceeded")  
        }
        else{
           SET($('[name="machineID"]').val(), $('[name="newSerialNumber"]').val(),sessionStorage.getItem('name'))
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }

    const SaveModelName=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
     
        else{
           SetModelName($('[name="machineID"]').val(),  $('[name="modelName"]').val())
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Model Name Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }


    const SaveModel=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
     
        else{
           SetModel($('[name="machineID"]').val(),  $('[name="model"]').val())
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Model Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }

   
    const SavePrice=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
     
        else{
           SetPrice($('[name="machineID"]').val(), $('[name="price"]').val())
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Price Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }

    const SaveTemperature=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
     
        else{
           SetTemperature($('[name="machineID"]').val(),$('[name="minTempA"]').val(),$('[name="minTempB"]').val(),$('[name="maxTempA"]').val(), $('[name="maxTempB"]').val())
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Temperature Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }

    const SaveIncinerator=()=>{
        if(!$('[name="machineID"]').val())
        {
            showAlertMessage();
            setType("warning");
            setMessage("Please Enter Serial Number")    
        }
     
        else{
           SetIncinerator($('[name="machineID"]').val(),$('[name="maxDoorCount"]').val(),$('[name="maxBurningTime"]').val(),$('[name="alarmTime"]').val())
           .then((r)=>{
            showAlertMessage();
            setType("success");
            setMessage("Incinerator Saved Successfully") 
           })
           .catch((err)=>{
            showAlertMessage();
            setType("error");
            setMessage("Error: Occured") 
           })
        }

    }



    return<>
         
        <div className="row" id="container">
        <div className="col-lg-12">
          
              <div>
                <div>
                  <div>
                  <div className="container" >
                            <div className="row "  style={{display: 'flex'}}>
                                      <div className="row col-lg-6"  style={{display:'flex'}}>
                                         <div className="col-md-4 col-lg-4 mr-2">
                                              <div className="form-group my-2">
                                              
                                                  <input  placeholder="Serial Number *" type="text" className="form-control" name="machineID"  />
                                                  <div className="invalid-feedback" />
                                              </div>
                                      
                                          </div>
                                          <div className="col-md-2 col-lg-2">
                                              <div className="form-group my-2 ">
                                              <button type="button" className="btn btn-success text-white" onClick={Get}>GET</button>
                                              </div>
                                          
                                              
                                          </div>
                                          </div>
                                   <div className="row col-lg-6 "  style={{display:'flex'}}>
                                          
                                          <div className="col-md-3 col-lg-4 mr-2 ml-0">
                                              <div className="form-group my-2">
                                                  
                                                      <input placeholder="New Serial Number *" type="text" className="form-control" name="newSerialNumber" />
                                                  <div className="invalid-feedback" />
                                              </div>
                                          
                                          </div>
                                              <div className="col-md-2 col-lg-2">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary text-white" onClick={Set}>SET</button>
                                              </div>
                                          </div>
                                   </div>
                                      <div className="row"   style={{display: 'flex'}}>
                                      
                                          <div className="col-md-7 mr-2 ml-0">
                                              <div className="form-group my-2">
                                              
                                                  <div  style={{display: 'flex'}}>
                                                      <p  style={{width:'200px'}}>SetSerialCounts:</p>
                                                      <p className="setSerialCounts" style={{width:'200px'}}>0 / 0</p>
                                                  </div>
                                                  <div className="invalid-feedback" />
                                              </div>
                                      
                                          </div>
                                      
                                      </div>
                                      
                                          
                                      
                                  </div>
                                  <div className="modal-footer" />

                                       <div className="mt-0">
                                      <div className="container mt-0" style={{display: 'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
                                          
                                      <div className="row mr-0 ml-0">
                                          <div className="col-md-4 ml-0 mr-0" >
                                              <div className="form-group my-2">
                                              
                                                  <input  placeholder="Price" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="price" />
                                                  <div className="invalid-feedback" />
                                              </div>
                                          </div>
                                          <div className="col-md-5">
                                              <div className="form-group my-2 ">
                                              <button type="button" className="btn btn-primary"  onClick={SavePrice}>SET PRICE</button>
                                              </div>
                                          </div>
                                      
                                      </div>
                                      <div className="row">
                                              <div className="col-md-7">
                                                  <div className="form-group my-2">
                                                  
                                                      <input type="text" placeholder="Model Name" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="modelName" />
                                                  
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-5 ">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary" onClick={SaveModelName}>SET NAME</button>
                                                  </div>
                                              </div>
                                          
                                          </div>
                                          <div className="row">
                                              <div className="col-md-7">
                                                  <div className="form-group my-2">
                                                  
                                                      <input type="text" placeholder="Model" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="model" />
                                                  
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-5 ">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary" onClick={SaveModel} >SET MODEL</button>
                                                  </div>
                                              </div>
                                          
                                          </div>
                                     </div>
                                  </div>

                           </div>
                           
                           <div   className="mt-1" style={{padding:'10px'}} >
                              <div>
                                  <div >
                                      <div className="modal-header">
                                          <h5 className="modal-title">Temperature</h5>
                                          <button type="button" className="btn btn-warning  text-white" onClick={SaveTemperature}>SET TEMPERATURE</button>
                                      </div>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Min Temp warning" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="minTempA" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Max Temp Secondary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="maxTempA" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Min Temp Primary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="minTempB" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                  <input placeholder="Max Temp Primary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="maxTempB" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  
                                  </div>
                              </div>
                          </div>
                       
                          <div style={{marginTop: '-10px',padding:'10px'}} className="m-1">
                              <div   >
                                  <div >
                                      <div className="modal-header mt-0" >
                                          <h5 className="modal-title">Incinerator</h5>
                                          <button type="button" className="btn btn-info text-white" onClick={SaveIncinerator}>SET INCINERATOR</button>
                                      </div>
                                      <div className="modal-body">
                                          <div className="row" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Door Count For Auto Burning" type="text" className="form-control" name="maxDoorCount" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Maximum Burning Time" type="text" className="form-control" name="maxBurningTime" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Auto Burn Time" type="text" className="form-control" name="alarmTime" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                          
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>

                       



                  </div>
               </div>
            </div>
         
         
      </div>
     
  </div>
  <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      
 
  </>
}