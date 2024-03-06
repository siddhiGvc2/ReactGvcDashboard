
const API = import.meta.env.VITE_REACT_APP_API;

export const FaultReportData=async(startDate,endDate)=> {
  
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
      const response = await fetch(`${API}/add/getFR`, { method: 'POST', headers ,body:JSON.stringify(obj) });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }