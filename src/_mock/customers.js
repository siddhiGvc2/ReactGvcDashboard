
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


  export const updateData=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/customers/postCustomerData`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }

  export const updateInfo=async(obj)=>{
    try {
    
    const headers = new Headers({
      "Content-type":"application/json",
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/customers/postCustomerInfo`, { method: 'POST', headers ,body:JSON.stringify(obj) });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }

  }


  export const deleteCustomerData=async(id)=>{

    console.log(id);
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/deleteCustomerData?id=${id}`,{ method: 'GET', headers });
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const EditCustomerData=async(obj,id)=>{
  
    
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/updateCustomerData?id=${id}`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const deleteCustomerInfo=async(id)=>{

    console.log(id);
    try {
      const headers = new Headers({
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/customers/deleteCustomerInfo?id=${id}`,{ method: 'GET', headers });
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }
  
  
  export const EditCustomerInfo=async(obj,id)=>{
  
    
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/updateCustomerData?id=${id}`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  
  }

  export const GetClentNameDetails=async(obj)=>{

     
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/getCustomerDataByName`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  export const GetClentInfoDetails=async(obj)=>{

     
    try {
      const headers = new Headers({
        "Content-type":'application/json',
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/customers/getCustomerInfoByName`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  
  
  