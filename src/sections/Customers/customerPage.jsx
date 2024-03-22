import 'select2'; 
import $ from 'jquery'
// import moment from "moment";
import SwitchButton from 'bootstrap-switch-button-react';
import React,{ useState, useEffect, useCallback} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { Container } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

// import { fetchUsers } from 'src/_mock/user';
// import { AllMachines } from 'src/_mock/AllMachines';
// import { updateInventoryStocks,updateInventoryTransactions} from "src/_mock/inventory";

// import InventoryView from "./user/view/inventoryTransactions";
// import InventoryStocksView from "./user/view/inventoryStocks";
import { updateData,updateInfo,getCustomerData, getAllCustomerInfo } from 'src/_mock/customers';

import CustomerDataView from './CustomerTables/view/customerData';
import CustomerInfoView from './CustomerTables/view/customerInfo';
// import { update } from 'lodash';

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));
  
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


export default function CustomerPage(){
    // const [selectedOption, setSelectedOption] = useState('Option 1');
    const [data,setData]=useState(null);
    const [stockData,setStockData]=useState(null);
    // const [last,setLast]=useState(null);
 
    const [isChecked, setIsChecked] = useState(true);
    // const [customerDataObj,setCustomerDataObj]=useState({});
    // const [customerInfoObj,setCustomerInfoObj]=useState({});
    
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);

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


    const handleModalOpen1 = () => {
   
 
        setOpenModal1(true);
        // setTimeout(()=>{
             
        //   $('#mdlPwd [name="name"]').val(row.name);
        //   $('#mdlPwd [name="email"]').val(row.email);
        // },200)
      };
      const handleModalClose1 = () => {
        setOpenModal1(false);
      };

      const handleModalOpen2 = () => {
   
 
        setOpenModal2(true);
        // setTimeout(()=>{
             
        //   $('#mdlPwd [name="name"]').val(row.name);
        //   $('#mdlPwd [name="email"]').val(row.email);
        // },200)
      };
      const handleModalClose2 = () => {
        setOpenModal2(false);
      };


   

  
    // const LoadUserNameDDL=()=>{
      
    //     console.log("select2function started");
    //     // Use Promise.all() to make simultaneous requests to both APIs
    //     Promise.all([fetchUsers(), AllMachines()])
    //       .then(([response1, response2]) => {
    //         console.log(response1);
    //         console.log(response2);
    //         const data1 = response1;
    //         const data2 = response2;
    
    //         // Combine data from both APIs (if needed)
    //         const combinedData = [...data1, ...data2];
    
    //         // Populate the Select2 dropdown
    //         $('#to').select2({
    //           data: combinedData.map(item => ({
    //             id: item.name || item.machineId,
    //             text: item.name || item.machineId,
    //             ...item,
    //           })),
    //           maximumInputLength: 2,
    //           templateResult: formatEntry,
    //           templateSelection: formatSelection,
    //         });
    //       })
    //       .catch(error => {
    //         console.error('Error loading data:', error);
    //       });
    
    //     return () => {
    //       // Cleanup Select2 when the component unmounts
    //       $('#to').select2('destroy');
    //     };
    //   // Empty dependency array means this effect runs once after the initial render
    //  }
    //   // Helper functions for customizing Select2 appearance

    //   const formatEntry = entry =>entry.text || entry.name || entry.machineId;
      
    
    //   const formatSelection = selection =>  selection.name || selection.machineId;
    

  
    
    const handleDataInputChange = (e) => {
        // const { name, value } = e.target;
        // setCustomerDataObj((prevCustomerDataObj) => ({
        //   ...prevCustomerDataObj,
        //   [name]: value,
        // }));
      };
   
      const handleInfoInputChange = (e) => {
        // const { name, value } = e.target;
        // setCustomerInfoObj((prevCustomerInfoObj) => ({
        //   ...prevCustomerInfoObj,
        //   [name]: value,
        // }));
      };

    const handleChange = () => {
      setIsChecked(!isChecked);
      LoadData();
    };
    

    const LoadData=useCallback(()=>{
        setData([]);
        setStockData([]);
        if(isChecked)
        {
        getCustomerData().then((res)=>{
         
           setData(res.data)
           
           
        })
       }
       else{
        getAllCustomerInfo().then((res)=>{
            setStockData(res.data)
        })
       }

    },[isChecked])

   
      useEffect(() => {
     
         LoadData();
      
      },[LoadData]);
    
     
      const updateCustomerData=()=>{
        const obj = {
            CustomerName: $('#mdlAddData [name="cust_name"]').val(),
            CInfo1: $('#mdlAddData [name="CInfo1"]').val(),
            CInfo2: $('#mdlAddData [name="CInfo2"]').val(),
            CInfo3: $('#mdlAddData [name="CInfo3"]').val(),
            CInfo4: $('#mdlAddData [name="CInfo4"]').val(),
            MachineType:$('#mdlAddData [name="MachineType"]').val(),
           
        };
        updateData(obj).then((r)=>{
            showAlertMessage(true);
            setType("success");
            setMessage("Saved Succesfully");
            handleModalClose1();
            LoadData();
        });

    }

    const updateCustomerInfo=()=>{
        const obj = {
            CustomerName: $('#mdlAddInfo [name="CustomerName"]').val(),
            City: $('#mdlAddInfo [name="City"]').val(),
          
        };
        updateInfo(obj).then((r)=>{
            showAlertMessage(true);
            setType("success");
            setMessage("Saved Succesfully");
            handleModalClose2();
            LoadData();
        })
    }
  

    return<>
       <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
    <Card>
        <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 ,display:'flex',mt:2,alignItems:'center',gap:2}}>
         Customers
        <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                      
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="Data"
                                    offlabel="Info"
                                    onstyle='success'
                                    offstyle='info'
                                    width={140}
                                />
                            </div>
                        </div>
                    </div>
      </Typography>
      <Typography sx={{display:'flex',mt:2,alignItems:'center',gap:2,justifyContent:'flex-end'}}>
                  <div >
                        <p >
                            <button type="button" className="btn btn-warning text-white" onClick={handleModalOpen1} >
                                Add Customer Data
                            </button>
                        </p>
                    </div>
                    <div >
                        <p >
                            <button type="button" className="btn btn-primary text-white" onClick={handleModalOpen2}> Add Customer Info
                            </button>
                        </p>
                    </div>
      </Typography>
       
    {/* <div className="row mt-2">
                  
                   
                 
                    
                </div> */}
              
                 <div>
               
                 { data && isChecked && <CustomerDataView users={data} LoadData={LoadData} />}
                 { stockData && !isChecked && <CustomerInfoView users={stockData} LoadData={LoadData}/>}
               
                
                
                 </div>
               
                </Container>
             
   

    </Card>
    <Modal
        open={openModal1}
        onClose={handleModalClose1}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 600 }}>
      <div className="modal-dialog" role="document" style={{padding:'10px'}} id="mdlAddData">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Customer Data</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose1}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Customer Name:</h6>
                            <input type="text" className="form-control" name="cust_name" onChange={handleDataInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo1:</h6>
                            <input type="text" className="form-control" name="CInfo1" onChange={handleDataInputChange}  />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo2:</h6>
                            <input type="text" className="form-control" name="CInfo2"  onChange={handleDataInputChange}/>
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo3:</h6>
                            <input type="text" className="form-control" name="CInfo3" onChange={handleDataInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo4:</h6>
                            <input type="text" className="form-control" name="CInfo4" onChange={handleDataInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                      <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Select Machine Type:</h6>
                            <select className="form-control" name="MachineType" onChange={handleDataInputChange}>
                                <option value="Combo">Combo</option>
                                <option value="Vending">Vending</option>
                                <option value="Incinerator">Incinerator</option>
                                <option value="RECD">RECD</option>

                            </select>
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                  
                  
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={updateCustomerData}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose1}>Close</button>
            </div>
        </div>
    </div>
    </Box>
    </Modal>
     
    <Modal
        open={openModal2}
        onClose={handleModalClose2}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 600 }}>
        <div className="modal-dialog" role="document" style={{padding:'10px'}} id="mdlAddInfo">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Customer Info</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose2}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Customer Name :</h6>
                            <input type="text" className="form-control" name="CustomerName" onChange={handleInfoInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>City :</h6>
                            <input type="text" className="form-control" name="City" onChange={handleInfoInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    
                  
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={updateCustomerInfo}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose2}>Close</button>
            </div>
        </div>
    </div>
    </Box>
    </Modal>
    </>
}