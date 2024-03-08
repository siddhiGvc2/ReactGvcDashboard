
const API = import.meta.env.VITE_REACT_APP_API;

export const ReportData=async(city,zone,ward,beat,serial,startDate,endDate)=> {
  
    try {
        const obj={
            city:city.join(),
            zone:zone.join(),
            ward:ward.join(),
            beat:beat.join(),
            serial:serial.join(),
            startDate,
            endDate,
        }
        console.log(obj);
      const headers = new Headers({
        "Content-type":"application/json",
        'x-token': sessionStorage.getItem('token'),
      });
      const response = await fetch(`${API}/api/machine/report`, { method: 'POST', headers ,body:JSON.stringify(obj) });
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return [];
    }
  }