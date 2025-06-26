import React, { useState } from 'react';
import { AddSquare, Filter } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../../../../tables/datatable';
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
    InputAdornment
} from '@mui/material';

const JobGroupTable = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    // Define default columns that should always be visible
    const defaultColumns = [
        'jobGroupName',
        'status',
        'budgetCap',
        'markup',
        'markdown',
        'spend',
        'clicks',
        'validClicks'
    ];

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

    const [clientData, setClientData] = useState([
        { 
            id: 1, 
            jobGroupName: '+12 CPA', 
            status: 'active', 
            budgetCap: 1000.00, 
            markup: 15.0, 
            markupMode: 'percentage',
            markdown: 5.0, 
            markdownMode: 'percentage',
            spend: 0.00, 
            reconSpend: 0.00, 
            clicks: 0, 
            validClicks: 0, 
            invalidClicks: 0 
        },
        { 
            id: 2, 
            jobGroupName: 'Tech Solutions Group', 
            status: 'inactive', 
            budgetCap: 2000.00, 
            markup: 0.50, 
            markupMode: 'value',
            markdown: 8.0, 
            markdownMode: 'percentage',
            spend: 850.00, 
            reconSpend: 840.00, 
            clicks: 120, 
            validClicks: 115, 
            invalidClicks: 5 
        },
        { 
            id: 3, 
            jobGroupName: 'Marketing Plus CPA', 
            status: 'active', 
            budgetCap: 1500.00, 
            markup: 18.0, 
            markupMode: 'percentage',
            markdown: 3.0, 
            markdownMode: 'percentage',
            spend: 800.00, 
            reconSpend: 790.00, 
            clicks: 200, 
            validClicks: 195, 
            invalidClicks: 5 
        },
        { 
            id: 4, 
            jobGroupName: 'Digital Agency CPC', 
            status: 'paused', 
            budgetCap: 5000.00, 
            markup: 25.0, 
            markupMode: 'percentage',
            markdown: 10.0, 
            markdownMode: 'percentage',
            spend: 2500.00, 
            reconSpend: 2480.00, 
            clicks: 500, 
            validClicks: 485, 
            invalidClicks: 15 
        },
        { 
            id: 5, 
            jobGroupName: 'Global Advisors', 
            status: 'active', 
            budgetCap: 3000.00, 
            markup: 12.0, 
            markupMode: 'percentage',
            markdown: 2.0, 
            markdownMode: 'percentage',
            spend: 1200.00, 
            reconSpend: 1180.00, 
            clicks: 300, 
            validClicks: 290, 
            invalidClicks: 10 
        },
        { 
            id: 6, 
            jobGroupName: 'Media Partners', 
            status: 'active', 
            budgetCap: 2500.00, 
            markup: 22.0, 
            markupMode: 'percentage',
            markdown: 7.0, 
            markdownMode: 'percentage',
            spend: 1800.00, 
            reconSpend: 1750.00, 
            clicks: 400, 
            validClicks: 390, 
            invalidClicks: 10 
        },
        { 
            id: 7, 
            jobGroupName: 'Creative Solutions', 
            status: 'paused', 
            budgetCap: 1800.00, 
            markup: 16.0, 
            markupMode: 'percentage',
            markdown: 4.0, 
            markdownMode: 'percentage',
            spend: 900.00, 
            reconSpend: 880.00, 
            clicks: 180, 
            validClicks: 175, 
            invalidClicks: 5 
        },
        { 
            id: 8, 
            jobGroupName: 'Data Insights', 
            status: 'inactive', 
            budgetCap: 2200.00, 
            markup: 14.0, 
            markupMode: 'percentage',
            markdown: 6.0, 
            markdownMode: 'percentage',
            spend: 0.00, 
            reconSpend: 0.00, 
            clicks: 0, 
            validClicks: 0, 
            invalidClicks: 0 
        },
    ]);

    // Handle field updates - now updates the actual data
    const handleFieldUpdate = (id, field, value) => {
        // Update local state
        setClientData(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        // Here you would typically make an API call to update the data
        console.log(`Updating ${field} for ID ${id} to ${value}`);
        toast.success(`${field} updated successfully`);
    };

    // Add budget update handler
    const handleBudgetUpdate = () => {
        if (selected.length === 0) {
            toast.error('Please select job groups to update budget settings');
            return;
        }

        if (!budgetSettings.pacing || !budgetSettings.threshold || !budgetSettings.budgetTarget || !budgetSettings.frequency) {
            toast.error('Please fill in all budget fields');
            return;
        }

        // Update selected job groups with new budget settings
        const updatedData = clientData.map(item =>
            selected.includes(item.id) ? {
                ...item,
                budgetCap: parseFloat(budgetSettings.budgetTarget),
                frequency: budgetSettings.frequency,
                // Add pacing and threshold to the data model if needed
                pacing: budgetSettings.pacing,
                threshold: parseFloat(budgetSettings.threshold)
            } : item
        );

        setClientData(updatedData);
        toast.success(`Budget settings updated for ${selected.length} job group(s)`);

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
            toast.error('Please select job groups to update margin settings');
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
            toast.error('Please select job groups to update margin settings');
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

        // Update selected job groups with new margin settings
        const updatedData = clientData.map(item => {
            if (selected.includes(item.id)) {
                const updates = {};
                
                if (marginType === 'markup') {
                    if (marginMode === 'percentage' && marginSettings.markUpPercent) {
                        updates.markup = parseFloat(marginSettings.markUpPercent);
                        updates.markupMode = 'percentage';
                    } else if (marginMode === 'value' && marginSettings.markUpValue) {
                        updates.markup = parseFloat(marginSettings.markUpValue);
                        updates.markupMode = 'value';
                    }
                }
                
                if (marginType === 'markdown') {
                    if (marginMode === 'percentage' && marginSettings.markDownPercent) {
                        updates.markdown = parseFloat(marginSettings.markDownPercent);
                        updates.markdownMode = 'percentage';
                    } else if (marginMode === 'value' && marginSettings.markDownValue) {
                        updates.markdown = parseFloat(marginSettings.markDownValue);
                        updates.markdownMode = 'value';
                    }
                }
                
                return { ...item, ...updates };
            }
            return item;
        });

        setClientData(updatedData);
        const fieldName = marginType === 'markup' ? 'mark up' : 'mark down';
        const modeText = marginMode === 'percentage' ? 'percentage' : 'value';
        toast.success(`${fieldName} ${modeText} settings updated for ${selected.length} job group(s)`);

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
        setClientData(prevData =>
            prevData.map(item =>
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
            width: 80,
            minWidth: 60,
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
            id: 'jobGroupName',
            label: 'Job Group Name',
            disablePadding: true,
            editable: true,
            type: 'editableText',
            onUpdate: (id, value) => handleFieldUpdate(id, 'jobGroupName', value),
            render: (value, row) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate('/campaigns/job-group/publishers');
                    }}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'none'}
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
            customEditHandler: (row, columnId) => setBudgetPopupOpen(true)
        },
        {
            id: 'markup',
            label: 'Mark Up',
            numeric: true,
            type: 'editableMargin',
            editable: true,
            onUpdate: (id, value, mode) => handleMarginFieldUpdate(id, 'markup', value, mode)
        },
        {
            id: 'markdown',
            label: 'Mark Down',
            numeric: true,
            type: 'editableMargin',
            editable: true,
            onUpdate: (id, value, mode) => handleMarginFieldUpdate(id, 'markdown', value, mode)
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

    // Generate column options for the dropdown (exclude default columns from options)
    const columnOptions = columns
        .filter(column => !defaultColumns.includes(column.id))
        .map(column => ({
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
            label: 'View Campaigns',
            onClick: (row) => {
                navigate('/campaigns', { state: { clientId: row.id } });
            }
        },
        {
            label: 'View Publishers',
            onClick: (row) => {
                navigate('/campaigns/job-group/publishers', { state: { jobGroupId: row.id } });
            }
        }
    ];

    // Update the handleActionChange function to match ClientTable
    const handleActionChange = (action) => {
        if (!action) return;

        switch (action) {
            case 'edit':
                if (selected.length === 1) {
                    const selectedItem = clientData.find(item => item.id === selected[0]);
                    navigate(`/campaigns/job-group/job-group-form`, {
                        state: { jobGroup: selectedItem, mode: 'edit' }
                    });
                } else if (selected.length === 0) {
                    toast.error('Please select a job group to edit');
                } else {
                    toast.error('Please select only one job group to edit');
                }
                break;

            case 'enable':
                if (selected.length === 0) {
                    toast.error('Please select job groups to enable');
                } else {
                    const updatedData = clientData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'active' } : item
                    );
                    setClientData(updatedData);
                    toast.success(`${selected.length} job group(s) enabled successfully`);
                    // Don't clear selection for status changes
                }
                break;

            case 'pause':
                if (selected.length === 0) {
                    toast.error('Please select job groups to pause');
                } else {
                    const updatedData = clientData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'paused' } : item
                    );
                    setClientData(updatedData);
                    toast.success(`${selected.length} job group(s) paused successfully`);
                    // Don't clear selection for status changes
                }
                break;

            case 'deactivate':
                if (selected.length === 0) {
                    toast.error('Please select job groups to deactivate');
                } else {
                    const updatedData = clientData.map(item =>
                        selected.includes(item.id) ? { ...item, status: 'inactive' } : item
                    );
                    setClientData(updatedData);
                    toast.success(`${selected.length} job group(s) deactivated successfully`);
                    // Don't clear selection for status changes
                }
                break;

            case 'clone':
                if (selected.length === 0) {
                    toast.error('Please select job groups to clone');
                } else {
                    const itemsToClone = clientData.filter(item => selected.includes(item.id));
                    const maxId = Math.max(...clientData.map(d => d.id));
                    
                    const clonedItems = itemsToClone.map((item, index) => ({
                        ...item,
                        id: maxId + index + 1,
                        jobGroupName: `${item.jobGroupName} (Clone)`,
                        status: 'inactive'
                    }));
                    
                    setClientData(prev => [...prev, ...clonedItems]);
                    toast.success(`${selected.length} job group(s) cloned successfully`);
                    // Keep the original selection intact for further actions
                }
                break;

            case 'delete':
                if (selected.length === 0) {
                    toast.error('Please select job groups to delete');
                } else {
                    setConfirmDialog({
                        open: true,
                        title: 'Confirm Delete',
                        message: `Are you sure you want to delete ${selected.length} job group(s)? This action cannot be undone.`,
                        onConfirm: () => {
                            const updatedData = clientData.filter((item) => !selected.includes(item.id));
                            setClientData(updatedData);
                            toast.success(`${selected.length} job group(s) deleted successfully`);
                            setSelected([]); // Only clear selection after deletion since items are removed
                            setConfirmDialog({ open: false, title: '', message: '', onConfirm: null });
                        }
                    });
                }
                break;

            case 'duplicate':
                if (selected.length === 0) {
                    toast.error('Please select job groups to duplicate');
                } else {
                    const itemsToDuplicate = clientData.filter(item => selected.includes(item.id));
                    const maxId = Math.max(...clientData.map(d => d.id));
                    
                    const duplicatedItems = itemsToDuplicate.map((item, index) => ({
                        ...item,
                        id: maxId + index + 1,
                        jobGroupName: `${item.jobGroupName} (Copy)`,
                        status: 'inactive'
                    }));
                    
                    setClientData(prev => [...prev, ...duplicatedItems]);
                    toast.success(`${selected.length} job group(s) duplicated successfully`);
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
                    onChange: handleMarginAction
                },
                {
                    type: 'button',
                    label: 'Update Budget',
                    variant: 'outlined',
                    color: 'secondary',
                    onClick: () => {
                        if (selected.length === 0) {
                            toast.error('Please select job groups to update budget settings');
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
                    defaultValue: '01-01-2000 to 01-01-2020'
                },
                {
                    type: 'button',
                    label: 'Add Job Group',
                    icon: <AddSquare size="20" />,
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => navigate('/campaigns/job-group/job-group-form')
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
                    placeholder: 'Search job groups...',
                    minWidth: 200
                }
            ],
            rightFilters: [
                {
                    type: 'multiselect',
                    key: 'columns',
                    placeholder: 'Select Stats',
                    minWidth: 140,
                    options: columnOptions,
                    onChange: handleColumnSelectionChange,
                    selectedValues: visibleColumns.filter(col => !defaultColumns.includes(col))
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
    const displayColumns = columns.filter(column => visibleColumns.includes(column.id));

    const customFilter = (row, filters) => {
        // Status filter
        if (filters.status && row.status !== filters.status) {
            return false;
        }

        // Margin filter
        if (filters.margin) {
            if (filters.margin === 'markup') {
                if (row.markup <= 0) return false;
            } else if (filters.margin === 'markdown') {
                if (row.markdown <= 0) return false;
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
                data={clientData}
                columns={displayColumns}
                filterConfig={filterConfig}
                customFilter={customFilter}
                onRowSelect={handleRowSelect}
                searchEnabled={true}
                searchFields={['jobGroupName']}
                title="Job Groups"
                selectable={true}
                actionsEnabled={false}
                rowActions={rowActions}
                recordsFoundText="Records Found"
            />

            {/* Budget Settings Popup */}
            <Dialog
                open={budgetPopupOpen}
                onClose={() => setBudgetPopupOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Update Budget Settings
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Updating budget settings for {selected.length} selected job group(s)
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Pacing</InputLabel>
                            <Select
                                value={budgetSettings.pacing}
                                label="Pacing"
                                onChange={(e) => setBudgetSettings(prev => ({ ...prev, pacing: e.target.value }))}
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
                            onChange={(e) => setBudgetSettings(prev => ({ ...prev, threshold: e.target.value }))}
                            helperText="Budget threshold percentage for alerts"
                            inputProps={{ min: 0, max: 100, step: 0.1 }}
                        />

                        <TextField
                            fullWidth
                            label="Budget Target ($)"
                            type="number"
                            value={budgetSettings.budgetTarget}
                            onChange={(e) => setBudgetSettings(prev => ({ ...prev, budgetTarget: e.target.value }))}
                            helperText="Total budget allocation for the job group"
                            inputProps={{ min: 0, step: 0.01 }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Frequency</InputLabel>
                            <Select
                                value={budgetSettings.frequency}
                                label="Frequency"
                                onChange={(e) => setBudgetSettings(prev => ({ ...prev, frequency: e.target.value }))}
                            >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="bi-weekly">Bi-weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="quarterly">Quarterly</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setBudgetPopupOpen(false)}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBudgetUpdate}
                        variant="contained"
                        color="primary"
                    >
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
                        Updating {marginType === 'markup' ? 'mark up' : 'mark down'} settings for {selected.length} selected job group(s)
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        {/* Mode Selection */}
                        <FormControl fullWidth>
                            <InputLabel>Margin Mode</InputLabel>
                            <Select
                                value={marginMode}
                                label="Margin Mode"
                                onChange={(e) => setMarginMode(e.target.value)}
                            >
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
                                        onChange={(e) => setMarginSettings(prev => ({ ...prev, markUpPercent: e.target.value }))}
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
                                        onChange={(e) => setMarginSettings(prev => ({ ...prev, markUpValue: e.target.value }))}
                                        helperText="Fixed dollar amount to mark up from base cost"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                                        onChange={(e) => setMarginSettings(prev => ({ ...prev, markDownPercent: e.target.value }))}
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
                                        onChange={(e) => setMarginSettings(prev => ({ ...prev, markDownValue: e.target.value }))}
                                        helperText="Fixed dollar amount to mark down from base cost"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                    <Button
                        onClick={handleMarginUpdate}
                        variant="contained"
                        color="primary"
                    >
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
                    <DialogContentText>
                        {confirmDialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setConfirmDialog({ open: false, title: '', message: '', onConfirm: null })}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDialog.onConfirm}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default JobGroupTable;