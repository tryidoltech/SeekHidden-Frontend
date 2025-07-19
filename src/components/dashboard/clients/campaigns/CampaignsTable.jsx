import React, { useEffect, useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// Add these imports for the budget popup
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText, // Add this import
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  ListItemText,
  InputAdornment
} from '@mui/material';
import DynamicTable from '../../../tables/datatable';
import axiosServices, { fetcher } from '../../../../utils/axios';
import useSWR from 'swr';

const CampaignsTable = () => {
  const clientId = localStorage.getItem('clientId');
  console.log(clientId);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  // Define default columns that should always be visible
  const defaultColumns = ['campaignName', 'status', 'clientName', 'clientType', 'budgetCap', 'spend', 'clicks', 'applies', 'country'];

  // Add state for visible columns - initialize with default columns
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  // Add state for budget popup
  const [budgetPopupOpen, setBudgetPopupOpen] = useState(false);
  const [budgetSettings, setBudgetSettings] = useState({
    pacing: '',
    threshold: '',
    budgetTarget: '',
    frequency: ''
  });

  // Add state for margin popup
  const [marginPopupOpen, setMarginPopupOpen] = useState(false);
  const [marginSettings, setMarginSettings] = useState({
    markUpPercent: '',
    markUpValue: '',
    markDownPercent: '',
    markDownValue: '',
    applyToAll: false
  });

  // Add state to track which margin type is being edited
  const [marginType, setMarginType] = useState('');

  // Add state for margin mode (percentage or value)
  const [marginMode, setMarginMode] = useState('percentage'); // 'percentage' or 'value'

  // Add state for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const { data, error, isLoading } = useSWR('/campaigns', fetcher);
  console.log(data);
  const [campaignData, setCampaignData] = useState([]);
  useEffect(() => {
    if (data?.data) {
      const transformed = data.data.map((campaign) => {
        const client = campaign.client_id;
        return {
          id: campaign._id,
          campaignName: campaign.name,
          clientName: client.internal_name,
          clientType: client.feed_bid_type,
          status: 'active', // You can pull from actual status field if present
          budgetCap: campaign.budget,
          advertiserName: client.advertiser_name,
          spend: campaign.budget, // Assuming budget = spend
          reconSpend: 430.0, // Placeholder
          reconNetSpend: 415.0, // Placeholder
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
          cpc: 3.0,
          cta: 30.0,
          startDate: campaign.start_date,
          frequency: client.budget?.frequency || '',
          country: client.country || 'N/A',
          markUpPercent: client.bid_margin?.markup?.value ?? 0,
          markUpPercentMode: client.bid_margin?.markup?.type ?? 'percentage',
          markDownPercent: client.bid_margin?.markdown?.value ?? 0,
          markDownPercentMode: client.bid_margin?.markdown?.type ?? 'percentage'
        };
      });
      setCampaignData(transformed);
    }
  }, [data]);

  // Handle field updates - updates the actual data
  const handleFieldUpdate = (id, field, value) => {
    // Update local state
    setCampaignData((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

    // Here you would typically make an API call to update the data
    console.log(`Updating ${field} for ID ${id} to ${value}`);
    toast.success(`${field} updated successfully`);
  };

  // Add budget update handler
  const handleBudgetUpdate = () => {
    if (selected.length === 0) {
      toast.error('Please select campaigns to update budget settings');
      return;
    }

    if (!budgetSettings.pacing || !budgetSettings.threshold || !budgetSettings.budgetTarget || !budgetSettings.frequency) {
      toast.error('Please fill in all budget fields');
      return;
    }

    // Update selected campaigns with new budget settings
    const updatedData = campaignData.map((item) =>
      selected.includes(item.id)
        ? {
            ...item,
            budgetCap: parseFloat(budgetSettings.budgetTarget),
            frequency: budgetSettings.frequency,
            // Add pacing and threshold to the data model if needed
            pacing: budgetSettings.pacing,
            threshold: parseFloat(budgetSettings.threshold)
          }
        : item
    );

    setCampaignData(updatedData);
    toast.success(`Budget settings updated for ${selected.length} campaign(s)`);

    // Reset and close popup but keep selection
    setBudgetSettings({
      pacing: '',
      threshold: '',
      budgetTarget: '',
      frequency: ''
    });
    setBudgetPopupOpen(false);
    // Don't clear selection: setSelected([]);
  };

  // Update margin action handler
  const handleMarginAction = (selectedMarginType) => {
    if (!selectedMarginType) return;

    if (selected.length === 0) {
      toast.error('Please select campaigns to update margin settings');
      return;
    }

    // Set the margin type and pre-fill the popup
    setMarginType(selectedMarginType);
    setMarginMode('percentage'); // Default to percentage

    if (selectedMarginType === 'markup') {
      setMarginSettings({
        markUpPercent: '',
        markUpValue: '',
        markDownPercent: '',
        markDownValue: '',
        applyToAll: false
      });
    } else if (selectedMarginType === 'markdown') {
      setMarginSettings({
        markUpPercent: '',
        markUpValue: '',
        markDownPercent: '',
        markDownValue: '',
        applyToAll: false
      });
    }

    setMarginPopupOpen(true);
  };

  // Update margin update handler
  const handleMarginUpdate = () => {
    if (selected.length === 0) {
      toast.error('Please select campaigns to update margin settings');
      return;
    }

    // Validate based on margin type and mode
    if (marginType === 'markup') {
      if (marginMode === 'percentage' && !marginSettings.markUpPercent) {
        toast.error('Please enter mark up percentage');
        return;
      }
      if (marginMode === 'value' && !marginSettings.markUpValue) {
        toast.error('Please enter mark up value');
        return;
      }
    }

    if (marginType === 'markdown') {
      if (marginMode === 'percentage' && !marginSettings.markDownPercent) {
        toast.error('Please enter mark down percentage');
        return;
      }
      if (marginMode === 'value' && !marginSettings.markDownValue) {
        toast.error('Please enter mark down value');
        return;
      }
    }

    // Update selected campaigns with new margin settings
    const updatedData = campaignData.map((item) => {
      if (selected.includes(item.id)) {
        const updates = {};

        if (marginType === 'markup') {
          if (marginMode === 'percentage' && marginSettings.markUpPercent) {
            updates.markUpPercent = parseFloat(marginSettings.markUpPercent);
            updates.markUpValue = 0; // Clear the other field
          } else if (marginMode === 'value' && marginSettings.markUpValue) {
            updates.markUpValue = parseFloat(marginSettings.markUpValue);
            updates.markUpPercent = 0; // Clear the other field
          }
        }

        if (marginType === 'markdown') {
          if (marginMode === 'percentage' && marginSettings.markDownPercent) {
            updates.markDownPercent = parseFloat(marginSettings.markDownPercent);
            updates.markDownValue = 0; // Clear the other field
          } else if (marginMode === 'value' && marginSettings.markDownValue) {
            updates.markDownValue = parseFloat(marginSettings.markDownValue);
            updates.markDownPercent = 0; // Clear the other field
          }
        }

        return { ...item, ...updates };
      }
      return item;
    });

    setCampaignData(updatedData);
    const fieldName = marginType === 'markup' ? 'mark up' : 'mark down';
    const modeText = marginMode === 'percentage' ? 'percentage' : 'value';
    toast.success(`${fieldName} ${modeText} settings updated for ${selected.length} campaign(s)`);

    // Reset and close popup but keep selection
    setMarginSettings({
      markUpPercent: '',
      markUpValue: '',
      markDownPercent: '',
      markDownValue: '',
      applyToAll: false
    });
    setMarginType('');
    setMarginMode('percentage');
    setMarginPopupOpen(false);
    // Don't clear selection: setSelected([]);
  };

  // Handle margin field updates with mode
  const handleMarginFieldUpdate = (id, fieldName, value, mode) => {
    setCampaignData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              [fieldName]: parseFloat(value) || 0,
              [`${fieldName}Mode`]: mode
            }
          : item
      )
    );
    toast.success('Margin setting updated successfully');
  };

  const columns = [
    {
      id: 'status',
      label: 'Status',
      type: 'statusDot',
      sortable: false,
      editable: true,
      editType: 'select',
      width: 80, // Add this to make the column smaller
      minWidth: 60, // Add this to set minimum width
      editOptions: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'paused', label: 'Paused' }
      ],
      onUpdate: (id, value) => handleFieldUpdate(id, 'status', value),
      getStatusColor: (status) => {
        switch (status) {
          case 'active':
            return '#4caf50';
          case 'inactive':
            return '#f44336';
          case 'paused':
            return '#ff9800';
          default:
            return '#9e9e9e';
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
                case 'active':
                  return '#4caf50';
                case 'inactive':
                  return '#f44336';
                case 'paused':
                  return '#ff9800';
                default:
                  return '#9e9e9e';
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
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click event
            navigate('/campaigns/job-group');
          }}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = 'none')}
        >
          {value}
        </span>
      )
    },
    {
      id: 'clientName',
      label: 'Client Name',
      disablePadding: false,
      editable: true,
      type: 'editableText',
      onUpdate: (id, value) => handleFieldUpdate(id, 'clientName', value)
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
      customEditHandler: (row, columnId) => setBudgetPopupOpen(true)
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
      label: 'Mark Up',
      numeric: true,
      type: 'editableMargin',
      editable: true,
      onUpdate: (id, value, mode) => handleMarginFieldUpdate(id, 'markUpPercent', value, mode)
    },
    {
      id: 'markDownPercent',
      label: 'Mark Down',
      numeric: true,
      type: 'editableMargin',
      editable: true,
      onUpdate: (id, value, mode) => handleMarginFieldUpdate(id, 'markDownPercent', value, mode)
    }
  ];

  // Generate column options for the dropdown (exclude default columns from options)
  const columnOptions = columns
    .filter((column) => !defaultColumns.includes(column.id))
    .map((column) => ({
      value: column.id,
      label: column.label || 'Status'
    }));

  // Handle multiselect column changes
  const handleColumnSelectionChange = (selectedValues) => {
    // Always include default columns and add selected additional columns
    const newVisibleColumns = [...defaultColumns, ...selectedValues];
    // Remove duplicates
    const uniqueColumns = [...new Set(newVisibleColumns)];
    setVisibleColumns(uniqueColumns);
  };

  // Define row actions for the More menu
  const rowActions = [
    {
      label: 'View Client Stats',
      onClick: (row) => {
        navigate('/', { state: { campaignId: row.id } });
      }
    },
    {
      label: 'View Job Groups',
      onClick: (row) => {
        navigate('/campaigns/job-group', { state: { campaignId: row.id } });
      }
    },
    {
      label: 'View Publishers',
      onClick: (row) => {
        navigate('/campaigns/job-group/publishers', { state: { campaignId: row.id } });
      }
    }
  ];

  // Update the handleActionChange function to match ClientTable functionality
  const handleActionChange = (action) => {
    if (!action) return;

    switch (action) {
      case 'edit':
        if (selected.length === 1) {
          const selectedItem = campaignData.find((item) => item.id === selected[0]);
          navigate(`/campaigns/edit-campaign/${selectedItem.id}`, {
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
          const updatedData = campaignData.map((item) => (selected.includes(item.id) ? { ...item, status: 'active' } : item));
          setCampaignData(updatedData);
          toast.success(`${selected.length} campaign(s) enabled successfully`);
          // Don't clear selection for status changes
        }
        break;

      case 'pause':
        if (selected.length === 0) {
          toast.error('Please select campaigns to pause');
        } else {
          const updatedData = campaignData.map((item) => (selected.includes(item.id) ? { ...item, status: 'paused' } : item));
          setCampaignData(updatedData);
          toast.success(`${selected.length} campaign(s) paused successfully`);
          // Don't clear selection for status changes
        }
        break;

      case 'deactivate':
        if (selected.length === 0) {
          toast.error('Please select campaigns to deactivate');
        } else {
          const updatedData = campaignData.map((item) => (selected.includes(item.id) ? { ...item, status: 'inactive' } : item));
          setCampaignData(updatedData);
          toast.success(`${selected.length} campaign(s) deactivated successfully`);
          // Don't clear selection for status changes
        }
        break;

      case 'clone':
        if (selected.length === 0) {
          toast.error('Please select campaigns to clone');
        } else {
          const itemsToClone = campaignData.filter((item) => selected.includes(item.id));
          const maxId = Math.max(...campaignData.map((d) => d.id));

          const clonedItems = itemsToClone.map((item, index) => ({
            ...item,
            id: maxId + index + 1, // Generate unique IDs
            campaignName: `${item.campaignName} (Clone)`,
            status: 'inactive' // Set cloned items to inactive by default
          }));

          setCampaignData((prev) => [...prev, ...clonedItems]);
          toast.success(`${selected.length} campaign(s) cloned successfully`);
          // Keep the original selection intact for further actions
        }
        break;

      case 'delete':
        if (selected.length === 0) {
          toast.error('Please select campaigns to delete');
        } else {
          setConfirmDialog({
            open: true,
            title: 'Confirm Delete',
            message: `Are you sure you want to delete ${selected.length} campaign(s)? This action cannot be undone.`,
            onConfirm: async () => {
              try {
                // Send DELETE requests for each selected ID
                await Promise.all(selected.map((id) => axiosServices.delete(`${import.meta.env.VITE_APP_API_URL}/campaigns/${id}`)));

                // Update frontend data after success
                const updatedData = campaignData.filter((item) => !selected.includes(item.id));
                setCampaignData(updatedData);
                toast.success(`${selected.length} campaign(s) deleted successfully`);
              } catch (error) {
                console.error('Error deleting campaigns:', error);
                toast.error('Failed to delete one or more campaigns');
              } finally {
                setSelected([]); // Clear selected rows
                setConfirmDialog({
                  open: false,
                  title: '',
                  message: '',
                  onConfirm: null
                });
              }
            }
          });
        }
        break;

      case 'duplicate':
        if (selected.length === 0) {
          toast.error('Please select campaigns to duplicate');
        } else {
          const itemsToDuplicate = campaignData.filter((item) => selected.includes(item.id));
          const maxId = Math.max(...campaignData.map((d) => d.id));

          const duplicatedItems = itemsToDuplicate.map((item, index) => ({
            ...item,
            id: maxId + index + 1, // Generate unique IDs
            campaignName: `${item.campaignName} (Copy)`,
            status: 'inactive' // Set duplicated items to inactive by default
          }));

          setCampaignData((prev) => [...prev, ...duplicatedItems]);
          toast.success(`${selected.length} campaign(s) duplicated successfully`);
          // Keep the original selection intact for further actions
        }
        break;

      default:
        toast.error('Unknown action selected');
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
            { value: 'duplicate', label: 'Duplicate' }
          ],
          onChange: handleActionChange
        },
        {
          type: 'select',
          key: 'margin',
          placeholder: 'Margin',
          minWidth: 120,
          options: [
            { value: 'markup', label: 'Mark Up' },
            { value: 'markdown', label: 'Mark Down' }
          ],
          onChange: handleMarginAction // Add this line
        },
        {
          type: 'button',
          label: 'Update Budget',
          variant: 'outlined',
          color: 'secondary',
          onClick: () => {
            if (selected.length === 0) {
              toast.error('Please select campaigns to update budget settings');
            } else {
              setBudgetPopupOpen(true);
            }
          }
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
          onClick: () => navigate(`/campaigns/add-campaign?clientId=${clientId}`)
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
          type: 'multiselect',
          key: 'columns',
          placeholder: 'Select Stats',
          minWidth: 160, // Increased width slightly
          options: columnOptions,
          onChange: handleColumnSelectionChange,
          selectedValues: visibleColumns.filter((col) => !defaultColumns.includes(col))
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

  // Filter columns based on visible columns selection
  const displayColumns = columns.filter((column) => visibleColumns.includes(column.id));

  const customFilter = (row, filters) => {
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
    <>
      <DynamicTable
        data={campaignData}
        columns={displayColumns}
        filterConfig={filterConfig}
        customFilter={customFilter}
        onRowSelect={handleRowSelect}
        searchEnabled={true}
        searchFields={['campaignName', 'clientName', 'clientType', 'advertiserName']}
        title="Campaigns"
        selectable={true}
        actionsEnabled={false}
        rowActions={rowActions} // Add the row actions
        recordsFoundText="Records Found"
      />

      {/* Budget Settings Popup */}
      <Dialog open={budgetPopupOpen} onClose={() => setBudgetPopupOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Update Budget Settings
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Updating budget settings for {selected.length} selected campaign(s)
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Pacing</InputLabel>
              <Select
                value={budgetSettings.pacing}
                label="Pacing"
                onChange={(e) => setBudgetSettings((prev) => ({ ...prev, pacing: e.target.value }))}
              >
                <MenuItem value="even">Even</MenuItem>
                <MenuItem value="aggressive">Aggressive</MenuItem>
                <MenuItem value="conservative">Conservative</MenuItem>
                <MenuItem value="frontloaded">Front-loaded</MenuItem>
                <MenuItem value="backloaded">Back-loaded</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Threshold (%)"
              type="number"
              value={budgetSettings.threshold}
              onChange={(e) => setBudgetSettings((prev) => ({ ...prev, threshold: e.target.value }))}
              helperText="Budget threshold percentage for alerts"
              inputProps={{ min: 0, max: 100, step: 0.1 }}
            />

            <TextField
              fullWidth
              label="Budget Target ($)"
              type="number"
              value={budgetSettings.budgetTarget}
              onChange={(e) => setBudgetSettings((prev) => ({ ...prev, budgetTarget: e.target.value }))}
              helperText="Total budget allocation for the campaign"
              inputProps={{ min: 0, step: 0.01 }}
            />

            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={budgetSettings.frequency}
                label="Frequency"
                onChange={(e) => setBudgetSettings((prev) => ({ ...prev, frequency: e.target.value }))}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setBudgetPopupOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleBudgetUpdate} variant="contained" color="primary">
            Update Budget Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Margin Settings Popup */}
      <Dialog
        open={marginPopupOpen}
        onClose={() => {
          setMarginPopupOpen(false);
          setMarginType('');
          setMarginMode('percentage');
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Update {marginType === 'markup' ? 'Mark Up' : 'Mark Down'} Settings
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Updating {marginType === 'markup' ? 'mark up' : 'mark down'} settings for {selected.length} selected campaign(s)
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Mode Selection */}
            <FormControl fullWidth>
              <InputLabel>Margin Mode</InputLabel>
              <Select value={marginMode} label="Margin Mode" onChange={(e) => setMarginMode(e.target.value)}>
                <MenuItem value="percentage">Percentage (%)</MenuItem>
                <MenuItem value="value">Value ($)</MenuItem>
              </Select>
            </FormControl>

            {/* Mark Up Fields */}
            {marginType === 'markup' && (
              <>
                {marginMode === 'percentage' && (
                  <TextField
                    fullWidth
                    label="Mark Up Percentage (%)"
                    type="number"
                    value={marginSettings.markUpPercent}
                    onChange={(e) => setMarginSettings((prev) => ({ ...prev, markUpPercent: e.target.value }))}
                    helperText="Percentage to mark up from base cost"
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                    autoFocus
                  />
                )}

                {marginMode === 'value' && (
                  <TextField
                    fullWidth
                    label="Mark Up Value ($)"
                    type="number"
                    value={marginSettings.markUpValue}
                    onChange={(e) => setMarginSettings((prev) => ({ ...prev, markUpValue: e.target.value }))}
                    helperText="Fixed dollar amount to mark up from base cost"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    inputProps={{ min: 0, step: 0.01 }}
                    autoFocus
                  />
                )}
              </>
            )}

            {/* Mark Down Fields */}
            {marginType === 'markdown' && (
              <>
                {marginMode === 'percentage' && (
                  <TextField
                    fullWidth
                    label="Mark Down Percentage (%)"
                    type="number"
                    value={marginSettings.markDownPercent}
                    onChange={(e) => setMarginSettings((prev) => ({ ...prev, markDownPercent: e.target.value }))}
                    helperText="Percentage to mark down from base cost"
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                    autoFocus
                  />
                )}

                {marginMode === 'value' && (
                  <TextField
                    fullWidth
                    label="Mark Down Value ($)"
                    type="number"
                    value={marginSettings.markDownValue}
                    onChange={(e) => setMarginSettings((prev) => ({ ...prev, markDownValue: e.target.value }))}
                    helperText="Fixed dollar amount to mark down from base cost"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    inputProps={{ min: 0, step: 0.01 }}
                    autoFocus
                  />
                )}
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setMarginPopupOpen(false);
              setMarginType('');
              setMarginMode('percentage');
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleMarginUpdate} variant="contained" color="primary">
            Update {marginType === 'markup' ? 'Mark Up' : 'Mark Down'} {marginMode === 'percentage' ? 'Percentage' : 'Value'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, title: '', message: '', onConfirm: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setConfirmDialog({ open: false, title: '', message: '', onConfirm: null })} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDialog.onConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CampaignsTable;
