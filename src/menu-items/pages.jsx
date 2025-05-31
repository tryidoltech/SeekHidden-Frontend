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
      ]
    },
  ]
};

export default pages;
