import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';

const BarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [''],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        show: true,
        style: { fontSize: '12px' }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 0
    },
    colors: ['#00008B', '#9ACD32', '#002222', '#9932CC', '#90EE90', '#ADFF2F', '#C71585']
  };

  const series = [
    {
      name: 'Values',
      data: [56, 52, 1, 22, 72, 75, 30]
    }
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', height: '100%' }}>
      <Typography variant="h6" fontWeight="bold">
        Chart
      </Typography>
      <Chart options={options} series={series} type="bar" height="236px" />
    </Box>
  );
};

export default BarChart;
