/*** This is example of menu item without group for horizontal layout. There will be no children. ***/

// assets
import { DocumentCode2 } from 'iconsax-react';

// icons
const icons = {
  samplePage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: 'sample-page',
  title: 'sample-page',
  type: 'group',
  url: '/dashboard',
  icon: icons.samplePage
};

export default samplePage;
