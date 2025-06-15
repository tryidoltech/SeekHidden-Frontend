import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Eye } from 'iconsax-react';

const AddClient = () => {
  const navigate = useNavigate();

  // State for form fields
  const [clientName, setClientName] = useState('');
  const [advertiserName, setAdvertiserName] = useState('');
  const [exportedName, setExportedName] = useState('');
  const [currency, setCurrency] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  
  // Settings section
  const [budget, setBudget] = useState('');
  const [markType, setMarkType] = useState('');
  const [markup, setMarkup] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [clientType, setClientType] = useState('');
  const [showDashboards, setShowDashboards] = useState('');
  const [clickFilters, setClickFilters] = useState('');
  const [clickFilterRedirectUrl, setClickFilterRedirectUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spendTypeCpa, setSpendTypeCpa] = useState('');
  const { search } = useLocation();
const queryParams = new URLSearchParams(search);
const userType = queryParams.get('type');

useEffect(() => {
  if (userType === 'publisher') {
    setTabValue(1);
  }
}, [userType]);

  // Publisher Feed Tags
  const [feedTags, setFeedTags] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting client data:', {
      clientName,
      advertiserName,
      exportedName,
      currency,
      country,
      industry,
      budget,
      markType,
      markup,
      markdown,
      frequency,
      timeZone,
      clientType,
      showDashboards,
      clickFilters,
      clickFilterRedirectUrl,
      startDate,
      endDate,
      spendTypeCpa,
      feedTags,
    });
  };

  const handleAddTag = () => {
    // Logic to add feed tag
    console.log('Add tag clicked');
  };

  const handleRemoveAllTags = () => {
    setFeedTags([]);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
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
          <ArrowLeft size={20} color="#000" />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            Add/Update Client
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, width: '80%' }}>
          <TextField
            size="small"
            placeholder="https://trialwebsiteonline.com/0358376736783673"
            sx={{ 
              width:  '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              }
            }}
          />
          <IconButton size="small" sx={{ backgroundColor: 'white' }}>
            <Eye size={16} />
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'white',
              borderColor: '#ddd',
              color: '#666'
            }}
          >
            Feed 1
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#000',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#333' },
              width: 180
            }}
          >
            Exit Mapping
          </Button>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Client Details Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Client Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Client Name"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Advertiser Name"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Exported Name"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={exportedName}
                onChange={(e) => setExportedName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industry}
                  label="Industry"
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <MenuItem value="Tech">Technology</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Settings Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Settings
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Budget"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Mark Type</InputLabel>
                <Select
                  value={markType}
                  label="Mark Type"
                  onChange={(e) => setMarkType(e.target.value)}
                >
                  <MenuItem value="Type A">Type A</MenuItem>
                  <MenuItem value="Type B">Type B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="MarkUp"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Markdown"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={frequency}
                  label="Frequency"
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={timeZone}
                  label="Time Zone"
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="GMT">GMT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Client Type</InputLabel>
                <Select
                  value={clientType}
                  label="Client Type"
                  onChange={(e) => setClientType(e.target.value)}
                >
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Show Dashboards</InputLabel>
                <Select
                  value={showDashboards}
                  label="Show Dashboards"
                  onChange={(e) => setShowDashboards(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Limited">Limited</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Click Filters</InputLabel>
                <Select
                  value={clickFilters}
                  label="Click Filters"
                  onChange={(e) => setClickFilters(e.target.value)}
                >
                  <MenuItem value="Enabled">Enabled</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Click Filter Redirect URL"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={clickFilterRedirectUrl}
                onChange={(e) => setClickFilterRedirectUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                variant="outlined"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                variant="outlined"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Spend Type CPA</InputLabel>
                <Select
                  value={spendTypeCpa}
                  label="Spend Type CPA"
                  onChange={(e) => setSpendTypeCpa(e.target.value)}
                >
                  <MenuItem value="Fixed">Fixed</MenuItem>
                  <MenuItem value="Variable">Variable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Publisher Feed Tags Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Publisher Feed Tags
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#000',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#333' }
              }}
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Box>

          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: 'none',
              borderColor: '#ff4444',
              color: '#ff4444',
              '&:hover': {
                backgroundColor: '#fff5f5',
                borderColor: '#ff4444',
              }
            }}
            onClick={handleRemoveAllTags}
          >
            Remove All Tags
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddClient;