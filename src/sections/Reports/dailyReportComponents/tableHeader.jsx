// import rtl from "jss-rtl";
import moment from "moment";
// import $ from 'jquery';

import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';

// import { create } from "jss";
import PropTypes from 'prop-types';
import {useRef, useEffect} from 'react';

// import { StylesProvider,jssPreset } from "@mui/system";


// import { useEffect } from "react";


const sr=1;
export default function TableHeader({data,zones,wards,beats,startDate,endDate,checked}){
    const tblDataRef = useRef(null);
    useEffect(()=>{
      console.log(data)
    },[data])
     
    const printData=()=> {
        const printContents = tblDataRef.current.outerHTML;
     
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
       
        document.body.innerHTML = originalContents;
        window.location.reload();
    } 

   
      const printExcelData = () => {
        const table = tblDataRef.current;
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'report.xlsx');
      };

    const start=()=>moment(startDate).format('DD-MMM-YYYY');
    const end=()=>moment(endDate).format('DD-MMM-YYYY');
    const sum = m=> m.summary[moment(startDate).format('DD-MMM-YYYY')];
    const tot = (k,m) => Object.values(m.summary).length ? Object.values(m.summary).map(q => parseInt(q[k],10)).reduce((a, b) => a + b) : 0;
    const avg = (k, m) => parseInt(Object.values(m.summary).length ? Object.values(m.summary).map(q => parseInt(q[k], 10)).reduce((a, b) => a + b) / Object.values(m.summary).length : 0, 10);
    const numDays = checked ? moment(end).diff(moment(start), 'day') + 1 : 0;
    const gt = k => data.machines.flatMap(m => Object.values(m.summary)).length ? data.machines.flatMap(m => Object.values(m.summary)).map(q => parseInt(q[k] ,10)).reduce((a, b) => a + b) : 0;
    const gta = (k, i = 1) => (data.machines.flatMap(m => Object.values(m.summary)).length ? data.machines.flatMap(m => Object.values(m.summary)).map(q => parseInt(q[k],10)).reduce((a, b) => a + b) / ((checked ? numDays : 1) * (sr - 1)) : 0).toFixed(i);
    const perc = (a, b) => ((a * 100) / b > 100 ? 100 : (a * 100) / b).toFixed(1);

   
        const dayString = (onTime) => {
          let ot = onTime + 0;
          const day = parseInt(ot / (24 * 60),10);
          ot %= 24 * 60;

          const hour = parseInt(ot / 60 ,10);
          ot %=  60;

       
          return `${day ? `${day}+ day` : ''}${hour ? `${hour} h` : ''}${ot}m`;

        };
      
   
     return (
        <div className="col-12" id="divData">
        <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-12 sm-scroll-h" style={{overflowX: 'scroll'}} >
        <table className="table table-bordered" id="tblData"  ref={tblDataRef}>
        <thead>
            <tr>
                <th colSpan="2">Project</th>
                 {/* <td colSpan="3">BRIHANMUMBAI MUNICIPAL CORPORATION (BMC)</td> */}
                <td colSpan="3"/>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="3" className="count city">{data.counts.city}</td>
                <td colSpan="1" rowSpan="2" className="text-center"/>
            </tr>
            <tr>
                <th colSpan="2">REPORT TYPE</th>
                <td colSpan="3" className="display rtype">{data.machines.length > 1 ? 'GROUP' : 'INDIVIDUAL'}</td>
                <th colSpan="2">Machine Location / ID</th>
                <td colSpan="3"/>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo2">ZONE</th>
                <td colSpan="3" className="list zone">{zones.length>0 ? zones.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
               <td colSpan="4" className="count zone">{data.counts.zone}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo3">WARD</th>
                <td colSpan="3" className="list ward">{wards.length>0 ? wards.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="4" className="count ward">{data.counts.ward}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo4">BEAT</th>
                <td colSpan="3" className="list beat">{beats.length>0 ? beats.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="4" className="count beat">{data.counts.beat}</td>
            </tr>
            <tr>
                <th colSpan="2">Report Generated</th>
                <td colSpan="3" className="ds nowdate">{moment().format('DD-MMM-YYYY')}</td>
                <th colSpan="2">Time</th>
                <td colSpan="4" className="ds nowtime">{moment().format('hh:mm a')}</td>
            </tr>
            <tr>
                <th colSpan="2">REPORT PERIOD</th>
                <td colSpan="3" className="ds rptdatefrom">{moment(startDate).format('DD-MMM-YYYY')}</td>
                <th colSpan="2">To</th>
                <td colSpan="4" className="ds rptdateto">{moment(endDate).format('DD-MMM-YYYY')}</td>
            </tr>
            <tr className="center" id="heading">
            <th >Sr. No.</th>
                <th >Machine Id</th>
                <th >Machine Location</th>
                <th >Address</th>
                <th >Machine Type</th>
                <th colSpan="1" className="text-center">Vending</th>
                <th colSpan="1" className="text-center">&gt;</th>
                <th colSpan="1" className="text-center">&gt;</th>
                <th colSpan="1" className="text-center">&gt;</th>
                <th colSpan="1" className="text-center hide">Incinerator</th>
                <th colSpan="1" className="text-center">&gt;</th>
              
            </tr>
            <tr className="center" id="subHeading">
            <th/>
            <th/>
            <th/>
            <th/>
            <th/>
            <th>Date</th>
            <th>Qty</th>
            <th>Cash</th>
            <th>On Time</th>
            <th>Burn Cycles</th>
            <th >San Napkins Burnt</th>
               
            </tr>
        </thead>
        <tbody>
            {
             data.machines.map((m,i)=>
                <tr className="data">
                    <td rowSpan={checked ? moment(moment(endDate)).diff(moment(moment(startDate)), 'day') + 1 : 0 + 1} className="text-center">{i+1}</td>
                    <td rowSpan={checked ? moment(moment(endDate)).diff(moment(moment(startDate)), 'day') + 1 : 0 + 1}>{m.uid}<br /><small className="text-muted">{m.serial}</small></td>
                    <td rowSpan={checked ? moment(moment(endDate)).diff(moment(moment(startDate)), 'day') + 1 : 0 + 1} style={{ whiteSpace: 'nowrap' }} >Zone: {m.zone}<br />Ward: {m.ward}<br />Beat: {m.beat}</td>
                    <td rowSpan={checked ? moment(moment(endDate)).diff(moment(moment(startDate)), 'day') + 1 : 0 + 1} style={{maxWidth: '10em'}}>{m.address}</td>
                    <td rowSpan={checked ? moment(moment(endDate)).diff(moment(moment(startDate)), 'day') + 1 : 0 + 1} >{m.data2}</td>
            
                    {checked ?
                        <>
                            <td style={{ whiteSpace: 'nowrap' }}>{moment(startDate).format('DD-MMM-YYYY')}</td>
                            <td>{sum(m).vend}</td>
                            <td>&#8377;&nbsp;{sum(m).cash}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{dayString(sum(m).onTime)}</td>
                            <td>{sum(m).burn}</td>
                            <td>{sum(m).burn * 8}</td>
                        </>
                        : null
                        }
                                    
                   
                    <td style={{ whiteSpace: 'nowrap' }}><b>Total</b></td> <td >{tot('vend',m)}</td> <td>&#8377;&nbsp;{tot('cash',m)}</td> <td style={{ whiteSpace: 'nowrap' }}><b>{dayString(tot('onTime',m))}<br/><small className="text-muted">{dayString(avg('onTime',m))} / day</small></b></td> <td>{tot('burn',m)}</td> <td>{tot('burn',m) * 8}</td>
                    
                 
                </tr>
              
             )
            }

         <tr className="data">
                 <td colSpan="5" className="text-center"><b>Total</b></td>
                 <td/>
            
                 <td><b>{gt('vend')}<br/><small className="text-muted">Avg: {gta('vend',2)}</small></b></td>
            
                 <td><b>&#8377;&nbsp;{gt('cash')}<br/><small className="text-muted">Avg: &#8377;&nbsp;{gta('cash', 2)}</small></b></td>
    
                 <td><b>{dayString(gt('onTime'))}<br/><small className="text-muted">Avg: {dayString(parseInt(gta('onTime', 0) ,10))} ({perc(parseInt(gta('onTime', 0),10), 16 * 60 )}%)</small></b></td>
                 
                
                 <td><b>{gt('burn')}<br/><small className="text-muted">Avg: {gta('burn',2)}</small></b></td>
                
                 <td><b>{gt('burn') * 8}<br/><small className="text-muted">Avg: {gta('burn',2)*8}</small></b></td>
             </tr>

        </tbody>
    </table>
    </div>
            </div>
            <p style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-info" onClick={printExcelData}>
                    <i className="fas fa-file-excel"/> &nbsp; Excel
                </button>
                <button type="button" className="btn btn-outline-success" onClick={printData} >Print
                    Report</button>
            </p>
        </div>
    </div>
</div>
     )
}

TableHeader.propTypes = {
    data: PropTypes.any,
    zones: PropTypes.any,
    wards: PropTypes.any,
    beats: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    checked:PropTypes.any
  };
  