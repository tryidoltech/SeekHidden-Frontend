// assets
import { I24Support, MessageProgramming } from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'others',
      title: 'others',
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'clients',
          title: 'Clients',
          type: 'item',
          url: '/dashboard/clients',
        },
        {
          id: 'publishers',
          title: 'Publishers',
          type: 'item',
          url: '/dashboard/publishers',
        },
        {
          id: 'jobstatus',
          title: 'Job Status',
          type: 'item',
          url: '/dashboard/jobstatus',
        },
        {
          id: 'conversiontracking',
          title: 'Conversion Tracking',
          type: 'item',
          url: '/dashboard/conversiontracking',
        },
      ]
    },
  ]
};

export default pages;
