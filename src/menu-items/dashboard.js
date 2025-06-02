/*** This is example of menu item without group for horizontal layout. There will be no children. ***/

// assets
import { DocumentCode2 } from 'iconsax-react';

// icons
const icons = {
  dashboardPage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const dashboardPage = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  url: '/dashboard',
  icon: icons.dashboardPage,
  breadcrumbs: false,
};

export default dashboardPage;
