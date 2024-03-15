import { useRouter } from 'src/routes/hooks';

const API = import.meta.env.VITE_REACT_APP_API;

export const fetchData=async(city)=> {
  
  try {
    const headers = new Headers({
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/api/machine/data?status=Online,Offline&city=${city}`, { method: 'GET', headers });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return [];
  }
}

export const useDataFetching = () => {
  const router = useRouter();

  const fetchDataWithRouter = async () => {
    try {
      const data = await fetchData();
      // Process the data or update the state as needed
      console.log('Data:', data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      router.push('/');
    }
  };

  return { fetchDataWithRouter };
};


   
  

  