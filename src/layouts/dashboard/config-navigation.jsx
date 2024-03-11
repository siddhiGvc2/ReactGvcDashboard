import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
 
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Machines',
    path: '/machines',
    icon: <i className="fa-solid fa-fan" />
  },
  {
    title: 'Machine Data',
    path: '/machineData',
    icon: <i className="fa-solid fa-database"/>,
  },
  {
    title: 'Machine Map',
    path: '/machineMap',
    icon:  <i className="fa-solid fa-location-dot" />,
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon:  <i className="fa-solid fa-hand-holding-dollar"/>,
  },
  {
    title: 'Customers',
    path: '/customers',
    icon:  <i className="fa-solid fa-people-group" />,
  },
  {
    title: 'user',
    path: '/user',
    icon: <i className="fa-solid fa-users-line"/>,
  },
  {
    title: 'Reports',
    path: '/dailyReports',
    icon:  <i className="fa-regular fa-file-lines"/>,
    submenu: [
      {
        title: 'Reports',
        path: '/dailyReports',
        icon:  <i className="fa-regular fa-file-lines"/>,
      },
      {
        title: 'Login Logs',
        path: '/loginLogs',
        icon:  <i className="fa-solid fa-arrow-right-to-bracket"/>,
      },
      {
        title: 'Technician Report',
        path: '/faultReport',
        icon:  <i className="fa-solid fa-wrench"/>,
      },
      {
        title: 'Hourly Report',
        path: '/hourlyReport',
        icon:  <i className="fa-solid fa-clock"/>,
      },
      {
        title: 'SSN Report',
        path: '/ssnReport',
        icon:   <i className="fa-solid fa-list-ol"/>,
      },
      // Add more submenu items as needed
    ],
  },
  {
    title: 'Setting',
    path: '/machineSetting',
    icon: <i className="fa-solid fa-gear"/>,
    submenu:[
      {
        title: 'Machine Setting',
        path: '/machineSetting',
        icon: <i className="fa-solid fa-gear"/>,
      },
      {
        title: 'Color Setting',
        path: '/colorSetting',
        icon:  <i className="fa-solid fa-palette"/>,
      },
      

    ]
  },
 
 

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
