import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import { ArrowLeft2, AddSquare, Calendar, Add, Trash } from 'iconsax-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // State for each field from original AddCampaign
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter rules state (enhanced)
  const [filterRules, setFilterRules] = useState([
    {
      id: 1,
      build: '',
      operator: '',
      value: '',
      logicalOperator: 'AND' // AND, OR
    }
  ]);

  // Additional state
  const [totalJobCount, setTotalJobCount] = useState(0);
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
  const [target, setTarget] = useState('');
  const [threshold, setThreshold] = useState('');
  const [frequencyEnabled, setFrequencyEnabled] = useState(false);

  // Sample job data for filtering
  const [allJobs] = useState([
    { id: 1, publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '100.00', bid: '2.50', country: 'US', category: 'Finance' },
    { id: 2, publisherName: 'ELJ-Europe-EUR-CPC', type: 'CPC', budget: '200.00', bid: '3.00', country: 'DE', category: 'Tech' },
    { id: 3, publisherName: 'ELJ-Asia-USD-CPA', type: 'CPA', budget: '150.00', bid: '2.75', country: 'JP', category: 'Finance' },
    { id: 4, publisherName: 'ELJ-UK-GBP-CPC', type: 'CPC', budget: '300.00', bid: '4.00', country: 'UK', category: 'Healthcare' },
    { id: 5, publisherName: 'ELJ-Canada-CAD-CPA', type: 'CPA', budget: '175.00', bid: '2.25', country: 'CA', category: 'Education' },
    { id: 6, publisherName: 'ELJ-Australia-AUD-CPC', type: 'CPC', budget: '250.00', bid: '3.50', country: 'AU', category: 'Tech' },
    { id: 7, publisherName: 'ELJ-Brazil-BRL-CPA', type: 'CPA', budget: '120.00', bid: '2.00', country: 'BR', category: 'Finance' },
    { id: 8, publisherName: 'ELJ-India-INR-CPC', type: 'CPC', budget: '400.00', bid: '5.00', country: 'IN', category: 'Education' }
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

  // Mock data for edit mode
  const mockCampaignData = {
    1: {
      name: 'Summer Sale 2024',
      budget: '1000.00',
      currency: 'USD',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
    },
    2: {
      name: 'Tech Product Launch',
      budget: '2000.00',
      currency: 'USD',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
    },
    3: {
      name: 'Holiday Marketing Blitz',
      budget: '1500.00',
      currency: 'USD',
      startDate: '2024-01-20',
      endDate: '2024-07-20',
    }
  };

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

  // Load data when editing
  useEffect(() => {
    if (isEdit && id && mockCampaignData[id]) {
      const data = mockCampaignData[id];
      setName(data.name);
      setBudget(data.budget);
      setCurrency(data.currency);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    }
  }, [isEdit, id]);

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

  // Handlers
  const handleBack = () => {
    navigate('/campaigns');
  };

  const handleRuleOptionChange = (option, checked) => {
    setRuleOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const handleApplyFilters = () => {
    applyFilterRules();
    toast.info('Filters applied');
  };

  const handleCancel = () => {
    if (isEdit) {
      navigate('/campaigns');
    } else {
      // Reset form for add mode
      setName('');
      setBudget('');
      setCurrency('USD');
      setStartDate('');
      setEndDate('');
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const campaignData = {
      name,
      budget: parseFloat(budget) || 0,
      currency,
      startDate,
      endDate,
      filterRules,
      ruleOptions,
      budgetType,
      target,
      threshold,
      frequencyEnabled,
      filteredJobsCount: filteredJobs.length
    };

    if (isEdit) {
      console.log('Updating campaign:', campaignData);
      toast.success('Campaign updated successfully!');
    } else {
      console.log('Creating campaign:', campaignData);
      toast.success('Campaign created successfully!');
    }
    
    navigate('/campaigns');
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          px: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleBack}
        >
          <ArrowLeft2 size="20" variant="Bulk" color="#000" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {isEdit ? 'Edit Campaign' : 'Create Campaign'}
          </Typography>
        </Box>
      </Box>

      {/* Main Form Container */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 1200, mx: 'auto' }}
      >
        {/* Job Filters Section - Enhanced */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
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
                Total Job Count: {totalJobCount || allJobs.length}
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
                sx={{
                  textTransform: 'none',
                  mr: 2,
                  borderColor: '#000',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#000',
                  },
                }}
              >
                Add Rule
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#000000',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#222222',
                  },
                }}
                onClick={handleApplyFilters}
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

        {/* Campaign Details Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Campaign Details
          </Typography>
          
          <Grid container spacing={2}>
            {/* Campaign Name */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Campaign Name"
                placeholder="e.g., Summer Sale 2024"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            {/* Budget */}
            <Grid item xs={8} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Budget"
                placeholder="e.g., 1000.00"
                variant="outlined"
                size="small"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                inputProps={{ step: "0.01", min: "0" }}
                required
              />
            </Grid>

            {/* Currency */}
            <Grid item xs={4} sm={1}>
              <FormControl fullWidth size="small">
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  sx={{
                    backgroundColor: '#eeeeee',
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Calendar size="20" color="#666" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Calendar size="20" color="#666" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Bottom Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: '#ff4d4f',
              color: '#ff4d4f',
              '&:hover': {
                backgroundColor: '#fff5f5',
                borderColor: '#ff4d4f',
              },
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#222222',
              },
            }}
          >
            {isEdit ? 'Update Campaign' : 'Add Campaign'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignForm;
