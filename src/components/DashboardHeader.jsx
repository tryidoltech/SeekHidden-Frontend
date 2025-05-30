import { Box, Button, Stack } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublishIcon from '@mui/icons-material/Publish';

const DashboardHeader = ({ sx, ...other }) => {
  const handleJobStats = () => {
    console.log('Job Stats clicked');
  };

  const handleConversionTracking = () => {
    console.log('Conversion Tracking clicked');
  };

  const handlePublisherManagement = () => {
    console.log('Publisher Management clicked');
  };

  return (
    <Box 
      sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'flex-end',
        ...sx 
      }} 
      {...other}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 1, sm: 2 }}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        <Button
          variant="outlined"
          startIcon={<BarChartIcon />}
          onClick={handleJobStats}
          sx={{
            borderColor: '#e0e0e0',
            color: '#333',
            backgroundColor: 'white',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            padding: '8px 16px',
            minWidth: { xs: '100%', sm: '160px' },
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: '#f8f9fa'
            }
          }}
        >
          Job Stats
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<TrendingUpIcon />}
          onClick={handleConversionTracking}
          sx={{
            borderColor: '#e0e0e0',
            color: '#333',
            backgroundColor: 'white',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            padding: '8px 16px',
            minWidth: { xs: '100%', sm: '180px' },
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: '#f8f9fa'
            }
          }}
        >
          Conversion Tracking
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<PublishIcon />}
          onClick={handlePublisherManagement}
          sx={{
            borderColor: '#e0e0e0',
            color: '#333',
            backgroundColor: 'white',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            padding: '8px 16px',
            minWidth: { xs: '100%', sm: '200px' },
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: '#f8f9fa'
            }
          }}
        >
          Publisher Management
        </Button>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;