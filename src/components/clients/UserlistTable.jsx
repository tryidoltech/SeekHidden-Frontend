import React from 'react';
import { Calendar, Filter, AddSquare, Lock, Trash, Edit, Profile } from 'iconsax-react';
import DynamicTable from '../tables/datatable';
import { useNavigate } from 'react-router';

const UserManagementTable = () => {
    const navigate = useNavigate();

    const handleAddClientUser = () => {
        navigate('/dashboard/clients/add-client-user')

    }

    const userData = [
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
            label: 'Clients',
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
                    label: 'Add Client User',
                    icon: <AddSquare size="20" />,
                    variant: 'outlined',
                    color: 'primary',
                    onClick: () => {handleAddClientUser()}
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
        },
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
        <DynamicTable
            data={userData}
            columns={columns}
            filterConfig={filterConfig}
            initialFilters={{
                status: 'all',
                clients: 'all',
                rowsPerPage: 10
            }}
            title="Users"
            searchFields={['name', 'email', 'clients']}
            getRowId={(row) => row.id}
            onRowClick={(row) => console.log('Row clicked:', row)}
            onRowSelect={(selected) => console.log('Selected rows:', selected)}
            onApplyFilters={(filters) => console.log('Applied filters:', filters)}
            customFilter={customFilter}
            enableSelection={true}
            selectionMode="multiple"
        />
    );
};

export default UserManagementTable;