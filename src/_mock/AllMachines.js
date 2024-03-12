const API = import.meta.env.VITE_REACT_APP_API;

export const AllMachines=async()=> {
  
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine`, { method: 'GET', headers });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const mapping=async(obj)=>{
    try {
      const headers = new Headers({
        'Content-type':'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/createMapping`, { method: 'POST', headers ,body:JSON.sessionStorage(obj)});
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }

  }