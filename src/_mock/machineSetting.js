
const API = import.meta.env.VITE_REACT_APP_API;
// const MaxDailyCount=import.meta.env.VITE_REACT_APP_MAXIMUM_DAILY_COUNT;


  export const GetCounts=async()=>{
    try {
      
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/add/getCountsSerial`, { method: 'GET', headers });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

  // calling api for getting parameter by machine number
  export const GET=async(machineId)=>{
    try {
        const obj={
            machineID:machineId
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/GetSettings`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }

  }


  // call api fore sett new machine number function

  export const SET=async(machineId,newSerial,userName)=>{
    try {
        const obj={
            machineID: machineId,
            NewSerialNumber: newSerial,
            userName
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetSerialNumber`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }

  }


  export const SetModelName=async(machineId,modelName)=>{
    try {
        const obj={
            machineID: machineId,
            Name:modelName,
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetName`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }


  }


  export const SetModel=async(machineId,model)=>{
    try {
        const obj={
            machineID: machineId,
            Model:model,
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetModel`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }


  }

  export const SetPrice=async(machineId,price)=>{
    try {
        const obj={
            machineID: machineId,
            ProductPrice:price,
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetPrice`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }


  }


  export const SetTemperature=async(machineId,minA,minB,maxA,maxB)=>{
    try {
        const obj={
            machineID:machineId,
            minA,
            minB,
            maxA,
            maxB,
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetTemperature`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }


  }

  export const SetIncinerator=async(machineId,maxDoorCount,maxProcessTime,alarmTime)=>{
    try {
        const obj={
            machineID:machineId,
            maxDoorCount,
            maxProcessTime,
            alarmTime,
           
        }
      
        const headers = new Headers({
          "Content-type":"application/json",
          'x-token': sessionStorage.getItem('token'),
        });
        const response = await fetch(`${API}/add/SetBurnerValues`, { method: 'POST', headers,body:JSON.stringify(obj) });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        return [];
      }


  }