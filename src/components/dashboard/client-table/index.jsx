import React from 'react';
import { Calendar, Filter } from 'iconsax-react';
import DynamicTable from '../../tables/datatable';
import { useNavigate } from 'react-router';

const ClientTable = () => {
  const navigate = useNavigate();
  const clientData = [
    { id: 1, clientName: 'Acme Corp', clientType: 'CPA', status: 'active', budgetCap: 1000.00, spend: 450.00, reconSpend: 430.00, clicks: 150, validClicks: 145, invalidClicks: 5 },
    { id: 2, clientName: 'Tech Solutions', clientType: 'CPC', status: 'inactive', budgetCap: 2000.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
    { id: 3, clientName: 'Marketing Plus', clientType: 'CPA', status: 'active', budgetCap: 1500.00, spend: 800.00, reconSpend: 790.00, clicks: 200, validClicks: 195, invalidClicks: 5 },
    { id: 4, clientName: 'Digital Agency', clientType: 'CPC', status: 'paused', budgetCap: 5000.00, spend: 2500.00, reconSpend: 2480.00, clicks: 500, validClicks: 485, invalidClicks: 15 },
    { id: 5, clientName: 'Global Advisors', clientType: 'CPA', status: 'active', budgetCap: 3000.00, spend: 1200.00, reconSpend: 1180.00, clicks: 300, validClicks: 290, invalidClicks: 10 },
    { id: 6, clientName: 'Media Partners', clientType: 'CPC', status: 'active', budgetCap: 2500.00, spend: 1800.00, reconSpend: 1750.00, clicks: 400, validClicks: 390, invalidClicks: 10 },
    { id: 7, clientName: 'Creative Solutions', clientType: 'CPA', status: 'paused', budgetCap: 1800.00, spend: 900.00, reconSpend: 880.00, clicks: 180, validClicks: 175, invalidClicks: 5 },
    { id: 8, clientName: 'Data Insights', clientType: 'CPC', status: 'inactive', budgetCap: 2200.00, spend: 0.00, reconSpend: 0.00, clicks: 0, validClicks: 0, invalidClicks: 0 },
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
            { value: '0-500', label: '$0 - $500' },
            { value: '500-1000', label: '$500 - $1000' },
            { value: '1000+', label: '$1000+' }
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
      columns={columns}
      filterConfig={filterConfig}
      initialFilters={{
        currency: 'USD',
        dateRange: '01-01-2000 to 01-01-2020',
        rowsPerPage: 10
      }}
      title="Clients"
      searchFields={['clientName', 'clientType']}
      getRowId={(row) => row.id}
      onRowClick={(row) => navigate('/dashboard/campaigns')}
      onRowSelect={(selected) => console.log('Selected rows:', selected)}
      onApplyFilters={(filters) => console.log('Applied filters:', filters)}
      customFilter={customFilter}
    />
  );
};

export default ClientTable;