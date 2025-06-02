import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../tables/datatable';

const CampaignsTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const clientData = [
        { id: 1, jobGroupName: '+12 CPA', status: 'active', budgetCap: 1000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
        { id: 2, jobGroupName: 'Tech Solutions Group', status: 'inactive', budgetCap: 2000.00, spend: 850.00, reconSpend: 840.00, clicks: 120, validClicks: 115, invalidClicks: 5 },
        { id: 3, jobGroupName: 'Marketing Plus CPA', status: 'active', budgetCap: 1500.00, spend: 800.00, reconSpend: 790.00, clicks: 200, validClicks: 195, invalidClicks: 5 },
        { id: 4, jobGroupName: 'Digital Agency CPC', status: 'paused', budgetCap: 5000.00, spend: 2500.00, reconSpend: 2480.00, clicks: 500, validClicks: 485, invalidClicks: 15 },
        { id: 5, jobGroupName: 'Global Advisors', status: 'active', budgetCap: 3000.00, spend: 1200.00, reconSpend: 1180.00, clicks: 300, validClicks: 290, invalidClicks: 10 },
        { id: 6, jobGroupName: 'Media Partners', status: 'active', budgetCap: 2500.00, spend: 1800.00, reconSpend: 1750.00, clicks: 400, validClicks: 390, invalidClicks: 10 },
        { id: 7, jobGroupName: 'Creative Solutions', status: 'paused', budgetCap: 1800.00, spend: 900.00, reconSpend: 880.00, clicks: 180, validClicks: 175, invalidClicks: 5 },
        { id: 8, jobGroupName: 'Data Insights', status: 'inactive', budgetCap: 2200.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
    ];

    const columns = [
        {
            id: 'jobGroupName',
            label: 'Job Group Name',
            disablePadding: true
        },
        {
            id: 'status',
            label: 'Status',
            type: 'statusDot',
            getStatusColor: (status) => {
                switch (status) {
                    case 'active': return '#4caf50';
                    case 'inactive': return '#f44336';
                    case 'paused': return '#ff9800';
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
            type: 'currency',
            currency: 'USD'
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
                    navigate(`/dashboard/job-group/job-group-form`);
                } else if (selected.length === 0) {
                    toast.error('Please select a campaign to edit');
                } else {
                    toast.error('Please select only one campaign to edit');
                }
                break;
            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to delete');
                } else {
                    // Handle delete logic
                    toast.success(`${selected.length} campaign(s) will be deleted`);
                }
                break;
            case 'duplicate':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to duplicate');
                } else {
                    // Handle duplicate logic
                    toast.success(`${selected.length} campaign(s) will be duplicated`);
                }
                break;
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
                        { value: 'duplicate', label: 'Duplicate' }
                    ],
                    onChange: handleActionChange
                },
                {
                    type: 'select',
                    key: 'budgetRange',
                    placeholder: 'Budget Cap',
                    minWidth: 140,
                    options: [
                        { value: '0-1000', label: '$0 - $1000' },
                        { value: '1000-3000', label: '$1000 - $3000' },
                        { value: '3000+', label: '$3000+' }
                    ]
                },
                {
                    type: 'select',
                    key: 'margin',
                    placeholder: 'Margin',
                    minWidth: 120,
                    options: [
                        { value: '0-10', label: '0% - 10%' },
                        { value: '10-25', label: '10% - 25%' },
                        { value: '25+', label: '25%+' }
                    ]
                }
            ],
            rightFilters: [
                {
                    type: 'dateRange',
                    key: 'dateRange',
                    placeholder: 'Date Range',
                    minWidth: 200,
                    defaultValue: '01-01-2000 to 01-01-2020'
                },

                {
                    type: 'button',
                    label: 'Add Job Group',
                    icon: <AddSquare size="20" />,
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => navigate('/dashboard/job-group/job-group-form')
                },

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
                    placeholder: 'USD',
                    minWidth: 80,
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
                    icon: <Filter size="20" />,
                    variant: 'outlined'
                },
                {
                    type: 'select',
                    key: 'rowsPerPage',
                    placeholder: 'Rows per page',
                    minWidth: 60,
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
            if (filters.budgetRange === '3000+') {
                if (row.budgetCap < 3000) return false;
            } else {
                const [min, max] = filters.budgetRange.split('-').map(Number);
                if (row.budgetCap < min || row.budgetCap > max) return false;
            }
        }

        // Status filter
        if (filters.status && row.status !== filters.status) {
            return false;
        }

        return true;
    };

    const handleRowSelect = (selectedIds) => {
        setSelected(selectedIds);
    };

    return (
        <DynamicTable
            data={clientData}
            columns={columns}
            filterConfig={filterConfig}
            customFilter={customFilter}
            onRowSelect={handleRowSelect}
            searchEnabled={true}
            searchFields={['jobGroupName']}
            title="Campaigns"
            selectable={true}
            actionsEnabled={false}
            recordsFoundText="Records Found"
        />
    );
};

export default CampaignsTable;