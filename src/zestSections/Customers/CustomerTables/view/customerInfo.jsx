// import $ from 'jquery';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import React, { useRef,useState } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import MuiAlert from '@mui/material/Alert';
// import Popover from '@mui/material/Popover';
// import Snackbar from '@mui/material/Snackbar';
// import MenuItem from '@mui/material/MenuItem';
// import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { fetchUsers } from 'src/_mock/user';
// import {zoneData,wardData,beatData} from 'src/_mock/fildData';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import { UserView } from 'src/sections/user/view';

import TableNoData from '../table-no-data';
// import InventoryRow from '../customerData-row';
import UserTableHead from '../user-table-head';
// import InventoryStockRow from '../inventoryStock-row';
import CustomerInfoRow from '../customerInfo-row';

// import UserTableRow from '../user-table-row';

import TableEmptyRows from '../table-empty-rows';
// import LastEntryTableRow from '../last-entry-row';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';






// ----------------------------------------------------------------------

// const API = import.meta.env.VITE_REACT_APP_API;

// error || succes popup compnet defined here
// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));



//  Customer Info ui started here

export default function CustomerInfoView({users,LoadData}) {
  // const[users,setUsers]=useState([]);
  const tblDataRef = useRef(null);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  
// Pdf dowloand function
  const printData=()=> {
    const printContents = tblDataRef.current.outerHTML;
 
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   
    document.body.innerHTML = originalContents;
    window.location.reload();
} 

// excel download function
  const printExcelData = () => {
    const table = tblDataRef.current;
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'report.xlsx');
  };

 
 
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  
  

  return (
    <Container maxWidth="xxl">
    
   
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }} ref={tblDataRef}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Sr.No' },
                  { id: 'custName', label: 'CustomerName' },
                  { id: 'city', label: 'City' },
                  {id:''}
                 
          
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => (
                    <CustomerInfoRow
                      sr={page*rowsPerPage+i+1}
                      key={row.id}
                 
                      row={row}
                      LoadData={LoadData}
                   
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25 ,100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <p style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-outline-info" onClick={printExcelData}>
                    <i className="fas fa-file-excel"/> &nbsp; Excel
                </button>
                <button type="button" className="btn btn-outline-success" onClick={printData}>Print
                    Report</button>
                </p>
    </Container>

   
  )
}


CustomerInfoView.propTypes = {
  users:PropTypes.any,
  LoadData:PropTypes.any
};