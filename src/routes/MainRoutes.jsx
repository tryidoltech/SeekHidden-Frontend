import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AddClientUser from '../components/dashboard/clients/AddClientUser';
import Campaigns from '../components/dashboard/clients/campaigns';
import CampaignForm from '../components/dashboard/clients/campaigns/CampaignForm';
import AddClient from '../components/dashboard/clients/AddClient';
import AddUser from '../components/dashboard/clients/AddUser';
import PublisherManagement from '../pages/publisher-management';
import JobStatus from '../pages/dashboard/JobStatus';
import ConversionTracking from '../pages/dashboard/ConversionTracking/ConversionTracking';
import InspectFeed from '../pages/dashboard/InspectFeed/InspectFeed';
import JobGroupPage from '../pages/job-group';
import JobGroupForm from '../components/dashboard/clients/campaigns/job-group/JobGroupForm';
import Publishers from '../components/dashboard/clients/campaigns/job-group/publishers';
import ClickLogsPage from '../pages/click-logs';
import InspectFeedClient from '../components/dashboard/clients/InspectFeed';
import JobData from '../components/dashboard/clients/JobData';

// render - sample page
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

const ContactUS = Loadable(lazy(() => import('pages/contact-us')));

const ClientsPage = Loadable(lazy(() => import('pages/clients')));

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
          path: 'clients',
          element: <ClientsPage />
        },
        {
          path: 'clients/add-client',
          element: <AddClient />
        },
        {
          path: 'clients/add-client/inspect-feed',
          element: <InspectFeedClient />
        },
        {
          path: 'clients/add-client/feed-details',
          element: <JobData />
        },
        {
          path: 'clients/add-client-user',
          element: <AddClientUser />
        },
        {
          path: 'campaigns',
          element: <Campaigns />
        },
        {
          path: 'campaigns/add-campaign',
          element: <CampaignForm />
        },
        {
          path: 'clients/add-user',
          element: <AddUser />
        },
        {
          path: 'campaigns/edit-campaign/:id',
          element: <CampaignForm />
        },
        {
          path: 'publisher-management',
          element: <PublisherManagement />
        },
        {
          path: 'job-status',
          element: <JobStatus />
        },
        {
          path: 'conversion-tracking',
          element: <ConversionTracking />
        },
        {
          path: 'inspect-feed',
          element: <InspectFeed />
        },
        {
          path: 'campaigns/job-group',
          element: <JobGroupPage />
        },
        {
          path: 'campaigns/job-group/job-group-form',
          element: <JobGroupForm />
        },
        {
          path: 'campaigns/job-group/publishers',
          element: <Publishers />
        },
        {
          path: 'click-logs',
          element: <ClickLogsPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
