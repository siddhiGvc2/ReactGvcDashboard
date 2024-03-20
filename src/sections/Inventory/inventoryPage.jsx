import 'select2'; 
import $ from 'jquery'
import moment from "moment";
import Select from 'react-select';
import React,{ useState, useEffect} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { Container } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
// import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import { fetchUsers } from 'src/_mock/user';
import { AllMachines } from 'src/_mock/AllMachines';
import { getAllStock,getAllTransactions,updateInventoryStocks,updateInventoryTransactions} from "src/_mock/inventory";

import InventoryView from "./user/view/inventoryTransactions";
import InventoryStocksView from "./user/view/inventoryStocks";


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
export default function InventoryPage(){
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOption1, setSelectedOption1] = useState([]);
    const [options,setOptions]=useState([]);
    const [data,setData]=useState(null);
    const [stockData,setStockData]=useState(null);
    // const [last,setLast]=useState(null);
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    const [isChecked, setIsChecked] = useState(true);
    // const [inventoryObj,setInventoryObj]=useState({});
    // const [stockObj,setStockObj]=useState({});
    
   
// modal for setStocks
    const [openModal1, setOpenModal1] = useState(false);

    // modal for transfter invertory
    const [openModal2, setOpenModal2] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [message,setMessage]=useState("");
    const [type,setType]=useState("");

    // show alert popup function
    const showAlertMessage = () => {
        setShowAlert(true);
    
        // You can optionally set a timeout to hide the alert after a few seconds
        setTimeout(() => {
        setShowAlert(false);
        }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
    };


    useEffect(()=>{
        // calling input list loading function
          LoadUserNameDDL();
    },[])


    // opening modal 1
    const handleModalOpen1 = () => {
   
 
        setOpenModal1(true);
        // setTimeout(()=>{
             
        //     LoadUserNameDDL();
        // },50)
      };

    //   closing modal 1
      const handleModalClose1 = () => {
        setOpenModal1(false);
      };

      const handleModalOpen2 = () => {
   
 
        setOpenModal2(true);
       
        // setTimeout(()=>{
             
        //     LoadUserNameDDL();
        // },50)
      };
      const handleModalClose2 = () => {
        setOpenModal2(false);
      };

    const LoadUserNameDDL=()=>{
      
        console.log("select2function started");
        // Use Promise.all() to make simultaneous requests to both APIs
        Promise.all([fetchUsers(), AllMachines()])
          .then(([response1, response2]) => {
            console.log(response1);
            console.log(response2);
            const data1 = response1;
            const data2 = response2;
    
            // Combine data from both APIs (if needed)
            const combinedData = [...data1, ...data2];

            const filteredData = combinedData.map(option => ({
                value: option.name || option.serial,
                label: option.name || option.serial
              }));
            setOptions(filteredData)

            // Populate the Select2 dropdown
            // $('#to').select2({
            //   data: combinedData.map(item => ({
            //     id: item.name || item.machineId,
            //     text: item.name || item.machineId,
            //     ...item,
            //   })),
            //   maximumInputLength: 2,
            //   templateResult: formatEntry,
            //   templateSelection: formatSelection,
            // });

          })
          .catch(error => {
            console.error('Error loading data:', error);
          });
    
        return () => {
          // Cleanup Select2 when the component unmounts
          $('#to').select2('destroy');
        };
      // Empty dependency array means this effect runs once after the initial render
     }
      // Helper functions for customizing Select2 appearance

    //   const formatEntry = entry =>entry.text || entry.name || entry.machineId;
      
    
    //   const formatSelection = selection =>  selection.name || selection.machineId;

      const handleSelectChange = (elem) => {
        setSelectedOption(elem);
      };

      const handleSelectChange1 = (elem) => {
        setSelectedOption1(elem);
      };
    

    
    const handleStockInputChange = (e) => {
        // const { name, value } = e.target;
        // setStockObj((prevStockObj) => ({
        //   ...prevStockObj,
        //   [name]: value,
        // }));
      };
   
      const handleInventoryInputChange = (e) => {
        // const { name, value } = e.target;
        // setInventoryObj((prevInventoryObj) => ({
        //   ...prevInventoryObj,
        //   [name]: value,
        // }));
      };

    const handleChange = () => {
      setIsChecked(!isChecked);
    };
    
    const LoadData=()=>{
        setData([]);
        setStockData([]);
        if(isChecked)
        {
        getAllTransactions(startDate,endDate).then((res)=>{
         
           setData(res.data)
           
           
        })
       }
       else{
        getAllStock().then((res)=>{
            setStockData(res.data)
        })
       }

    }
    

    // edit transaction function
    const updateTransaction=()=>{
  
        const obj={
            from: selectedOption1.value,
            to: $('#mdlInventory [name="to"]').val(),
            qtyDelivered: $('#mdlInventory [name="qtyDelivered"]').val(),
            cashReceived: $('#mdlInventory [name="cashReceived"]').val(),
            remark: $('#mdlInventory [name="remark"]').val(),

        }
        updateInventoryTransactions(obj).then((r)=>{
            showAlertMessage(true);
            setType("success");
            setMessage("Saved Succesfully");
            handleModalClose1()
        });

    }


    // edit stock function
    const updateStock=()=>{
      
        const obj={
            userName: selectedOption.value,
            qty: $('#mdlStock [name="qty"]').val(),
            cash: $('#mdlStock [name="cash"]').val(),
          
        }
        updateInventoryStocks(obj).then((r)=>{
            showAlertMessage(true);
            setType("success");
            setMessage("Saved Succesfully");
            handleModalClose2()
        })
    }
  

    return<>
     {/* alert popup ui */}
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
        Inventory
        <div className="col-xl-3 col-lg-5 col-md-6 col-12 col-12 my-2">
                      
                        <div className="row">
                            <div className="col-12 sw-parent">
                               
                                     <SwitchButton
                                
                                    checked={isChecked}
                                    onChange={handleChange}
                                    onlabel="Trasnactions"
                                    offlabel="Stocks"
                                    onstyle='success'
                                    offstyle='info'
                                    width={180}
                                />
                            </div>
                        </div>
                    </div>
      </Typography>
    <Typography sx={{display:'flex',mt:0,alignItems:'center',gap:2,justifyContent:'flex-end'}}>
                  <div >
                        <p >
                            <button type="button" className="btn btn-warning text-white" onClick={handleModalOpen1} >
                                Transfer Inventory
                            </button>
                        </p>
                    </div>
                    <div >
                        <p >
                            <button type="button" className="btn btn-primary text-white" onClick={handleModalOpen2}>Set Stocks
                            </button>
                        </p>
                    </div>
      </Typography>
       
    <div className="row mt-0">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2" style={isChecked ? {visibility:'visible'}:{visibility:'hidden'}}>
                        <h5>Start Date:</h5>
                        <div className="row">
                            <div className="col-12 d-flex">
                                <input type="date" className="form-control" defaultValue={moment().format('YYYY-MM-DD')} name="startDate" min="2023-07-08" onChange={(e)=>setStartDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 col-12 my-2" style={isChecked ? {visibility:'visible'}:{visibility:'hidden'}}>
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
               
                 {/* transaction table ui */}
                 { data && isChecked && <InventoryView users={data} />}


                  {/* stocks table ui */}
                 { stockData && !isChecked && <InventoryStocksView users={stockData} />}
               
                
                
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
    <div className="modal-dialog" role="dialog" id="mdlInventory">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Transfer Inventory</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose1}>
                    <span aria-hidden="true" >&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>From:</h5>
                        <Select
                                name="from"
                                value={selectedOption1}
                                onChange={handleSelectChange1}
                                options={options}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            />
                            {/* <input type="text" className="form-control" name="from" readOnly onChange={handleInventoryInputChange}/> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>To:</h5>
                            <input type="text" className="form-control" id="to" name="to" onChange={handleInventoryInputChange}/>
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>Qty Delvered:</h5>
                               <input type="text" className="form-control" name="qtyDelivered" onChange={handleInventoryInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                      <div className="col-md-6 ">
                        <div className="form-group my-2">
                        <h5>Cash Received:</h5>
                               <input type="text" className="form-control" name="cashReceived" onChange={handleInventoryInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>Remark:</h5>
                                  <input type="text" className="form-control" name="remark" onChange={handleInventoryInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                </div>
               
               
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleModalClose1}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateTransaction}>Submit</button>
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
        
           <Box sx={{ ...style, width: 500 }}>
        <div className="modal-dialog" role="document" id="mdlStock">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Set Stock</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={handleModalClose2}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
           
                <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>User Name:</h5>
                        <Select
                                name="userName"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                options={options}
                                isSearchable // Equivalent to isSearchable={true}
                                placeholder="Select option..."
                            />
                            {/* <input type="select" className="form-control" name="userName" onChange={handleStockInputChange} /> */}
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>Quantity:</h5>
                            <input type="text" className="form-control" name="qty"  onChange={handleStockInputChange}/>
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>Cash:</h5>
                              <input type="text" className="form-control" name="cash" onChange={handleStockInputChange} />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    
                </div>
               
               
            </div>
              
        
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={handleModalClose2}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateStock}>Submit</button>
            </div>
        </div>
    </div>
   
    </Box>
    </Modal>
    
    </>
}