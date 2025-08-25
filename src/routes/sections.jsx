import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import SvLogs from 'src/zestSections/Reports/svLogs';
import LockLogs from 'src/zestSections/Reports/lockLogs';
import LoginLogs from 'src/zestSections/Reports/loginLogs';
import SSNReport from 'src/zestSections/Reports/ssnReport';
import FaultReport from 'src/zestSections/Reports/faultReport';
import { ProductsView } from 'src/zestSections/MachineData/view';
import SelfMap from 'src/zestSections/Reports/LoginMaps/selfMap';
import ViewMap from 'src/zestSections/Reports/LoginMaps/viewMap';
import DailyReports from 'src/zestSections/Reports/dailyReports';
import HourlyReport from 'src/zestSections/Reports/HourlyReport';
import ColorSetting from 'src/zestSections/Settings/colorSetting';
import MachinePage from 'src/zestSections/Machines/view/user-view';
import CustomerPage from 'src/zestSections/Customers/customerPage';
import InventoryPage from 'src/zestSections/Inventory/inventoryPage';
import MachineSetting from 'src/zestSections/Settings/machineSetting';
import PaytmTransactions from 'src/zestSections/Reports/paytmTransactions';
import MachineMapView from 'src/zestSections/MachineMap/view/products-view';










// import StatusSelection from 'src/zestSections/products/statusSelection';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
   
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {path: 'dashboard', element: <IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'machines', element: <MachinePage/> },
        { path: 'machineData', element: <ProductsView /> },
        { path: 'machineMap', element: <MachineMapView/> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'dailyReports', element: <DailyReports/>},
        { path: 'loginLogs', element: <LoginLogs/>},
        { path: 'faultReport', element: <FaultReport/>},
        { path: 'hourlyReport', element: <HourlyReport/>},
        { path: 'ssnReport', element: <SSNReport/>},
        { path: 'inventory', element: <InventoryPage/>},
        { path: 'customers', element: <CustomerPage/>},
        { path: 'machineSetting', element: <MachineSetting/>},
        { path: 'colorSetting', element: <ColorSetting/>},
        { path: 'paytmTransactions', element: <PaytmTransactions/>},
        { path: 'svLogs', element: <SvLogs/>},
        { path: 'lockLogs', element: <LockLogs/>},
        { path: 'selfMap', element: <SelfMap/>},
        { path: 'viewMap', element: <ViewMap/>}
      ],
    },
    {
      path:'/',
      element:<LoginPage/>

    },
   
   
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
