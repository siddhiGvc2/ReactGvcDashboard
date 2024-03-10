import moment from "moment";
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

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
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  // const handleFocus = () => {
  //   // setOpen(true);
  // };

  // const handleBlur = () => {
  //   // setOpen(false);
  // };

  const online = a => moment().diff(moment.utc((a.lastHeartbeatTime || a.lastOnTime).replace('Z', '')), 'minute') < 5;


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

  function stockStatus(i, visible) {
    
    if (!visible) return '';
    switch (i) {
    
        case 0: return  <Label color='error'>Empty</Label>
        case 1: return  <Label color='warning'>Low</Label>
        case 3: return   <Label color='success'>Ok</Label>
        default: return <span className="badge w-7 py-1 px-3 text-white badge-pill badge-info">?</span>
    }
}

function burnStatus(i, visible) {
    if (!visible) return '';
    switch (i) {

        case 1: return <i className="fa fa-fire fa-2x text-warning i-burn" title="Burning On"/>
        case 2: return <i className="fa fa-exclamation-triangle fa-2x text-danger" title="Burning Error"/>
        default: return ''
    }
}

 function lockStatus(i,ser) {
    
       
    switch (i) {
        case 0: return <i className="fa-solid fa-lock fa-2x" title="Door Close" style={{cursor:'pointer'}} />
        case 1: return <i className="fa-solid fa-lock-open  fa-2x text-success" title="Door Open"/>
         case 2: return <i className="fa-solid fa-lock-open fa-2x text-danger " title="Door Forced Open"/>
        default: return ''
    }
 
    
}

// const filterOnline = q => moment().diff(moment.utc((q.lastHeartbeatTime || q.lastOnTime).replace('Z', '')), 'minute') < 5;
  


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
      <TableRow hover tabIndex={-1} role="checkbox">
        
      <TableCell>{sr}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap>
           <span> <span ><b>{uid}</b> [S/N: {serial}]</span><br/><small className="text-muted">zone: {zone} / ward: {ward} / beat: {beat}</small><br/>{address(m)}</span>
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label>
        </TableCell>
        <TableCell>{stockStatus(m.spiral_a_status, online(m))}</TableCell>
        <TableCell>{ burnStatus(m.burn_status, online(m))}</TableCell>
        <TableCell>{lockStatus(parseInt(m.last_status ,10),m.serial)}</TableCell>
     
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
           <b style={{fontSize: '1.20em'}}>{m.uid} {m.serial}</b>
         <table className="table" style={{fontSize:'14px'}}>
                            <tbody> 
                                  <tr><th style={{color: '#444'}}>Status</th><td style={{color: '#444'}} >  <Label color={(!online(m)  && 'error') || 'success'}>{online(m) ? 'Online' : 'Offline'}</Label></td></tr>
                                <tr><th style={{color: '#444'}}>IMSI</th><td style={{color: '#444'}}>{m.sim_number}</td></tr>
                                <tr><th style={{color: '#444'}}>RSSI</th><td style={{color: '#444'}}>{m.rssi}</td></tr>
                                <tr><th style={{color: '#444'}}>Collection</th><td style={{color: '#444'}}>&#8377;&nbsp;{m.cashCurrent} <span className="text-muted">[ &#8377;&nbsp;{amountText(m.cashLife + m.cashCurrent)} ]</span></td></tr>
                                <tr><th style={{color: '#444'}}>Items Dispensed</th><td style={{color: '#444'}}>{m.qtyCurrent} <span className="text-muted">[ {amountText(m.qtyLife + m.qtyCurrent)} ]</span></td></tr>
                                
                                <tr id="itemsBurntRow" ><th style={{color: '#444'}}>Items Burnt</th><td style={{color: '#444'}} >{m.doorCurrent} <span className="text-muted ">[ {amountText(m.doorLife + m.doorCurrent)} ]</span></td></tr>
                                <tr id="burningCyclesRow"><th style={{color: '#444'}}>Burning Cycles</th><td style={{color: '#444'}}>{m.burnCycleCurrent} <span className="text-muted ">[ {amountText(m.burnCycleLife + m.burnCycleCurrent)} ]</span></td></tr>
                        
                                <tr><th style={{color: '#444'}}>On Since</th><td style={{color: '#444'}}>{moment.utc((m.lastOnTime || m.lastHeartbeatTime).replace('Z', '')).local().format('DD-MMM-YYYY hh:mm a')}</td></tr>
                               <tr ><th style={{color: '#444'}}>Last Online At</th><td style={{color: '#444'}}>{m.lastHeartbeatTime ? moment.utc(m.lastHeartbeatTime.replace('Z', '')).local().format('DD-MMM-YYYY hh:mm a') : 'NA'}</td></tr>
                            </tbody>
                        </table>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
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
