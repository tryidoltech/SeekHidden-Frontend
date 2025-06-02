import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from '@mui/material';
import CustomCountTable from '../shareComponents/CustomCountTable';

const headers = [
  { label: 'Career Fields', key: 'field' },
  { label: 'Feed Nodes', key: 'feedCount' }
];

const data = [
  { field: 'Career Fields', feedCount: 150 },
  { field: 'Career Fields', feedCount: 200 },
  { field: 'Career Fields', feedCount: 316 },
  { field: 'Career Fields', feedCount: 480 },
  { field: 'Career Fields', feedCount: 500 },
  { field: 'Career Fields', feedCount: 600 },
  { field: 'Career Fields', feedCount: 400 },
];

// Calculate total count
const totalCount = data.reduce((acc, row) => acc + row.feedCount, 0);

const CareerFeeds = () => {
  return (
    <CustomCountTable rows={data} headers={headers}/>
  );
};

export default CareerFeeds;