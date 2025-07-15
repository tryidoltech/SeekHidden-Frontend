import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style
import 'react-date-range/dist/theme/default.css'; // theme css

import { Stack, Typography, TextField, Box } from '@mui/material';

export default function SingleInputDateRangePicker() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (ranges) => {
    setRange([ranges.selection]);
  };

  // Format date range as string for TextField value
  const dateRange = `${format(range[0].startDate, 'dd/MM/yyyy')} - ${format(range[0].endDate, 'dd/MM/yyyy')}`;

  return (
    <Box sx={{ position: 'relative', width: 300 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2">Date Range :</Typography>
        <TextField
          size="small"
          value={dateRange}
          onClick={() => setShowPicker((prev) => !prev)}
          readOnly
          sx={{ minWidth: 200, cursor: 'pointer' }}
        />
      </Stack>
      {showPicker && (
        <Box sx={{ position: 'absolute', zIndex: 10 }}>
          <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={['#3f51b5']}
          />
        </Box>
      )}
    </Box>
  );
}
