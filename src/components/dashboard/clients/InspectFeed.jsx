import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const InspectFeedClient = () => {
  const [selectedFeedId, setSelectedFeedId] = useState('');
  const [availableFeeds, setAvailableFeeds] = useState([]);
  const [currentFeed, setCurrentFeed] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock feeds data - in real app, this would come from props or API
  useEffect(() => {
    // This would typically come from a parent component or API call
    const mockFeeds = [
      {
        id: 'primary',
        name: 'Primary Feed',
        url: 'https://example.com/feed1.xml',
        totalJobs: 1247,
        nodes: [
          'job_id', 'title', 'description', 'company', 'location',
          'salary', 'job_type', 'posted_date', 'expiry_date', 'apply_url',
          'category', 'requirements', 'benefits', 'experience_level',
          'city', 'state', 'country', 'zip_code', 'source', 'modified_date'
        ]
      },
      {
        id: 'secondary',
        name: 'Secondary Feed',
        url: 'https://example.com/feed2.xml',
        totalJobs: 890,
        nodes: [
          'job_reference', 'job_title', 'job_description', 'employer', 'job_location',
          'compensation', 'employment_type', 'publication_date', 'deadline', 'application_url',
          'job_category', 'qualifications', 'perks', 'seniority_level',
          'city_name', 'state_code', 'country_code', 'postal_code', 'feed_source'
        ]
      }
    ];
    setAvailableFeeds(mockFeeds);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleFeedChange = (feedId) => {
    setSelectedFeedId(feedId);
    const feed = availableFeeds.find(f => f.id === feedId);
    setCurrentFeed(feed);
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
            Inspect Feed
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 300 }}>
            <InputLabel>Select Feed to Inspect</InputLabel>
            <Select
              value={selectedFeedId}
              label="Select Feed to Inspect"
              onChange={(e) => handleFeedChange(e.target.value)}
              sx={{ backgroundColor: 'white' }}
            >
              {availableFeeds.map((feed) => (
                <MenuItem key={feed.id} value={feed.id}>
                  {feed.name} ({feed.totalJobs} jobs)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Feed Selection Info */}
      {currentFeed && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: '#e3f2fd',
            borderRadius: 2,
            mb: 3,
            border: '1px solid #bbdefb'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Inspecting: <strong>{currentFeed.name}</strong>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                URL: {currentFeed.url}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <Typography variant="body2">
                <strong>{currentFeed.totalJobs}</strong> total jobs
              </Typography>
              <Typography variant="body2">
                <strong>{currentFeed.nodes.length}</strong> nodes available
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: '#ffffff',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Feed Inspection Details
        </Typography>
        
        {!currentFeed ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            border: '2px dashed #dee2e6'
          }}>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No Feed Selected
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please select a feed from the dropdown above to inspect its contents.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Comprehensive feed analysis showing statistics, node details, and processing information.
            </Typography>
            
            {/* Feed Summary Statistics */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Feed Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                      {currentFeed.totalJobs?.toLocaleString() || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                      Total Jobs
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                      {currentFeed.nodes?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                      Feed Nodes
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#ed6c02', mb: 1 }}>
                      {Math.floor(currentFeed.nodes?.length * 0.7) || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                      Active Nodes
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#d32f2f', mb: 1 }}>
                      {Math.floor(currentFeed.nodes?.length * 0.3) || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                      Inactive Nodes
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            {/* Feed Node Analysis */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Node Analysis
              </Typography>
              <TableContainer component={Paper} sx={{ 
                maxHeight: 500, 
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                '& .MuiTableHead-root': {
                  backgroundColor: '#f5f5f5'
                }
              }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Node Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Data Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Sample Value</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Record Count</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5', py: 2 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentFeed.nodes?.map((node, index) => {
                      const isActive = Math.random() > 0.3;
                      const sampleValues = [
                        'Software Engineer', 'Marketing Manager', 'Data Analyst', 'Product Designer',
                        'Sales Representative', 'Full Time', 'Part Time', 'Contract', 'Remote',
                        'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Singapore', 'London, UK',
                        '2024-12-15', '$75,000 - $95,000', 'https://apply.company.com', 'Technology'
                      ];
                      const dataTypes = ['String', 'Number', 'Date', 'URL', 'Text', 'Currency'];
                      const recordCount = Math.floor(Math.random() * 1000) + 100;

                      return (
                        <TableRow 
                          key={node} 
                          sx={{ 
                            '&:hover': { backgroundColor: '#f8f9fa' },
                            '&:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                          }}
                        >
                          <TableCell sx={{ fontWeight: 500, py: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {node}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={dataTypes[index % dataTypes.length]}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                backgroundColor: '#fff'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ maxWidth: 250, wordBreak: 'break-word', py: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                              {sampleValues[index % sampleValues.length]}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500, py: 2 }}>
                            <Typography variant="body2">
                              {recordCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={isActive ? 'Active' : 'Inactive'}
                              size="small"
                              color={isActive ? 'success' : 'default'}
                              sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  textTransform: 'none',
                                  fontSize: '0.75rem',
                                  minWidth: 'auto',
                                  px: 1.5,
                                  py: 0.5
                                }}
                                onClick={() => toast.info(`Viewing details for ${node}`)}
                              >
                                View
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  textTransform: 'none',
                                  fontSize: '0.75rem',
                                  minWidth: 'auto',
                                  px: 1.5,
                                  py: 0.5
                                }}
                                onClick={() => toast.success(`Downloading data for ${node}`)}
                              >
                                Export
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Feed Metadata */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Feed Metadata
              </Typography>
              <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Feed URL"
                      value={currentFeed.url}
                      disabled
                      size="small"
                      sx={{ 
                        mb: 2,
                        '& .MuiInputBase-input': {
                          fontFamily: 'monospace',
                          fontSize: '0.875rem'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Feed Type"
                      value="XML"
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Encoding"
                      value="UTF-8"
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="File Size"
                      value="2.4 MB"
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Last Updated"
                      value={new Date().toLocaleString()}
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            {/* Processing Log */}
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Processing Log
              </Typography>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa' 
              }}>
                <Box sx={{
                  backgroundColor: '#fff',
                  p: 2,
                  borderRadius: 1,
                  maxHeight: 250,
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  border: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                    ✓ Feed URL validated successfully
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                    ✓ XML structure parsed - {currentFeed.nodes?.length || 0} nodes discovered
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                    ✓ Job data extracted - {currentFeed.totalJobs?.toLocaleString() || 0} jobs processed
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#17a2b8', mb: 0.5, fontWeight: 500 }}>
                    ℹ Data types identified and categorized
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffc107', mb: 0.5, fontWeight: 500 }}>
                    ⚠ {Math.floor(currentFeed.nodes?.length * 0.3) || 0} nodes have low activity
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#28a745', mb: 0.5, fontWeight: 500 }}>
                    ✓ Data validation completed successfully
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6c757d', fontWeight: 500 }}>
                    📊 Analysis completed at: {new Date().toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default InspectFeedClient;