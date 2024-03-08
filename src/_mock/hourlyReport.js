const API = import.meta.env.VITE_REACT_APP_API;

export const GetHourlyData=async(date,time)=> {
  
    try {
      const obj={
        startDate:date,
        hourTime:time
      }
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/add/getHR`, { method: 'POST', headers,body:JSON.stringify(obj) });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const GetColorsWithRange=async()=>{
    try {
   
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/colors/getColors`, { method: 'GET', headers });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }

  }