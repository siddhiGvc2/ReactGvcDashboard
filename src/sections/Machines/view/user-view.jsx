// import $ from 'jquery';
import React, { useState,useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { AllMachines } from 'src/_mock/AllMachines';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




//  Users ui started here

export default function MachinePage() {
  const[machines,setMachines]=useState([]);
  
  
  
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

 


// getting data from api and store in Machines state
  useEffect(()=>{
    // getting data from fecthData function
    AllMachines().then((res)=>{
    
      setMachines(res);
    })
  },[])

  

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = machines.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, n) => {
    const selectedIndex = selected.indexOf(n);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, n);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    inputData: machines,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;


 
   
   
  
  

   

  return (
    <Container maxWidth="xxl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Machines</Typography>

        {/* <Button variant="contained" color="inherit"  onClick={handleOpenMenu} startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>
      {/* <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack> */}

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              {/* Table heading */}
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={machines.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Sr.No' },
                  { id: 'name', label: 'Serial'},
                  { id: 'email', label: 'Uid' },
                  { id: 'zone', label: 'Zone' },
                  { id: 'ward', label: 'Ward' },
                  { id: 'beat', label: 'Beat' },
                  // { id: 'ward', label: 'Verified', align: 'center' },
                  // { id: 'city', label: 'Status' },
                  { id: '' },
                ]}
              />
              {/* Table Body */}
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => (
                    <UserTableRow
                      sr={page*rowsPerPage+i+1}
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      email={row.email}
                      city={row.city}
                      zone={row.zone}
                      ward={row.ward}
                      beat={row.beat}
                      row={row}
                      // isVerified={row.isVerified}
                      // selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, machines.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={machines.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25 ,100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>

  
  )
}
