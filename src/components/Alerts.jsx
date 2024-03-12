import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));
  
export function Alerts({showAlert,setShowAlert,message,type}){<Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

  </Stack>
}







Alert.propTypes={
    showAlert:PropTypes.any,
    setShowAlert:PropTypes.any,
    message:PropTypes.any,
    type:PropTypes.any

}