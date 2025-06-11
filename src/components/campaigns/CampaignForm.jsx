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
} from '@mui/material';
import { ArrowLeft2, AddSquare, Calendar } from 'iconsax-react';
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
  const [rules, setRules] = useState([]);

  // Filter options state
  const [filterData, setFilterData] = useState({
    build: '',
    operator: '',
    value: ''
  });

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

  // Handlers
  const handleBack = () => {
    navigate('/dashboard/campaigns');
  };

  const handleAddRule = () => {
    setRules(prev => [...prev, {}]);
  };

  const handleFilterChange = (field, value) => {
    setFilterData(prev => ({
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

  const handleApplyFilters = () => {
    console.log('Filtering jobs with:', { name, budget, currency, startDate, endDate, rules, filterData });
    toast.info('Filters applied');
  };

  const handleCancel = () => {
    if (isEdit) {
      navigate('/dashboard/campaigns');
    } else {
      // Reset form for add mode
      setName('');
      setBudget('');
      setCurrency('USD');
      setStartDate('');
      setEndDate('');
      setRules([]);
      setFilterData({ build: '', operator: '', value: '' });
      setRuleOptions({
        convertToCPC: false,
        expansionEnable: false,
        appliesCap: false,
        scheduleOnCertainDays: false,
        limitNumberOfJobs: false
      });
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
      rules,
      filterData,
      ruleOptions,
      budgetType,
      target,
      threshold,
      frequencyEnabled
    };

    if (isEdit) {
      console.log('Updating campaign:', campaignData);
      toast.success('Campaign updated successfully!');
    } else {
      console.log('Creating campaign:', campaignData);
      toast.success('Campaign created successfully!');
    }
    
    navigate('/dashboard/campaigns');
  };

  const totalJobCount = rules.length;

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
        {/* Job Filters Section */}
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
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Build</InputLabel>
                <Select
                  value={filterData.build}
                  onChange={(e) => handleFilterChange('build', e.target.value)}
                  label="Build"
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Operator</InputLabel>
                <Select
                  value={filterData.operator}
                  onChange={(e) => handleFilterChange('operator', e.target.value)}
                  label="Operator"
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="equal">Equal</MenuItem>
                  <MenuItem value="notEqual">Not Equal</MenuItem>
                  <MenuItem value="moreThan">More than</MenuItem>
                  <MenuItem value="lessThan">Less than</MenuItem>
                  <MenuItem value="between">Between</MenuItem>
                  <MenuItem value="inContains">In/Contains</MenuItem>
                  <MenuItem value="notInContains">Not in/Contains</MenuItem>
                  <MenuItem value="beginsWith">Begins with</MenuItem>
                  <MenuItem value="notBeginsWith">Not begins with</MenuItem>
                  <MenuItem value="moreThanOrEqual">More than or Equal to</MenuItem>
                  <MenuItem value="lessThanOrEqual">Less than or Equal to</MenuItem>
                  <MenuItem value="searchString">Search String</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Value"
                placeholder="Select an option"
                value={filterData.value}
                onChange={(e) => handleFilterChange('value', e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Total Job Count: {totalJobCount}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<AddSquare size="20" variant="Bulk" color="#000" />}
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
                onClick={handleAddRule}
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

        {/* Rules Section */}
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
            Rules
          </Typography>
          
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
