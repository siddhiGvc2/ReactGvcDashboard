
const API = import.meta.env.VITE_REACT_APP_API;

export const PaytmLogData=async(startDate,endDate)=> {
  
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
      const response = await fetch(`${API}/get`, { method: 'POST', headers ,body:JSON.stringify(obj) });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }