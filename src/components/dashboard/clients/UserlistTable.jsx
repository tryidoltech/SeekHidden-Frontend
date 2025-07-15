// // import React from 'react';
// // import { Calendar, Filter, AddSquare, Lock, Trash, Edit, Profile } from 'iconsax-react';
// // import DynamicTable from '../tables/datatable';
// // import { useNavigate } from 'react-router';

// // const UserManagementTable = () => {
// //     const navigate = useNavigate();

// //     const handleAddClientUser = () => {
// //         navigate('/dashboard/clients/add-client-user')

// //     }

// //     const userData = [
// //         {
// //             id: 1,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 2,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 3,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 4,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 5,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 6,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 7,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 8,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         },
// //         {
// //             id: 9,
// //             name: 'Marco Faloppa',
// //             email: 'test.email1234@gmail.com',
// //             clients: 'JobRapido - US, JobRapido - US (CPA)',
// //             status: 'active'
// //         }
// //     ];

// //     const columns = [
// //         {
// //             id: 'name',
// //             label: 'Name',
// //             disablePadding: true,
// //             type: 'text'
// //         },
// //         {
// //             id: 'email',
// //             label: 'Email',
// //             type: 'text'
// //         },
// //         {
// //             id: 'clients',
// //             label: 'Clients',
// //             type: 'chip'
// //         },
// //         {
// //             id: 'actions',
// //             label: '',
// //             type: 'actions',
// //             actions: [
// //                 {
// //                     icon: <Edit size="18" color="#666" />,
// //                     tooltip: 'Edit User',
// //                     onClick: (row) => console.log('Edit user:', row)
// //                 },
// //                 {
// //                     icon: <Profile size="18" color="#666" />,
// //                     tooltip: 'View Profile',
// //                     onClick: (row) => console.log('View profile:', row)
// //                 },
// //                 {
// //                     icon: <Trash size="18" color="#f44336" />,
// //                     tooltip: 'Delete User',
// //                     onClick: (row) => console.log('Delete user:', row)
// //                 }
// //             ]
// //         }
// //     ];

// //     const filterConfig = [
// //         {
// //             leftFilters: [

// //                 {
// //                     type: 'recordCount'
// //                 },
// //                 {
// //                     type: 'search',
// //                     placeholder: 'Search users...',
// //                     minWidth: 250
// //                 }
// //             ],
// //             rightFilters: [
// //                 {
// //                     type: 'button',
// //                     label: 'Add Client User',
// //                     icon: <AddSquare size="20" />,
// //                     variant: 'outlined',
// //                     color: 'primary',
// //                     onClick: () => {handleAddClientUser()}
// //                 },
// //                 {
// //                     type: 'button',
// //                     label: 'Lock All',
// //                     icon: <Lock size="20" />,
// //                     variant: 'outlined',
// //                     color: 'default',
// //                     onClick: () => console.log('Lock all clicked')
// //                 },
// //                 {
// //                     type: 'button',
// //                     label: 'Delete All',
// //                     icon: <Trash size="20" />,
// //                     variant: 'outlined',
// //                     color: 'error',
// //                     onClick: () => console.log('Delete all clicked')
// //                 }
// //             ]
// //         },
// //     ];

// //     const customFilter = (row, filters) => {
// //         if (filters.status && filters.status !== 'all' && row.status !== filters.status) {
// //             return false;
// //         }

// //         if (filters.clients && filters.clients !== 'all') {
// //             const clientFilter = filters.clients.toLowerCase();
// //             if (!row.clients.toLowerCase().includes(clientFilter)) {
// //                 return false;
// //             }
// //         }

// //         return true;
// //     };

// //     return (
// //         <DynamicTable
// //             data={userData}
// //             columns={columns}
// //             filterConfig={filterConfig}
// //             initialFilters={{
// //                 status: 'all',
// //                 clients: 'all',
// //                 rowsPerPage: 10
// //             }}
// //             title="Users"
// //             searchFields={['name', 'email', 'clients']}
// //             getRowId={(row) => row.id}
// //             onRowClick={(row) => console.log('Row clicked:', row)}
// //             onRowSelect={(selected) => console.log('Selected rows:', selected)}
// //             onApplyFilters={(filters) => console.log('Applied filters:', filters)}
// //             customFilter={customFilter}
// //             enableSelection={true}
// //             selectionMode="multiple"
// //         />
// //     );
// // };

// // export default UserManagementTable;
// import React, { useState } from 'react';
// import { Box, Tabs, Tab } from '@mui/material';
// import { Calendar, Filter, AddSquare, Lock, Trash, Edit, Profile } from 'iconsax-react';
// import DynamicTable from '../tables/datatable';
// import { useNavigate } from 'react-router';

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`user-tabpanel-${index}`}
//       aria-labelledby={`user-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `user-tab-${index}`,
//     "aria-controls": `user-tabpanel-${index}`,
//   };
// }

// const UserManagementTable = () => {
//     const [tabValue, setTabValue] = useState(0);
//     const navigate = useNavigate();

//     const handleTabChange = (event, newValue) => {
//         setTabValue(newValue);
//     };

//     const handleAddClientUser = () => {
//         navigate('/dashboard/clients/add-client-user');
//     };

//     const handleAddPublisherUser = () => {
//         navigate('/dashboard/clients/add-publisher-user');
//     };

//     const clientUserData = [
//         {
//             id: 1,
//             name: 'Client User 1',
//             email: 'client1@example.com',
//             clients: 'JobRapido - US, JobRapido - US (CPA)',
//             status: 'active'
//         },
//         {
//             id: 2,
//             name: 'Client User 2',
//             email: 'client2@example.com',
//             clients: 'JobRapido - US, JobRapido - US (CPA)',
//             status: 'active'
//         }
//     ];

//     const publisherUserData = [
//         {
//             id: 1,
//             name: 'Publisher User 1',
//             email: 'publisher1@example.com',
//             clients: 'Publisher A, Publisher B',
//             status: 'active'
//         },
//         {
//             id: 2,
//             name: 'Publisher User 2',
//             email: 'publisher2@example.com',
//             clients: 'Publisher C, Publisher D',
//             status: 'active'
//         }
//     ];

//     const columns = [
//         {
//             id: 'name',
//             label: 'Name',
//             disablePadding: true,
//             type: 'text'
//         },
//         {
//             id: 'email',
//             label: 'Email',
//             type: 'text'
//         },
//         {
//             id: 'clients',
//             label: tabValue === 0 ? 'Clients' : 'Publishers',
//             type: 'chip'
//         },
//         {
//             id: 'actions',
//             label: '',
//             type: 'actions',
//             actions: [
//                 {
//                     icon: <Edit size="18" color="#666" />,
//                     tooltip: 'Edit User',
//                     onClick: (row) => console.log('Edit user:', row)
//                 },
//                 {
//                     icon: <Profile size="18" color="#666" />,
//                     tooltip: 'View Profile',
//                     onClick: (row) => console.log('View profile:', row)
//                 },
//                 {
//                     icon: <Trash size="18" color="#f44336" />,
//                     tooltip: 'Delete User',
//                     onClick: (row) => console.log('Delete user:', row)
//                 }
//             ]
//         }
//     ];

//     const filterConfig = [
//         {
//             leftFilters: [
//                 {
//                     type: 'recordCount'
//                 },
//                 {
//                     type: 'search',
//                     placeholder: 'Search users...',
//                     minWidth: 250
//                 }
//             ],
//             rightFilters: [
//                 {
//                     type: 'button',
//                     label: tabValue === 0 ? 'Add Client User' : 'Add Publisher User',
//                     icon: <AddSquare size="20" />,
//                     variant: 'outlined',
//                     color: 'primary',
//                     onClick: tabValue === 0 ? handleAddClientUser : handleAddPublisherUser
//                 },
//                 {
//                     type: 'button',
//                     label: 'Lock All',
//                     icon: <Lock size="20" />,
//                     variant: 'outlined',
//                     color: 'default',
//                     onClick: () => console.log('Lock all clicked')
//                 },
//                 {
//                     type: 'button',
//                     label: 'Delete All',
//                     icon: <Trash size="20" />,
//                     variant: 'outlined',
//                     color: 'error',
//                     onClick: () => console.log('Delete all clicked')
//                 }
//             ]
//         },
//     ];

//     const customFilter = (row, filters) => {
//         if (filters.status && filters.status !== 'all' && row.status !== filters.status) {
//             return false;
//         }

//         if (filters.clients && filters.clients !== 'all') {
//             const clientFilter = filters.clients.toLowerCase();
//             if (!row.clients.toLowerCase().includes(clientFilter)) {
//                 return false;
//             }
//         }

//         return true;
//     };

//     return (
//         <>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs
//                     value={tabValue}
//                     onChange={handleTabChange}
//                     aria-label="user management tabs"
//                 >
//                     <Tab label="Client Users" {...a11yProps(0)} />
//                     <Tab label="Publisher Users" {...a11yProps(1)} />
//                 </Tabs>
//             </Box>

//             <TabPanel value={tabValue} index={0}>
//                 <DynamicTable
//                     data={clientUserData}
//                     columns={columns}
//                     filterConfig={filterConfig}
//                     initialFilters={{
//                         status: 'all',
//                         clients: 'all',
//                         rowsPerPage: 10
//                     }}
//                     title="Client Users"
//                     searchFields={['name', 'email', 'clients']}
//                     getRowId={(row) => row.id}
//                     onRowClick={(row) => console.log('Row clicked:', row)}
//                     onRowSelect={(selected) => console.log('Selected rows:', selected)}
//                     onApplyFilters={(filters) => console.log('Applied filters:', filters)}
//                     customFilter={customFilter}
//                     enableSelection={true}
//                     selectionMode="multiple"
//                 />
//             </TabPanel>

//             <TabPanel value={tabValue} index={1}>
//                 <DynamicTable
//                     data={publisherUserData}
//                     columns={columns}
//                     filterConfig={filterConfig}
//                     initialFilters={{
//                         status: 'all',
//                         clients: 'all',
//                         rowsPerPage: 10
//                     }}
//                     title="Publisher Users"
//                     searchFields={['name', 'email', 'clients']}
//                     getRowId={(row) => row.id}
//                     onRowClick={(row) => console.log('Row clicked:', row)}
//                     onRowSelect={(selected) => console.log('Selected rows:', selected)}
//                     onApplyFilters={(filters) => console.log('Applied filters:', filters)}
//                     customFilter={customFilter}
//                     enableSelection={true}
//                     selectionMode="multiple"
//                 />
//             </TabPanel>
//         </>
//     );
// };

// export default UserManagementTable;
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Calendar, Filter, AddSquare, Lock, Trash, Edit, Profile } from 'iconsax-react';
import DynamicTable from '../../tables/datatable';
import { useNavigate } from 'react-router';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`user-tabpanel-${index}`} aria-labelledby={`user-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `user-tab-${index}`,
    'aria-controls': `user-tabpanel-${index}`
  };
}

const UserManagementTable = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const handleAddClientUser = () => {
  //     navigate('/dashboard/clients/add-client-user');
  // };

  // const handleAddPublisherUser = () => {
  //     navigate('/dashboard/clients/add-publisher-user');
  // };
  const handleAddClientUser = () => {
    navigate('/clients/add-user');
  };

  const handleAddPublisherUser = () => {
    navigate('/clients/add-user?type=publisher');
  };

  // Original client user data
  const clientUserData = [
    {
      id: 1,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 2,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 3,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 4,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 5,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 6,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 7,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 8,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    },
    {
      id: 9,
      name: 'Marco Faloppa',
      email: 'test.email1234@gmail.com',
      clients: 'JobRapido - US, JobRapido - US (CPA)',
      status: 'active'
    }
  ];

  // Sample publisher user data
  const publisherUserData = [
    {
      id: 1,
      name: 'Publisher User 1',
      email: 'publisher1@example.com',
      clients: 'Publisher A, Publisher B',
      status: 'active'
    },
    {
      id: 2,
      name: 'Publisher User 2',
      email: 'publisher2@example.com',
      clients: 'Publisher C, Publisher D',
      status: 'active'
    }
  ];

  const columns = [
    {
      id: 'name',
      label: 'Name',
      disablePadding: true,
      type: 'text'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'text'
    },
    {
      id: 'clients',
      label: tabValue === 0 ? 'Clients' : 'Publishers',
      type: 'chip'
    },
    {
      id: 'actions',
      label: '',
      type: 'actions',
      actions: [
        {
          icon: <Edit size="18" color="#666" />,
          tooltip: 'Edit User',
          onClick: (row) => console.log('Edit user:', row)
        },
        {
          icon: <Profile size="18" color="#666" />,
          tooltip: 'View Profile',
          onClick: (row) => console.log('View profile:', row)
        },
        {
          icon: <Trash size="18" color="#f44336" />,
          tooltip: 'Delete User',
          onClick: (row) => console.log('Delete user:', row)
        }
      ]
    }
  ];

  const filterConfig = [
    {
      leftFilters: [
        {
          type: 'recordCount'
        },
        {
          type: 'search',
          placeholder: 'Search users...',
          minWidth: 250
        }
      ],
      rightFilters: [
        {
          type: 'button',
          label: tabValue === 0 ? 'Add Client User' : 'Add Publisher User',
          icon: <AddSquare size="20" />,
          variant: 'outlined',
          color: 'primary',
          onClick: tabValue === 0 ? handleAddClientUser : handleAddPublisherUser
        },
        {
          type: 'button',
          label: 'Lock All',
          icon: <Lock size="20" />,
          variant: 'outlined',
          color: 'default',
          onClick: () => console.log('Lock all clicked')
        },
        {
          type: 'button',
          label: 'Delete All',
          icon: <Trash size="20" />,
          variant: 'outlined',
          color: 'error',
          onClick: () => console.log('Delete all clicked')
        }
      ]
    }
  ];

  const customFilter = (row, filters) => {
    if (filters.status && filters.status !== 'all' && row.status !== filters.status) {
      return false;
    }

    if (filters.clients && filters.clients !== 'all') {
      const clientFilter = filters.clients.toLowerCase();
      if (!row.clients.toLowerCase().includes(clientFilter)) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="user management tabs">
          <Tab label="Client Users" {...a11yProps(0)} />
          <Tab label="Publisher Users" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <DynamicTable
          data={clientUserData}
          columns={columns}
          filterConfig={filterConfig}
          initialFilters={{
            status: 'all',
            clients: 'all',
            rowsPerPage: 10
          }}
          title="Client Users"
          searchFields={['name', 'email', 'clients']}
          getRowId={(row) => row.id}
          onRowClick={(row) => console.log('Row clicked:', row)}
          onRowSelect={(selected) => console.log('Selected rows:', selected)}
          onApplyFilters={(filters) => console.log('Applied filters:', filters)}
          customFilter={customFilter}
          enableSelection={true}
          selectionMode="multiple"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <DynamicTable
          data={publisherUserData}
          columns={columns}
          filterConfig={filterConfig}
          initialFilters={{
            status: 'all',
            clients: 'all',
            rowsPerPage: 10
          }}
          title="Publisher Users"
          searchFields={['name', 'email', 'clients']}
          getRowId={(row) => row.id}
          onRowClick={(row) => console.log('Row clicked:', row)}
          onRowSelect={(selected) => console.log('Selected rows:', selected)}
          onApplyFilters={(filters) => console.log('Applied filters:', filters)}
          customFilter={customFilter}
          enableSelection={true}
          selectionMode="multiple"
        />
      </TabPanel>
    </>
  );
};

export default UserManagementTable;
