import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Popover from '@mui/material/Popover';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import {List} from '@mui/material';
import { alpha } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

// import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import SideBar from './SideBar';
import { NAV } from './config-layout';
// import navConfig from './config-navigation';



// ----------------------------------------------------------------------

// started side panel ui here

export default function Nav({ openNav, onCloseNav }) {
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
    <Stack component="nav"  sx={{ mt:3}}>
      <SideBar/>
    </Stack>
  );

  
 // combination of account ui and menu ui
  const renderContent = (
    <>
    <Box sx={{width:'100%',height:'90px',backgroundColor:'white',paddingTop:'5px'}}>
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



function NavItem({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const pathname = usePathname();

const active = item && item.path&& item.path === pathname || false;

  const handleClick = (event) => {
    
      setAnchorEl(event.currentTarget);
   
   
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderSubMenu = (submenu) => (
    <Popover
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <List component="ul" disablePadding>
      {submenu.map((subitem) => (
        <NavItem key={subitem.title} onClick={handleClose}>
          {subitem.title}
        </NavItem>
      ))}
    </List>
  </Popover>
  );

  return (
    <ListItemButton
    onClick={handleClick}
    component={RouterLink}
    // href={item.path}
    sx={{
      minHeight: 44,
      borderRadius: 0.75,
      typography: 'body2',
      color: 'grey',
      textTransform: 'capitalize',
      fontWeight: 'fontWeightMedium',
      ...(active && {
        color: 'white',
        fontWeight: 'fontWeightSemiBold',
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          color:'white'
        },
      }),
    }}
  >
    <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
      {item.icon}
    </Box>

    <Box component="span">{item.title} </Box>
  
   

 

    { item.submenu && renderSubMenu(item.submenu)}

   

   

  </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
