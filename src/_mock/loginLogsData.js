
const API = import.meta.env.VITE_REACT_APP_API;
// const GEOLOCATION=import.meta.env.VITE_REACT_APP_GEOLOCATION;
export const LogInfo=async(startDate,endDate)=> {
  
    try {
        const obj={
         
            startDate,
            endDate,
        }
        console.log(obj);
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/add/getloginfo`, { method: 'POST', headers ,body:JSON.stringify(obj) });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  export const getLatLon=()=>{
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

  export const sendLattLon=async(remark,machine)=>{
            

    const ip=await getIpAddress();
  
    
      
    const data={
    lat:sessionStorage.getItem("Lattitude"),
    long:sessionStorage.getItem("Longitude"),
    userName:sessionStorage.getItem('name'),
    deviceModel:ip,
    Remark:remark,
    MachineNumber:machine
    }

  
    fetch(`${API}/add/savelogin`,{
    method:'POST',
    headers:{
    'Content-type':'application/json'
    },
    body:JSON.stringify(data)
    })
    .then(()=>{
       
    })
    .catch((err)=>{
      console.log(err);
    })
   
    }


 