import React from 'react';
import Chart from 'react-apexcharts';
import { Paper, Typography } from '@mui/material';

const MultiLineChart = ({ title = 'Multi-Series Line Chart', seriesData, categories }) => {
  const options = {
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    markers: {
      size: 6
    },
    xaxis: {
      categories: categories || Array.from({ length: 10 }, (_, i) => i.toString()),
      title: {
        text: 'Index'
      }
    },
    yaxis: {
      min: 0,
      max: 1000,
      title: {
        text: 'Value'
      }
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: { radius: 12 }
    },
    colors: ['#6c5ce7', '#00cec9', '#fd79a8', '#0984e3', '#636e72']
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Chart options={options} series={seriesData} type="line" height={400} />
    </Paper>
  );
};

export default MultiLineChart;
