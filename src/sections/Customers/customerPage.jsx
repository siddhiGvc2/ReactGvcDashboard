import 'select2'; 
import $ from 'jquery'
// import moment from "moment";
import { useState, useEffect, useCallback} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { fetchUsers } from 'src/_mock/user';
import { AllMachines } from 'src/_mock/AllMachines';
// import { updateInventoryStocks,updateInventoryTransactions} from "src/_mock/inventory";

// import InventoryView from "./user/view/inventoryTransactions";
// import InventoryStocksView from "./user/view/inventoryStocks";
import {getCustomerData, getAllCustomerInfo } from 'src/_mock/customers';

import CustomerDataView from './CustomerTables/view/customerData';
import CustomerInfoView from './CustomerTables/view/customerInfo';




export default function CustomerPage(){
    // const [selectedOption, setSelectedOption] = useState('Option 1');
    const [data,setData]=useState(null);
    const [stockData,setStockData]=useState(null);
    // const [last,setLast]=useState(null);
 
    const [isChecked, setIsChecked] = useState(true);
    // const [inventoryObj,setInventoryObj]=useState({});
    // const [stockObj,setStockObj]=useState({});
    
    const [open, setOpen] = useState(null);
    const [open2, setOpen2] = useState(null);

   

  
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
    
            // Populate the Select2 dropdown
            $('#to').select2({
              data: combinedData.map(item => ({
                id: item.name || item.machineId,
                text: item.name || item.machineId,
                ...item,
              })),
              maximumInputLength: 2,
              templateResult: formatEntry,
              templateSelection: formatSelection,
            });
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

      const formatEntry = entry =>entry.text || entry.name || entry.machineId;
      
    
      const formatSelection = selection =>  selection.name || selection.machineId;
    

    const handleCloseMenu = () => {
      setOpen(null);
      
    };
    const handleOpenMenu = (event) => {
        
        setOpen(event.currentTarget);
        LoadUserNameDDL();
      };
  
    
    // const handleStockInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setStockObj((prevStockObj) => ({
    //       ...prevStockObj,
    //       [name]: value,
    //     }));
    //   };
   
    //   const handleInventoryInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setInventoryObj((prevInventoryObj) => ({
    //       ...prevInventoryObj,
    //       [name]: value,
    //     }));
    //   };

    const handleChange = () => {
      setIsChecked(!isChecked);
      LoadData();
    };
    

    const LoadData=useCallback(()=>{
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
    
    
    // const updateTransaction=()=>{
    //     updateInventoryTransactions(inventoryObj);

    // }

    // const updateStock=()=>{
    //     updateInventoryStocks(stockObj)
    // }
  

    return<>
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
                            <button type="button" className="btn btn-warning text-white" onClick={handleOpenMenu} >
                                Add Customer Data
                            </button>
                        </p>
                    </div>
                    <div >
                        <p >
                            <button type="button" className="btn btn-primary text-white" onClick={(e)=>setOpen2(e.target)}> Add Customer Info
                            </button>
                        </p>
                    </div>
      </Typography>
       
    {/* <div className="row mt-2">
                  
                   
                 
                    
                </div> */}
              
                 <div>
               
                 { data && isChecked && <CustomerDataView users={data} />}
                 { stockData && !isChecked && <CustomerInfoView users={stockData} />}
               
                
                
                 </div>
               
                </Container>
             
   

    </Card>
        <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
            sx: {
              width: 640,
           
            },
          }}
       
      >
      <div className="modal-dialog" role="document" style={{padding:'10px'}}>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Customer Data</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Customer Name:</h6>
                            <input type="text" className="form-control" name="cust_name" />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo1:</h6>
                            <input type="text" className="form-control" name="CInfo1" />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo2:</h6>
                            <input type="text" className="form-control" name="CInfo2" />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo3:</h6>
                            <input type="text" className="form-control" name="CInfo3" />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>CInfo4:</h6>
                            <input type="text" className="form-control" name="CInfo4" />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                      <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Select Machine Type:</h6>
                            <select className="form-control" name="MachineType" disabled>
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
                <button type="button" className="btn btn-primary" >Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
    </Popover>
    <Popover
        open={!!open2}
        anchorEl={open2}
        onClose={()=>setOpen2(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
            sx: { width: 640 },
          }}
       
      >
        <div className="modal-dialog" role="document" style={{padding:'10px'}}>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Customer Info</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Customer Name :</h6>
                            <input type="text" className="form-control" name="CustomerName"  />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>City :</h6>
                            <input type="text" className="form-control" name="City"  />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    
                  
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" >Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
    </Popover>
    
    </>
}