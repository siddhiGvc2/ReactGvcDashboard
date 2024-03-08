// import $ from 'jquery'
import moment from "moment";
import { useState} from 'react';
import SwitchButton from 'bootstrap-switch-button-react';

import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import { getAllStock,getAllTransactions } from "src/_mock/inventory";

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

   

    const handleChange = () => {
      setIsChecked(!isChecked);
    };
    
    const LoadData=()=>{
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
    
  

    return(
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
    
    )
}