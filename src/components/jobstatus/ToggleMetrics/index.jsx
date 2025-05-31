import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { Stack } from '@mui/system';



const colors = [
  '#48005426', '#2500AA26', '#FF000026', '#03C04A26', '#FE9D0126', '#DC0C5F26', '#00E1ED26', '#67F61526'
];

const clientNames = Array.from({ length: 32 }, (_, i) => ({
  name: 'Client Name - XYZ - CPA - US',
  color: colors[i % colors.length],
}));

const ToggleMetrics = () => {
  return (
    <div> <MainCard>
         <Stack direction="column" spacing={1}>

<Stack direction="row" sx={{gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
  
       <Button 
  variant="togglemetrics" 
  sx={{ backgroundColor: 'black',mr:10, color: 'white', '&:hover': { backgroundColor: '#333' } }}
>
 Toggle Metrics (AVG_CPC)
</Button>
    </Stack>
    <Stack>
           <Box sx={{ width: '100%'}}>
      <Grid  container spacing={1} sx={{ width: '100%', margin: 0 }}>
        {clientNames.map((client, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} >
            <Box display="flex" alignItems="center" spacing={4} >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: client.color,
                  border: '1px solid black',
                  mr:1
                                  }}
              />
              <Typography variant="body2">{client.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box></Stack>
    </Stack> </MainCard>

    </div>
  )
}

export default ToggleMetrics