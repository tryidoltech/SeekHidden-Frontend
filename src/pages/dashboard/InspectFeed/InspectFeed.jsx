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
import FilterBy from "../../../components/inspectfeed/filterBy";
import BarChartComponent from "../../../components/shareComponents/BarChartComponent";
import CareerFeeds from "../../../components/inspectfeed/CareerFields";

const InspectFeed = () => {
  const [filterBy, setFilterBy] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const placeholderStyle = { color: '#9e9e9e' };

  return (
    <Stack spacing={2}>
        <FilterBy />
   <Stack
 direction={{ sm: 'column', md: 'row' }}
  spacing={4}
  width="100"
  flexWrap="wrap" 
  alignItems="center"
  justifyContent="space-between"
>
  {/* Left side - CareerFeeds */}
  <Box sx={{ flex: 1 }} width="100%">
    <CareerFeeds />
  </Box>

  {/* Right side - Bar Chart in MainCard */}
  <Box sx={{ flex: 1 }} width="100%">
    <MainCard>
      <BarChartComponent />
    </MainCard>
  </Box>
</Stack>
    </Stack>
  );
};

export default InspectFeed;
