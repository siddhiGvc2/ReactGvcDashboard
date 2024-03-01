import PropTypes from 'prop-types';
import React, {  useState ,useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

function StatusSelection({ sx, ...other }) {
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
    localStorage.setItem('machineStatus',JSON.stringify(machineStatus));
    localStorage.setItem('stockStatus',JSON.stringify(stockStatus));
    localStorage.setItem('burnStatus',JSON.stringify(burnStatus));
    localStorage.setItem('dorStatus',JSON.stringify(doorStatus));
  })
  

  const handleMachineStatusChange = (event) => {
    setMachineStatus(event.target.value);
    localStorage.setItem('machineStatus',JSON.stringify(event.target.value));
    // Handle other logic as needed
  };
  const handleStockStatusChange = (event) => {
    setStockStatus(event.target.value);
    localStorage.setItem('stockStatus',JSON.stringify(event.target.value));
    // Handle other logic as needed
  };
  const handleBurnStatusChange = (event) => {
    setBurnStatus(event.target.value);
    localStorage.setItem('burnStatus',JSON.stringify(event.target.value));
    // Handle other logic as needed
  };
  const handleDoorStatusChange = (event) => {
    setDoorStatus(event.target.value);
    localStorage.setItem('dorStatus',JSON.stringify(event.target.value));
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
                renderValue={(selected ) => 
                    selected.length > 0
                    ? `${selected.length} Selected`
                    : 'None Selected'
                  }
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
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">Stock Status</h5>
          <div className="row">
            <div className="col-12 d-flex">
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
                <MenuItem value="Ok">
                  <Checkbox checked={stockStatus.indexOf('Ok') > -1} />
                  Ok
                </MenuItem>
                <MenuItem value="Low">
                  <Checkbox checked={stockStatus.indexOf('Low') > -1} />
                  Low
                </MenuItem>
                <MenuItem value="Empty">
                  <Checkbox checked={stockStatus.indexOf('Empty') > -1} />
                  Empty
                </MenuItem>
               
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">Burn Status</h5>
          <div className="row">
            <div className="col-12 d-flex">
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
                 <MenuItem value="Idle">
                  <Checkbox checked={burnStatus.indexOf('Idle') > -1} />
                  Idle
                </MenuItem>
                <MenuItem value="Burning">
                  <Checkbox checked={burnStatus.indexOf('Burning') > -1} />
                  Burning
                </MenuItem>
                <MenuItem value="Error">
                  <Checkbox checked={burnStatus.indexOf('Error') > -1} />
                  Error
                </MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-2 border-bottom-1">
          <h5 className="text-primary d-inline">Door Status</h5>
          <div className="row">
            <div className="col-12 d-flex">
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
              </Select>
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
};

export default StatusSelection;
