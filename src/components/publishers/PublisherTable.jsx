import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../tables/datatable';

const PublisherTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const publisherData = [
        { id: 1, publisherName: 'ATTB US CPA', status: 'active', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 2, publisherName: 'ATTB US CPA', status: 'active', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 3, publisherName: 'ATTB US CPA', status: 'paused', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 4, publisherName: 'ATTB US CPA', status: 'inactive', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 5, publisherName: 'ATTB US CPA', status: 'active', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 6, publisherName: 'ATTB US CPA', status: 'inactive', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 7, publisherName: 'ATTB US CPA', status: 'active', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 8, publisherName: 'ATTB US CPA', status: 'paused', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
    ];

    const columns = [
        {
            id: 'publisherName',
            label: 'Publisher Name',
            disablePadding: true
        },
        {
            id: 'status',
            label: 'Status',
            type: 'status',
            getStatusColor: (status) => {
                switch (status) {
                    case 'active': return '#4caf50';
                    case 'inactive': return '#f44336';
                    case 'paused': return '#9e9e9e';
                    default: return '#9e9e9e';
                }
            }
        },
        {
            id: 'budgetCap',
            label: 'Budget Cap',
            numeric: true,
            type: 'currency',
            currency: 'USD'
        },
        {
            id: 'spend',
            label: 'Spend',
            numeric: true,
            type: 'currency',
            currency: 'USD'
        },
        {
            id: 'reconSpend',
            label: 'Recon Spend',
            numeric: true,
            type: 'number',
            decimals: 2
        },
        {
            id: 'clicks',
            label: 'Clicks',
            numeric: true
        },
        {
            id: 'validClicks',
            label: 'Valid Clicks',
            numeric: true
        },
        {
            id: 'invalidClicks',
            label: 'Invalid Clicks',
            numeric: true
        }
    ];

    const handleActionChange = (action) => {
        if (!action) return; // Ignore empty selection

        switch (action) {
            case 'edit':
                if (selected.length === 1) {
                    navigate(`/dashboard/clients/edit-campaign`);
                } else if (selected.length === 0) {
                    toast.error('Please select a publisher to edit');
                } else {
                    toast.error('Please select only one publisher to edit');
                }
                break;
            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select publishers to delete');
                } else {
                    // Handle delete logic
                    toast.success(`${selected.length} publisher(s) will be deleted`);
                }
                break;
            case 'duplicate':
                if (selected.length === 0) {
                    toast.error('Please select publishers to duplicate');
                } else {
                    // Handle duplicate logic
                    toast.success(`${selected.length} publisher(s) will be duplicated`);
                }
                break;
            case 'clickLogs':
                if (selected.length === 1) {
                    navigate(`/dashboard/click-logs`);
                } else if (selected.length === 0) {
                    toast.error('Please select publishers to click logs');
                }else{
                    toast.success(`${selected.length} publishers to click logs`);
                }
            default:
                break;
        }
    };

    const filterConfig = [
        {
            leftFilters: [
                {
                    type: 'select',
                    key: 'action',
                    placeholder: 'Action',
                    minWidth: 120,
                    options: [
                        { value: 'edit', label: 'Edit' },
                        { value: 'delete', label: 'Delete' },
                        { value: 'duplicate', label: 'Duplicate' },
                        { value: 'clickLogs', label: 'Click Logs'}
                    ],
                    onChange: handleActionChange
                },
                {
                    type: 'select',
                    key: 'budgetRange',
                    placeholder: 'Budget Cap',
                    minWidth: 140,
                    options: [
                        { value: '0-500', label: '$0 - $500' },
                        { value: '500-1000', label: '$500 - $1000' },
                        { value: '1000+', label: '$1000+' }
                    ]
                },
                {
                    type: 'select',
                    key: 'margin',
                    placeholder: 'Margin',
                    minWidth: 120,
                    options: [
                        { value: '0-10', label: '0% - 10%' },
                        { value: '10-20', label: '10% - 20%' },
                        { value: '20+', label: '20%+' }
                    ]
                }
            ],
            rightFilters: [
                {
                    type: 'dateRange',
                    label: 'Date Range',
                    placeholder: '01-01-2000 to 01-01-2020',
                    minWidth: 200
                }
            ]
        },
        {
            leftFilters: [
                {
                    type: 'recordCount'
                },
                {
                    type: 'search',
                    placeholder: 'Search...',
                    minWidth: 200
                }
            ],
            rightFilters: [
                {
                    type: 'select',
                    key: 'currency',
                    placeholder: 'USD - $',
                    minWidth: 100,
                    options: [
                        { value: 'USD', label: 'USD - $' },
                        { value: 'EUR', label: 'EUR - €' },
                        { value: 'GBP', label: 'GBP - £' }
                    ]
                },
                {
                    type: 'select',
                    key: 'status',
                    placeholder: 'Status',
                    minWidth: 100,
                    options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'paused', label: 'Paused' }
                    ]
                },
                {
                    type: 'select',
                    key: 'columns',
                    placeholder: 'Columns',
                    minWidth: 100,
                    options: [
                        { value: 'all', label: 'Show All' },
                        { value: 'basic', label: 'Basic View' },
                        { value: 'detailed', label: 'Detailed View' }
                    ]
                },
                {
                    type: 'button',
                    label: 'Apply Filters',
                    icon: <Filter size="20" />
                },
                {
                    type: 'select',
                    key: 'rowsPerPage',
                    placeholder: '10',
                    minWidth: 70,
                    options: [
                        { value: '10', label: '10' },
                        { value: '25', label: '25' },
                        { value: '50', label: '50' },
                        { value: '100', label: '100' }
                    ]
                }
            ]
        }
    ];

    const customFilter = (row, filters) => {
        // Budget range filter
        if (filters.budgetRange) {
            if (filters.budgetRange === '1000+') {
                if (row.budgetCap < 1000) return false;
            } else {
                const [min, max] = filters.budgetRange.split('-').map(Number);
                if (row.budgetCap < min || row.budgetCap > max) return false;
            }
        }

        // Status filter
        if (filters.status && row.status !== filters.status) {
            return false;
        }

        // Margin filter (placeholder logic)
        if (filters.margin) {
            // Add margin calculation logic here if needed
        }

        return true;
    };

    const handleRowSelect = (selectedIds) => {
        setSelected(selectedIds);
    };

    return (
        <DynamicTable
            data={publisherData}
            columns={columns}
            filterConfig={filterConfig}
            customFilter={customFilter}
            onRowSelect={handleRowSelect}
            searchEnabled={true}
            searchFields={['publisherName']}
            title="Publishers"
            // onRowClick={(row) => navigate('/dashboard/job-group')}
            selectable={true}
            actionsEnabled={false}
        />
    );
};

export default PublisherTable;