import $ from 'jquery';
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
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { deleteUser, setPassword } from 'src/_mock/user';

import Label from 'src/components/label';
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

export default function UserTableRow({
  
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
  handleClick,
  LoadUsers
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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleModalOpen = () => {
   
 
    setOpenModal(true);
    setTimeout(()=>{
         
      $('#mdlPwd [name="name"]').val(row.name);
      $('#mdlPwd [name="email"]').val(row.email);
    },200)
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };



  const EditUser=()=>{
    const obj = {
      id: row.id,
      password: $('#mdlPwd [name="password"]').val(),
      password2: $('#mdlPwd [name="password2"]').val(),
     
   }
   if (!obj.id) {
    showAlertMessage();
    setType("warning");
    setMessage("Invalid User") 
     
     }
   else if (!obj.password) { 
    showAlertMessage();
    setType("warning");
    setMessage("Please enter password") 
     
  }
   else if (!obj.password2) {

    showAlertMessage();
    setType("warning");
    setMessage("Please confirm password") 
    }
   else if (obj.password !== obj.password2) {
    showAlertMessage();
    setType("warning");
    setMessage("Password does not match") 
    }
    else{
      setPassword(obj).then((r)=>{
        showAlertMessage();
        setType("success");
        setMessage("Changed Successfully") ;
        handleModalClose();
        setTimeout(()=>{
          LoadUsers();
        },1000)
      })
    }
   
  }




  const DeleteUser=()=>{
    console.log(row);
    alert("Are you sure you want to delete?");
   
       deleteUser(row.id).then((res)=>{
        showAlertMessage();
        setType("success");
        setMessage("Deleted Successfully") ;
         
        setTimeout(()=>{
          LoadUsers();
        },1000)
       })
    
   
  }

  return (
    <>
     <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell>
           {sr}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src="" /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
     
        <TableCell>
          <Label color={(!role && 'warning') || 'success'}>{role ? 'Admin' : 'User'}</Label>
        </TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{zone}</TableCell>
        <TableCell>{ward}</TableCell>
        <TableCell>{beat}</TableCell>
      

       
      

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
          sx: { width: 160 },
        }}
      >
        <MenuItem onClick={handleModalOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Set Password
        </MenuItem>

        <MenuItem onClick={DeleteUser} sx={{ color: 'error.main' }}>
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
        
           <Box sx={{ ...style, width: 400 }}>
          <div className="modal-dialog" role="document" id="mdlPwd">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true" >&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Name:</h6>
                            <input type="text" className="form-control" name="name" readOnly />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Username:</h6>
                            <input type="text" className="form-control" name="email" readOnly />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h6>Password:</h6>
                            <input type="password" className="form-control" name="password" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h6>Confirm Password:</h6>
                            <input type="password" className="form-control" name="password2" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={EditUser}>Save changes</button>
            </div>
        </div>
     </div>
     <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
     </Box>
     </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  row:PropTypes.any,
  sr:PropTypes.any,
  city: PropTypes.any,
  zone: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  ward: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  beat: PropTypes.string,
  LoadUsers:PropTypes.any
};
