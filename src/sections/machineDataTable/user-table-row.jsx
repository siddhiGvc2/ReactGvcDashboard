import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  key,
  machineId,
  serial,
  addresss,
  lat,
  lon,
  zone,
  ward,
  beat,
  uid,
  spiralAStatus,
  spiralBStatus,
  doorCurrent,
  qtyCurrent,
  burnCycleCurrent,
  burStatus,
  lastStatus,
  rssi,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const address = m => `<small><a class="text-muted elp" target="_blank" href="https://www.google.com/maps?q=${m.lat},${m.lon}">${m.address}</a></small>`

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
       
      <TableCell>{key}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap>
              {addresss}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{}</TableCell>
     
        {/* <TableCell>
          <Label color={(role === '0' && 'error') || 'success'}>{role ? 'Admin' : 'User'}</Label>
        </TableCell> */}
        {/* <TableCell>{city}</TableCell> */}
        <TableCell>{zone}</TableCell>
        <TableCell>{ward}</TableCell>
        <TableCell>{beat}</TableCell>
      

       
      

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  key: PropTypes.any,
  machineId: PropTypes.any,
  serial: PropTypes.any,
  addresss: PropTypes.any,
  lat: PropTypes.any,
  lon: PropTypes.any,
  zone: PropTypes.any,
  ward: PropTypes.any,
  beat: PropTypes.any,
  uid: PropTypes.any,
  spiralAStatus: PropTypes.any,
  spiralBStatus: PropTypes.any,
  doorCurrent: PropTypes.any,
  qtyCurrent: PropTypes.any,
  burnCycleCurrent: PropTypes.any,
  burStatus: PropTypes.any,
  lastStatus: PropTypes.any,
  rssi: PropTypes.any,
  handleClick: PropTypes.func

};
