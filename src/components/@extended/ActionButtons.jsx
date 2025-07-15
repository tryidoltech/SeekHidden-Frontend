import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

const ActionButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate('/job-status');
            }}
          >
            Job Stats
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate('/conversion-tracking');
            }}
          >
            Conversion Tracking
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate('/publisher-management');
            }}
          >
            Publisher Management
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ActionButtons;
