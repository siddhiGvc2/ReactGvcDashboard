// import rtl from "jss-rtl";
// import moment from "moment";
// import $ from 'jquery';

import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';

// import { create } from "jss";
import PropTypes from 'prop-types';
import {useRef} from 'react';

// import { StylesProvider,jssPreset } from "@mui/system";


// import { useEffect } from "react";


// const sr=1;
export default function HourlyTable({data,data1,data2,data3,data4,data5,checked}){
    const tblDataRef = useRef(null);
  
     
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
      

      const Percent=(m,t)=>(m/t*100).toFixed(2);
      const totalMachines = (d) => d.reduce((total, item) =>
      total + parseInt(item.machinesTotal, 10), 0);
    
    const totalMachineOnline = (d) => d.reduce((total, item) =>
      total + parseInt(item.machineOnline, 10), 0);


//    var totalCollection = data.reduce(function (total, item) {
//         return total + item.cashSales;
//     }, 0);
//        var totalItemsDispends = data.reduce(function (total, item) {
//         return total + item.qtySales;
//     }, 0);
//        var totalLowStock = data.reduce(function (total, item) {
//         return total + item.machineLowStock;
//     }, 0);
//        var totalStockEmpty = data.reduce(function (total, item) {
//         return total + item.machineEmpty;
//     }, 0);
//        var totalBurningEnabled = data.reduce(function (total, item) {
//         return total + item.burningSales;
//     }, 0);
   
   
     return (
        <div className="col-12" id="divData">
        <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-12 sm-scroll-h" style={{overflowX: 'scroll'}} >
        <table className="table table-bordered" id="tblData"  ref={tblDataRef}>
        <thead>
        <tr >
                               
                              
                               <th >Sr No</th>
                               <th  className="type fixed_position">{checked? 'Ward':'Beat'}</th>
                               <th >TOTAL MACHINES</th>
                              <th colSpan="2" className="text-center " >OPENING BALANCE</th>
                              <th colSpan="1" className="text-center " >&gt; </th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              
                              <th colSpan="2" className="text-center ">10:00 AM</th>
                              <th colSpan="1" className="text-center ">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">12:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">2:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">4:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="2" className="text-center">6:00 PM</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                              <th colSpan="1" className="text-center">&gt;</th>
                               <th colSpan="1" className="text-center">&gt;</th>
                           
                             </tr>
                             <tr >
                                 <th ></th>
                                  <th className="fixed_position"></th>
                                    <th ></th>
                                          
                               <th>ONLINE MACHINES </th>
                               <th> ONLINE PERCENTAGE</th>
                               <th >TOTAL ITEM DISPENSED</th>
                              
                               <th >COLLECTION</th>
                               <th >STOCK EMPTY</th>
                               <th >No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                              
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                             
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                              
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                                 <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                 <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                             
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                               <th>ONLINE MACHINES </th>
                               <th>ONLINE PERCENTAGE</th>
                                <th >TOTAL ITEM DISPENSED</th>
                               <th >ITEM DISPENSED FROM LAST REPORT</th>
                               <th>COLLECTION</th>
                            
                               <th>STOCK EMPTY</th>
                               <th>No. Of Napkin BURNT</th>
                             
                               
                             </tr>
          
        </thead>
        <tbody>
            {
             data.map((m,i)=>
                <tr className="data">
                     <td >{i+1}</td>
                            <td   className="fixed_position">{m.ward}</td>
                            <td  >{data[i].machinesTotal}</td>
                            <td  >{data[i].machineOnline}</td>
                            <td> <p >{Percent(data[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data[i].qtySales}</td>
                            <td >{data[i].cashSales}</td>
                             <td  >{data[i].machineEmpty}</td>
                            <td >{data[i].burningSales*8}</td>
                            {/* ***** */}

                            {data1.length>0 ? <><td  >{data1[i].machineOnline}</td>
                            <td> <p >{Percent(data1[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data1[i].qtySales}</td>
                             <td >{data1[i].qtySales - data[i].qtySales}</td>
                            <td >{data1[i].cashSales}</td>
                             <td  >{data1[i].machineEmpty}</td>
                            <td >{data1[i].burningSales*8}</td></>:null}
                             {/* ***** */}

                             {data2.length>0 ? <> <td  >{data2[i].machineOnline}</td>
                            <td> <p >{Percent(data2[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data2[i].qtySales}</td>
                             <td >{data2[i].qtySales - data1[i].qtySales}</td>
                            <td >{data2[i].cashSales}</td>
                             <td  >{data2[i].machineEmpty}</td>
                            <td >{data2[i].burningSales*8}</td></>:null}
                             {/* ***** */}

                             {data3.length>0 ? <> <td  >{data3[i].machineOnline}</td>
                            <td> <p >{Percent(data3[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data3[i].qtySales}</td>
                             <td >{data3[i].qtySales - data2[i].qtySales}</td>
                            <td >{data3[i].cashSales}</td>
                             <td  >{data3[i].machineEmpty}</td>
                            <td >{data3[i].burningSales*8}</td></>:null}

                             {/* ***** */}

                             {data4.length>0 ? <> <td  >{data4[i].machineOnline}</td>
                            <td> <p >{Percent(data4[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data4[i].qtySales}</td>
                             <td >{data4[i].qtySales - data3[i].qtySales}</td>
                            <td >{data4[i].cashSales}</td>
                             <td  >{data4[i].machineEmpty}</td>
                            <td >{data4[i].burningSales*8}</td></>:null}

                             {/* ***** */}

                            {data5.length>0 ? <><td  >{data5[i].machineOnline}</td>
                            <td> <p >{Percent(data5[i].machineOnline,data[i].machinesTotal)}%</p></td>
                             <td >{data5[i].qtySales}</td>
                             <td >{data5[i].qtySales - data4[i].qtySales}</td>
                            <td >{data5[i].cashSales}</td>
                             <td  >{data5[i].machineEmpty}</td>
                            <td >{data5[i].burningSales*8}</td></>:null}

                </tr>
              
             )
            }

            <tr className="data">
              
                  {data.length>0 ? <>
                    <td colSpan="2" className="text-center"><b>Total</b></td>
                          <td>{totalMachines(data)}</td>
                          <td>{totalMachineOnline(data)}</td>
                          
                          </>:null}
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

HourlyTable.propTypes = {
    data: PropTypes.any,
    data1: PropTypes.any,
    data2: PropTypes.any,
    data3: PropTypes.any,
    data4: PropTypes.any,
    data5: PropTypes.any,
    checked:PropTypes.any
  };