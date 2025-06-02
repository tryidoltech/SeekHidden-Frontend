import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Publisher from '../pages/publishers';
import ClientsPage from '../pages/clients';
import AddClientUser from '../components/clients/AddClientUser';
import Campaigns from '../components/campaigns';
import AddCampaign from '../components/campaigns/AddCampaign';
import AddClient from '../components/clients/AddClient';
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
          element: <ClientsPage />,
        },
        {
          path: 'dashboard/clients/add-client',
          element: <AddClient />
        },
        {
          path: 'dashboard/clients/add-client-user',
          element: <AddClientUser />
        },
        {
          path: 'dashboard/campaigns',
          element: <Campaigns />
        },
        {
          path: 'dashboard/clients/add-campaign',
          element: <AddCampaign />
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
