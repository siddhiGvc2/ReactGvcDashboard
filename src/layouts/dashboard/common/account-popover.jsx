import $ from 'jquery'
import React,{ useState,useEffect} from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
// import Avatar from '@mui/material/Avatar';

import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { sendLattLon } from 'src/_mock/loginLogsData';

// import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//   },
// ];

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

export default function AccountPopover() {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(null);
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

  const router=useRouter();


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };



  useEffect(()=>{
    $('.checkIn').show(); 
    $('.checkOut').hide(); 

  },[])

  const handleClose = () => {
    setOpen(null);
  }; 

  const handleModalOpen = () => {
   
 
    setOpenModal(true);
    // setTimeout(()=>{
    //   $('[name="machine"]').val(machineId);
    //   $('[name="userName"]').val(sessionStorage.getItem("name"));
    // },200)
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  // removing user credientials after logout
  const LogoOut=()=>{
    sendLattLon("CheckOut", sessionStorage.getItem("chechInMachine")).then(()=>{
      showAlertMessage();
      setType('success');
      setMessage("CheckOut done");
      $('.checkIn').show();
      $('.checkOut').hide();
    });
    setTimeout(()=>{
      sendLattLon("Logout").then(()=>{
        window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("clientName")
        window.sessionStorage.removeItem("isAdmin")
        window.sessionStorage.removeItem('name');
        router.push("/");

      })

    },200)

  }


  const SaveCheckIn=()=>{
     sendLattLon("CheckIn",$(`[name="machine"]`).val()).then(()=>{
      localStorage.setItem("chechInMachine",$(`[name="machine"]`).val());
      showAlertMessage();
      setType('success');
      setMessage("CheckIn done");
        handleModalClose();
           $('.checkIn').hide();
         $('.checkOut').show();
     })
  }

  const CheckOuT=()=>{
    sendLattLon("CheckOut", sessionStorage.getItem("chechInMachine")).then(()=>{
      showAlertMessage();
      setType('success');
      setMessage("CheckOut done");
      $('.checkIn').show();
      $('.checkOut').hide();
    });

  }
  

  return (
    <>
      <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>
      </div>
    
      <div>
                  <button type="button" className="btn btn-primary text-white checkIn" onClick={handleModalOpen}>Check In 
                                    <i className="fa-solid fa-person-walking-arrow-right" /></button>
                                      <button type="button" className="btn btn-primary text-white checkOut" onClick={CheckOuT} >Check Out
                                    <i className="fa-solid fa-person-walking-arrow-loop-left" />
                            </button>
      </div>
       <Typography variant="subtitle2" sx={{color:'black'}} noWrap>
            {sessionStorage.getItem("clientName")!=='null' ? sessionStorage.getItem("clientName"):''}
          </Typography>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 200,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          // ...(open && {
          //   background: (theme) =>
          //     `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          // }),
        }}
      >
         
        {/* <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar> */}
          
          <Typography variant="subtitle2" noWrap>
            {sessionStorage.getItem("name")}
          </Typography>
        
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {/* <Box sx={{ my: 1.5, px: 2 }}>
         
        </Box> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={LogoOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
           <Box sx={{ ...style, width: 500 }}>

           <div className="modal-dialog" role="document" id="mdlCheckIn">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Chek In</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group my-2">
                            <h6>Machine No. (PCB No.):</h6>
                            <input type="text" className="form-control" name="machine" />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                   </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={SaveCheckIn}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
            </div>
        </div>
    </div>
   
            </Box>
            
        </Modal>

    </>
  );
}
