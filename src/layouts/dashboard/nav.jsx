import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Popover from '@mui/material/Popover';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import {List} from '@mui/material';


import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

// import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import SideBar from './SideBar';
import { NAV } from './config-layout';
// import navConfig from './config-navigation';



// ----------------------------------------------------------------------

// started side panel ui here

export  function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  // account ui
  // const renderAccount = (
  //   <Box
  //     sx={{
  //       my: 3,
  //       mx: 2.5,
  //       py: 2,
  //       px: 2.5,
  //       display: 'flex',
  //       borderRadius: 1.5,
  //       alignItems: 'center',
  //       bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
  //     }}
  //   >
  //     <Avatar src={account.photoURL} alt="photoURL" />

  //     <Box sx={{ ml: 2 }}>
  //       <Typography variant="subtitle2">{account.displayName}</Typography>

  //       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //         {account.role}
  //       </Typography>
  //     </Box>
  //   </Box>
  // );
 
  // menu ui

 

  const renderMenu = (
    <Stack component="nav"  sx={{ mt:1}}>
      <SideBar/>
    </Stack>
  );

  
 // combination of account ui and menu ui
  const renderContent = (
    <>
    <Box sx={{width:'100%',height:'80px',backgroundColor:'white',paddingTop:'5px'}}>
    <Logo sx={{ mt: 2, ml: 4 ,backgroundColor:'white',width:'150px',display:'flex',alignItems:'center',marginBottom:'10px'}} />
    </Box>
   
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:"#191970",
          color:'white'

        },
      }}
    >
     
 
      {/* {renderAccount} */}
       {renderMenu}
      {/* <SideBar/> */}

      <Box sx={{ flexGrow: 1 }} />

     
    </Scrollbar>
    </>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------


// menuItems list ui


 
