import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../tables/datatable';

const PublisherTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    // Add state for visible columns with default important columns
    const [visibleColumns, setVisibleColumns] = useState([
        'publisherName',
        'status',
        'budgetCap',
        'spend',
        'clicks',
        'validClicks',
        'invalidClicks',
        'markUpPercent',
        'markDownPercent'
    ]);

    const [publisherData, setPublisherData] = useState([
        { id: 1, publisherName: 'ATTB US CPA', status: 'active', budgetCap: 1000.00, spend: 450.00, reconSpend: 430.00, clicks: 150, validClicks: 145, invalidClicks: 5, markUpPercent: 15.0, markDownPercent: 5.0 },
        { id: 2, publisherName: 'TechSol Media', status: 'active', budgetCap: 2000.00, spend: 800.00, reconSpend: 790.00, clicks: 200, validClicks: 195, invalidClicks: 5, markUpPercent: 12.0, markDownPercent: 3.0 },
        { id: 3, publisherName: 'Digital Partners', status: 'paused', budgetCap: 1500.00, spend: 600.00, reconSpend: 580.00, clicks: 120, validClicks: 115, invalidClicks: 5, markUpPercent: 18.0, markDownPercent: 7.0 },
        { id: 4, publisherName: 'Global Media Network', status: 'inactive', budgetCap: 3000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0, markUpPercent: 20.0, markDownPercent: 8.0 },
        { id: 5, publisherName: 'Creative Solutions', status: 'active', budgetCap: 1800.00, spend: 900.00, reconSpend: 880.00, clicks: 180, validClicks: 175, invalidClicks: 5, markUpPercent: 16.0, markDownPercent: 4.0 },
        { id: 6, publisherName: 'Marketing Plus', status: 'inactive', budgetCap: 2500.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0, markUpPercent: 14.0, markDownPercent: 6.0 },
        { id: 7, publisherName: 'Media Partners', status: 'active', budgetCap: 2200.00, spend: 1100.00, reconSpend: 1080.00, clicks: 220, validClicks: 210, invalidClicks: 10, markUpPercent: 13.0, markDownPercent: 2.0 },
        { id: 8, publisherName: 'Data Insights', status: 'paused', budgetCap: 1200.00, spend: 300.00, reconSpend: 290.00, clicks: 60, validClicks: 58, invalidClicks: 2, markUpPercent: 10.0, markDownPercent: 1.0 },
    ]);

    // Handle field updates - updates the actual data
    const handleFieldUpdate = (id, field, value) => {
        // Update local state
        setPublisherData(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        // Here you would typically make an API call to update the data
        console.log(`Updating ${field} for ID ${id} to ${value}`);
        toast.success(`${field} updated successfully`);
    };

    const columns = [
        {
            id: 'status',
            label: 'Status',
            type: 'statusDot',
            sortable: false,
            editable: true,
            editType: 'select',
            editOptions: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'paused', label: 'Paused' }
            ],
            onUpdate: (id, value) => handleFieldUpdate(id, 'status', value),
            getStatusColor: (status) => {
                switch (status) {
                    case 'active': return '#4caf50';
                    case 'inactive': return '#f44336';
                    case 'paused': return '#ff9800';
                    default: return '#9e9e9e';
                }
            },
            render: (value, row) => (
                <div
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: (() => {
                            switch (value) {
                                case 'active': return '#4caf50';
                                case 'inactive': return '#f44336';
                                case 'paused': return '#ff9800';
                                default: return '#9e9e9e';
                            }
                        })(),
                        display: 'inline-block'
                    }}
                />
            )
        },
        {
            id: 'publisherName',
            label: 'Publisher Name',
            disablePadding: true,
            editable: true,
            type: 'editableText',
            onUpdate: (id, value) => handleFieldUpdate(id, 'publisherName', value),
            render: (value, row) => (
                <span
                    // onClick={() => navigate('/dashboard/job-group')}
                    style={{
                        color: '#1976d2',
                        // cursor: 'pointer',
                        // textDecoration: 'underline'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'none'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'underline'}
                >
                    {value}
                </span>
            )
        },
        {
            id: 'budgetCap',
            label: 'Budget Cap',
            numeric: true,
            type: 'editableCurrency',
            currency: 'USD',
            editable: true,
            onUpdate: (id, value) => handleFieldUpdate(id, 'budgetCap', value)
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
        },
        {
            id: 'markUpPercent',
            label: 'Markup %',
            numeric: true,
            type: 'editablePercentage',
            editable: true,
            onUpdate: (id, value) => handleFieldUpdate(id, 'markUpPercent', value),
            render: (value, row) => (
                <span style={{ color: '#4caf50', fontWeight: 500 }}>
                    +{parseFloat(value || 0).toFixed(1)}%
                </span>
            )
        },
        {
            id: 'markDownPercent',
            label: 'Markdown %',
            numeric: true,
            type: 'editablePercentage',
            editable: true,
            onUpdate: (id, value) => handleFieldUpdate(id, 'markDownPercent', value),
            render: (value, row) => (
                <span style={{ color: '#f44336', fontWeight: 500 }}>
                    -{parseFloat(value || 0).toFixed(1)}%
                </span>
            )
        }
    ];

    // Generate column options for the dropdown
    const columnOptions = columns.map(column => ({
        value: column.id,
        label: column.label || 'Status'
    }));

    const handleActionChange = (action) => {
        if (!action) return;

        switch (action) {
            case 'edit':
                if (selected.length === 1) {
                    const selectedItem = publisherData.find(item => item.id === selected[0]);
                    navigate(`/dashboard/publishers/publisher-form`, {
                        state: { publisher: selectedItem, mode: 'edit' }
                    });
                } else if (selected.length === 0) {
                    toast.error('Please select a publisher to edit');
                } else {
                    toast.error('Please select only one publisher to edit');
                }
                break;
            case 'enable':
                if (selected.length === 0) {
                    toast.error('Please select publishers to enable');
                } else {
                    const updatedData = publisherData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'active' } : item
                    );
                    setPublisherData(updatedData);
                    toast.success(`${selected.length} publisher(s) enabled`);
                    setSelected([]);
                }
                break;
            case 'pause':
                if (selected.length === 0) {
                    toast.error('Please select publishers to pause');
                } else {
                    const updatedData = publisherData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'paused' } : item
                    );
                    setPublisherData(updatedData);
                    toast.success(`${selected.length} publisher(s) paused`);
                    setSelected([]);
                }
                break;
            case 'deactivate':
                if (selected.length === 0) {
                    toast.error('Please select publishers to deactivate');
                } else {
                    const updatedData = publisherData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'inactive' } : item
                    );
                    setPublisherData(updatedData);
                    toast.success(`${selected.length} publisher(s) deactivated`);
                    setSelected([]);
                }
                break;
            case 'clone':
                if (selected.length === 0) {
                    toast.error('Please select publishers to clone');
                } else {
                    const itemsToClone = publisherData.filter(item => selected.includes(item.id));
                    const clonedItems = itemsToClone.map(item => ({
                        ...item,
                        id: Math.max(...publisherData.map(d => d.id)) + Math.random(),
                        publisherName: `${item.publisherName} (Copy)`
                    }));
                    setPublisherData(prev => [...prev, ...clonedItems]);
                    toast.success(`${selected.length} publisher(s) cloned`);
                    setSelected([]);
                }
                break;
            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select publishers to delete');
                } else {
                    const updatedData = publisherData.filter(item => !selected.includes(item.id));
                    setPublisherData(updatedData);
                    toast.success(`${selected.length} publisher(s) deleted`);
                    setSelected([]);
                }
                break;
            case 'duplicate':
                if (selected.length === 0) {
                    toast.error('Please select publishers to duplicate');
                } else {
                    const itemsToDuplicate = publisherData.filter(item => selected.includes(item.id));
                    const duplicatedItems = itemsToDuplicate.map(item => ({
                        ...item,
                        id: Math.max(...publisherData.map(d => d.id)) + Math.random(),
                        publisherName: `${item.publisherName} (Duplicate)`
                    }));
                    setPublisherData(prev => [...prev, ...duplicatedItems]);
                    toast.success(`${selected.length} publisher(s) duplicated`);
                    setSelected([]);
                }
                break;
            case 'click-logs':
                if (selected.length === 1) {
                    navigate('/dashboard/click-logs');
                } else if (selected.length === 0) {
                    toast.error('Please select a publisher to view click logs');
                } else {
                    toast.error('Please select only one publisher to view click logs');
                }
                break;
            case 'daily-stats':
                if (selected.length === 1) {
                    toast.info('Daily stats view will be implemented');
                } else if (selected.length === 0) {
                    toast.error('Please select a publisher to view daily stats');
                } else {
                    toast.error('Please select only one publisher to view daily stats');
                }
                break;
            default:
                break;
        }
    };

    // Add markup/markdown range filter in filterConfig
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
                        { value: 'enable', label: 'Enable' },
                        { value: 'pause', label: 'Pause' },
                        { value: 'deactivate', label: 'Deactivate' },
                        { value: 'clone', label: 'Clone' },
                        { value: 'delete', label: 'Delete' },
                        { value: 'duplicate', label: 'Duplicate' },
                        { value: 'click-logs', label: 'Click Logs' },
                        { value: 'daily-stats', label: 'Daily Stats' }
                    ],
                    onChange: handleActionChange
                },
                {
                    type: 'select',
                    key: 'budgetRange',
                    placeholder: 'Budget Cap',
                    minWidth: 140,
                    options: [
                        { value: '0-1000', label: '$0 - $1K' },
                        { value: '1000-2000', label: '$1K - $2K' },
                        { value: '2000+', label: '$2K+' }
                    ]
                },
                {
                    type: 'select',
                    key: 'margin',
                    placeholder: 'Margin',
                    minWidth: 120,
                    options: [
                        { value: 'markup', label: 'Mark Up' },
                        { value: 'markdown', label: 'Mark Down' }
                    ]
                }
            ],
            rightFilters: [
                {
                    type: 'dateRange',
                    key: 'dateRange',
                    placeholder: 'Date Range',
                    minWidth: 200,
                    defaultValue: '01-01-2024 to 12-31-2024'
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
                    placeholder: 'Search publishers...',
                    minWidth: 200
                }
            ],
            rightFilters: [
                {
                    type: 'select',
                    key: 'columns',
                    placeholder: 'Select Stats',
                    minWidth: 140,
                    options: [
                        { value: '', label: 'Default Stats' },
                        { value: 'all', label: 'All Stats' },
                        ...columnOptions
                    ],
                    onChange: (value) => {
                        if (value === 'all') {
                            setVisibleColumns(columns.map(col => col.id));
                        } else if (value === '' || !value) {
                            setVisibleColumns([
                                'publisherName',
                                'status',
                                'budgetCap',
                                'spend',
                                'clicks',
                                'validClicks',
                                'invalidClicks',
                                'markUpPercent',
                                'markDownPercent'
                            ]);
                        } else {
                            setVisibleColumns([value]);
                        }
                    }
                },
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

    // Filter columns based on selection
    const displayColumns = visibleColumns.length > 0
        ? columns.filter(column => visibleColumns.includes(column.id))
        : columns.filter(column => [
            'publisherName',
            'status',
            'budgetCap',
            'spend',
            'clicks',
            'validClicks',
            'invalidClicks',
            'markUpPercent',
            'markDownPercent'
        ].includes(column.id));

    const customFilter = (row, filters) => {
        // Budget range filter
        if (filters.budgetRange) {
            if (filters.budgetRange.endsWith('+')) {
                const min = parseInt(filters.budgetRange.replace('+', ''));
                if (row.budgetCap < min) return false;
            } else {
                const [min, max] = filters.budgetRange.split('-').map(Number);
                if (row.budgetCap < min || row.budgetCap > max) return false;
            }
        }

        // Click range filter
        if (filters.clickRange) {
            if (filters.clickRange.endsWith('+')) {
                const min = parseInt(filters.clickRange.replace('+', ''));
                if (row.clicks < min) return false;
            } else {
                const [min, max] = filters.clickRange.split('-').map(Number);
                if (row.clicks < min || row.clicks > max) return false;
            }
        }

        // Markup range filter
        if (filters.markupRange) {
            if (filters.markupRange.endsWith('+')) {
                const min = parseInt(filters.markupRange.replace('+', ''));
                if (row.markUpPercent < min) return false;
            } else {
                const [min, max] = filters.markupRange.split('-').map(Number);
                if (row.markUpPercent < min || row.markUpPercent > max) return false;
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
            data={publisherData}
            columns={displayColumns}
            filterConfig={filterConfig}
            customFilter={customFilter}
            onRowSelect={handleRowSelect}
            searchEnabled={true}
            searchFields={['publisherName']}
            title="Publishers"
            onRowClick={(row) => navigate('/dashboard/job-group')}
            selectable={true}
            actionsEnabled={false}
            recordsFoundText="Records Found"
        />
    );
};

export default PublisherTable;