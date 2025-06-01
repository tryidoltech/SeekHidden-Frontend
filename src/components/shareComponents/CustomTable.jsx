import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import MainCard from 'components/MainCard';

const SharedTable = ({ title, data, headers, withPagination = false }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const paginatedData = withPagination ? data.slice(0, rowsPerPage) : data;

  const rowsPerPageControl = withPagination && (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">Rows per page:</Typography>
      <FormControl size="small" variant="outlined">
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          {[5, 10, 25, 50].map((count) => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <MainCard content={false} title={title} secondary={rowsPerPageControl}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label={title || 'table'}>
          <TableHead>
            <TableRow>
              {headers.map(({ label, key }) => (
                <TableCell key={key} align="center">
                  <Typography variant="subtitle2" align="center">
                    {label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {headers.map(({ key }) => (
                  <TableCell key={key} align="center">
                    <Typography variant="body2" align="center">
                      {row[key]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default SharedTable;
