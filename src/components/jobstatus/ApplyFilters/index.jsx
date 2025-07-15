import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack, Box } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import CustomDatePicker from '../../shareComponents/CustomDatePicker';

const ApplyFilters = () => {
  const [currency, setCurrency] = useState('');
  const [country, setCountry] = useState('');
  const [clientType, setClientType] = useState('');
  const [clientName, setClientName] = useState('');

  const placeholderStyle = { color: '#9e9e9e' }; // grey[500]

  return (
    <MainCard sx={{ overflow: 'visible' }}>
      {' '}
      {/* <-- Fix here */}
      <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <Box sx={{ minWidth: 160, flexGrow: 1, maxWidth: 220 }}>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected ? selected : <span style={placeholderStyle}>Select Currency</span>)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Currency
            </MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </Box>

        <Box sx={{ minWidth: 160, flexGrow: 1, maxWidth: 220 }}>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected ? selected : <span style={placeholderStyle}>Select Country</span>)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Country
            </MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
          </Select>
        </Box>

        <Box sx={{ minWidth: 160, flexGrow: 1, maxWidth: 220 }}>
          <InputLabel id="client-type-label">Client Type</InputLabel>
          <Select
            labelId="client-type-label"
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected ? selected : <span style={placeholderStyle}>Select Client Type</span>)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Client Type
            </MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
            <MenuItem value="VIP">VIP</MenuItem>
          </Select>
        </Box>

        <Box sx={{ minWidth: 160, flexGrow: 1, maxWidth: 220 }}>
          <InputLabel id="client-name-label">Client Name</InputLabel>
          <Select
            labelId="client-name-label"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected ? selected : <span style={placeholderStyle}>Select Client Name</span>)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Client Name
            </MenuItem>
            <MenuItem value="Client A">Client A</MenuItem>
            <MenuItem value="Client B">Client B</MenuItem>
            <MenuItem value="Client C">Client C</MenuItem>
          </Select>
        </Box>
      </Stack>
      {/* Button Row */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        alignItems="center" // use this instead of alignContent
        sx={{ mt: 3 }}
      >
        <CustomDatePicker />
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          Apply Filters
        </Button>
      </Stack>
    </MainCard>
  );
};

export default ApplyFilters;
