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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { ArrowLeft, Eye, Download, RotateCcw } from 'lucide-react';

const AddClient = () => {
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

  // Feed URL and mapping states
  const [feedUrl, setFeedUrl] = useState('');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [feedData, setFeedData] = useState(null);
  const [feedError, setFeedError] = useState('');
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [feedDetails, setFeedDetails] = useState(null);
  const [mappings, setMappings] = useState({
    Source: '',
    JobId: '',
    JobCategory: '',
    Publisher: '',
    Country: ''
  });

  // New state variables
  const [showAddFieldDialog, setShowAddFieldDialog] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');

  // Mock feed data structure for demonstration
  const [unmappedNodes] = useState([
    'Source',
    'LastBuildDate',
    'Publisher',
    'JobId',
    'Country',
    'Title',
    'Description',
    'Requirements',
    'Location',
    'Salary',
    'JobType',
    'Company',
    'PostedDate',
    'ExpiryDate',
    'ApplyUrl'
  ]);

  // Available feed nodes (would come from parsed XML)
  const [availableNodes, setAvailableNodes] = useState([]);

  const handleBack = () => {
    window.history.back();
  };

  // Auto-extract feed data when URL changes
  useEffect(() => {
    if (feedUrl && feedUrl.trim()) {
      const timeoutId = setTimeout(() => {
        extractFeedData();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    } else {
      setFeedData(null);
      setAvailableNodes([]);
    }
  }, [feedUrl]);

  const extractFeedData = async () => {
    if (!feedUrl.trim()) {
      setFeedError('Please enter a valid feed URL');
      return;
    }

    setIsLoadingFeed(true);
    setFeedError('');

    try {
      // Simulate API call to extract feed data
      // In real implementation, this would call your backend service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data
      const mockFeedData = {
        totalJobs: 1247,
        lastUpdated: new Date().toISOString(),
        feedType: 'XML',
        encoding: 'UTF-8',
        nodes: [
          'job_id', 'title', 'description', 'company', 'location',
          'salary', 'job_type', 'posted_date', 'expiry_date', 'apply_url',
          'category', 'requirements', 'benefits', 'experience_level'
        ]
      };

      setFeedData(mockFeedData);
      setAvailableNodes(mockFeedData.nodes);

      // Mock detailed feed data for modal
      setFeedDetails({
        jobs: [
          {
            id: 'Job Data 1',
            fields: {
              '/country': 'sg',
              '/referencenumber': '361739158034579456386B0',
              '/title': 'Interior Designer (Hospitality and F&B)',
              '/company': 'Gough Recruitment (Hong Kong) Pty Limited',
              '/location': 'central area',
              '/url': 'https://open.opp.jobstreet.com/sg/361739158034579456B0?src=jsononet...',
              '/listdate': '2025-03-29'
            }
          },
          {
            id: 'Job Data 2',
            fields: {
              '/country': 'sg',
              '/referencenumber': '361739158034579456386B1',
              '/title': 'Software Engineer',
              '/company': 'Tech Solutions Pte Ltd',
              '/location': 'raffles place',
              '/url': 'https://open.opp.jobstreet.com/sg/361739158034579456386B1?src=jsononet...',
              '/listdate': '2025-03-28'
            }
          }
        ]
      });

    } catch (error) {
      setFeedError('Failed to extract feed data. Please check the URL and try again.');
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const handleViewFeedDetails = () => {
    setShowFeedModal(true);
  };

  const handleMappingChange = (field, value) => {
    setMappings(prev => ({
      ...prev,
      [field]: value
    }));
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
      feedUrl,
      mappings,
    });
  };

  // New functions for adding fields and mapping
  const handleAddField = () => {
    setShowAddFieldDialog(true);
  };

  const handleAddFieldConfirm = () => {
    if (newFieldName.trim() && !mappings.hasOwnProperty(newFieldName.trim())) {
      setMappings(prev => ({
        ...prev,
        [newFieldName.trim()]: ''
      }));
      setNewFieldName('');
      setShowAddFieldDialog(false);
    }
  };

  const handleAddFieldCancel = () => {
    setNewFieldName('');
    setShowAddFieldDialog(false);
  };

  const handleMapFields = () => {
    // Validate that at least one field is mapped
    const mappedFields = Object.entries(mappings).filter(([key, value]) => value.trim() !== '');
    
    if (mappedFields.length === 0) {
      setFeedError('Please map at least one field before proceeding.');
      return;
    }

    // Clear any previous errors
    setFeedError('');
    
    // You can add success feedback here
    console.log('Field mappings saved:', mappings);
    
    // Optional: Show success message
    // setFeedError(''); // Clear error if exists
    // You could add a success state and show a success alert
  };

  const handleResetMappings = () => {
    // Reset all mappings to empty values
    const resetMappings = Object.keys(mappings).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    
    setMappings(resetMappings);
    setFeedError(''); // Clear any errors
    
    console.log('Mappings reset');
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
            placeholder="Enter feed URL here..."
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              }
            }}
          />
          <IconButton
            size="small"
            sx={{ backgroundColor: 'white' }}
            onClick={handleViewFeedDetails}
            disabled={!feedData}
          >
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
        {/* Feed Details Modal */}
        {showFeedModal && feedDetails && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
            }}
            onClick={() => setShowFeedModal(false)}
          >
            <Paper
              sx={{
                width: '90%',
                maxWidth: 800,
                maxHeight: '90%',
                overflow: 'hidden',
                borderRadius: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Feed details
                </Typography>
                <IconButton onClick={() => setShowFeedModal(false)}>
                  <Box sx={{ fontSize: 18, color: '#999' }}>×</Box>
                </IconButton>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      p: 1,
                      borderBottom: '2px solid #000',
                      fontWeight: 600,
                      mr: 3
                    }}
                  >
                    Job data
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      p: 1,
                      color: '#999',
                      fontWeight: 600
                    }}
                  >
                    Job feed extract
                  </Typography>
                </Box>

                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Jobs</TableCell>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Job fields</TableCell>
                        <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {feedDetails.jobs.map((job, jobIndex) => (
                        Object.entries(job.fields).map(([field, value], fieldIndex) => (
                          <TableRow key={`${jobIndex}-${fieldIndex}`}>
                            <TableCell sx={{ backgroundColor: '#f9f9f9', fontWeight: 500 }}>
                              {fieldIndex === 0 ? job.id : ''}
                            </TableCell>
                            <TableCell>{field}</TableCell>
                            <TableCell sx={{ maxWidth: 300, wordBreak: 'break-word' }}>
                              {value}
                            </TableCell>
                          </TableRow>
                        ))
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Feed Mapping Section - Shows automatically when URL is entered */}
        {feedData && (
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
              Feed Mapping
            </Typography>

            {feedError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {feedError}
              </Alert>
            )}

            {feedData && (
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary">
                      Total Jobs: <strong>{feedData.totalJobs}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary">
                      Feed Type: <strong>{feedData.feedType}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary">
                      Last Updated: <strong>{new Date(feedData.lastUpdated).toLocaleDateString()}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2" color="textSecondary">
                      Nodes Found: <strong>{feedData.nodes.length}</strong>
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Career Fields
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {Object.keys(mappings).map((field) => (
                        <TextField
                          key={field}
                          fullWidth
                          size="small"
                          label={field}
                          value={field}
                          disabled
                          sx={{ backgroundColor: '#f9f9f9' }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Feed Nodes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {Object.keys(mappings).map((field) => (
                        <FormControl key={field} fullWidth size="small">
                          <InputLabel>Select Node</InputLabel>
                          <Select
                            value={mappings[field]}
                            label="Select Node"
                            onChange={(e) => handleMappingChange(field, e.target.value)}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {availableNodes.map((node) => (
                              <MenuItem key={node} value={node}>
                                {node}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, my: 3 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddField}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#ddd',
                          color: '#666'
                        }}
                      >
                        Add Field
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleMapFields}
                        sx={{
                          backgroundColor: '#000',
                          textTransform: 'none',
                          '&:hover': { backgroundColor: '#333' }
                        }}
                      >
                        Map
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleResetMappings}
                        sx={{
                          textTransform: 'none',
                          borderColor: '#ddd',
                          color: '#666'
                        }}
                        startIcon={<RotateCcw size={16} />}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Unmapped Feed Nodes
                    </Typography>
                    <Box sx={{
                      backgroundColor: '#f9f9f9',
                      p: 2,
                      borderRadius: 1,
                      maxHeight: 300,
                      overflowY: 'auto'
                    }}>
                      {unmappedNodes
                        .filter(node => !Object.values(mappings).includes(node))
                        .map((node) => (
                          <Chip
                            key={node}
                            label={node}
                            size="small"
                            sx={{ m: 0.5 }}
                            variant="outlined"
                          />
                        ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        )}

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
                placeholder="Enter budget amount"
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
                placeholder="Enter markup percentage"
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
                placeholder="Enter markdown percentage"
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
                placeholder="Enter redirect URL"
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

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#000',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Save Client Configuration
          </Button>
        </Box>

        {/* Add Field Dialog - Add this after the Feed Mapping Paper component */}
        {showAddFieldDialog && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
            }}
            onClick={handleAddFieldCancel}
          >
            <Paper
              sx={{
                width: 400,
                p: 3,
                borderRadius: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Add New Field
              </Typography>
              
              <TextField
                fullWidth
                label="Field Name"
                placeholder="Enter field name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                size="small"
                sx={{ mb: 3 }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddFieldConfirm();
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddFieldCancel}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#ddd',
                    color: '#666'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddFieldConfirm}
                  disabled={!newFieldName.trim() || mappings.hasOwnProperty(newFieldName.trim())}
                  sx={{
                    backgroundColor: '#000',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#333' }
                  }}
                >
                  Add Field
                </Button>
              </Box>
              
              {mappings.hasOwnProperty(newFieldName.trim()) && newFieldName.trim() && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  This field already exists
                </Typography>
              )}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddClient;