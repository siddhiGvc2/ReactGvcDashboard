
const API = import.meta.env.VITE_REACT_APP_API;

export const getCustomerData=async()=> {
  
    try {
       
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/getAllCustomerData`, { method: 'GET', headers  });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const getAllCustomerInfo=async()=> {
  
    try {
      
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/getAllCustomerInfo`, { method: 'GET', headers });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }


  export const updateInventoryTransactions=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/inventory/updateTransactions`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }

  export const updateInventoryStocks=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/inventory/updateStock`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }