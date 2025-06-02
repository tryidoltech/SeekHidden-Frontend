import React, { useState } from "react";
import MainCard from 'components/MainCard';
import { Stack } from "@mui/system";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";

const FilterBy = () => {
  const [filterBy, setFilterBy] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dynamic arrays
  const filterOptions = ["CPC", "CPA", "Company", "Category", "Stats", "City"];
  const rowsPerPageOptions = [5, 10, 25, 50];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const placeholderStyle = { color: '#9e9e9e' };

  return (
    <MainCard sx={{ overflow: 'visible' }}>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Filter Dropdown */}
        <Box sx={{ minWidth: 160, flexGrow: 1, maxWidth: 220 }}>
          <InputLabel id="filters">Filters</InputLabel>
          <Select
            labelId="filters"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            displayEmpty
            fullWidth
            renderValue={(selected) =>
              selected ? selected : <span style={placeholderStyle}>Select an option</span>
            }
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Rows Per Page */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Rows per page:</Typography>
          <FormControl size="small" variant="outlined">
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              {rowsPerPageOptions.map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </MainCard>
  );
};

export default FilterBy;
