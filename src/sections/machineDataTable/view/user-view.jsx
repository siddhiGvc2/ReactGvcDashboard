import $ from 'jquery';
import {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
import {GetClentNameDetails} from 'src/_mock/customers';

import Scrollbar from 'src/components/scrollbar';

// import { emptyRows} from '../utils';

import { store } from "../../../Redux/store";
// import Iconify from 'src/components/iconify';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data,setData]=useState([])

  const [machineType,setMachineType]=useState('');
 
  store.subscribe(() => {
    setData(store.getState().data.data);
   
  });

  useEffect(()=>{
    const UserInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    const Obj={
     clientName:UserInfo.clientName
    }
   GetClentNameDetails(Obj).then((r)=>{
     // const MachineType=r.data[0].MachineType
     const [{ MachineType }] = r.data;
     const Data=r.data;
     $('.CInfo1').text(Data[0].CInfo1);
     if(Data[0].CInfo1===''){
        $('.City').remove();
     }
     $('.CInfo2').text(Data[0].CInfo2);
      if(Data[0].CInfo2===''){
        $('.Zone').remove();
     }
     $('.CInfo3').text(Data[0].CInfo3);
      if(Data[0].CInfo3===''){
        $('.Ward').remove();
     }
     $('.CInfo4').text(Data[0].CInfo4);
      if(Data[0].CInfo4===''){
        $('.Beat').remove();
     }
     if(MachineType==="Incinerator")
     {
       $('.vending').remove();
     }
     else if(MachineType==="Vending")
     {
       $('.incinerator').remove();
     }
     setMachineType(MachineType);

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
      const newSelecteds = dataFiltered.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth='xxl'>
     
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table >
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'sr', label: 'Sr.No' },
                  { id: 'machine', label: `${machineType==="RECD" ? "Machine Details":"Machine" }` },
                  { id: 'status', label: 'Status' },
                  ...(machineType !== "Incinerator"
                  ? [{ id: 'stockStatus',  label: `${machineType==="RECD" ? "Temperature":"Stock Status" }`}]
                  : []),
                  ...(machineType !== "Vending"
                  ? [  { id: 'burnStatus', label: `${machineType==="RECD" ? "Pressure":"Burning Status" }` }]
                  : []),
                
                  { id: 'doorStatus', label: `${machineType==="RECD" ? "Diffrential":"Door Status" }`},
                  ...(machineType === "RECD"
                  ? [  { id: 'burnStatus', label: `${machineType==="RECD" ? "Temper":"Burning Status" }` }]
                  : []),
                  { id: 'info', label: 'Info' },
                
                  // { id: 'ward', label: 'Verified', align: 'center' },
                  // { id: 'city', label: 'Status' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => (
                    <UserTableRow
                      key={row.id}
                      sr={page*rowsPerPage+i+1}
                      machineId={row.machineId}
                      serial={row.serial}
                      addresss={row.address}
                      lat={row.lat}
                      lon={row.lon}
                      zone={row.zone}
                      ward={row.ward}
                      beat={row.beat}
                      uid={row.uid}
                      spiralAStatus={row.spiral_a_status}
                      spiralBStatus={row.spiral_b_status}
                      doorCurrent={row.doorCurrent}
                      qtyCurrent={row.qtyCurrent}
                      burnCycleCurrent={row.burnCycleCurrent}
                      burStatus={row.bur_status}
                      lastStatus={row.last_status}
                      rssi={row.rssi}
                      m={row}
                      MachineType={machineType}

                      // isVerified={row.isVerified}
                      // selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25 ,100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
