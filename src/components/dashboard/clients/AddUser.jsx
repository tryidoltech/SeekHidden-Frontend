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
  Tabs,
  Tab
} from '@mui/material';
import { ArrowLeft2, AddSquare } from 'iconsax-react';
import { useNavigate } from 'react-router';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`user-tabpanel-${index}`} aria-labelledby={`user-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `user-tab-${index}`,
    'aria-controls': `user-tabpanel-${index}`
  };
}

const AddUser = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedClient, setSelectedClient] = useState('ATTB AU, ATTB - BR');
  const [selectedPublisher, setSelectedPublisher] = useState('Publisher A, Publisher B');

  // Common form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDashboard, setShowDashboard] = useState('');

  // Client-specific fields
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPublisherAccess, setHasPublisherAccess] = useState(false);
  const [filterCampaignJob, setFilterCampaignJob] = useState(false);
  const [metricsAvailable, setMetricsAvailable] = useState('');
  const [campaigns, setCampaigns] = useState('');
  const [jobGroups, setJobGroups] = useState('');

  // Publisher-specific fields
  const [publisherRole, setPublisherRole] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [publisherMetrics, setPublisherMetrics] = useState('');

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
  };

  const handleAddUser = () => {
    if (tabValue === 0) {
      // Add client user logic
      console.log('Adding client user:', {
        name,
        email,
        password,
        showDashboard,
        isAdmin,
        hasPublisherAccess,
        filterCampaignJob,
        metricsAvailable,
        campaigns,
        jobGroups
      });
    } else {
      // Add publisher user logic
      console.log('Adding publisher user:', {
        name,
        email,
        password,
        publisherRole,
        accessLevel,
        publisherMetrics
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddUser();
    navigate('/dashboard/clients');
  };

  const handleCancel = () => {
    // Reset all state
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
    setPublisherRole('');
    setAccessLevel('');
    setPublisherMetrics('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            {tabValue === 0 ? 'Add Client User' : 'Add Publisher User'}
          </Typography>
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} aria-label="user type tabs">
          <Tab label="Client User" {...a11yProps(0)} />
          <Tab label="Publisher User" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Main Form Container */}
      <Box component="form" onSubmit={handleSubmit}>
        <TabPanel value={tabValue} index={0}>
          {/* Client User Form */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 2, mb: 3 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200, mb: 3 }}>
              <InputLabel id="client-select-label">Select Client</InputLabel>
              <Select
                labelId="client-select-label"
                value={selectedClient}
                label="Select Client"
                onChange={handleClientChange}
                sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
              >
                <MenuItem value="ATTB AU, ATTB - BR">ATTB AU, ATTB - BR</MenuItem>
                <MenuItem value="Client B">Client B</MenuItem>
                <MenuItem value="Client C">Client C</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
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
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="eg. marco@example.com"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="show-dashboard-label">Show Dashboards</InputLabel>
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
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Access Control
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} size="small" />}
                label="Admin"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={<Checkbox checked={hasPublisherAccess} onChange={(e) => setHasPublisherAccess(e.target.checked)} size="small" />}
                label="Publisher Access"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filterCampaignJob} onChange={(e) => setFilterCampaignJob(e.target.checked)} size="small" />}
                label="Filter Campaign and Job Groups"
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="metrics-available-label">Metrics Available</InputLabel>
                  <Select
                    labelId="metrics-available-label"
                    value={metricsAvailable}
                    label="Metrics Available"
                    onChange={(e) => setMetricsAvailable(e.target.value)}
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
                  <Select labelId="campaigns-label" value={campaigns} label="Campaigns" onChange={(e) => setCampaigns(e.target.value)}>
                    <MenuItem value="Campaign A">Campaign A</MenuItem>
                    <MenuItem value="Campaign B">Campaign B</MenuItem>
                    <MenuItem value="Campaign C">Campaign C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="job-groups-label">Job Groups</InputLabel>
                  <Select labelId="job-groups-label" value={jobGroups} label="Job Groups" onChange={(e) => setJobGroups(e.target.value)}>
                    <MenuItem value="Group A">Group A</MenuItem>
                    <MenuItem value="Group B">Group B</MenuItem>
                    <MenuItem value="Group C">Group C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Publisher User Form */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 2, mb: 3 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200, mb: 3 }}>
              <InputLabel id="publisher-select-label">Select Publisher</InputLabel>
              <Select
                labelId="publisher-select-label"
                value={selectedPublisher}
                label="Select Publisher"
                onChange={handlePublisherChange}
                sx={{ backgroundColor: '#eeeeee', borderRadius: 1 }}
              >
                <MenuItem value="Publisher A, Publisher B">Publisher A, Publisher B</MenuItem>
                <MenuItem value="Publisher C">Publisher C</MenuItem>
                <MenuItem value="Publisher D">Publisher D</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="eg. John Doe"
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="eg. john@example.com"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
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
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Publisher Settings
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="publisher-role-label">Publisher Role</InputLabel>
                  <Select
                    labelId="publisher-role-label"
                    value={publisherRole}
                    label="Publisher Role"
                    onChange={(e) => setPublisherRole(e.target.value)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Viewer">Viewer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="access-level-label">Access Level</InputLabel>
                  <Select
                    labelId="access-level-label"
                    value={accessLevel}
                    label="Access Level"
                    onChange={(e) => setAccessLevel(e.target.value)}
                  >
                    <MenuItem value="Full">Full</MenuItem>
                    <MenuItem value="Limited">Limited</MenuItem>
                    <MenuItem value="Restricted">Restricted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="publisher-metrics-label">Metrics Available</InputLabel>
                  <Select
                    labelId="publisher-metrics-label"
                    value={publisherMetrics}
                    label="Metrics Available"
                    onChange={(e) => setPublisherMetrics(e.target.value)}
                  >
                    <MenuItem value="All Metrics">All Metrics</MenuItem>
                    <MenuItem value="Basic Metrics">Basic Metrics</MenuItem>
                    <MenuItem value="Custom Metrics">Custom Metrics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Bottom Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
            startIcon={<AddSquare size="20" variant="Bulk" color="#fff" />}
            sx={{
              backgroundColor: '#000000',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#222222'
              }
            }}
          >
            {tabValue === 0 ? 'Add Client User' : 'Add Publisher User'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
