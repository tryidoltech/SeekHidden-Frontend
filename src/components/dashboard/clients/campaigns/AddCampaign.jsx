import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import { ArrowLeft2, AddSquare } from 'iconsax-react';
import { useNavigate } from 'react-router';

const AddCampaign = () => {
  const navigate = useNavigate();

  // State for each field in the design
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // For demo purposes, we'll treat each "rule" as one "job" count.
  // In a real app, you'd replace this with whatever structure you need.
  const [rules, setRules] = useState([]);

  // Handlers
  const handleBack = () => {
    navigate(-1);
  };

  const handleAddRule = () => {
    // Stub: simply push an empty object into rules array
    setRules((prev) => [...prev, {}]);
  };

  const handleApplyFilters = () => {
    // Stub: In a real app, you might fetch / filter jobs here
    console.log('Filtering jobs with:', { name, budget, currency, startDate, endDate, rules });
    // For now, totalJobCount is just rules.length
  };

  const handleCancel = () => {
    // Reset all fields
    setName('');
    setBudget('');
    setCurrency('USD');
    setStartDate('');
    setEndDate('');
    setRules([]);
  };

  const handleAddCampaign = (e) => {
    e.preventDefault();
    // Replace with real submission logic
    console.log('Creating campaign:', { name, budget, currency, startDate, endDate, rules });
    navigate(-1);
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
          px: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={handleBack}
        >
          <ArrowLeft2 size="20" variant="Bulk" color="#000" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Create Job Campaign
          </Typography>
        </Box>
      </Box>

      {/* Main Form Container */}
      <Box component="form" onSubmit={handleAddCampaign} sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3
          }}
        >
          <Grid container spacing={2} alignItems="flex-end">
            {/* Name Field */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Name"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            {/* Budget Field */}
            <Grid item xs={8} sm={2}>
              <TextField
                fullWidth
                type="number"
                label="Budget"
                placeholder="eg. 00.00"
                variant="outlined"
                size="small"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={1}>
              <FormControl fullWidth size="small">
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  sx={{
                    backgroundColor: '#eeeeee',
                    borderRadius: 1
                  }}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  {/* Add more currencies if needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Start Date Field */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
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
                label="End Date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>

            {/* Add Rule & Apply Filters Buttons */}
            <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">Total Job Count: {totalJobCount}</Typography>
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
                        borderColor: '#000'
                      }
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
                        backgroundColor: '#222222'
                      }
                    }}
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
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
            gap: 2
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
                borderColor: '#ff4d4f'
              }
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
                backgroundColor: '#222222'
              }
            }}
          >
            Add Campaign
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCampaign;
