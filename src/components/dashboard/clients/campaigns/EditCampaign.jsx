import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { AddSquare } from 'iconsax-react';
import { useNavigate } from 'react-router';

const EditCampaign = () => {
  const navigate = useNavigate();

  // State for each field in the design
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rules, setRules] = useState([]);

  const handleAddRule = () => {
    setRules(prev => [...prev, {}]);
  };

  const handleApplyFilters = () => {
    console.log('Filtering jobs with:', { name, budget, currency, startDate, endDate, rules });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updating campaign:', { name, budget, currency, startDate, endDate, rules });
    navigate(-1);
  };

  const totalJobCount = rules.length;

  return (
    <Box sx={{ p: 2 }}>
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Edit Job Campaign
      </Typography>

      {/* Form Container */}
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{ maxWidth: 1200 }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          {/* Name Field */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              placeholder="eg. Marco Faloppa"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          {/* Budget Field */}
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              placeholder="eg. 00.00"
              variant="outlined"
              size="small"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </Grid>

          {/* Currency Selector */}
          <Grid item xs={12} sm={1}>
            <FormControl fullWidth size="small">
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{
                  backgroundColor: '#eeeeee',
                  borderRadius: 1,
                }}
              >
                <MenuItem value="USD">USD ▼</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Start Date Field */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          {/* End Date Field */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Job Count and Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">
            Total Job Count: {totalJobCount}
          </Typography>

          <Box>
            <Button
              variant="outlined"
              startIcon={<AddSquare size="20" variant="Bulk" />}
              sx={{
                textTransform: 'none',
                mr: 2,
                borderColor: '#000',
                color: '#000',
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
              }}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>

        {/* Bottom Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
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
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditCampaign;