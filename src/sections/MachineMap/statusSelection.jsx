import $ from 'jquery';
import PropTypes from 'prop-types';
import React, {  useState ,useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import {getAllData } from 'src/_mock/fildData';

function StatusSelection({MachineType, sx, ...other }) {
  // const [mStatus] = useState(['Online', 'Offline']);
  const [machineStatus, setMachineStatus] = useState(['Online', 'Offline']);
  // const [sStatus] = useState(['Ok', 'Low','Empty']);
  const [stockStatus, setStockStatus] = useState([]);
  // const [bStatus] = useState(['Idle', 'Burning','Error']);
  const [burnStatus, setBurnStatus] = useState([]);
  // const [dStatus] = useState(['0', '1','2']);
  const [doorStatus, setDoorStatus] = useState([]);
  // Other state variables for stock status, burn status, door status, etc.


  useEffect(()=>{
    if(MachineType==="Incineraotor")
    {
      $('.vending').remove();
    }
    else if(MachineType==="Vending")
    {
      $('.incinerator').remove();
    }
    sessionStorage.setItem('machineStatus',JSON.stringify(machineStatus));
    sessionStorage.setItem('stockStatus',JSON.stringify(stockStatus));
    sessionStorage.setItem('burnStatus',JSON.stringify(burnStatus));
    sessionStorage.setItem('dorStatus',JSON.stringify(doorStatus));
  
  })
  

  const handleMachineStatusChange = (event) => {
    sessionStorage.setItem('machineStatus',JSON.stringify(event.target.value));
    setMachineStatus(event.target.value);
    getAllData();
    // Handle other logic as needed
  };
  const handleStockStatusChange = (event) => {
    sessionStorage.setItem('stockStatus',JSON.stringify(event.target.value));
    setStockStatus(event.target.value);
    getAllData();
    // Handle other logic as needed
  };
  const handleBurnStatusChange = (event) => {
    sessionStorage.setItem('burnStatus',JSON.stringify(event.target.value));
    setBurnStatus(event.target.value);
    getAllData();
    // Handle other logic as needed
  };
  const handleDoorStatusChange = (event) => {
    sessionStorage.setItem('dorStatus',JSON.stringify(event.target.value));
    setDoorStatus(event.target.value);
    getAllData();
    // Handle other logic as needed
  };

  // Other similar handler functions for different dropdowns

  return (
    <Card
      component={Stack}
      spacing={0.5}
      direction="column"
      sx={{
        px: 1,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.1}>
        {/* Machine Status Dropdown */}
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">Machine Status</h5>
          <div className="row">
            <div className="col-12 d-flex">
              <Select
                multiple
                value={machineStatus}
                onChange={handleMachineStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) =>selected.join(',')}
              >
                 <MenuItem value="Online">
                  <Checkbox checked={machineStatus.indexOf('Online') > -1} />
                  Online
                </MenuItem>
                <MenuItem value="Offline">
                  <Checkbox checked={machineStatus.indexOf('Offline') > -1} />
                  Offline
                </MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1 vending">
          <h5 className="text-primary d-inline">{MachineType!=="RECD" ?"Stock Status":"Temperature Status"}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            {MachineType !== "RECD" && (
              <Select
                multiple
                value={stockStatus}
                onChange={handleStockStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
              >
                     <MenuItem value="3">
                          <Checkbox checked={stockStatus.indexOf('3') > -1} />
                        Ok
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={stockStatus.indexOf('1') > -1} />
                          Low
                        </MenuItem>
                    
                        <MenuItem value="0">
                          <Checkbox checked={stockStatus.indexOf('0') > -1} />
                          Empty
                        </MenuItem>
                    </Select>
                 )}
                  {MachineType === "RECD" && (
              <Select
                multiple
                value={stockStatus}
                onChange={handleStockStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
              >
                        <MenuItem value="3">
                          <Checkbox checked={stockStatus.indexOf('3') > -1} />
                          Ok
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={stockStatus.indexOf('1') > -1} />
                          Not Ok
                        </MenuItem>
                    </Select>
                 )}
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1 incinerator">
          <h5 className="text-primary d-inline">{MachineType!=="RECD" ?"Burn Status":"Pressure Status"}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            {MachineType !== "RECD" && (
              <Select
                multiple
                value={burnStatus}
                onChange={handleBurnStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
              >
              
                        <MenuItem value="0">
                          <Checkbox checked={burnStatus.indexOf('0') > -1} />
                          Idle
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={burnStatus.indexOf('1') > -1} />
                          Burning
                        </MenuItem>
                        <MenuItem value="2">
                          <Checkbox checked={burnStatus.indexOf('2') > -1} />
                          Error
                        </MenuItem>
                      
                 
              </Select>
                 )}

            {MachineType === "RECD" && (
              <Select
                multiple
                value={burnStatus}
                onChange={handleBurnStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
              >
    
                       <MenuItem value="3">
                          <Checkbox checked={burnStatus.indexOf('3') > -1} />
                          Ok
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={burnStatus.indexOf('1') > -1} />
                          Not Ok
                        </MenuItem>
                 
              </Select>
                 )}
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">{MachineType!=="RECD" ?"Door Status":"Temper Status"}</h5>
          <div className="row">
            <div className="col-12 d-flex">
            {MachineType !== "RECD" && (
              <Select
                multiple
                value={doorStatus}
                onChange={handleDoorStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                  selected.length > 0
                  ? `${selected.length} Selected`
                  : 'None Selected'
                }
              >
                          <MenuItem value="0">
                          <Checkbox checked={doorStatus.indexOf('0') > -1} />
                          Door Open
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={doorStatus.indexOf('1') > -1} />
                          Door Close
                        </MenuItem>
                        <MenuItem value="2">
                          <Checkbox checked={doorStatus.indexOf('2') > -1} />
                          Door Forced Open
                        </MenuItem>
                

                  {MachineType === "RECD" && (
                      <div>
                        <MenuItem value="3">
                          <Checkbox checked={doorStatus.indexOf('3') > -1} />
                          Ok
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={doorStatus.indexOf('1') > -1} />
                          Not Ok
                        </MenuItem>
                      </div>
                    )}
                  

              </Select>
              )}
               {MachineType === "RECD" && (
              <Select
                multiple
                value={doorStatus}
                onChange={handleDoorStatusChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%' }}
                renderValue={(selected ) => 
                  selected.length > 0
                  ? `${selected.length} Selected`
                  : 'None Selected'
                }
              >
                       <MenuItem value="3">
                          <Checkbox checked={doorStatus.indexOf('3') > -1} />
                          Ok
                        </MenuItem>
                        <MenuItem value="1">
                          <Checkbox checked={doorStatus.indexOf('1') > -1} />
                          Not Ok
                        </MenuItem>
                  </Select>
              )}
            </div>
          </div>
        </div>
        {/* Other Dropdowns */}
        {/* ... */}
      </Stack>
    </Card>
  );
}

StatusSelection.propTypes = {
  sx: PropTypes.object,
  MachineType:PropTypes.any
};

export default StatusSelection;
