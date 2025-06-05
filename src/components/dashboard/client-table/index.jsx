import React, { useState } from 'react';
import { Calendar, Filter } from 'iconsax-react';
import DynamicTable from '../../tables/datatable';
import { useNavigate } from 'react-router';

const ClientTable = () => {
  const navigate = useNavigate();
  
  // Add state for visible columns with default important columns
  const [visibleColumns, setVisibleColumns] = useState([
    'clientName', 
    'clientType', 
    'status', 
    'budgetCap', 
    'spend', 
    'clicks', 
    'applies',
    'country'
  ]);

  const clientData = [
    { 
      id: 1, 
      clientName: 'Acme Corp', 
      clientType: 'CPA', 
      status: 'active', 
      budgetCap: 10000.00, 
      advertiserName: 'Global Ads Inc.',
      spend: 4500.00, 
      reconSpend: 4300.00,
      reconNetSpend: 4200.00,
      clicks: 1500, 
      validClicks: 1450, 
      invalidClicks: 50,
      botClicks: 10,
      latentClicks: 15,
      duplicateClicks: 12,
      foreignClicks: 13,
      reconClicks: 1480,
      reconValidClicks: 1430,
      reconBotClicks: 8,
      reconInvalidClicks: 42,
      reconLatentClicks: 14,
      reconDuplicateClicks: 11,
      reconForeignClicks: 12,
      applies: 1200,
      cp: 3.75,
      cpc: 3.00,
      ctaPercent: 25.5,
      startDate: '2023-01-15',
      frequency: 'daily',
      country: 'US',
      markUpPercent: 15.0,
      markDownPercent: 5.0
    },
    { 
      id: 2, 
      clientName: 'Tech Solutions', 
      clientType: 'CPC', 
      status: 'inactive', 
      budgetCap: 20000.00,
      advertiserName: 'Digital Marketing Co.',
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
      cp: 0,
      cpc: 0,
      ctaPercent: 0,
      startDate: '2023-03-10',
      frequency: 'weekly',
      country: 'UK',
      markUpPercent: 12.0,
      markDownPercent: 3.0
    },
    { 
      id: 3, 
      clientName: 'Marketing Plus', 
      clientType: 'CPA', 
      status: 'active', 
      budgetCap: 15000.00,
      advertiserName: 'Ad Network Partners',
      spend: 8000.00, 
      reconSpend: 7900.00,
      reconNetSpend: 7800.00,
      clicks: 2000, 
      validClicks: 1950, 
      invalidClicks: 50,
      botClicks: 15,
      latentClicks: 20,
      duplicateClicks: 15,
      foreignClicks: 10,
      reconClicks: 1980,
      reconValidClicks: 1930,
      reconBotClicks: 12,
      reconInvalidClicks: 47,
      reconLatentClicks: 18,
      reconDuplicateClicks: 13,
      reconForeignClicks: 9,
      applies: 1600,
      cp: 4.00,
      cpc: 3.20,
      ctaPercent: 28.0,
      startDate: '2023-02-20',
      frequency: 'daily',
      country: 'CA',
      markUpPercent: 18.0,
      markDownPercent: 6.0
    },
    { 
      id: 4, 
      clientName: 'Digital Agency', 
      clientType: 'CPC', 
      status: 'paused', 
      budgetCap: 50000.00,
      advertiserName: 'Performance Marketing Ltd',
      spend: 25000.00, 
      reconSpend: 24800.00,
      reconNetSpend: 24500.00,
      clicks: 5000, 
      validClicks: 4850, 
      invalidClicks: 150,
      botClicks: 30,
      latentClicks: 40,
      duplicateClicks: 35,
      foreignClicks: 45,
      reconClicks: 4950,
      reconValidClicks: 4800,
      reconBotClicks: 25,
      reconInvalidClicks: 140,
      reconLatentClicks: 38,
      reconDuplicateClicks: 33,
      reconForeignClicks: 42,
      applies: 4000,
      cp: 5.00,
      cpc: 4.00,
      ctaPercent: 30.5,
      startDate: '2023-01-05',
      frequency: 'monthly',
      country: 'AU',
      markUpPercent: 20.0,
      markDownPercent: 8.0
    },
    { 
      id: 5, 
      clientName: 'Global Advisors', 
      clientType: 'CPA', 
      status: 'active', 
      budgetCap: 30000.00,
      advertiserName: 'Worldwide Advertisers',
      spend: 12000.00, 
      reconSpend: 11800.00,
      reconNetSpend: 11500.00,
      clicks: 3000, 
      validClicks: 2900, 
      invalidClicks: 100,
      botClicks: 20,
      latentClicks: 25,
      duplicateClicks: 20,
      foreignClicks: 35,
      reconClicks: 2950,
      reconValidClicks: 2850,
      reconBotClicks: 18,
      reconInvalidClicks: 95,
      reconLatentClicks: 23,
      reconDuplicateClicks: 18,
      reconForeignClicks: 32,
      applies: 2500,
      cp: 4.20,
      cpc: 3.50,
      ctaPercent: 27.3,
      startDate: '2023-04-15',
      frequency: 'weekly',
      country: 'US',
      markUpPercent: 17.5,
      markDownPercent: 7.0
    }
  ];

  const columns = [
    { 
      id: 'clientName', 
      label: 'Client Name', 
      disablePadding: true 
    },
    { 
      id: 'clientType', 
      label: 'Client Type', 
      type: 'chip',
      getChipStyle: (type) => ({
        backgroundColor: type === 'CPA' ? '#e1bee7' : '#bbdefb',
        color: type === 'CPA' ? '#7b1fa2' : '#1976d2',
        fontWeight: 500
      })
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
      id: 'advertiserName', 
      label: 'Advertiser Name', 
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
      id: 'cp', 
      label: 'CP', 
      numeric: true,
      type: 'number',
      decimals: 2
    },
    { 
      id: 'cpc', 
      label: 'CPC', 
      numeric: true,
      type: 'number',
      decimals: 2
    },
    { 
      id: 'ctaPercent', 
      label: 'CTA%', 
      numeric: true,
      type: 'number',
      decimals: 1
    },
    { 
      id: 'startDate', 
      label: 'Start Date', 
    },
    { 
      id: 'frequency', 
      label: 'Frequency', 
    },
    { 
      id: 'country', 
      label: 'Country', 
    },
    { 
      id: 'markUpPercent', 
      label: 'Mark Up %', 
      numeric: true,
      type: 'number',
      decimals: 1
    },
    { 
      id: 'markDownPercent', 
      label: 'Mark Down %', 
      numeric: true,
      type: 'number',
      decimals: 1
    }
  ];

  // Generate column options for the dropdown
  const columnOptions = columns.map(column => ({
    value: column.id,
    label: column.label
  }));

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
          ]
        },
        {
          type: 'select',
          key: 'budgetRange',
          placeholder: 'Budget Cap',
          minWidth: 140,
          options: [
            { value: '0-10000', label: '$0 - $10K' },
            { value: '10000-50000', label: '$10K - $50K' },
            { value: '50000+', label: '$50K+' }
          ]
        }
      ],
      rightFilters: [
        {
          type: 'label',
          text: 'Date Range:'
        },
        {
          type: 'text',
          key: 'dateRange',
          placeholder: '01-01-2000 to 01-01-2020',
          minWidth: 200,
          icon: <Calendar size="20" />
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
          placeholder: 'Search clients...',
          minWidth: 200
        }
      ],
      rightFilters: [
        {
          type: 'select',
          key: 'columns',
          placeholder: 'Select Columns',
          minWidth: 140,
          options: [
            { value: '', label: 'Default Columns' },
            { value: 'all', label: 'All Columns' },
            ...columnOptions
          ],
          onChange: (value) => {
            if (value === 'all') {
              setVisibleColumns(columns.map(col => col.id));
            } else if (value === '' || !value) {
              setVisibleColumns([
                'clientName', 
                'clientType', 
                'status', 
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
          placeholder: 'Currency',
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
          type: 'button',
          label: 'Apply Filters',
          icon: <Filter size="20" />
        },
        {
          type: 'select',
          key: 'rowsPerPage',
          minWidth: 80,
          options: [
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' }
          ]
        }
      ]
    }
  ];

  // Filter columns based on selection - show default important columns if none selected
  const displayColumns = visibleColumns.length > 0 
    ? columns.filter(column => visibleColumns.includes(column.id))
    : columns.filter(column => [
        'clientName', 
        'clientType', 
        'status', 
        'budgetCap', 
        'spend', 
        'clicks', 
        'applies',
        'country'
      ].includes(column.id));

  const customFilter = (row, filters) => {
    if (filters.budgetRange) {
      const [min, max] = filters.budgetRange.split('-').map(Number);
      if (filters.budgetRange.endsWith('+')) {
        if (row.budgetCap < min) return false;
      } else {
        if (row.budgetCap < min || row.budgetCap > max) return false;
      }
    }
    
    if (filters.status && row.status !== filters.status) {
      return false;
    }
    
    if (filters.currency) {
    }
    
    return true;
  };

  return (
    <DynamicTable
      data={clientData}
      columns={displayColumns}
      filterConfig={filterConfig}
      initialFilters={{
        currency: 'USD',
        dateRange: '01-01-2000 to 01-01-2020',
        rowsPerPage: 10
      }}
      title="Clients"
      searchFields={['clientName', 'clientType', 'advertiserName', 'country']}
      getRowId={(row) => row.id}
      onRowClick={(row) => navigate('/dashboard/campaigns')}
      onRowSelect={(selected) => console.log('Selected rows:', selected)}
      onApplyFilters={(filters) => console.log('Applied filters:', filters)}
      customFilter={customFilter}
      actionsEnabled= {true}
      actions={[
        {
          label: 'Go to Campaigns',
          onClick: () => navigate(`/dashboard/campaigns`)
        },
        {
          label: 'Go to Job Groups',
          onClick: (row) => navigate(`/dashboard/job-group`)
        },
        {
          label: 'Go to publishers',
          onClick: (row) => navigate(`/dashboard/publishers`)
        }
      ]}
    />
  );
};

export default ClientTable;