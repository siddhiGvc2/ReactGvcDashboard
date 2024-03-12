import 'select2'; 
import $ from 'jquery'
import moment from "moment";
import { useState} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { fetchUsers } from 'src/_mock/user';
import { AllMachines } from 'src/_mock/AllMachines';
import { getAllStock,getAllTransactions,updateInventoryStocks,updateInventoryTransactions} from "src/_mock/inventory";

import InventoryView from "./user/view/inventoryTransactions";
import InventoryStocksView from "./user/view/inventoryStocks";



export default function InventoryPage(){
    // const [selectedOption, setSelectedOption] = useState('Option 1');
    const [data,setData]=useState(null);
    const [stockData,setStockData]=useState(null);
    // const [last,setLast]=useState(null);
    const [startDate,setStartDate]=useState(moment().format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(moment().format('YYYY-MM-DD'));
    const [isChecked, setIsChecked] = useState(true);
    const [inventoryObj,setInventoryObj]=useState({});
    const [stockObj,setStockObj]=useState({});
    
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
  
    
    const handleStockInputChange = (e) => {
        const { name, value } = e.target;
        setStockObj((prevStockObj) => ({
          ...prevStockObj,
          [name]: value,
        }));
      };
   
      const handleInventoryInputChange = (e) => {
        const { name, value } = e.target;
        setInventoryObj((prevInventoryObj) => ({
          ...prevInventoryObj,
          [name]: value,
        }));
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
    
    const updateTransaction=()=>{
        updateInventoryTransactions(inventoryObj);

    }

    const updateStock=()=>{
        updateInventoryStocks(stockObj)
    }
  

    return<>
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
      <Typography sx={{display:'flex',mt:2,alignItems:'center',gap:2,justifyContent:'flex-end'}}>
                  <div >
                        <p >
                            <button type="button" className="btn btn-warning text-white" onClick={handleOpenMenu} >
                                Transfer Inventory
                            </button>
                        </p>
                    </div>
                    <div >
                        <p >
                            <button type="button" className="btn btn-primary text-white" onClick={(e)=>setOpen2(e.target)}>Set Stocks
                            </button>
                        </p>
                    </div>
      </Typography>
       
    <div className="row mt-2">
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
               
                 { data && isChecked && <InventoryView users={data} />}
                 { stockData && !isChecked && <InventoryStocksView users={stockData} />}
               
                
                
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
            sx: { width: 640 },
          }}
       
      >
    <div className="modal-dialog" role="dialog" style={{minWidth: '30vw;',padding:'20px'}}>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Transfer Inventory</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseMenu}>
                    <span aria-hidden="true" >&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>From:</h5>
                            <input type="text" className="form-control" name="from" readOnly onChange={handleInventoryInputChange}/>
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
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>setOpen(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateTransaction}>Submit</button>
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
        <div className="modal-dialog" role="document" style={{minWidth: '30vw',padding:'20px'}}>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Set Stock</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={()=>setOpen2(null)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
           
                <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5>User Name:</h5>
                            <input type="text" className="form-control" name="userName" onChange={handleStockInputChange} />
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
                <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={()=>setOpen2(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={updateStock}>Submit</button>
            </div>
        </div>
    </div>
   
    </Popover>
    
    </>
}