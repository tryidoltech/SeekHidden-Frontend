import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack, Box, TextField, InputAdornment } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { Grid } from '@mui/system';
import { Copy } from 'iconsax-react';

const ConversionTracking = () => {
const [client, setClient] = useState('');
const handleCopy = (text) => {
    alert(text)
  };
 

  const placeholderStyle = { color: '#9e9e9e' }; 

  return (
    
    <Stack spacing={2}>
    <MainCard sx={{ overflow: 'visible' }}> 
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box sx={{ minWidth: 160, flexGrow: 1 }} spacing={2}>
          <InputLabel id="selectClient-label">Select Client</InputLabel>
          <Select
            labelId="selectClient-label"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            displayEmpty
            renderValue={(selected) =>
              selected ? selected : <span style={placeholderStyle}>Select an option</span>
            }
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Client
            </MenuItem>
            <MenuItem value="Amazon">Amazon</MenuItem>
            <MenuItem value="Myntra">Myntra</MenuItem>
            <MenuItem value="Flipkart">Flipkart</MenuItem>
          </Select>
        </Box>

        {/* Button */}
    <Stack
  direction="row"
  spacing={2}
  justifyContent="flex-end"
  alignItems="center"  
  
>  <Box >
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'black',
        mt: 2 ,
        color: 'white',
        '&:hover': { backgroundColor: '#333' },
      }}
    >
      Show Codes
    </Button>
  </Box>
      </Stack>

      </Stack>

      
 
    </MainCard>
<MainCard sx={{ overflow: 'visible' }}>
  <Grid container spacing={2.5} width="100%">
    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ViewJSPixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
          View JS Pixel
        </InputLabel>
         <TextField
        fullWidth
        id="ViewJSPixel"
        placeholder="URL"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('copy url')}>
    <Copy size="20" color="#FF8A65" />
  </Box>
            </InputAdornment>
          ),
        }}
      />
      </Box>
    </Grid>

    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ApplyStartJSPixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
          Apply Start JS Pixel
        </InputLabel>
          <TextField
        fullWidth
        id="ApplyStartJSPixel"
        placeholder="URL"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
    <Copy size="20" color="#FF8A65" />
  </Box>
            </InputAdornment>
          ),
        }}
      />
      </Box>
    </Grid>

    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ApplyEndJSPixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
          Apply End JS Pixel
        </InputLabel>
        <TextField
        fullWidth
        id="ApplyEndJSPixel"
        placeholder="URL"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
    <Copy size="20" color="#FF8A65" />
  </Box>
            </InputAdornment>
          ),
        }}
      />
      </Box>
    </Grid>
  </Grid>
</MainCard>
<MainCard sx={{ overflow: 'visible' }}>
  <Grid container spacing={2.5} width="100%">
    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ViewImagePixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
     View Image Pixel
        </InputLabel>
        <TextField fullWidth id="ViewImagePixel" placeholder="URL" autoFocus />
        
      </Box>
    </Grid>

    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ApplyStartImagePixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
          Apply Start Image Pixel
        </InputLabel>
        <TextField fullWidth id="ApplyStartImagePixel" placeholder="URL" autoFocus />
      </Box>
    </Grid>

    <Grid item xs={12} sm={6} width="100%">
      <Box display="flex" alignItems="center" width="100%">
        <InputLabel
          htmlFor="ApplyEndImagePixel"
          sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
        >
          Apply End Image Pixel
        </InputLabel>
        <TextField fullWidth id="ApplyEndImagePixel" placeholder="URL" autoFocus />
      </Box>
    </Grid>
  </Grid>
</MainCard>

    </Stack>
  );
};

export default ConversionTracking;
