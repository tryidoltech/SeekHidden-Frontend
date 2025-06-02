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
import JobGroupPage from '../pages/job-group';
import EditCampaign from '../components/campaigns/EditCampaign';
import JobGroupForm from '../components/job-group/JobGroupForm';

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
          path: 'dashboard/job-group',
          element: <JobGroupPage />
        },
        {
          path: 'dashboard/clients/edit-campaign',
          element: <EditCampaign />
        },
        {
          path: 'dashboard/job-group/job-group-form',
          element: <JobGroupForm />
        }
      ]
    },
  ]
};

export default MainRoutes;
