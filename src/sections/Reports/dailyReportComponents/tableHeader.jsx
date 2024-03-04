import { useEffect } from 'react';
import PropTypes from 'prop-types';



export default function TableHeader({data,zones,wards,beats,startDate,endDate}){
    useEffect(()=>{
        console.log(data);
    },[data])
   
     return (
        <div className="col-12" id="divData">
        <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-12 sm-scroll-h" style={{overflowX: 'scroll'}}>
        <table className="table table-bordered" id="tblData">
        <thead>
            <tr>
                <th colSpan="2">Project</th>
                 {/* <td colSpan="3">BRIHANMUMBAI MUNICIPAL CORPORATION (BMC)</td> */}
                <td colSpan="3"></td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="3" className="count city">{data.counts.city}</td>
                <td colSpan="1" rowSpan="2" className="text-center">
                </td>
            </tr>
            <tr>
                <th colSpan="2">REPORT TYPE</th>
                <td colSpan="3" className="display rtype">INDIVIDUAL</td>
                <th colSpan="2">Machine Location / ID</th>
                <td colSpan="3"></td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo2">ZONE</th>
                <td colSpan="3" className="list zone">{zones ? zones.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
               <td colSpan="4" className="count zone">{data.counts.zone}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo3">WARD</th>
                <td colSpan="3" className="list ward">{wards ? wards.join():'ALL'}</td>
                <th colSpan="2">No. of Machines</th>
                <td colSpan="4" className="count ward">{data.counts.ward}</td>
            </tr>
            <tr>
                <th colSpan="2" className="CInfo4">BEAT</th>
                <td colSpan="3" className="list beat">{beats ? beats.join():'ALL'}</td>
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
                <td colSpan="3" className="ds rptdatefrom">{startDate.format('DD-MMM-YYYY')}</td>
                <th colSpan="2">To</th>
                <td colSpan="4" className="ds rptdateto">{endDate.format('DD-MMM-YYYY')}</td>
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
        {/* <tbody>
        </tbody> */}
    </table>
    </div>
            </div>
            <p style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-info" >
                    <i className="fas fa-file-excel"/> &nbsp; Excel
                </button>
                <button type="button" className="btn btn-outline-success" >Print
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
  };
  