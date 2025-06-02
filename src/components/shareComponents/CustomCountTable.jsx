import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from '@mui/material';

const CustomCountTable = ({ headers = [], rows = [] }) => {
  const totalCount = rows.reduce((acc, row) => acc + (row[headers[1].key] || 0), 0);

  return (
    <Box sx={{ margin: 'auto' }} minWidth={360}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ py: '8px' }}>
                  <strong>{header.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex} sx={{ py: '4px' }}>
                    {row[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            <strong>Total Count:</strong> {totalCount}
          </Typography>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CustomCountTable;
