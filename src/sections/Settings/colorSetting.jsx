import $ from 'jquery';
import React,{useState, useEffect } from "react";

import { Card } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Container } from "@mui/system";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { LoadColors, UpdateColors } from "src/_mock/colrSet";
// import { GetColorsWithRange } from "src/_mock/hourlyReport";


const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));
  

export default function ColorSetting(){
    const [showAlert, setShowAlert] = useState(false);
    const [message,setMessage]=useState("");
    const [type,setType]=useState("")


    const showAlertMessage = () => {
        setShowAlert(true);
    
        // You can optionally set a timeout to hide the alert after a few seconds
        setTimeout(() => {
        setShowAlert(false);
        }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
    };


   

    useEffect(() => {
       

      // getting existing colors from api and displayed it
    
        LoadColors().then((data)=>{
            console.log(data);
            const colorInputs = document.getElementsByClassName('colorInput');
            const selectedColors = document.getElementsByClassName('selectedColor');
            const rangeInputs=document.getElementsByClassName('rangeInput');
    
          
            Array.from(colorInputs).forEach((elem, i) => {
               if(i===0)
               {
                elem.value=data.Primary
               }
               else if(i===1)
               {
                elem.value=data.Secondary
               }
               else if(i===2)
               {
                elem.value=data.Tertiary
               }
               else
               {
                elem.value=data.Faulty
               }
                const color = elem.value;
                selectedColors[i].style.backgroundColor = color;
             
            
            });

               Array.from(rangeInputs).forEach((elem, i) => {
               if(i===0)
               {
                elem.value=data.Range1
               }
               else if(i===1)
               {
                elem.value=data.Range2
               }
               else if(i===2)
               {
                elem.value=data.Range3
               }
               else
               {
                elem.value=data.Range4
               }
             
             
            
            });
          
        }) // Call the LoadColors function when the component mounts
    
        const colorInputs = document.getElementsByClassName('colorInput');
        const selectedColors = document.getElementsByClassName('selectedColor');
    
        Array.from(colorInputs).forEach((elem, i) => {
          elem.addEventListener('input', () => {
            const color = elem.value;
            selectedColors[i].style.backgroundColor = color;
          });
        });
    
        // Cleanup event listeners when the component unmounts
        return () => {
          Array.from(colorInputs).forEach((elem, i) => {
            elem.removeEventListener('input', () => {
              const color = elem.value;
              selectedColors[i].style.backgroundColor = color;
            });
          });
        };
      }, []);



      // set new colors with function 
      const SetColors=()=>{
         const obj={
            primary:$('.colorInput1').val(),
            secondary:$('.colorInput2').val(),
            tertiary:$('.colorInput3').val(),
            faulty:$('.colorInput4').val(),
            range1:$('.rangeInput1').val(),
            range2:$('.rangeInput2').val(),
            range3:$('.rangeInput3').val(),
            range4:$('.rangeInput4').val(),
        
         }
         if($('.rangeInput2').val() < $('.rangeInput3').val())
            {
                showAlertMessage();
                setType("warning");
                setMessage("Secondary should be less than Primary and greater than Tertiary")
               
            }
            else if($('.rangeInput3').val() < $('.rangeInput4').val())
            {
                showAlertMessage();
                setType("warning");
                setMessage("Tertiary should be less than Secondary and greater than Faulty")
               
            }
            else{
                UpdateColors(obj).then((res)=>{
                    showAlertMessage();
                setType("success");
                setMessage("Saved Successfully")
                  

                });
            }
          
      }

    return<>

    {/* alert popup ui */}
           <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
        <Card sx={{padding:2}}>
            <Container maxWidth='xxl' >
        <div className="row">
        <div className="col-12">
          
                  <div className="row mt-4 mr-2">
                <div className="col-12" style={{display:'flex',justifyContent:'flex-end'}}>
                    <p className="text-right">
                        <button type="button" className="btn btn-success text-white" onClick={SetColors}>Set Colors
                        </button>
                    </p>
                </div>
            </div>
                <div className="card-body">
                    <div className="color-picker" style={{display: 'flex', justifyContent:'space-around',alignItems:'center'}}>
                        <input type="color" className="colorInput colorInput1" />
                        <div className="selectedColor selectedColor1" />
                          <div style={{width: '300px',textAlign:'center'}}>
                              <h4 className="text1">Primary <input className="rangeInput rangeInput1" style={{width: '100px'}} readOnly /></h4>
                        </div>
                    </div>
                      <div className="color-picker" style={{display: 'flex', justifyContent:'space-around',alignItems:'center'}}>
                        <input type="color" className="colorInput colorInput2"/>
                        <div className="selectedColor selectedColor2" />
                        <div style={{width: '300px',textAlign:'center'}}>
                                <h4 className="text2">Secondary <input className="rangeInput rangeInput2" style={{width: '100px'}} /></h4>
                        </div>
                       
                    </div>
                      <div className="color-picker" style={{display: 'flex', justifyContent:'space-around',alignItems:'center'}}>
                        <input type="color" className="colorInput colorInput3" />
                        <div className="selectedColor selectedColor3" />
                          <div style={{width: '300px',textAlign:'center'}}>
                                <h4 className="text2">Tertiary <input className="rangeInput rangeInput3" style={{width: '100px'}}/></h4>
                        </div>
                    </div>
                      <div className="color-picker" style={{display: 'flex', justifyContent:'space-around',alignItems:'center'}}>
                        <input type="color" className="colorInput colorInput4" />
                        <div className="selectedColor selectedColor4" />
                         <div style={{width: '300px',textAlign:'center'}}>
                                <h4 className="text2">Faulty <input className="rangeInput rangeInput4" style={{width: '100px'}} /></h4>
                        </div>
                    </div>
                </div>
            
          </div>
    </div>
    </Container>
    </Card>
    </>

}