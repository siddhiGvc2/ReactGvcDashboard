import { store } from "../Redux/store";
import { saveData } from "../Redux/action";

const API = import.meta.env.VITE_REACT_APP_API;


export const getAllData = async () => {
    try {
      
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const city=JSON.parse(sessionStorage.getItem("cities"));
      const zone=JSON.parse(sessionStorage.getItem("zones"));
      const ward=JSON.parse(sessionStorage.getItem("wards"));
      const beat=JSON.parse(sessionStorage.getItem("beats"))
      const machineStatus=JSON.parse(sessionStorage.getItem("machineStatus"));
      const stockStatus=JSON.parse(sessionStorage.getItem('stockStatus'));
      const burn_status=JSON.parse(sessionStorage.getItem('burnStatus'))
  
      const response = await fetch(`${API}/api/machine/data?city=${city.join()}&zone=${zone.join()}&ward=${ward.join()}&beat=${beat.join()}&status=${machineStatus.join()}&burn_status=${burn_status.join()}&stock_status=${stockStatus.join()}`, { method: 'GET', headers });
      const json = await response.json();
      console.log(json.data);
      store.dispatch(saveData(json.data));
  
      // Return the data or another value if needed
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };


  setInterval(()=>{
       getAllData();
  },5000)
  

export const zoneData=async(city)=> {

  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/master/zone?city=${city}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }

 export const wardData=async(city,zone)=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/master/ward?city=${city}&zone=${zone}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const beatData=async(city,zone,ward)=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/master/beat?city=${city}&zone=${zone}&ward=${ward}`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  