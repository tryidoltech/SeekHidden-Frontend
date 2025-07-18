import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Calendar, Filter, AddSquare, Lock, Trash, Edit, Profile } from 'iconsax-react';
import DynamicTable from '../../tables/datatable';
import { useNavigate } from 'react-router';
import axiosServices, { fetcher } from '../../../utils/axios';
import useSWR, { mutate } from 'swr';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../common/ConfirmDialog';

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
  const { data, error, isLoading } = useSWR('/users', fetcher);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddClientUser = () => {
    navigate('/clients/add-user');
  };

  const handleAddPublisherUser = () => {
    navigate('/clients/add-user?type=publisher');
  };

  const users = data?.data || [];
  const clientUserData = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    clients: user.client_id?.internal_name || 'N/A',
    status: 'active'
  }));

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
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const handleDelete = (id) => {
    axiosServices
      .delete(`${import.meta.env.VITE_APP_API_URL}/users/${id}`)
      .then(() => {
        toast.success('User Deleted Successfully');
        mutate('/users');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };
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
      label: 'Actions',
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
          onClick: (row) => {
            setConfirmDialog({
              open: true,
              title: 'Confirm Delete',
              message: `Are you sure you want to delete this user? This action cannot be undone.`,
              onConfirm: () => {
                handleDelete(row.id); // Call your API + mutate
                setConfirmDialog({ open: false, title: '', message: '', onConfirm: null });
              }
            });
          }
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
  if (isLoading) return <div>Loading...</div>;

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
          searchFields={['name', 'email', 'clients',]}
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
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ open: false, title: '', message: '', onConfirm: null })}
      />
    </>
  );
};

export default UserManagementTable;
