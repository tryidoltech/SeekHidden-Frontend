import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import Publisher from '../pages/publisher-management';
import ClientsPage from '../pages/clients';
import AddClientUser from '../components/clients/AddClientUser';
import Campaigns from '../components/campaigns';
import CampaignForm from '../components/campaigns/CampaignForm';
import AddClient from '../components/clients/AddClient';
import JobGroupPage from '../pages/job-group';
import JobGroupForm from '../components/job-group/JobGroupForm';
import JobStatus from '../pages/dashboard/JobStatus';
import ConversionTracking from '../pages/dashboard/ConversionTracking/ConversionTracking';
import InspectFeed from '../pages/dashboard/InspectFeed/InspectFeed';
import PublisherManagement from '../pages/publisher-management';
import Publishers from '../components/publishers';
import ClickLogsPage from '../pages/click-logs';

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
          index: true,
          element: <Dashboard />
        },
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
          path: 'dashboard/campaigns/add-campaign',
          element: <CampaignForm />
        },
        {
          path: 'dashboard/campaigns/edit-campaign/:id',
          element: <CampaignForm />
        },
        {
          path: 'dashboard/publisher-management',
          element: <PublisherManagement />
        },
        {
          path: 'dashboard/job-status',
          element: <JobStatus />
        },
        {
          path: 'dashboard/conversion-tracking',
          element: <ConversionTracking />
        },
        {
          path: 'dashboard/inspectfeed',
          element: <InspectFeed />
        },
        {
          path: 'dashboard/job-group',
          element: <JobGroupPage />
        },
        {
          path: 'dashboard/job-group/job-group-form',
          element: <JobGroupForm />
        },
        {
          path: 'dashboard/publishers',
          element: <Publishers />
        },
        {
          path: 'dashboard/click-logs',
          element: <ClickLogsPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
