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
    icon: icon('ic_cart'),
  },
  {
    title: 'Machine Data',
    path: '/machineData',
    icon: icon('ic_cart'),
  },
  {
    title: 'Machine Map',
    path: '/machineMap',
    icon: icon('ic_cart'),
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: icon('file-lines-solid'),
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: icon('file-lines-solid'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Reports',
    path: '/dailyReports',
    icon: icon('file-lines-solid'),
  },
  {
    title: 'Login Logs',
    path: '/loginLogs',
    icon: icon('right-to-bracket-solid'),
  },
  {
    title: 'Technician Report',
    path: '/faultReport',
    icon: icon('screwdriver-wrench-solid'),
  },
  {
    title: 'Hourly Report',
    path: '/hourlyReport',
    icon: icon('screwdriver-wrench-solid'),
  },
  {
    title: 'SSN Report',
    path: '/ssnReport',
    icon: icon('screwdriver-wrench-solid'),
  },
  {
    title: 'Machine Setting',
    path: '/machineSetting',
    icon: icon('ic_blog'),
  },
  
  
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
