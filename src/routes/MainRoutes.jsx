import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Clients from '../pages/clients';
import Publisher from '../pages/publishers';
import JobStatus from '../pages/dashboard/JobStatus';
import ConversionTracking from '../pages/dashboard/ConversionTracking/ConversionTracking';
import InspectFeed from '../pages/dashboard/InspectFeed/InspectFeed';


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
        {
          path: 'dashboard/publishers',
          element: <Publisher />
        },
        {
          path: 'dashboard/jobstatus',
          element: <JobStatus />
        },
        {
          path: 'dashboard/conversiontracking',
          element: <ConversionTracking />
        },
         {
          path: 'dashboard/inspectfeed',
          element: <InspectFeed />
        },
      ]
    },
  ]
};

export default MainRoutes;
