import $ from 'jquery';
import moment from "moment";
import PropTypes from 'prop-types';
import React,{ useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import { SaveFaultReport } from 'src/_mock/faultReportData';

import Label from 'src/components/label';
// import { Alerts } from 'src/components/Alerts';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
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
export default function UserTableRow({
  m,
  sr,
  key,
  machineId,
  serial,
  addresss,
  lat,
  lon,
  zone,
  ward,
  beat,
  uid,
  spiralAStatus,
  spiralBStatus,
  doorCurrent,
  qtyCurrent,
  burnCycleCurrent,
  burStatus,
  lastStatus,
  rssi,
  handleClick,
  MachineType
}) {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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

// view mwnu open function
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  // view menu clsoe function
  const handleCloseMenu = () => {
    setOpen(null);
  };


  // Open  Popup function of technician form
  const handleModalOpen = () => {
   
 
    setOpenModal(true);
    setTimeout(()=>{
      $('[name="machine"]').val(machineId);
      $('[name="userName"]').val(sessionStorage.getItem("name"));
    },200)
  };

  // Close popup function of technicaian form
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      handleModalOpen();
    }
  };


  // submit form of technician form 
  const SubmitForm=()=>{
    const obj={
    machineNumber: $('[name="machine"]').val(),
    userName: $('[name="userName"]').val(),
    fault:$('[name="fault"]').val(),
    action:$('[name="action"]').val(),
    status:$('[name="faultStatus"]').val(),
    Lat:sessionStorage.getItem("Lattitude"),
    Long:sessionStorage.getItem("Longitude"),
    }
    SaveFaultReport(obj).then((r)=>{
       showAlertMessage();
       setType('success');
       setMessage("Saved Succesfully");
       handleModalClose();

    })

  }

  const online = a => moment().diff(moment.utc((a.lastHeartbeatTime || a.lastOnTime).replace('Z', '')), 'minute') < 5;


  // address of machine table 
  const address = a => (
    <small>
      <a
        className="text-muted elp"
        target="_blank"
        rel="noreferrer"
        href={`https://www.google.com/maps?q=${a.lat},${a.lon}`}
      >
        {a.address}
      </a>
    </small>
  );


  // display stock dtatus function of table row
  function stockStatus(i, visible) {
    
    if (!visible) return '';
    switch (i) {
    
        case 0: return  <Label color='error'>Empty</Label>
        case 1: return  <Label color='warning'>Low</Label>
        case 3: return   <Label color='success'>Ok</Label>
        default: return <span className="badge w-7 py-1 px-3 text-white badge-pill badge-info">?</span>
    }
}

// display burnStatus function of table row
function burnStatus(i, visible) {
    if (!visible) return '';
    switch (i) {

        case 1: return <i className="fa fa-fire fa-2x text-warning i-burn" title="Burning On"/>
        case 2: return <i className="fa fa-exclamation-triangle fa-2x text-danger" title="Burning Error"/>
        default: return ''
    }
}

// display lockStatus function of table row.
 function lockStatus(i,ser) {
    
       
    switch (i) {
        case 0: return <i className="fa-solid fa-lock fa-2x" title="Door Close" style={{cursor:'pointer'}} />
        case 1: return <i className="fa-solid fa-lock-open  fa-2x text-success" title="Door Open"/>
         case 2: return <i className="fa-solid fa-lock-open fa-2x text-danger " title="Door Forced Open"/>
        default: return ''
    }
 
    
}

// const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  

// converting integer to text amount function
const amountText = amt => {
  amt = amt || 0;

  if(amt>=10000000) {
      const cr = parseInt(amt / 100000, 10) / 100;
      const Cr = parseFloat(cr.toFixed(2));
      return `${Cr} Cr`;
  } 
  if(amt>=1000000) {
      const l = parseInt(amt / 1000 ,10) / 100;
      const L = parseFloat(l.toFixed(6));
      return  `${L} L`;
  } 
  if(amt>=1000) {
      const k = parseInt(amt / 10 ,10) / 100;
      const K = parseFloat(k.toFixed(2));
      return  `${K} K`;
  }

  // Remove the unnecessary else statement
  return amt;
}




// const sum = (a, b) => a + b;


  return (
    <>
    {/* Alert popup ui */}
       <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox">
        
      <TableCell>{sr}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap onKeyDown={handleKeyDown} onClick={handleModalOpen} role="button"  tabIndex={0}>
           <span> <span ><b>{uid}</b> [S/N: {serial}]</span><br/><small className="text-muted">zone: {zone} / ward: {ward} / beat: {beat}</small><br/>{address(m)}</span>
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
           <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label>
        </TableCell>

        {MachineType!=="RECD" && MachineType!=="Incinerator"&& <TableCell>{stockStatus(m.spiral_a_status, online(m))}</TableCell>}
        {MachineType === "RECD" && (
              <TableCell>
                  {(() => {
                      if ((m.spiral_a_status === 2 || m.spiral_a_status === 3 || m.spiral_a_status === 6 || m.spiral_a_status === 7) && online(m)) {
                          return <span className="badge py-1 px-3 badge-pill badge-danger">Error</span>;
                      }
                      if (online(m)) {
                          return <span>A:{m.doorCurrent}/B:{m.qtyCurrent}</span>;
                      }
                      return null;
                  })()}
              </TableCell>
          )}
           {MachineType!=="RECD" && MachineType!=="Vending" && <TableCell>{burnStatus(m.burn_status, online(m))}</TableCell>}
           {MachineType === "RECD" && (
              <TableCell>
                  {(() => {
                      if ((m.spiral_a_status>3 && m.spiral_a_status<8) && online(m)) {
                          return <span className="badge py-1 px-3 badge-pill badge-danger">Error</span>;
                      }
                      if (online(m)) {
                          return <span>{m.burnCycleCurrent}</span>;
                      }
                      return null;
                  })()}
              </TableCell>
          )}
           {MachineType!=="RECD" && <TableCell>{lockStatus(parseInt(m.last_status ,10),m.serial)}</TableCell>}
           {MachineType === "RECD" && (
              <TableCell>
                  {(() => {
                      if ((m.spiral_a_status>3 && m.spiral_a_status<8) && online(m)) {
                          return <span className="badge py-1 px-3 badge-pill badge-danger">Error</span>;
                      }
                      if (online(m)) {
                          return <span>{m.rssi}</span>;
                      }
                      return null;
                  })()}
              </TableCell>
          )}

            {MachineType === "RECD" && (
              <TableCell >
                  {(() => {
                      if ((m.spiral_a_status===1 || m.spiral_a_status===3 || m.spiral_a_status===5 || m.spiral_a_status===7) && online(m)) {
                          return <span className="badge py-1 px-3 badge-pill badge-danger">Error</span>;
                      }
                      if (online(m)) {
                          return <span className="badge py-1 px-3 badge-pill badge-success">Ok</span>;
                      }
                      return null;
                  })()}
              </TableCell>
          )}
     
        <TableCell>
      <button
        type="button"
        className="btn btn-sm btn-outline-success btn-tt heading6"
        onClick={handleOpenMenu}
        
      >
        View
      </button>
    </TableCell>
  
      

       
      

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 340 ,padding:2},
        }}
      >
           <b style={{fontSize: '1.20em',cursor:'pointer'}} >{m.uid} {m.serial}</b>
         <table className="table" style={{fontSize:'14px'}}>
                            <tbody> 
                                  <tr><th style={{color: '#444'}}>Status</th><td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></tr>
                                <tr><th style={{color: '#444'}}>IMSI</th><td style={{color: '#444'}}>{m.sim_number}</td></tr>
                                <tr><th style={{color: '#444'}}>RSSI</th><td style={{color: '#444'}}>{m.rssi}</td></tr>
                                {MachineType!=="Incinerator" ?<tr><th style={{color: '#444'}}>Collection</th><td style={{color: '#444'}}>&#8377;&nbsp;{m.cashCurrent} <span className="text-muted">[ &#8377;&nbsp;{amountText(m.cashLife + m.cashCurrent)} ]</span></td></tr>:""}
                                {MachineType!=="Incinerator" ?<tr><th style={{color: '#444'}}>Items Dispensed</th><td style={{color: '#444'}}>{m.qtyCurrent} <span className="text-muted">[ {amountText(m.qtyLife + m.qtyCurrent)} ]</span></td></tr>:""}
                                
                                {MachineType!=="Vending" ?<tr id="itemsBurntRow" ><th style={{color: '#444'}}>Items Burnt</th><td style={{color: '#444'}} >{m.doorCurrent} <span className="text-muted ">[ {amountText(m.doorLife + m.doorCurrent)} ]</span></td></tr>:""}
                                 {MachineType!=="Vending" ?<tr id="burningCyclesRow"><th style={{color: '#444'}}>Burning Cycles</th><td style={{color: '#444'}}>{m.burnCycleCurrent} <span className="text-muted ">[ {amountText(m.burnCycleLife + m.burnCycleCurrent)} ]</span></td></tr>:""}
                        
                                <tr><th style={{color: '#444'}}>On Since</th><td style={{color: '#444'}}>{moment.utc((m.lastOnTime || m.lastHeartbeatTime).replace('Z', '')).local().format('DD-MMM-YYYY hh:mm a')}</td></tr>
                               <tr ><th style={{color: '#444'}}>Last Online At</th><td style={{color: '#444'}}>{m.lastHeartbeatTime ? moment.utc(m.lastHeartbeatTime.replace('Z', '')).local().format('DD-MMM-YYYY hh:mm a') : 'NA'}</td></tr>
                            </tbody>
                        </table>
      </Popover>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 500 }}>
           <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">FAUALT REPORT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Machine No.:</h6>
                            <input readOnly type="text" className="form-control" name="machine" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>User Name:</h6>
                            <input readOnly type="text" className="form-control" name="userName" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Fault Reported:</h6>
                            <input type="text" className="form-control" name="fault" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     <div className="col-md-12">
                        <div className="form-group my-2">
                            <h6>Action Taken:</h6>
                            <input type="text" className="form-control" name="action" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                      <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Status:</h6>
                            <select className="form-control" name="faultStatus">
                                <option value="Completed" selected>Completed</option>
                                <option value="Pending">Pending</option>
                              

                            </select>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={SubmitForm}>Save Report</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
        </div>
    </div>
            </Box>
            </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  MachineType:PropTypes.any,
  m:PropTypes.any,
  key: PropTypes.any,
  sr:PropTypes.any,
  machineId: PropTypes.any,
  serial: PropTypes.any,
  addresss: PropTypes.any,
  lat: PropTypes.any,
  lon: PropTypes.any,
  zone: PropTypes.any,
  ward: PropTypes.any,
  beat: PropTypes.any,
  uid: PropTypes.any,
  spiralAStatus: PropTypes.any,
  spiralBStatus: PropTypes.any,
  doorCurrent: PropTypes.any,
  qtyCurrent: PropTypes.any,
  burnCycleCurrent: PropTypes.any,
  burStatus: PropTypes.any,
  lastStatus: PropTypes.any,
  rssi: PropTypes.any,
  handleClick: PropTypes.func

};
