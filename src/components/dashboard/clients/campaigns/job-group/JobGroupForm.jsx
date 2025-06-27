import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Chip,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
} from '@mui/material';
import { ArrowLeft2, AddSquare, Calendar, Edit, Trash, Add } from 'iconsax-react';
import { useNavigate } from 'react-router';

// Import the DynamicTable component (assuming it's available)
// For this example, I'll create a simplified table component
const JobTable = ({ data, onSelectionChange }) => {
  const [selected, setSelected] = useState([]);
  const [tableData, setTableData] = useState(data);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = tableData.map((_, index) => index);
      setSelected(allIds);
      onSelectionChange(allIds);
    } else {
      setSelected([]);
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = selected.includes(index) 
      ? selected.filter(id => id !== index)
      : [...selected, index];
    setSelected(newSelected);
    onSelectionChange(newSelected);
  };

  const handleCellEdit = (rowIndex, field, value) => {
    const updatedData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setTableData(updatedData);
  };

  const EditableCell = ({ value, onSave, type = 'text', placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onSave(editValue);
      setIsEditing(false);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        setEditValue(value);
        setIsEditing(false);
      }
    };

    if (isEditing) {
      return (
        <TextField
          size="small"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
          sx={{ width: '100px' }}
          type={type}
          InputProps={{
            endAdornment: type === 'percentage' ? <InputAdornment position="end">%</InputAdornment> : 
                         type === 'currency' ? <InputAdornment position="end">USD</InputAdornment> : null
          }}
        />
      );
    }

    return (
      <Box
        onClick={() => setIsEditing(true)}
        sx={{
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography variant="body2">
          {type === 'currency' ? `$${value}` : 
           type === 'percentage' ? `${value}%` : 
           value || placeholder}
        </Typography>
        <Edit size="14" color="#666" />
      </Box>
    );
  };

  return (
    <Paper sx={{ mt: 3 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <Checkbox
                  checked={selected.length === tableData.length && tableData.length > 0}
                  indeterminate={selected.length > 0 && selected.length < tableData.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Publisher Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Budget</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Bid</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Mark Up (%)</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Mark Down (%)</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Minimum Bid</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 16px' }}>
                  <Checkbox
                    checked={selected.includes(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>{row.publisherName}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Chip label={row.type} size="small" sx={{ backgroundColor: '#e1f5fe', color: '#0277bd' }} />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <EditableCell
                    value={row.budget}
                    onSave={(value) => handleCellEdit(index, 'budget', value)}
                    type="currency"
                    placeholder="0.00"
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <EditableCell
                    value={row.bid}
                    onSave={(value) => handleCellEdit(index, 'bid', value)}
                    type="currency"
                    placeholder="0.00"
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <EditableCell
                    value={row.markUp}
                    onSave={(value) => handleCellEdit(index, 'markUp', value)}
                    type="percentage"
                    placeholder="0.0"
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <EditableCell
                    value={row.markDown}
                    onSave={(value) => handleCellEdit(index, 'markDown', value)}
                    type="percentage"
                    placeholder="0.0"
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>{row.minimumBid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};

const JobGroupForm = () => {
  const navigate = useNavigate();

  // Enhanced form state with filter rules
  const [formData, setFormData] = useState({
    jobGroupName: '',
    jobGroupType: '',
    startDate: '',
    endDate: ''
  });

  // Filter rules state
  const [filterRules, setFilterRules] = useState([
    {
      id: 1,
      build: '',
      operator: '',
      value: '',
      logicalOperator: 'AND' // AND, OR
    }
  ]);

  const [totalJobCount, setTotalJobCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Rule options state
  const [ruleOptions, setRuleOptions] = useState({
    convertToCPC: false,
    expansionEnable: false,
    appliesCap: false,
    scheduleOnCertainDays: false,
    limitNumberOfJobs: false
  });

  // Budget options state
  const [budgetType, setBudgetType] = useState('budgetCap');
  const [frequency, setFrequency] = useState('');
  const [target, setTarget] = useState('');
  const [threshold, setThreshold] = useState('');
  const [frequencyEnabled, setFrequencyEnabled] = useState(false);

  // Sample table data - this would come from API
  const [allJobs] = useState([
    { id: 1, publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '100.00', bid: '2.50', markUp: '15.0', markDown: '5.0', minimumBid: '1.00 USD', country: 'US', category: 'Finance' },
    { id: 2, publisherName: 'ELJ-Europe-EUR-CPC', type: 'CPC', budget: '200.00', bid: '3.00', markUp: '20.0', markDown: '3.0', minimumBid: '1.50 USD', country: 'DE', category: 'Tech' },
    { id: 3, publisherName: 'ELJ-Asia-USD-CPA', type: 'CPA', budget: '150.00', bid: '2.75', markUp: '12.5', markDown: '4.0', minimumBid: '1.25 USD', country: 'JP', category: 'Finance' },
    { id: 4, publisherName: 'ELJ-UK-GBP-CPC', type: 'CPC', budget: '300.00', bid: '4.00', markUp: '25.0', markDown: '7.0', minimumBid: '2.00 USD', country: 'UK', category: 'Healthcare' },
    { id: 5, publisherName: 'ELJ-Canada-CAD-CPA', type: 'CPA', budget: '175.00', bid: '2.25', markUp: '18.0', markDown: '6.0', minimumBid: '1.10 USD', country: 'CA', category: 'Education' },
    { id: 6, publisherName: 'ELJ-Australia-AUD-CPC', type: 'CPC', budget: '250.00', bid: '3.50', markUp: '22.0', markDown: '4.5', minimumBid: '1.75 USD', country: 'AU', category: 'Tech' },
    { id: 7, publisherName: 'ELJ-Brazil-BRL-CPA', type: 'CPA', budget: '120.00', bid: '2.00', markUp: '10.0', markDown: '2.5', minimumBid: '0.90 USD', country: 'BR', category: 'Finance' },
    { id: 8, publisherName: 'ELJ-India-INR-CPC', type: 'CPC', budget: '400.00', bid: '5.00', markUp: '30.0', markDown: '8.0', minimumBid: '2.50 USD', country: 'IN', category: 'Education' }
  ]);

  // Build options for dropdown
  const buildOptions = [
    { value: 'publisherName', label: 'Publisher Name' },
    { value: 'type', label: 'Type' },
    { value: 'budget', label: 'Budget' },
    { value: 'bid', label: 'Bid' },
    { value: 'country', label: 'Country' },
    { value: 'category', label: 'Category' }
  ];

  // Operator options
  const operatorOptions = [
    { value: 'equal', label: 'Equal' },
    { value: 'notEqual', label: 'Not Equal' },
    { value: 'moreThan', label: 'More than' },
    { value: 'lessThan', label: 'Less than' },
    { value: 'between', label: 'Between' },
    { value: 'contains', label: 'Contains' },
    { value: 'notContains', label: 'Not Contains' },
    { value: 'beginsWith', label: 'Begins with' },
    { value: 'notBeginsWith', label: 'Not begins with' },
    { value: 'moreThanOrEqual', label: 'More than or Equal to' },
    { value: 'lessThanOrEqual', label: 'Less than or Equal to' }
  ];

  // Function to evaluate a single rule
  const evaluateRule = (job, rule) => {
    if (!rule.build || !rule.operator || rule.value === '') return true;

    const jobValue = job[rule.build];
    const ruleValue = rule.value;

    switch (rule.operator) {
      case 'equal':
        return jobValue?.toString().toLowerCase() === ruleValue.toLowerCase();
      case 'notEqual':
        return jobValue?.toString().toLowerCase() !== ruleValue.toLowerCase();
      case 'moreThan':
        return parseFloat(jobValue) > parseFloat(ruleValue);
      case 'lessThan':
        return parseFloat(jobValue) < parseFloat(ruleValue);
      case 'moreThanOrEqual':
        return parseFloat(jobValue) >= parseFloat(ruleValue);
      case 'lessThanOrEqual':
        return parseFloat(jobValue) <= parseFloat(ruleValue);
      case 'contains':
        return jobValue?.toString().toLowerCase().includes(ruleValue.toLowerCase());
      case 'notContains':
        return !jobValue?.toString().toLowerCase().includes(ruleValue.toLowerCase());
      case 'beginsWith':
        return jobValue?.toString().toLowerCase().startsWith(ruleValue.toLowerCase());
      case 'notBeginsWith':
        return !jobValue?.toString().toLowerCase().startsWith(ruleValue.toLowerCase());
      case 'between':
        const [min, max] = ruleValue.split(',').map(v => parseFloat(v.trim()));
        const numValue = parseFloat(jobValue);
        return numValue >= min && numValue <= max;
      default:
        return true;
    }
  };

  // Function to apply all filter rules
  const applyFilterRules = () => {
    if (filterRules.length === 0 || filterRules.every(rule => !rule.build)) {
      setFilteredJobs(allJobs);
      setTotalJobCount(allJobs.length);
      return;
    }

    const filtered = allJobs.filter(job => {
      let result = true;
      let currentResult = true;

      for (let i = 0; i < filterRules.length; i++) {
        const rule = filterRules[i];
        const ruleResult = evaluateRule(job, rule);

        if (i === 0) {
          result = ruleResult;
        } else {
          const prevRule = filterRules[i - 1];
          if (prevRule.logicalOperator === 'AND') {
            result = result && ruleResult;
          } else if (prevRule.logicalOperator === 'OR') {
            result = result || ruleResult;
          }
        }
      }

      return result;
    });

    setFilteredJobs(filtered);
    setTotalJobCount(filtered.length);
  };

  // Handle filter rule changes
  const handleFilterRuleChange = (index, field, value) => {
    const updatedRules = filterRules.map((rule, i) => {
      if (i === index) {
        return { ...rule, [field]: value };
      }
      return rule;
    });
    setFilterRules(updatedRules);
  };

  // Add new filter rule
  const handleAddRule = () => {
    const newRule = {
      id: Date.now(),
      build: '',
      operator: '',
      value: '',
      logicalOperator: 'AND'
    };
    setFilterRules([...filterRules, newRule]);
  };

  // Remove filter rule
  const handleRemoveRule = (index) => {
    if (filterRules.length > 1) {
      const updatedRules = filterRules.filter((_, i) => i !== index);
      setFilterRules(updatedRules);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRuleOptionChange = (option, checked) => {
    setRuleOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyFilters = () => {
    applyFilterRules();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      jobGroupName: '',
      jobGroupType: '',
      startDate: '',
      endDate: ''
    });
    setFilterRules([{
      id: 1,
      build: '',
      operator: '',
      value: '',
      logicalOperator: 'AND'
    }]);
    setRuleOptions({
      convertToCPC: false,
      expansionEnable: false,
      appliesCap: false,
      scheduleOnCertainDays: false,
      limitNumberOfJobs: false
    });
    setFilteredJobs([]);
    setTotalJobCount(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { 
      formData, 
      filterRules, 
      ruleOptions, 
      selectedRows,
      filteredJobs: filteredJobs.length 
    });
    navigate(-1);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleBack}
        >
          <ArrowLeft2 size="20" color="#000" />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            Add Job Group
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Job Filters Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Job Filters
          </Typography>
          
          {filterRules.map((rule, index) => (
            <Box key={rule.id}>
              {index > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select
                      value={filterRules[index - 1].logicalOperator}
                      onChange={(e) => handleFilterRuleChange(index - 1, 'logicalOperator', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="AND">AND</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                    </Select>
                  </FormControl>
                  <Divider sx={{ flexGrow: 1, mx: 2 }} />
                </Box>
              )}
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Build</InputLabel>
                    <Select
                      value={rule.build}
                      onChange={(e) => handleFilterRuleChange(index, 'build', e.target.value)}
                      label="Build"
                    >
                      <MenuItem value="">Select field</MenuItem>
                      {buildOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={rule.operator}
                      onChange={(e) => handleFilterRuleChange(index, 'operator', e.target.value)}
                      label="Operator"
                    >
                      <MenuItem value="">Select operator</MenuItem>
                      {operatorOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Value"
                    placeholder={rule.operator === 'between' ? 'min,max (e.g., 10,50)' : 'Enter value'}
                    value={rule.value}
                    onChange={(e) => handleFilterRuleChange(index, 'value', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={2}>
                  {filterRules.length > 1 && (
                    <IconButton 
                      onClick={() => handleRemoveRule(index)}
                      color="error"
                      size="small"
                    >
                      <Trash size="20" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total Job Count: {totalJobCount}
              </Typography>
              {filteredJobs.length > 0 && filteredJobs.length < allJobs.length && (
                <Chip 
                  label={`${filteredJobs.length} of ${allJobs.length} jobs match`} 
                  size="small" 
                  color="primary" 
                />
              )}
            </Box>
            <Box>
              <Button
                variant="outlined"
                startIcon={<Add size="20" />}
                onClick={handleAddRule}
                sx={{ mr: 2, textTransform: 'none' }}
              >
                Add Rule
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                sx={{ 
                  backgroundColor: '#000', 
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#333' }
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>

          {/* Filter Summary */}
          {filterRules.some(rule => rule.build) && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Active Filters:</strong> {
                  filterRules
                    .filter(rule => rule.build)
                    .map((rule, index) => {
                      const buildLabel = buildOptions.find(opt => opt.value === rule.build)?.label || rule.build;
                      const operatorLabel = operatorOptions.find(opt => opt.value === rule.operator)?.label || rule.operator;
                      const prefix = index > 0 ? ` ${filterRules[index - 1].logicalOperator} ` : '';
                      return `${prefix}${buildLabel} ${operatorLabel} "${rule.value}"`;
                    })
                    .join('')
                }
              </Typography>
            </Alert>
          )}
        </Paper>

        {/* Job Group Details */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Job Group Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="eg. 00.00"
                value={formData.jobGroupName}
                onChange={(e) => handleInputChange('jobGroupName', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="text.secondary">USD</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Job Group Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.jobGroupType}
                  onChange={(e) => handleInputChange('jobGroupType', e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">eg. 00.00</MenuItem>
                  <MenuItem value="type1">Type 1</MenuItem>
                  <MenuItem value="type2">Type 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Start Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                End Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Rules Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={4}>
            {/* Left Column - Checkboxes */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleOptions.convertToCPC}
                      onChange={(e) => handleRuleOptionChange('convertToCPC', e.target.checked)}
                    />
                  }
                  label="Convert to CPC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleOptions.expansionEnable}
                      onChange={(e) => handleRuleOptionChange('expansionEnable', e.target.checked)}
                    />
                  }
                  label="Expansion Enable"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleOptions.appliesCap}
                      onChange={(e) => handleRuleOptionChange('appliesCap', e.target.checked)}
                    />
                  }
                  label="Applies Cap at Job Level"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleOptions.scheduleOnCertainDays}
                      onChange={(e) => handleRuleOptionChange('scheduleOnCertainDays', e.target.checked)}
                    />
                  }
                  label="Schedule on Certain Days"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleOptions.limitNumberOfJobs}
                      onChange={(e) => handleRuleOptionChange('limitNumberOfJobs', e.target.checked)}
                    />
                  }
                  label="Limit Number of Jobs Send to Publisher"
                />
              </Box>
            </Grid>

            {/* Right Column - Radio buttons and inputs */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={budgetType}
                    onChange={(e) => setBudgetType(e.target.value)}
                  >
                    <FormControlLabel value="budgetCap" control={<Radio />} label="Budget Cap" />
                    <FormControlLabel value="clickCap" control={<Radio />} label="Click Cap" />
                    <FormControlLabel value="appliedCap" control={<Radio />} label="Applied Cap" />
                  </RadioGroup>
                </FormControl>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Frequency</Typography>
                    <Switch
                      checked={frequencyEnabled}
                      onChange={(e) => setFrequencyEnabled(e.target.checked)}
                      size="small"
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Threshold %"
                        value={threshold}
                        onChange={(e) => setThreshold(e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Job Table - now uses filtered data */}
        <JobTable 
          data={filteredJobs.length > 0 ? filteredJobs : allJobs} 
          onSelectionChange={setSelectedRows}
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{ 
              textTransform: 'none',
              borderColor: '#ff4757',
              color: '#ff4757',
              '&:hover': {
                borderColor: '#ff4757',
                backgroundColor: 'rgba(255, 71, 87, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default JobGroupForm;