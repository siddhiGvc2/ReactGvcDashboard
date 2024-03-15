// import $ from 'jquery';
import React, { useState,useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { fetchUsers } from 'src/_mock/user';
import {zoneData,wardData,beatData} from 'src/_mock/fildData';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

const API = import.meta.env.VITE_REACT_APP_API;

// error || succes popup compnet defined here
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));



//  Users ui started here

export default function UserPage() {
  const[users,setUsers]=useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage]=useState("");
  const [type,setType]=useState("")
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [isAdmin,setIsAdmin]=useState('');
 
  const [password,setPassword]=useState('');
  const [password2,setPassword2]=useState('');
  const [clientName,setClientName]=useState('');
  const [cities] = useState(['Mumbai','Delhi','SS-UK','DoE-HAR']);
  const [zones,setZones]=useState([]);
  const [wards,setWards]=useState([]);
  const [beats,setBeats]=useState([]);

  const [cityName, setCitiesName] = useState(['Mumbai']);
  const [zoneName,setZonesName]=useState([]);
  const [wardName,setWardsName]=useState([]);
  const [beatName,setBeatsName]=useState([]);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(null);



  useEffect(()=>{
    // getting data from fecthData function
    fetchUsers().then((res)=>{
    
      setUsers(res);
    })
  },[])

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const showAlertMessage = () => {
    setShowAlert(true);

    // You can optionally set a timeout to hide the alert after a few seconds
    setTimeout(() => {
    setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
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
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;


  // below code from 167 to 380 if for zone, ward beat, city selction in Add User

  useEffect(()=>{
   
    zoneData(cityName).then((res)=>{
      // console.log(res);
      setZones(res);
    })
    wardData(cityName,zoneName).then((res)=>{
      // console.log(res);
      setWards(res);
    
    });
    beatData(cityName,zoneName,wardName).then((res)=>{
      // console.log(res);
      setBeats(res);
    
    });
  
  
  
     
  
   },[cityName,zoneName,wardName,beatName])
    
  
    useEffect(()=>{
     
        zoneData(cityName).then((res)=>{
          // console.log(res);
        
          setZonesName(res);
          
        })
  
    },[cityName])
  
    
  useEffect(()=>{
    
      wardData(cityName,zoneName).then((res)=>{
        // console.log(res);
        
        setWardsName(res);
       
      
      });
  
    
  
  },[cityName,zoneName])
   
  useEffect(()=>{
   
      beatData(cityName,zoneName,wardName).then((res)=>{
        // console.log(res);
       
        setBeatsName(res);
        
      });
  
    
  
  },[cityName,zoneName,wardName])
   
   
  
    const handleCityChange = (event) => {
     
      setCitiesName(event.target.value);
    
      // Handle other logic as needed
    };
    const handleZoneChange = (event) => {
     
      setZonesName(event.target.value);
     
      // Handle other logic as needed
    };
    const handleWardChange = (event) => {
     
      setWardsName(event.target.value);
     
      // Handle other logic as needed
    };
    const handleBeatChange = (event) => {
     
      setBeatsName(event.target.value);
     
      // Handle other logic as needed
    };
   
    const selectAllCities=()=>{
     
      setCitiesName(cities)
  
    }
    const selectNoneCities=()=>{
     
      setCitiesName([])
    }
  
  
    const selectAllZones=()=>{
    
      setZonesName(zones)
  
    }
    const selectNoneZones=()=>{
     
      setZonesName([])
    }
    const selectAllWards=()=>{
     
      setWardsName(wards)
    }
    const selectNoneWards=()=>{
     
      setWardsName([])
    }
  
    const selectAllBeats=()=>{
     
      setBeatsName(beats)
    }
    const selectNoneBeats=()=>{
      
      setBeatsName([])
    }

    const SaveUser=()=>{
      const obj = {
        name,
        email,
        isAdmin: isAdmin === '1',
        city: cityName,
        zone: zoneName,
        ward: wardName,
        beat: beatName,
        password,
        password2,
        clientName
       }
       obj.city = obj.city.length && obj.city.join(',') ? obj.city.join(',') : null;
       obj.zone = obj.zone.length && obj.zone.join(',') ? obj.zone.join(',') : null;
       obj.ward = obj.ward.length && obj.ward.join(',') ? obj.ward.join(',') : null;
       obj.beat = obj.beat.length && obj.beat.join(',') ? obj.beat.join(',') : null;

       if (!obj.name) { 
        showAlertMessage();
        setType("warning");
        setMessage("Please Enter Name")
        }
       else if (!obj.email) { 
        showAlertMessage();
        setType("error");
        setMessage("Please Enter Username")
       }
       else if (!obj.password) { 
        showAlertMessage();
        setType("warning");
        setMessage("Please Enter Password")
        }
       else if (!obj.password2) { 
        showAlertMessage();
        setType("warning");
        setMessage("Please Confirm Password")
        }
       else if (obj.password !== obj.password2) { 
        showAlertMessage();
        setType("error");
        setMessage("Password Doesn't Match")
       }
       else{

        const headers = new Headers({
          'Content-type':'application/json',
          'x-token': sessionStorage.getItem('token'),

        });
         fetch(`${API}/api/admin/user`, { method: 'POST', headers ,body:JSON.stringify(obj)})
         .then((res)=>
              res.json()
         )
         .then((json)=>{
        
          showAlertMessage();
          setType("success");
          setMessage("Saved Succesfully");
          handleCloseMenu();
          fetchUsers().then((res)=>{
    
            setUsers(res);
          })

         })
         .catch((err)=>{
          showAlertMessage();
          setType("error");
          setMessage("An Error Occured")
           
         })

       
            
              
              
        
         
    
       }
      

    }
  

  return <>
    <Container maxWidth="xxl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit"  onClick={handleOpenMenu} startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'right' }} open={showAlert} autoHideDuration={4000} onClose={()=>setShowAlert(false)}>
      <Alert onClose={()=>setShowAlert(false)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>

     </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Sr.No' },
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'UserName' },
                  { id: 'role', label: 'Role' },
                  { id: 'city', label: 'City' },
                  { id: 'zone', label: 'Zone' },
                  { id: 'ward', label: 'Ward' },
                  { id: 'beat', label: 'Beat' },
                  // { id: 'ward', label: 'Verified', align: 'center' },
                  // { id: 'city', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => (
                    <UserTableRow
                      sr={page*rowsPerPage+i+1}
                      key={row.id}
                      name={row.name}
                      role={row.isAdmin}
                      email={row.email}
                      city={row.city}
                      zone={row.zone}
                      ward={row.ward}
                      beat={row.beat}
                      row={row}
                      // isVerified={row.isVerified}
                      // selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
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
    </Container>

    {/* Add user model ui */}
    <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 840,padding:5},
        }}
      >
     
            <div className="modal-header">
                <h5 className="modal-title">User</h5>
                <button type="button" className="btn btn-md btn-default close"  aria-label="Close" onClick={handleCloseMenu}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <input type="hidden" className="num" value="0" name="id" />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Name:</h5>
                            <input type="text" className="form-control" id="name" name="name" onChange={(e)=>setName(e.target.value)} />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Username:</h5>
                            <input type="text" className="form-control" id="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Role</h5>
                            <select className="form-control" name="isAdmin" id="isAdmin" onChange={(e)=>setIsAdmin(e.target.value)}>
                                <option value="1">Admin</option>
                                <option value="0" selected>User</option>
                              
                            </select>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                      <div className="col-md-6 clientName" style={{ display: isAdmin === 1 ? 'block' : 'none' }}>
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Cient Name</h5>
                               <input type="text" className="form-control" name="clientName" id="clientName" onChange={(e)=>setClientName(e.target.value)}/>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">City:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                       onClick={selectAllCities} ><i className="fa fa-check"/></button>
                                     <Select
                multiple
                value={cityName}
                onChange={handleCityChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(items) => {
                  if (items.length===cities.length) {
                       return`All Selected(${items.length})`;
                  } 
                  if(items.length===0) {
                       return 'None Selected';
                  }
                  if(items.length===1)
                  {
                    return `${items[0]}`
                  }
                  return `${items.length} Selected`
              }}
              >
                 <MenuItem value="Mumbai">
                  <Checkbox checked={cityName.indexOf('Mumbai') > -1} />
                  Mumbai
                </MenuItem>
                <MenuItem value="Delhi">
                  <Checkbox checked={cityName.indexOf('Delhi') > -1} />
                  Delhi
                </MenuItem>
                <MenuItem value="SS-UK">
                  <Checkbox checked={cityName.indexOf('SS-UK') > -1} />
                  SS-UK
                </MenuItem>
                <MenuItem value="DoE-HAR">
                  <Checkbox checked={cityName.indexOf('DoE-HAR') > -1} />
                  DoE-HAR
                </MenuItem>
              </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                       onClick={selectNoneCities} ><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Zone:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type='button' className="btn btn-sm btn-success text-white my-auto"
                                      onClick={selectAllZones}><i className="fa fa-check"/></button>
                                      <Select
                multiple
                value={zoneName}
                onChange={handleZoneChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(items) => {
                  if (items.length===zones.length) {
                       return`All Selected(${items.length})`;
                  } 
                  if(items.length===0) {
                       return 'None Selected';
                  }
                  if(items.length===1)
                  {
                    return `${items[0]}`
                  }
                  return `${items.length} Selected`
              }}
              >

                {
                  zones.map((elem)=>
                     <MenuItem value={elem}>
                    <Checkbox checked={zoneName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
             
               
              </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                       onClick={selectNoneZones} ><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Ward:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type="button" className="btn btn-sm btn-success text-white my-auto"
                                        onClick={selectAllWards}><i className="fa fa-check"/></button>
                                      <Select
                multiple
                value={wardName}
                onChange={handleWardChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(items) => {
                  if (items.length===wards.length) {
                       return`All Selected(${items.length})`;
                  } 
                  if(items.length===0) {
                       return 'None Selected';
                  }
                  if(items.length===1)
                  {
                    return `${items[0]}`
                  }
                  return `${items.length} Selected`
              }}
              >

                {
                  wards.map((elem)=>
                    <MenuItem value={elem}>
                    <Checkbox checked={wardName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
                
              </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto"
                                        onClick={selectNoneWards}><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                        <h5 className="text-primary d-inline">Beat:</h5>
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button type="button" className="btn btn-sm btn-success text-white my-auto"
                                        onClick={selectAllBeats}><i className="fa fa-check"/></button>
                                      <Select
                multiple
                value={beatName}
                onChange={handleBeatChange}
                style={{ borderBlockStyle: 'inherit',height:'40px',width:'100%',fontSize:'14px' }}
                renderValue={(items) => {
                  if (items.length===beats.length) {
                       return`All Selected(${items.length})`;
                  } 
                  if(items.length===0) {
                       return 'None Selected';
                  }
                  if(items.length===1)
                  {
                    return `${items[0]}`
                  }
                  return `${items.length} Selected`
              }}
              >

               {
                  beats.map((elem)=>
                   <MenuItem value={elem}>
                    <Checkbox checked={beatName.indexOf(elem) > -1} />
                    {elem}
                  </MenuItem>

                  )
                }
                  
              </Select>
                                    <button type='button' className="btn btn-sm btn-danger text-white my-auto" onClick={selectNoneBeats}><i className="fa fa-times"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h5 className="text-primary d-inline">Password</h5>
                            <input type="password" className="form-control" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <h5 className="text-primary d-inline">Confirm Password</h5>
                            <input type="password" className="form-control" name="password2" id="confirmPassword" onChange={(e)=>setPassword2(e.target.value)} />
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleCloseMenu}>Close</button>
                <button type="button" className="btn btn-primary" onClick={SaveUser}>Save changes</button>
            </div>
    

      
      </Popover>
  </>
}
