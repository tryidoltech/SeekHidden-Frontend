import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../tables/datatable';

const CampaignsTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    // Add state for visible columns with default important columns
    const [visibleColumns, setVisibleColumns] = useState([
        'campaignName',
        'status',
        'clientName',
        'clientType',
        'budgetCap',
        'spend',
        'clicks',
        'applies',
        'country'
    ]);

    const [campaignData, setCampaignData] = useState([
        {
            id: 1,
            campaignName: 'Summer Sale 2024',
            clientName: 'Acme Corp',
            clientType: 'CPA',
            status: 'active',
            budgetCap: 1000.00,
            advertiserName: 'Acme Advertising LLC',
            spend: 450.00,
            reconSpend: 430.00,
            reconNetSpend: 415.00,
            clicks: 150,
            validClicks: 145,
            invalidClicks: 5,
            botClicks: 2,
            latentClicks: 1,
            duplicateClicks: 1,
            foreignClicks: 1,
            reconClicks: 148,
            reconValidClicks: 143,
            reconBotClicks: 2,
            reconInvalidClicks: 3,
            reconLatentClicks: 1,
            reconDuplicateClicks: 1,
            reconForeignClicks: 1,
            applies: 45,
            cpa: 9.56,
            cpc: 3.00,
            cta: 30.0,
            startDate: '2024-01-15',
            frequency: 'Daily',
            country: 'US',
            markUpPercent: 15.0,
            markDownPercent: 5.0
        },
        {
            id: 2,
            campaignName: 'Tech Product Launch',
            clientName: 'Tech Solutions',
            clientType: 'CPC',
            status: 'inactive',
            budgetCap: 2000.00,
            advertiserName: 'TechSol Media Group',
            spend: 0.00,
            reconSpend: 0.00,
            reconNetSpend: 0.00,
            clicks: 0,
            validClicks: 0,
            invalidClicks: 0,
            botClicks: 0,
            latentClicks: 0,
            duplicateClicks: 0,
            foreignClicks: 0,
            reconClicks: 0,
            reconValidClicks: 0,
            reconBotClicks: 0,
            reconInvalidClicks: 0,
            reconLatentClicks: 0,
            reconDuplicateClicks: 0,
            reconForeignClicks: 0,
            applies: 0,
            cpa: 0.00,
            cpc: 2.50,
            cta: 0.0,
            startDate: '2024-02-01',
            frequency: 'Weekly',
            country: 'CA',
            markUpPercent: 12.0,
            markDownPercent: 3.0
        },
        {
            id: 3,
            campaignName: 'Holiday Marketing Blitz',
            clientName: 'Marketing Plus',
            clientType: 'CPA',
            status: 'active',
            budgetCap: 1500.00,
            advertiserName: 'MarketPlus Digital',
            spend: 800.00,
            reconSpend: 790.00,
            reconNetSpend: 775.00,
            clicks: 200,
            validClicks: 195,
            invalidClicks: 5,
            botClicks: 3,
            latentClicks: 1,
            duplicateClicks: 1,
            foreignClicks: 0,
            reconClicks: 198,
            reconValidClicks: 193,
            reconBotClicks: 3,
            reconInvalidClicks: 2,
            reconLatentClicks: 1,
            reconDuplicateClicks: 1,
            reconForeignClicks: 0,
            applies: 65,
            cpa: 12.15,
            cpc: 4.00,
            cta: 32.5,
            startDate: '2024-01-20',
            frequency: 'Daily',
            country: 'UK',
            markUpPercent: 18.0,
            markDownPercent: 7.0
        },
        {
            id: 4,
            campaignName: 'Brand Awareness Q2',
            clientName: 'Digital Agency',
            clientType: 'CPC',
            status: 'paused',
            budgetCap: 5000.00,
            advertiserName: 'Digital Agency Pro',
            spend: 2500.00,
            reconSpend: 2480.00,
            reconNetSpend: 2450.00,
            clicks: 500,
            validClicks: 485,
            invalidClicks: 15,
            botClicks: 8,
            latentClicks: 3,
            duplicateClicks: 2,
            foreignClicks: 2,
            reconClicks: 495,
            reconValidClicks: 480,
            reconBotClicks: 7,
            reconInvalidClicks: 8,
            reconLatentClicks: 3,
            reconDuplicateClicks: 2,
            reconForeignClicks: 3,
            applies: 120,
            cpa: 20.83,
            cpc: 5.00,
            cta: 24.0,
            startDate: '2024-03-01',
            frequency: 'Bi-weekly',
            country: 'AU',
            markUpPercent: 20.0,
            markDownPercent: 8.0
        },
        {
            id: 5,
            campaignName: 'Global Expansion',
            clientName: 'Global Advisors',
            clientType: 'CPA',
            status: 'active',
            budgetCap: 3000.00,
            advertiserName: 'Global Media Network',
            spend: 1200.00,
            reconSpend: 1180.00,
            reconNetSpend: 1160.00,
            clicks: 300,
            validClicks: 290,
            invalidClicks: 10,
            botClicks: 5,
            latentClicks: 2,
            duplicateClicks: 2,
            foreignClicks: 1,
            reconClicks: 298,
            reconValidClicks: 288,
            reconBotClicks: 4,
            reconInvalidClicks: 6,
            reconLatentClicks: 2,
            reconDuplicateClicks: 2,
            reconForeignClicks: 2,
            applies: 85,
            cpa: 14.12,
            cpc: 4.00,
            cta: 28.3,
            startDate: '2024-02-15',
            frequency: 'Daily',
            country: 'DE',
            markUpPercent: 16.0,
            markDownPercent: 4.0
        },
        {
            id: 6,
            campaignName: 'Media Partnership Drive',
            clientName: 'Media Partners',
            clientType: 'CPC',
            status: 'active',
            budgetCap: 2500.00,
            advertiserName: 'MediaPartners United',
            spend: 1800.00,
            reconSpend: 1750.00,
            reconNetSpend: 1720.00,
            clicks: 400,
            validClicks: 390,
            invalidClicks: 10,
            botClicks: 6,
            latentClicks: 2,
            duplicateClicks: 1,
            foreignClicks: 1,
            reconClicks: 398,
            reconValidClicks: 388,
            reconBotClicks: 5,
            reconInvalidClicks: 5,
            reconLatentClicks: 2,
            reconDuplicateClicks: 1,
            reconForeignClicks: 2,
            applies: 110,
            cpa: 16.36,
            cpc: 4.50,
            cta: 27.5,
            startDate: '2024-01-10',
            frequency: 'Daily',
            country: 'FR',
            markUpPercent: 14.0,
            markDownPercent: 6.0
        },
        {
            id: 7,
            campaignName: 'Creative Showcase',
            clientName: 'Creative Solutions',
            clientType: 'CPA',
            status: 'paused',
            budgetCap: 1800.00,
            advertiserName: 'Creative Solutions Inc',
            spend: 900.00,
            reconSpend: 880.00,
            reconNetSpend: 860.00,
            clicks: 180,
            validClicks: 175,
            invalidClicks: 5,
            botClicks: 3,
            latentClicks: 1,
            duplicateClicks: 1,
            foreignClicks: 0,
            reconClicks: 178,
            reconValidClicks: 173,
            reconBotClicks: 2,
            reconInvalidClicks: 3,
            reconLatentClicks: 1,
            reconDuplicateClicks: 1,
            reconForeignClicks: 1,
            applies: 55,
            cpa: 16.36,
            cpc: 5.00,
            cta: 30.6,
            startDate: '2024-03-05',
            frequency: 'Weekly',
            country: 'ES',
            markUpPercent: 13.0,
            markDownPercent: 2.0
        },
        {
            id: 8,
            campaignName: 'Data Analytics Campaign',
            clientName: 'Data Insights',
            clientType: 'CPC',
            status: 'inactive',
            budgetCap: 2200.00,
            advertiserName: 'DataInsights Corp',
            spend: 0.00,
            reconSpend: 0.00,
            reconNetSpend: 0.00,
            clicks: 0,
            validClicks: 0,
            invalidClicks: 0,
            botClicks: 0,
            latentClicks: 0,
            duplicateClicks: 0,
            foreignClicks: 0,
            reconClicks: 0,
            reconValidClicks: 0,
            reconBotClicks: 0,
            reconInvalidClicks: 0,
            reconLatentClicks: 0,
            reconDuplicateClicks: 0,
            reconForeignClicks: 0,
            applies: 0,
            cpa: 0.00,
            cpc: 3.25,
            cta: 0.0,
            startDate: '2024-04-01',
            frequency: 'Monthly',
            country: 'IT',
            markUpPercent: 10.0,
            markDownPercent: 1.0
        }
    ]);

    // Handle field updates - updates the actual data
    const handleFieldUpdate = (id, field, value) => {
        // Update local state
        setCampaignData(prev => prev.map(item =>
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
            id: 'campaignName',
            label: 'Campaign Name',
            disablePadding: true,
            editable: true,
            type: 'editableText',
            onUpdate: (id, value) => handleFieldUpdate(id, 'campaignName', value),
            render: (value, row) => (
                <span
                    onClick={() => navigate('/dashboard/job-group')}
                    style={{
                        color: '#1976d2',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'none'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'underline'}
                >
                    {value}
                </span>
            )
        },
        // {
        //     id: 'clientName',
        //     label: 'Client Name',
        //     disablePadding: false,
        //     editable: true,
        //     type: 'editableText',
        //     onUpdate: (id, value) => handleFieldUpdate(id, 'clientName', value)
        // },
        {
            id: 'clientType',
            label: 'Client Type',
            type: 'chip',
            editable: true,
            editType: 'select',
            editOptions: [
                { value: 'CPA', label: 'CPA' },
                { value: 'CPC', label: 'CPC' }
            ],
            onUpdate: (id, value) => handleFieldUpdate(id, 'clientType', value),
            getChipStyle: (type) => ({
                backgroundColor: type === 'CPA' ? '#e1bee7' : '#bbdefb',
                color: type === 'CPA' ? '#7b1fa2' : '#1976d2',
                fontWeight: 500
            })
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
            id: 'advertiserName',
            label: 'Advertiser Name',
            editable: true,
            type: 'editableText',
            onUpdate: (id, value) => handleFieldUpdate(id, 'advertiserName', value)
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
            id: 'reconNetSpend',
            label: 'Recon Net Spend',
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
            id: 'botClicks',
            label: 'Bot Clicks',
            numeric: true
        },
        {
            id: 'latentClicks',
            label: 'Latent Clicks',
            numeric: true
        },
        {
            id: 'duplicateClicks',
            label: 'Duplicate Clicks',
            numeric: true
        },
        {
            id: 'foreignClicks',
            label: 'Foreign Clicks',
            numeric: true
        },
        {
            id: 'reconClicks',
            label: 'Recon Clicks',
            numeric: true
        },
        {
            id: 'reconValidClicks',
            label: 'Recon Valid Clicks',
            numeric: true
        },
        {
            id: 'reconBotClicks',
            label: 'Recon Bot Clicks',
            numeric: true
        },
        {
            id: 'reconInvalidClicks',
            label: 'Recon Invalid Clicks',
            numeric: true
        },
        {
            id: 'reconLatentClicks',
            label: 'Recon Latent Clicks',
            numeric: true
        },
        {
            id: 'reconDuplicateClicks',
            label: 'Recon Duplicate Clicks',
            numeric: true
        },
        {
            id: 'reconForeignClicks',
            label: 'Recon Foreign Clicks',
            numeric: true
        },
        {
            id: 'applies',
            label: 'Applies',
            numeric: true
        },
        {
            id: 'cpa',
            label: 'CPA',
            numeric: true,
            type: 'currency',
            currency: 'USD'
        },
        {
            id: 'cpc',
            label: 'CPC',
            numeric: true,
            type: 'currency',
            currency: 'USD'
        },
        {
            id: 'cta',
            label: 'CTA%',
            numeric: true,
            type: 'percentage'
        },
        {
            id: 'startDate',
            label: 'Start Date',
            type: 'date'
        },
        {
            id: 'frequency',
            label: 'Frequency',
            editable: true,
            editType: 'select',
            editOptions: [
                { value: 'Daily', label: 'Daily' },
                { value: 'Weekly', label: 'Weekly' },
                { value: 'Bi-weekly', label: 'Bi-weekly' },
                { value: 'Monthly', label: 'Monthly' }
            ],
            onUpdate: (id, value) => handleFieldUpdate(id, 'frequency', value)
        },
        {
            id: 'country',
            label: 'Country',
            editable: true,
            type: 'editableText',
            onUpdate: (id, value) => handleFieldUpdate(id, 'country', value)
        },
        {
            id: 'markUpPercent',
            label: 'Mark Up %',
            numeric: true,
            type: 'editablePercentage',
            editable: true,
            onUpdate: (id, value) => handleFieldUpdate(id, 'markUpPercent', value)
        },
        {
            id: 'markDownPercent',
            label: 'Mark Down %',
            numeric: true,
            type: 'editablePercentage',
            editable: true,
            onUpdate: (id, value) => handleFieldUpdate(id, 'markDownPercent', value)
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
                    const selectedItem = campaignData.find(item => item.id === selected[0]);
                    navigate(`/dashboard/campaigns/edit-campaign/${selectedItem.id}`, {
                        state: { campaign: selectedItem, mode: 'edit' }
                    });
                } else if (selected.length === 0) {
                    toast.error('Please select a campaign to edit');
                } else {
                    toast.error('Please select only one campaign to edit');
                }
                break;
            case 'enable':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to enable');
                } else {
                    const updatedData = campaignData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'active' } : item
                    );
                    setCampaignData(updatedData);
                    toast.success(`${selected.length} campaign(s) enabled`);
                    setSelected([]);
                }
                break;
            case 'pause':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to pause');
                } else {
                    const updatedData = campaignData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'paused' } : item
                    );
                    setCampaignData(updatedData);
                    toast.success(`${selected.length} campaign(s) paused`);
                    setSelected([]);
                }
                break;
            case 'deactivate':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to deactivate');
                } else {
                    const updatedData = campaignData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'inactive' } : item
                    );
                    setCampaignData(updatedData);
                    toast.success(`${selected.length} campaign(s) deactivated`);
                    setSelected([]);
                }
                break;
            case 'clone':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to clone');
                } else {
                    const itemsToClone = campaignData.filter(item => selected.includes(item.id));
                    const clonedItems = itemsToClone.map(item => ({
                        ...item,
                        id: Math.max(...campaignData.map(d => d.id)) + Math.random(),
                        campaignName: `${item.campaignName} (Copy)`
                    }));
                    setCampaignData(prev => [...prev, ...clonedItems]);
                    toast.success(`${selected.length} campaign(s) cloned`);
                    setSelected([]);
                }
                break;
            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to delete');
                } else {
                    const updatedData = campaignData.filter(item => !selected.includes(item.id));
                    setCampaignData(updatedData);
                    toast.success(`${selected.length} campaign(s) deleted`);
                    setSelected([]);
                }
                break;
            case 'duplicate':
                if (selected.length === 0) {
                    toast.error('Please select campaigns to duplicate');
                } else {
                    const itemsToDuplicate = campaignData.filter(item => selected.includes(item.id));
                    const duplicatedItems = itemsToDuplicate.map(item => ({
                        ...item,
                        id: Math.max(...campaignData.map(d => d.id)) + Math.random(),
                        campaignName: `${item.campaignName} (Duplicate)`
                    }));
                    setCampaignData(prev => [...prev, ...duplicatedItems]);
                    toast.success(`${selected.length} campaign(s) duplicated`);
                    setSelected([]);
                }
                break;
            case 'click-logs':
                if (selected.length === 1) {
                    navigate('/dashboard/click-logs');
                } else if (selected.length === 0) {
                    toast.error('Please select a campaign to view click logs');
                } else {
                    toast.error('Please select only one campaign to view click logs');
                }
                break;
            case 'daily-stats':
                if (selected.length === 1) {
                    toast.info('Daily stats view will be implemented');
                } else if (selected.length === 0) {
                    toast.error('Please select a campaign to view daily stats');
                } else {
                    toast.error('Please select only one campaign to view daily stats');
                }
                break;
            case 'inspect-feed':
                if (selected.length === 1) {
                    navigate('/dashboard/inspectfeed');
                } else if (selected.length === 0) {
                    toast.error('Please select a campaign to inspect feed');
                } else {
                    toast.error('Please select only one campaign to inspect feed');
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
                        { value: 'enable', label: 'Enable' },
                        { value: 'pause', label: 'Pause' },
                        { value: 'deactivate', label: 'Deactivate' },
                        { value: 'clone', label: 'Clone' },
                        { value: 'delete', label: 'Delete' },
                        { value: 'duplicate', label: 'Duplicate' },
                        { value: 'click-logs', label: 'Click Logs' },
                        { value: 'daily-stats', label: 'Daily Stats' },
                        { value: 'inspect-feed', label: 'Inspect Feed' }
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
                        { value: '1000-5000', label: '$1K - $5K' },
                        { value: '5000+', label: '$5K+' }
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
                {
                    type: 'button',
                    label: 'Add Campaign',
                    icon: <AddSquare size="20" />,
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => navigate('/dashboard/campaigns/add-campaign')
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
                    placeholder: 'Search campaigns...',
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
                                'campaignName',
                                'status',
                                'clientName',
                                'clientType',
                                'budgetCap',
                                'spend',
                                'clicks',
                                'applies',
                                'country'
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
            'campaignName',
            'status',
            'clientName',
            'clientType',
            'budgetCap',
            'spend',
            'clicks',
            'applies',
            'country'
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

        // Status filter
        if (filters.status && row.status !== filters.status) {
            return false;
        }

        // Client Type filter
        if (filters.clientType && row.clientType !== filters.clientType) {
            return false;
        }

        return true;
    };

    const handleRowSelect = (selectedIds) => {
        setSelected(selectedIds);
    };

    return (
        <DynamicTable
            data={campaignData}
            columns={displayColumns}
            filterConfig={filterConfig}
            customFilter={customFilter}
            onRowSelect={handleRowSelect}
            searchEnabled={true}
            searchFields={['campaignName', 'clientName', 'clientType', 'advertiserName']}
            title="Campaigns"
            onRowClick={(row) => navigate('/dashboard/job-group')}
            selectable={true}
            actionsEnabled={false}
            recordsFoundText="Records Found"
        />
    );
};

export default CampaignsTable;