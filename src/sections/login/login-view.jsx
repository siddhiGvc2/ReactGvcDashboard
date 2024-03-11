import React,{useState , useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';

// import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';


import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
const API =import.meta.env.VITE_REACT_APP_API;
const GEOLOCATION=import.meta.env.VITE_REACT_APP_GEOLOCATION;

// Alert Component defined here for popup
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


// started function here of login
export default function LoginView() {
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("")

  
  const theme = useTheme();

  const router = useRouter();

  // const [showPassword, setShowPassword] = useState(false);
  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
};
  
      const getLatLon=()=>{
        if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      } else {

      navigator.geolocation.getCurrentPosition((position) => {
      

          window.sessionStorage.setItem("Lattitude", position.coords.latitude);
          window.sessionStorage.setItem("Longitude", position.coords.longitude);
        
        },
        
        (error) => {
        
          console.log(error);
        }
      );
      }
      }

      useEffect(()=>{
      
        if(GEOLOCATION)
        {
          console.log(GEOLOCATION)
           getLatLon();
           setInterval(()=>{
               getLatLon();
           },2000)
             
        }

      },[])

   

     async function getIpAddress() {
      try {
          const response = await fetch('https://api64.ipify.org?format=json');
          const data = await response.json();
          console.log(data.ip);
          return data.ip;
      } catch (error) {
          console.error('Error fetching IP address:', error);
          return 'Unable to fetch IP address';
      }
      }

      const sendLattLon=async()=>{
                

        const ip=await getIpAddress();
      
        
          
        const data={
        lat:sessionStorage.getItem("Lattitude"),
        long:sessionStorage.getItem("Longitude"),
        userName:sessionStorage.getItem('name'),
        deviceModel:ip,
        Remark:"Login"
        }

      
        fetch(`${API}/add/savelogin`,{
        method:'POST',
        headers:{
        'Content-type':'application/json'
        },
        body:JSON.stringify(data)
        })
        .then((res)=>{
         router.push('/dashboard');
        })
        .catch((err)=>{
          showAlertMessage();
          setType("error");
          setMessage("Error : Occured")
        })
        }



  // onclick login function executed here with api
  const handleClick = (event) => {
    console.log(event)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Data= {email: data.get('email'),
        password: data.get('password')}
      setTimeout(()=>{
      
        if(sessionStorage.getItem("Lattitude"))
        {
          console.log(sessionStorage.getItem("Lattitude"))
        fetch(`${API}/pub/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(Data),
        })
          .then((res) => res.json()) // Return the result here
          .then((json) => {
            sessionStorage.setItem("isAdmin",json.data.user.isAdmin)
            sessionStorage.setItem('name', json.data.user.name);
            window.sessionStorage.setItem('token', json.data.token);
            showAlertMessage();
            setType("success");
            setMessage("Login Successsfull With Admin")
             if(GEOLOCATION===true)
             {
              sendLattLon();
             }
             else
             {
               router.push('/dashboard')
             }
          })
          .catch((error) => {
            showAlertMessage();
            setType("error");
            setMessage("Entered Email/Password is Incorrect")
            console.error('Error:', error);
            // Handle the error, e.g., display an error message to the user
          });
        }
        else{
          showAlertMessage();
            setType("error");
            setMessage("Please Enable The Location")

        }
      },1000)
  };


  // login form ui component
  const renderForm = (
    
      <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
             <LoadingButton
        
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      
    
        sx={{marginTop:'10px'}}
      >
        Login
      </LoadingButton>
            
          
          </Box>
      

     

    
  
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
       {/* {showAlert && 
      
        <Alert severity={type}>
            {message}
        </Alert>
      
        } */}

<Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

  </Stack>

     

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            
            maxWidth:400,
          
          }}
        >

         

          <Stack alignItems="center" justifyContent="center" >
          <Logo sx={{width:'150px'}} />
          </Stack>

          <Divider sx={{ my: 3 }}/>
           
      

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}