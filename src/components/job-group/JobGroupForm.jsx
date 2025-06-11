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
} from '@mui/material';
import { ArrowLeft2, AddSquare, Calendar, Edit } from 'iconsax-react';
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

  // Form state
  const [formData, setFormData] = useState({
    build: '',
    operator: '',
    value: '',
    jobGroupName: '',
    jobGroupType: '',
    startDate: '',
    endDate: ''
  });

  const [totalJobCount, setTotalJobCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

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

  // Sample table data - updated with markUp and markDown
  const [tableData] = useState([
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '100.00', bid: '2.50', markUp: '15.0', markDown: '5.0', minimumBid: '1.00 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '200.00', bid: '3.00', markUp: '20.0', markDown: '3.0', minimumBid: '1.50 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '150.00', bid: '2.75', markUp: '12.5', markDown: '4.0', minimumBid: '1.25 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '300.00', bid: '4.00', markUp: '25.0', markDown: '7.0', minimumBid: '2.00 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '175.00', bid: '2.25', markUp: '18.0', markDown: '6.0', minimumBid: '1.10 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '250.00', bid: '3.50', markUp: '22.0', markDown: '4.5', minimumBid: '1.75 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '120.00', bid: '2.00', markUp: '10.0', markDown: '2.5', minimumBid: '0.90 USD' },
    { publisherName: 'ELJ-SAmericaca-USD-CPC', type: 'CPA', budget: '400.00', bid: '5.00', markUp: '30.0', markDown: '8.0', minimumBid: '2.50 USD' }
  ]);

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

  const handleAddRule = () => {
    console.log('Add Rule clicked');
  };

  const handleApplyFilters = () => {
    console.log('Apply Filters clicked');
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      build: '',
      operator: '',
      value: '',
      jobGroupName: '',
      jobGroupType: '',
      startDate: '',
      endDate: ''
    });
    setRuleOptions({
      convertToCPC: false,
      expansionEnable: false,
      appliesCap: false,
      scheduleOnCertainDays: false,
      limitNumberOfJobs: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { formData, ruleOptions, selectedRows });
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
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Build</InputLabel>
                <Select
                  value={formData.build}
                  onChange={(e) => handleInputChange('build', e.target.value)}
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
                  value={formData.operator}
                  onChange={(e) => handleInputChange('operator', e.target.value)}
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
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
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
                startIcon={<AddSquare size="20" />}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Calendar size="20" color="#666" />
                    </InputAdornment>
                  )
                }}
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

        {/* Job Table */}
        <JobTable 
          data={tableData} 
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