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

  const FeedInspectionSection = ({ feed, feedName }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        {feedName}
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
            <Select 
              value={rowsPerPage} 
              onChange={(e) => setRowsPerPage(e.target.value)}
              sx={{ fontSize: '0.875rem' }}
            >
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
            {feed.nodes.slice(0, rowsPerPage).map((node) => (
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
            {feed.nodes.slice(0, rowsPerPage).map((node) => (
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
            {feed.nodes.slice(0, rowsPerPage).map((node) => (
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
        Total Count: <strong>{feed.totalJobs}</strong>
      </Typography>
    </Box>
  );

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
              Shows respective count and details for all the Nodes in the selected feed.
            </Typography>
            
            <FeedInspectionSection 
              feed={currentFeed} 
              feedName={currentFeed.name}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default InspectFeedClient;