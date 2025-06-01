import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const LineChart = ({ title, series, categories }) => {
  const options = {
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: false },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    xaxis: {
      categories: categories,
      labels: { style: { colors: '#000' } },
    },
    yaxis: {
      min: 0,
      max: 380,
      tickAmount: 4,
      labels: { style: { colors: '#000' } },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: { radius: 12 },
    },
    grid: {
      show: true,
      borderColor: '#e0e0e0',
    },
    colors: ['#5A2A83', '#A0D468', '#888888', '#90C695'], // Styled similar to your image
  };

  return (
    <MainCard>
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6"  gutterBottom>
        {title}
      </Typography>
      <Chart options={options} series={series}  type="line" height={400} />
    </Box>
    </MainCard>
  );
};

export default LineChart;