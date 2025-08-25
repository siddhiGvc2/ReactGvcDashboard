// import moment from "moment";
import $ from "jquery";
import PropTypes from 'prop-types';
import React,{ useState } from 'react';

import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
// import { Container } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import { EditCustomerInfo, deleteCustomerInfo } from 'src/_mock/customers';

import Iconify from 'src/components/iconify';


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

export default function CustomerInfoRow({
  sr,
  selected,
  name,
  email,
  city,
  zone,
  role,
  beat,
  ward,
  row,
  LoadData
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

  const handleModalOpen = () => {
    const user=JSON.parse(sessionStorage.getItem("userInfo"));
 
    setOpenModal(true);
    setTimeout(()=>{
      $('#mdlEditInfo [name="CustomerName"]').val(row.CustomerName);
      if(!user.superAdmin)
      {
       $('#mdlEditInfo [name="CustomerName"]').prop('readonly', true);
      }
     
     
   $('#mdlEditInfo [name="City"]').val(row.City)
   $('#mdlEditInfo').modal('show');
    },200)
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const EditRow=()=>{
   
  const obj = {
    CustomerName: $('#mdlEditInfo [name="CustomerName"]').val(),
    City: $('#mdlEditInfo [name="City"]').val(),
 
 
};
    EditCustomerInfo(obj,row.id).then((res)=>{
      showAlertMessage(true);
      setType("success");
      setMessage("Saved Succesfully");
      handleModalClose();
      setTimeout(()=>{
        LoadData();
      },1000)
    
    })
    
  }

  const DeleteRow=()=>{
    alert("Are you sure you want to delete?");
    deleteCustomerInfo(row.id).then((res)=>{
      showAlertMessage(true);
      setType("success");
      setMessage("Deleted Succesfully");
      setTimeout(()=>{
        LoadData();
      },1000)
    
      
    })
  }

  // const handleClick=(loginLat,loginLong)=>{
  //   window.open(`https://maps.google.com?q=${loginLat},${loginLong}`);
  // }

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell align="center">
           {sr}
        </TableCell>

       
        <TableCell component="th" scope="row" padding="none" align="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src="" /> */}
            <Typography variant="subtitle2" noWrap>
              {row.CustomerName}
            
            </Typography>
          </Stack>
        </TableCell>

      
       <TableCell>{row.City}</TableCell>
       
    
      

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleModalOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={DeleteRow} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 600 }}>
           <div className="modal-dialog" role="document" id="mdlEditInfo">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Edit Customer Info</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Customer Name:</h6>
                            <input type="text" className="form-control" name="CustomerName" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>City:</h6>
                            <input type="text" className="form-control" name="City"  />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                     
                  
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={EditRow}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
        </div>
    </div>

           </Box>
      </Modal>
    </>
  );
}

CustomerInfoRow.propTypes = {
  sr:PropTypes.any,
  city: PropTypes.any,
  zone: PropTypes.any,
  email: PropTypes.any,
  LoadData:PropTypes.any,
  name: PropTypes.any,
  ward: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  beat: PropTypes.string,
  row:PropTypes.any,
}