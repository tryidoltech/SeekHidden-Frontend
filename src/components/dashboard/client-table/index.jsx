import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../../tables/datatable';

const ClientTable = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  
  // Add state for visible columns with default important columns
  const [visibleColumns, setVisibleColumns] = useState([
    'clientName', 
    'status',
    'clientType', 
    'budgetCap', 
    'spend', 
    'clicks', 
    'applies',
    'country'
  ]);

  const [clientData, setClientData] = useState([
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
  ]);

  // Handle field updates - updates the actual data
  const handleFieldUpdate = (id, field, value) => {
    // Update local state
    setClientData(prev => prev.map(item => 
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
      id: 'clientName', 
      label: 'Client Name', 
      disablePadding: true,
      editable: true,
      type: 'editableText',
      onUpdate: (id, value) => handleFieldUpdate(id, 'clientName', value),
      render: (value, row) => (
        <span
          onClick={() => navigate('/dashboard/campaigns')}
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
      id: 'cp', 
      label: 'CP', 
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
      id: 'ctaPercent', 
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
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'bi-weekly', label: 'Bi-weekly' },
        { value: 'monthly', label: 'Monthly' }
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
          const selectedItem = clientData.find(item => item.id === selected[0]);
          navigate(`/dashboard/clients/client-form`, { 
            state: { client: selectedItem, mode: 'edit' } 
          });
        } else if (selected.length === 0) {
          toast.error('Please select a client to edit');
        } else {
          toast.error('Please select only one client to edit');
        }
        break;
      case 'enable':
        if (selected.length === 0) {
          toast.error('Please select clients to enable');
        } else {
          const updatedData = clientData.map(item => 
            selected.includes(item.id) ? { ...item, status: 'active' } : item
          );
          setClientData(updatedData);
          toast.success(`${selected.length} client(s) enabled`);
          setSelected([]);
        }
        break;
      case 'pause':
        if (selected.length === 0) {
          toast.error('Please select clients to pause');
        } else {
          const updatedData = clientData.map(item => 
            selected.includes(item.id) ? { ...item, status: 'paused' } : item
          );
          setClientData(updatedData);
          toast.success(`${selected.length} client(s) paused`);
          setSelected([]);
        }
        break;
      case 'deactivate':
        if (selected.length === 0) {
          toast.error('Please select clients to deactivate');
        } else {
          const updatedData = clientData.map(item => 
            selected.includes(item.id) ? { ...item, status: 'inactive' } : item
          );
          setClientData(updatedData);
          toast.success(`${selected.length} client(s) deactivated`);
          setSelected([]);
        }
        break;
      case 'clone':
        if (selected.length === 0) {
          toast.error('Please select clients to clone');
        } else {
          const itemsToClone = clientData.filter(item => selected.includes(item.id));
          const clonedItems = itemsToClone.map(item => ({
            ...item,
            id: Math.max(...clientData.map(d => d.id)) + Math.random(),
            clientName: `${item.clientName} (Copy)`
          }));
          setClientData(prev => [...prev, ...clonedItems]);
          toast.success(`${selected.length} client(s) cloned`);
          setSelected([]);
        }
        break;
      case 'delete':
        if (selected.length === 0) {
          toast.error('Please select clients to delete');
        } else {
          const updatedData = clientData.filter(item => !selected.includes(item.id));
          setClientData(updatedData);
          toast.success(`${selected.length} client(s) deleted`);
          setSelected([]);
        }
        break;
      case 'duplicate':
        if (selected.length === 0) {
          toast.error('Please select clients to duplicate');
        } else {
          const itemsToDuplicate = clientData.filter(item => selected.includes(item.id));
          const duplicatedItems = itemsToDuplicate.map(item => ({
            ...item,
            id: Math.max(...clientData.map(d => d.id)) + Math.random(),
            clientName: `${item.clientName} (Duplicate)`
          }));
          setClientData(prev => [...prev, ...duplicatedItems]);
          toast.success(`${selected.length} client(s) duplicated`);
          setSelected([]);
        }
        break;
      case 'campaigns':
        if (selected.length === 1) {
          navigate('/dashboard/campaigns');
        } else if (selected.length === 0) {
          toast.error('Please select a client to view campaigns');
        } else {
          toast.error('Please select only one client to view campaigns');
        }
        break;
      case 'job-groups':
        if (selected.length === 1) {
          navigate('/dashboard/job-group');
        } else if (selected.length === 0) {
          toast.error('Please select a client to view job groups');
        } else {
          toast.error('Please select only one client to view job groups');
        }
        break;
      case 'publishers':
        if (selected.length === 1) {
          navigate('/dashboard/publishers');
        } else if (selected.length === 0) {
          toast.error('Please select a client to view publishers');
        } else {
          toast.error('Please select only one client to view publishers');
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
            { value: 'campaigns', label: 'View Campaigns' },
            { value: 'job-groups', label: 'View Job Groups' },
            { value: 'publishers', label: 'View Publishers' }
          ],
          onChange: handleActionChange
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
        },
        // {
        //   type: 'select',
        //   key: 'clientType',
        //   placeholder: 'Client Type',
        //   minWidth: 120,
        //   options: [
        //     { value: 'CPA', label: 'CPA' },
        //     { value: 'CPC', label: 'CPC' }
        //   ]
        // },
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
          defaultValue: '01-01-2023 to 12-31-2023'
        },
        {
          type: 'button',
          label: 'Add Client',
          icon: <AddSquare size="20" />,
          variant: 'contained',
          color: 'primary',
          onClick: () => navigate('/dashboard/clients/add-client')
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
                'clientName', 
                'status',
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

  // Filter columns based on selection - show default important columns if none selected
  const displayColumns = visibleColumns.length > 0 
    ? columns.filter(column => visibleColumns.includes(column.id))
    : columns.filter(column => [
        'clientName', 
        'status',
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

    // Margin filter
    if (filters.margin) {
      if (filters.margin === 'markup') {
        if (row.markUpPercent <= 0) return false;
      } else if (filters.margin === 'markdown') {
        if (row.markDownPercent <= 0) return false;
      }
    }
    
    return true;
  };

  const handleRowSelect = (selectedIds) => {
    setSelected(selectedIds);
  };

  return (
    <DynamicTable
      data={clientData}
      columns={displayColumns}
      filterConfig={filterConfig}
      customFilter={customFilter}
      onRowSelect={handleRowSelect}
      searchEnabled={true}
      searchFields={['clientName', 'clientType', 'advertiserName', 'country']}
      title="Clients"
      onRowClick={(row) => navigate('/dashboard/campaigns')}
      selectable={true}
      actionsEnabled={false}
      recordsFoundText="Records Found"
    />
  );
};

export default ClientTable;