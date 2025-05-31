import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Clients from '../pages/clients';

// render - sample page
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

const ContactUS = Loadable(lazy(() => import('pages/contact-us')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard/clients',
          element: <Clients />
        },
      ]
    },
  ]
};

export default MainRoutes;
