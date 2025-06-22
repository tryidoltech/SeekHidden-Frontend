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
  Dialog,         // Add this
  DialogTitle,    // Add this
  DialogContent,  // Add this
  DialogActions,  // Add this
} from '@mui/material';
import { ArrowLeft, Eye, Download, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify'; // Add this import

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
    Jobs: '',
    Job: '',
    Company: '',
    Title: '',
    City: '',
    State: '',
    Country: '',
    Zip: '',
    Description: '',
    URL: '',
    Category: '',
    'JobId/Ref Number': '',
    'Published Date': '',
    'Modified Date': '',
    JobType: '',
    'CPC Bid': '',
    'CPA Bid': ''
  });

  // New state variables
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [editingFieldName, setEditingFieldName] = useState('');

  // Add these state variables with your existing state declarations
  const [feeds, setFeeds] = useState([]);
  const [showAddFeedDialog, setShowAddFeedDialog] = useState(false);
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [isLoadingNewFeed, setIsLoadingNewFeed] = useState(false);
  const [newFeedError, setNewFeedError] = useState('');
  
  // Add this new state for tab functionality
  const [activeTab, setActiveTab] = useState('jobData');

  // Mock feed data structure for demonstration
  const [unmappedNodes] = useState([
    'Source',
    'Jobs',
    'Job',
    'Company',
    'Title',
    'City',
    'State',
    'Country',
    'Zip',
    'Description',
    'URL',
    'Category',
    'JobId/Ref Number',
    'Published Date',
    'Modified Date',
    'JobType',
    'CPC Bid',
    'CPA Bid'
  ]);

  // Available feed nodes (would come from parsed XML)
  const [availableNodes, setAvailableNodes] = useState([]);

  // Add a new state to track default fields
  const [defaultFields] = useState([
    'Source',
    'Jobs',
    'Job',
    'Company',
    'Title',
    'City',
    'State',
    'Country',
    'Zip',
    'Description',
    'URL',
    'Category',
    'JobId/Ref Number',
    'Published Date',
    'Modified Date',
    'JobType',
    'CPC Bid',
    'CPA Bid'
  ]);

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

      // Mock extracted data with realistic feed nodes
      const mockFeedData = {
        totalJobs: 1247,
        lastUpdated: new Date().toISOString(),
        feedType: 'XML',
        encoding: 'UTF-8',
        nodes: [
          'job_id', 'title', 'description', 'company', 'location',
          'salary', 'job_type', 'posted_date', 'expiry_date', 'apply_url',
          'category', 'requirements', 'benefits', 'experience_level',
          'city', 'state', 'country', 'zip_code', 'source', 'modified_date',
          'cpc_bid', 'cpa_bid', 'publisher', 'job_reference'
        ]
      };

      setFeedData(mockFeedData);
      setAvailableNodes(mockFeedData.nodes);

      // Update mock detailed feed data for modal with more realistic structure
      setFeedDetails({
        jobs: [
          {
            id: 'Job Data 1',
            fields: {
              '/source': 'JobStreet',
              '/job_id': '361739158034579456386B0',
              '/title': 'Interior Designer (Hospitality and F&B)',
              '/company': 'Gough Recruitment (Hong Kong) Pty Limited',
              '/city': 'Singapore',
              '/state': 'Central',
              '/country': 'SG',
              '/zip_code': '068806',
              '/description': 'We are seeking an experienced Interior Designer...',
              '/apply_url': 'https://open.opp.jobstreet.com/sg/361739158034579456386B0',
              '/posted_date': '2025-03-29',
              '/modified_date': '2025-03-29',
              '/job_type': 'Full Time',
              '/category': 'Design',
              '/cpc_bid': '0.50',
              '/cpa_bid': '15.00'
            }
          },
          {
            id: 'Job Data 2',
            fields: {
              '/source': 'JobStreet',
              '/job_id': '361739158034579456386B1',
              '/title': 'Software Engineer',
              '/company': 'Tech Solutions Pte Ltd',
              '/city': 'Singapore',
              '/state': 'Raffles Place',
              '/country': 'SG',
              '/zip_code': '048623',
              '/description': 'Join our dynamic team as a Software Engineer...',
              '/apply_url': 'https://open.opp.jobstreet.com/sg/361739158034579456386B1',
              '/posted_date': '2025-03-28',
              '/modified_date': '2025-03-28',
              '/job_type': 'Full Time',
              '/category': 'Information Technology',
              '/cpc_bid': '0.75',
              '/cpa_bid': '25.00'
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

  // Add these missing functions after your other handler functions

  // Function to handle mapping fields
  const handleMapFields = () => {
    const mappedFields = Object.entries(mappings).filter(([key, value]) => value.trim() !== '');

    if (mappedFields.length === 0) {
      alert('Please map at least one field before proceeding.');
      return;
    }

    console.log('Mappings saved:', mappings);
    // Here you would typically send the mappings to your backend
    alert(`Successfully mapped ${mappedFields.length} field(s)!`);
  };

  // Function to reset all mappings
  const handleResetMappings = () => {
    const resetMappings = Object.keys(mappings).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});

    setMappings(resetMappings);
    console.log('Mappings reset');
  };

  // Function to handle viewing feed details
  const handleViewFeedDetails = () => {
    if (feedData) {
      setShowFeedModal(true);
    }
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
      additionalFeeds: feeds,
    });
  };

  // New functions for adding fields and mapping
  const handleAddField = () => {
    setIsAddingField(true);
    setNewFieldName('');
  };

  // New function to confirm adding field
  const handleConfirmAddField = () => {
    if (newFieldName.trim() && !mappings.hasOwnProperty(newFieldName.trim())) {
      setMappings(prev => ({
        ...prev,
        [newFieldName.trim()]: ''
      }));
      setNewFieldName('');
      setIsAddingField(false);
    }
  };

  // New function to cancel adding field
  const handleCancelAddField = () => {
    setNewFieldName('');
    setIsAddingField(false);
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
    setEditingFieldName(fieldName);
  };

  // New function to confirm editing field
  const handleConfirmEditField = () => {
    if (editingFieldName.trim() && editingFieldName.trim() !== editingField) {
      // Check if new name already exists
      if (mappings.hasOwnProperty(editingFieldName.trim())) {
        return; // Don't allow duplicate names
      }

      // Create new mappings with updated field name
      const newMappings = {};
      Object.keys(mappings).forEach(key => {
        if (key === editingField) {
          newMappings[editingFieldName.trim()] = mappings[key];
        } else {
          newMappings[key] = mappings[key];
        }
      });

      setMappings(newMappings);
    }

    setEditingField(null);
    setEditingFieldName('');
  };

  // New function to cancel editing field
  const handleCancelEditField = () => {
    setEditingField(null);
    setEditingFieldName('');
  };

  // New function to delete field
  const handleDeleteField = (fieldName) => {
    // Prevent deleting default fields
    if (defaultFields.includes(fieldName)) {
      alert('Cannot delete default fields');
      return;
    }

    const newMappings = { ...mappings };
    delete newMappings[fieldName];
    setMappings(newMappings);
  };

  // Modify the Add Feed button click handler
  const handleAddFeed = () => {
    setShowAddFeedDialog(true);
    setNewFeedUrl('');
    setNewFeedError('');
  };

  // Function to add a new feed
  const handleAddFeedConfirm = async () => {
    if (!newFeedUrl.trim()) {
      const errorMessage = 'Please enter a valid feed URL';
      setNewFeedError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    // Check if URL already exists
    if (feeds.some(feed => feed.url === newFeedUrl.trim()) || feedUrl === newFeedUrl.trim()) {
      const errorMessage = 'This feed URL already exists';
      setNewFeedError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setIsLoadingNewFeed(true);
    setNewFeedError('');
    toast.info('Adding new feed...');

    try {
      // Simulate API call to extract feed data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data for new feed
      const mockNewFeedData = {
        id: Date.now(),
        url: newFeedUrl.trim(),
        totalJobs: Math.floor(Math.random() * 2000) + 500,
        lastUpdated: new Date().toISOString(),
        feedType: 'XML',
        encoding: 'UTF-8',
        nodes: [
          'job_id', 'title', 'description', 'company', 'location',
          'salary', 'job_type', 'posted_date', 'expiry_date', 'apply_url',
          'category', 'requirements', 'benefits', 'experience_level',
          'city', 'state', 'country', 'zip_code', 'source', 'modified_date',
          'cpc_bid', 'cpa_bid', 'publisher', 'job_reference', 'contact_email'
        ],
        mappings: {
          Source: '',
          Jobs: '',
          Job: '',
          Company: '',
          Title: '',
          City: '',
          State: '',
          Country: '',
          Zip: '',
          Description: '',
          URL: '',
          Category: '',
          'JobId/Ref Number': '',
          'Published Date': '',
          'Modified Date': '',
          JobType: '',
          'CPC Bid': '',
          'CPA Bid': ''
        }
      };

      // Add to feeds array
      setFeeds(prev => [...prev, mockNewFeedData]);
      setShowAddFeedDialog(false);
      setNewFeedUrl('');
      toast.success(`New feed added successfully! Found ${mockNewFeedData.totalJobs} jobs`);

    } catch (error) {
      const errorMessage = 'Failed to extract feed data. Please check the URL and try again.';
      setNewFeedError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingNewFeed(false);
    }
  };

  const handleAddFeedCancel = () => {
    setShowAddFeedDialog(false);
    setNewFeedUrl('');
    setNewFeedError('');
    toast.info('Feed addition cancelled');
  };

  // Function to remove a feed
  const handleRemoveFeed = (feedId) => {
    setFeeds(prev => prev.filter(feed => feed.id !== feedId));
  };

  // Function to handle mapping changes for additional feeds
  const handleAdditionalFeedMappingChange = (feedId, field, value) => {
    setFeeds(prev => prev.map(feed =>
      feed.id === feedId
        ? {
          ...feed,
          mappings: {
            ...feed.mappings,
            [field]: value
          }
        }
        : feed
    ));
  };

  // Function to add field to specific feed
  const handleAddFieldToFeed = (feedId, fieldName) => {
    setFeeds(prev => prev.map(feed =>
      feed.id === feedId
        ? {
          ...feed,
          mappings: {
            ...feed.mappings,
            [fieldName]: ''
          }
        }
        : feed
    ));
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
              color: '#666',
              width: '120px',
            }}
            onClick={handleAddFeed}
          >
            + Add Feed
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
                      borderBottom: activeTab === 'jobData' ? '2px solid #000' : 'none',
                      fontWeight: 600,
                      mr: 3,
                      cursor: 'pointer',
                      color: activeTab === 'jobData' ? '#000' : '#999',
                      '&:hover': {
                        color: '#000'
                      }
                    }}
                    onClick={() => setActiveTab('jobData')}
                  >
                    Job data
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      p: 1,
                      borderBottom: activeTab === 'jobFeedExtract' ? '2px solid #000' : 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: activeTab === 'jobFeedExtract' ? '#000' : '#999',
                      '&:hover': {
                        color: '#000'
                      }
                    }}
                    onClick={() => setActiveTab('jobFeedExtract')}
                  >
                    Job feed extract
                  </Typography>
                </Box>

                {/* Tab Content */}
                {activeTab === 'jobData' && (
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
                )}

                {activeTab === 'jobFeedExtract' && (
                  <Box>
                    {/* Feed Summary Statistics */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Feed Extract Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                              {feedData?.totalJobs || 0}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Total Jobs
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
                              {feedData?.nodes?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Feed Nodes
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: '#ed6c02' }}>
                              {Object.values(mappings).filter(v => v.trim() !== '').length}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Mapped Fields
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                              {feedData?.nodes?.filter(node => !Object.values(mappings).includes(node)).length || 0}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Unmapped Nodes
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Feed Extraction Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Extraction Details
                      </Typography>
                      <TableContainer sx={{ maxHeight: 400 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Node Name</TableCell>
                              <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Data Type</TableCell>
                              <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Sample Value</TableCell>
                              <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Extraction Count</TableCell>
                              <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {feedData?.nodes?.map((node, index) => {
                              const isMapped = Object.values(mappings).includes(node);
                              const sampleValues = [
                                'Software Engineer', 'Marketing Manager', 'Data Analyst', 'Product Designer',
                                'Sales Representative', 'Full Time', 'Part Time', 'Contract', 'Remote',
                                'New York', 'California', 'Texas', 'Singapore', 'London'
                              ];
                              const dataTypes = ['String', 'Number', 'Date', 'URL', 'Text'];
                              
                              return (
                                <TableRow key={node}>
                                  <TableCell sx={{ fontWeight: 500 }}>{node}</TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={dataTypes[index % dataTypes.length]} 
                                      size="small" 
                                      variant="outlined"
                                      sx={{ fontSize: '0.75rem' }}
                                    />
                                  </TableCell>
                                  <TableCell sx={{ maxWidth: 200, wordBreak: 'break-word' }}>
                                    {sampleValues[index % sampleValues.length]}
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 500 }}>
                                    {Math.floor(Math.random() * 1000) + 100}
                                  </TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={isMapped ? 'Mapped' : 'Unmapped'} 
                                      size="small"
                                      color={isMapped ? 'success' : 'default'}
                                      sx={{ fontSize: '0.75rem' }}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>

                    {/* Feed URL and Metadata */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Feed Metadata
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Feed URL"
                            value={feedUrl}
                            disabled
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Feed Type"
                            value={feedData?.feedType || 'XML'}
                            disabled
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Encoding"
                            value={feedData?.encoding || 'UTF-8'}
                            disabled
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Last Updated"
                            value={feedData?.lastUpdated ? new Date(feedData.lastUpdated).toLocaleString() : ''}
                            disabled
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Processing Log */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Processing Log
                      </Typography>
                      <Box sx={{ 
                        backgroundColor: '#f8f9fa', 
                        p: 2, 
                        borderRadius: 1, 
                        maxHeight: 200, 
                        overflowY: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                      }}>
                        <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5 }}>
                          ✓ Feed URL validated successfully
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5 }}>
                          ✓ XML structure parsed - {feedData?.nodes?.length || 0} nodes found
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5 }}>
                          ✓ Job data extracted - {feedData?.totalJobs || 0} jobs processed
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffc107', mb: 0.5 }}>
                          ⚠ {feedData?.nodes?.filter(node => !Object.values(mappings).includes(node)).length || 0} nodes remain unmapped
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5 }}>
                          ✓ Data validation completed
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d' }}>
                          Last updated: {new Date().toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        )}
        {/* Add Feed Dialog - ADD THIS SECTION */}
        
        <Dialog open={showAddFeedDialog} onClose={handleAddFeedCancel} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Feed</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Feed URL"
              type="url"
              fullWidth
              variant="outlined"
              value={newFeedUrl}
              onChange={(e) => setNewFeedUrl(e.target.value)}
              error={!!newFeedError}
              helperText={newFeedError}
              placeholder="Enter feed URL (e.g., https://example.com/feed.xml)"
              sx={{ mt: 2 }}
            />
            {isLoadingNewFeed && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Extracting feed data...
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAddFeedCancel}
              disabled={isLoadingNewFeed}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFeedConfirm}
              variant="contained"
              disabled={isLoadingNewFeed || !newFeedUrl.trim()}
              sx={{
                backgroundColor: '#000',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              {isLoadingNewFeed ? 'Adding...' : 'Add Feed'}
            </Button>
          </DialogActions>
        </Dialog>

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
                      Default Career Fields
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {Object.keys(mappings).map((field) => {
                        const isDefaultField = defaultFields.includes(field);

                        return (
                          <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {editingField === field && !isDefaultField ? (
                              <TextField
                                fullWidth
                                size="small"
                                value={editingFieldName}
                                onChange={(e) => setEditingFieldName(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleConfirmEditField();
                                  } else if (e.key === 'Escape') {
                                    handleCancelEditField();
                                  }
                                }}
                                sx={{ backgroundColor: 'white' }}
                                autoFocus
                              />
                            ) : (
                              <TextField
                                fullWidth
                                size="small"
                                label={field}
                                value={field}
                                disabled
                                sx={{
                                  backgroundColor: isDefaultField ? '#f9f9f9' : '#fff3e0' // Different color for custom fields
                                }}
                              />
                            )}

                            <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                              {editingField === field && !isDefaultField ? (
                                <>
                                  <IconButton
                                    size="small"
                                    onClick={handleConfirmEditField}
                                    disabled={!editingFieldName.trim() || (editingFieldName.trim() !== editingField && mappings.hasOwnProperty(editingFieldName.trim()))}
                                    sx={{ color: 'green' }}
                                  >
                                    ✓
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={handleCancelEditField}
                                    sx={{ color: 'red' }}
                                  >
                                    ✕
                                  </IconButton>
                                </>
                              ) : (
                                // Only show edit/delete buttons for custom fields (non-default)
                                !isDefaultField && (
                                  <>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditField(field)}
                                      sx={{ color: '#666' }}
                                    >
                                      ✏️
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDeleteField(field)}
                                      sx={{ color: 'red' }}
                                    >
                                      🗑️
                                    </IconButton>
                                  </>
                                )
                              )}
                            </Box>
                          </Box>
                        );
                      })}

                      {/* Add new field row */}
                      {isAddingField && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter field name"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleConfirmAddField();
                              } else if (e.key === 'Escape') {
                                handleCancelAddField();
                              }
                            }}
                            sx={{ backgroundColor: 'white' }}
                            autoFocus
                          />
                          <Box sx={{ display: 'flex', gap: 0.5, minWidth: 'fit-content' }}>
                            <IconButton
                              size="small"
                              onClick={handleConfirmAddField}
                              disabled={!newFieldName.trim() || mappings.hasOwnProperty(newFieldName.trim())}
                              sx={{ color: 'green' }}
                            >
                              ✓
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={handleCancelAddField}
                              sx={{ color: 'red' }}
                            >
                              ✕
                            </IconButton>
                          </Box>
                        </Box>
                      )}
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
                            {availableNodes
                              .filter(node =>
                                // Show node if it's not mapped to any other field OR if it's currently mapped to this field
                                !Object.entries(mappings).some(([key, value]) => value === node && key !== field)
                              )
                              .map((node) => (
                                <MenuItem key={node} value={node}>
                                  {node}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      ))}

                      {/* Placeholder for new field mapping */}
                      {isAddingField && (
                        <FormControl fullWidth size="small" disabled>
                          <InputLabel>Select Node</InputLabel>
                          <Select
                            value=""
                            label="Select Node"
                            sx={{ backgroundColor: '#f5f5f5' }}
                          >
                            <MenuItem value="">
                              <em>Add field first</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, my: 3 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddField}
                        disabled={isAddingField || editingField !== null}
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
                      {availableNodes
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

        {/* Additional Feeds Section */}
        {feeds.map((feed, index) => (
          <Paper
            key={feed.id}
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: '#ffffff',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Feed Mapping {index + 2}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  size="small"
                  value={feed.url}
                  disabled
                  sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f5f5f5',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      color: 'rgba(0, 0, 0, 0.6)',
                    }
                  }}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveFeed(feed.id)}
                  sx={{ ml: 1 }}
                >
                  <Box sx={{ fontSize: 16 }}>×</Box>
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    Total Jobs: <strong>{feed.totalJobs}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    Feed Type: <strong>{feed.feedType}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    Last Updated: <strong>{new Date(feed.lastUpdated).toLocaleDateString()}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    Nodes Found: <strong>{feed.nodes.length}</strong>
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
                    {Object.keys(feed.mappings).map((field) => {
                      const isDefaultField = defaultFields.includes(field);

                      return (
                        <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label={field}
                            value={field}
                            disabled
                            sx={{
                              backgroundColor: isDefaultField ? '#f9f9f9' : '#fff3e0' // Different color for custom fields
                            }}
                          />
                          {/* Only show delete button for custom fields (non-default) */}
                          {!isDefaultField && (
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newMappings = { ...feed.mappings };
                                delete newMappings[field];
                                setFeeds(prev => prev.map(f =>
                                  f.id === feed.id
                                    ? { ...f, mappings: newMappings }
                                    : f
                                ));
                              }}
                              sx={{ color: 'red' }}
                            >
                              🗑️
                            </IconButton>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Feed Nodes
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(feed.mappings).map((field) => (
                      <FormControl key={field} fullWidth size="small">
                        <InputLabel>Select Node</InputLabel>
                        <Select
                          value={feed.mappings[field]}
                          label="Select Node"
                          onChange={(e) => handleAdditionalFeedMappingChange(feed.id, field, e.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {feed.nodes
                            .filter(node =>
                              // Show node if it's not mapped to any other field OR if it's currently mapped to this field
                              !Object.entries(feed.mappings).some(([key, value]) => value === node && key !== field)
                            )
                            .map((node) => (
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
                      onClick={() => {
                        const fieldName = prompt('Enter field name:');
                        if (fieldName && fieldName.trim() && !feed.mappings.hasOwnProperty(fieldName.trim())) {
                          handleAddFieldToFeed(feed.id, fieldName.trim());
                        }
                      }}
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
                      onClick={() => {
                        const mappedFields = Object.entries(feed.mappings).filter(([key, value]) => value.trim() !== '');
                        if (mappedFields.length === 0) {
                          alert('Please map at least one field before proceeding.');
                          return;
                        }
                        console.log(`Feed ${feed.id} mappings saved:`, feed.mappings);
                      }}
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
                      onClick={() => {
                        const resetMappings = Object.keys(feed.mappings).reduce((acc, key) => {
                          acc[key] = '';
                          return acc;
                        }, {});
                        setFeeds(prev => prev.map(f =>
                          f.id === feed.id
                            ? { ...f, mappings: resetMappings }
                            : f
                        ));
                      }}
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
                    {feed.nodes
                      .filter(node => !Object.values(feed.mappings).includes(node))
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
          </Paper>
        ))}

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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Advertiser Name"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Exported Name"
                value={exportedName}
                onChange={(e) => setExportedName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                  <MenuItem value="SGD">SGD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="SG">Singapore</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industry}
                  label="Industry"
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Mark Type</InputLabel>
                <Select
                  value={markType}
                  label="Mark Type"
                  onChange={(e) => setMarkType(e.target.value)}
                >
                  <MenuItem value="Markup">Markup</MenuItem>
                  <MenuItem value="Markdown">Markdown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Markup (%)"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Markdown (%)"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={timeZone}
                  label="Time Zone"
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="SGT">SGT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Client Type</InputLabel>
                <Select
                  value={clientType}
                  label="Client Type"
                  onChange={(e) => setClientType(e.target.value)}
                >
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Show Dashboards</InputLabel>
                <Select
                  value={showDashboards}
                  label="Show Dashboards"
                  onChange={(e) => setShowDashboards(e.target.value)}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Click Filters"
                value={clickFilters}
                onChange={(e) => setClickFilters(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Click Filter Redirect URL"
                value={clickFilterRedirectUrl}
                onChange={(e) => setClickFilterRedirectUrl(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Spend Type CPA"
                value={spendTypeCpa}
                onChange={(e) => setSpendTypeCpa(e.target.value)}
                size="small"
                type="number"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Inspect Feed Section - ADD THIS NEW SECTION */}
        {(feedData || feeds.length > 0) && (
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
              Inspect Feed
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Shows respective count and details for all the Nodes in the feed.
            </Typography>

            {/* Main Feed Inspection */}
            {feedData && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Primary Feed
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Select Nodes</InputLabel>
                    <Select
                      value=""
                      label="Select Nodes"
                    >
                      <MenuItem value="">Select an option</MenuItem>
                      {availableNodes.map((node) => (
                        <MenuItem key={node} value={node}>
                          {node}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                      Rows per page:
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 60 }}>
                      <Select value={10} sx={{ fontSize: '0.875rem' }}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                  {/* Career Fields Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Career Fields
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {availableNodes.slice(0, 10).map((node, index) => (
                        <Typography key={node} variant="body2" sx={{ py: 0.5 }}>
                          {node.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Feed Nodes Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Feed Nodes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {availableNodes.slice(0, 10).map((node, index) => (
                        <Typography key={node} variant="body2" sx={{ py: 0.5, fontWeight: 500 }}>
                          {Math.floor(Math.random() * 1000) + 100}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Actions Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {availableNodes.slice(0, 10).map((node, index) => (
                        <Box key={node} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                          <Button
                            size="small"
                            sx={{
                              textTransform: 'none',
                              color: '#1976d2',
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              p: 0
                            }}
                            onClick={() => toast.info(`Viewing details for ${node}`)}
                          >
                            👁 Details
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              textTransform: 'none',
                              color: '#1976d2',
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              p: 0,
                              ml: 1
                            }}
                            onClick={() => toast.success(`Downloading CSV for ${node}`)}
                          >
                            📥 Download CSV
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Chart Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Chart
                    </Typography>
                    <Box sx={{
                      height: 200,
                      backgroundColor: '#f8f9fa',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e0e0e0'
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          {[40, 60, 30, 80, 90, 35].map((height, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 15,
                                height: height,
                                backgroundColor: i % 2 === 0 ? '#4caf50' : '#2196f3',
                                borderRadius: '2px 2px 0 0'
                              }}
                            />
                          ))}
                        </Box>
                        <Typography variant="caption" color="textSecondary">
                          Node Distribution
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: '#666', mt: 2 }}>
                  Total Count: <strong>{feedData.totalJobs}</strong>
                </Typography>
              </Box>
            )}

            {/* Additional Feeds Inspection */}
            {feeds.map((feed, index) => (
              <Box key={feed.id} sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Additional Feed #{index + 1}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Select Nodes</InputLabel>
                    <Select
                      value=""
                      label="Select Nodes"
                    >
                      <MenuItem value="">Select an option</MenuItem>
                      {feed.nodes.map((node) => (
                        <MenuItem key={node} value={node}>
                          {node}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                      Rows per page:
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 60 }}>
                      <Select value={10} sx={{ fontSize: '0.875rem' }}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                  {/* Career Fields Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Career Fields
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {feed.nodes.slice(0, 10).map((node, nodeIndex) => (
                        <Typography key={node} variant="body2" sx={{ py: 0.5 }}>
                          {node.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Feed Nodes Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Feed Nodes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {feed.nodes.slice(0, 10).map((node, nodeIndex) => (
                        <Typography key={node} variant="body2" sx={{ py: 0.5, fontWeight: 500 }}>
                          {Math.floor(Math.random() * 1000) + 100}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Actions Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {feed.nodes.slice(0, 10).map((node, nodeIndex) => (
                        <Box key={node} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                          <Button
                            size="small"
                            sx={{
                              textTransform: 'none',
                              color: '#1976d2',
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              p: 0
                            }}
                            onClick={() => toast.info(`Viewing details for ${node} in feed ${index + 2}`)}
                          >
                            👁 Details
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              textTransform: 'none',
                              color: '#1976d2',
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              p: 0,
                              ml: 1
                            }}
                            onClick={() => toast.success(`Downloading CSV for ${node} from feed ${index + 2}`)}
                          >
                            📥 Download CSV
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Chart Column */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#666' }}>
                      Chart
                    </Typography>
                    <Box sx={{
                      height: 200,
                      backgroundColor: '#f8f9fa',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e0e0e0'
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          {[35, 70, 45, 60, 80, 25].map((height, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 15,
                                height: height,
                                backgroundColor: i % 2 === 0 ? '#ff9800' : '#9c27b0',
                                borderRadius: '2px 2px 0 0'
                              }}
                            />
                          ))}
                        </Box>
                        <Typography variant="caption" color="textSecondary">
                          Node Distribution
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: '#666', mt: 2 }}>
                  Total Count: <strong>{feed.totalJobs}</strong>
                </Typography>
              </Box>
            ))}
          </Paper>
        )}

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
      </Box>
    </Box>
  );
};

export default AddClient;