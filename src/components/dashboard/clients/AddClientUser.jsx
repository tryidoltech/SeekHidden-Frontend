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
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { ArrowLeft2, AddSquare } from 'iconsax-react';
import { useNavigate } from 'react-router';

const AddClientUser = () => {
  // State for top‐level client selector
  const [selectedClient, setSelectedClient] = useState('ATTB AU, ATTB - BR');

  // State for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDashboard, setShowDashboard] = useState('');

  // State for access control checkboxes
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPublisherAccess, setHasPublisherAccess] = useState(false);
  const [filterCampaignJob, setFilterCampaignJob] = useState(false);

  // State for the selects under Access Control
  const [metricsAvailable, setMetricsAvailable] = useState('');
  const [campaigns, setCampaigns] = useState('');
  const [jobGroups, setJobGroups] = useState('');

  const navigate = useNavigate();

  // Handlers for the top client selector
  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  // Handler for adding a client user (stub)
  const handleAddClientUser = () => {
    // You can replace this with your own logic
    console.log({
      name,
      email,
      password,
      showDashboard,
    });
  };

  // Handler for form submit (stub)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace with actual submit logic
    console.log('Submitting form:', {
      name,
      email,
      password,
      showDashboard,
      isAdmin,
      hasPublisherAccess,
      filterCampaignJob,
      metricsAvailable,
      campaigns,
      jobGroups,
    });

    navigate('/clients')
  };

  // Handler for cancel (stub)
  const handleCancel = () => {
    // Reset all state or navigate back, etc.
    setName('');
    setEmail('');
    setPassword('');
    setShowDashboard('');
    setIsAdmin(false);
    setHasPublisherAccess(false);
    setFilterCampaignJob(false);
    setMetricsAvailable('');
    setCampaigns('');
    setJobGroups('');
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          onClick={
            /* Replace with navigation logic (e.g., history.back()) */
            handleBack
          }
        >
          <ArrowLeft2 size="20" variant="Bulk" color="#000" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Add Client User
          </Typography>
        </Box>

        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="client-select-label">Select Client</InputLabel>
          <Select
            labelId="client-select-label"
            value={selectedClient}
            label="Select Client"
            onChange={handleClientChange}
            sx={{
              backgroundColor: '#eeeeee',
              borderRadius: 1,
            }}
          >
            <MenuItem value="ATTB AU, ATTB - BR">ATTB AU, ATTB - BR</MenuItem>
            <MenuItem value="Client B">Client B</MenuItem>
            <MenuItem value="Client C">Client C</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Main Form Container */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* First Card: User Details */}
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
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            {/* Name Field */}
            <Box sx={{ flex: '1 1 240px', mr: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Name"
                placeholder="eg. Marco Faloppa"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            {/* Email Field */}
            <Box sx={{ flex: '1 1 240px', mr: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                placeholder="eg. marco@example.com"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ flex: '1 1 240px', mr: 2, mb: 2 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                placeholder="eg. ********"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            {/* Show Dashboards Selector */}
            <Box sx={{ flex: '1 1 240px', mr: 2, mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="show-dashboard-label">
                  Show Dashboards
                </InputLabel>
                <Select
                  labelId="show-dashboard-label"
                  value={showDashboard}
                  label="Show Dashboards"
                  onChange={(e) => setShowDashboard(e.target.value)}
                >
                  <MenuItem value="Dashboard A">Dashboard A</MenuItem>
                  <MenuItem value="Dashboard B">Dashboard B</MenuItem>
                  <MenuItem value="Dashboard C">Dashboard C</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Add Client User Button */}
            <Box sx={{ ml: 'auto', mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddSquare size="20" variant="Bulk" color="#fff" />}
                sx={{
                  backgroundColor: '#000000',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#222222',
                  },
                }}
                onClick={handleAddClientUser}
              >
                Add Client User
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Second Card: Access Control */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Access Control
          </Typography>

          {/* Checkboxes Row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  size="small"
                />
              }
              label="Admin"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasPublisherAccess}
                  onChange={(e) =>
                    setHasPublisherAccess(e.target.checked)
                  }
                  size="small"
                />
              }
              label="Publisher Access"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterCampaignJob}
                  onChange={(e) =>
                    setFilterCampaignJob(e.target.checked)
                  }
                  size="small"
                />
              }
              label="Filter Campaign and Job Groups"
            />
          </Box>

          {/* Selects Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="metrics-available-label">
                  Metrics Available
                </InputLabel>
                <Select
                  labelId="metrics-available-label"
                  value={metricsAvailable}
                  label="Metrics Available"
                  onChange={(e) =>
                    setMetricsAvailable(e.target.value)
                  }
                >
                  <MenuItem value="Metric A">Metric A</MenuItem>
                  <MenuItem value="Metric B">Metric B</MenuItem>
                  <MenuItem value="Metric C">Metric C</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="campaigns-label">Campaigns</InputLabel>
                <Select
                  labelId="campaigns-label"
                  value={campaigns}
                  label="Campaigns"
                  onChange={(e) => setCampaigns(e.target.value)}
                >
                  <MenuItem value="Campaign A">Campaign A</MenuItem>
                  <MenuItem value="Campaign B">Campaign B</MenuItem>
                  <MenuItem value="Campaign C">Campaign C</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="job-groups-label">Job Groups</InputLabel>
                <Select
                  labelId="job-groups-label"
                  value={jobGroups}
                  label="Job Groups"
                  onChange={(e) => setJobGroups(e.target.value)}
                >
                  <MenuItem value="Group A">Group A</MenuItem>
                  <MenuItem value="Group B">Group B</MenuItem>
                  <MenuItem value="Group C">Group C</MenuItem>
                </Select>
              </FormControl>
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
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddClientUser;
