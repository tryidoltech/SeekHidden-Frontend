// // import React, { useState } from 'react';
// // import InputLabel from '@mui/material/InputLabel';
// // import MenuItem from '@mui/material/MenuItem';
// // import Select from '@mui/material/Select';
// // import { Stack, Box, TextField, InputAdornment } from '@mui/material';
// // import MainCard from 'components/MainCard';
// // import Button from '@mui/material/Button';
// // import { Grid } from '@mui/system';
// // import { Copy } from 'iconsax-react';

// // const ConversionTracking = () => {
// // const [client, setClient] = useState('');
// // const handleCopy = (text) => {
// //     alert(text)
// //   };
 

// //   const placeholderStyle = { color: '#9e9e9e' }; 

// //   return (
    
// //     <Stack spacing={2}>
// //     <MainCard sx={{ overflow: 'visible' }}> 
// //       <Stack
// //         direction="row"
// //         spacing={2}
// //         flexWrap="wrap"
// //         alignItems="center"
// //         justifyContent="space-between"
// //       >
// //         <Box sx={{ minWidth: 160, flexGrow: 1 }} spacing={2}>
// //           <InputLabel id="selectClient-label">Select Client</InputLabel>
// //           <Select
// //             labelId="selectClient-label"
// //             value={client}
// //             onChange={(e) => setClient(e.target.value)}
// //             displayEmpty
// //             renderValue={(selected) =>
// //               selected ? selected : <span style={placeholderStyle}>Select an option</span>
// //             }
// //             fullWidth
// //           >
// //             <MenuItem value="" disabled>
// //               Select Client
// //             </MenuItem>
// //             <MenuItem value="Amazon">Amazon</MenuItem>
// //             <MenuItem value="Myntra">Myntra</MenuItem>
// //             <MenuItem value="Flipkart">Flipkart</MenuItem>
// //           </Select>
// //         </Box>

// //         {/* Button */}
// //     <Stack
// //   direction="row"
// //   spacing={2}
// //   justifyContent="flex-end"
// //   alignItems="center"  
  
// // >  <Box >
// //     <Button
// //       variant="contained"
// //       sx={{
// //         backgroundColor: 'black',
// //         mt: 2 ,
// //         color: 'white',
// //         '&:hover': { backgroundColor: '#333' },
// //       }}
// //     >
// //       Show Codes
// //     </Button>
// //   </Box>
// //       </Stack>

// //       </Stack>

      
 
// //     </MainCard>
// // <MainCard sx={{ overflow: 'visible' }}>
// //   <Grid container spacing={2.5} width="100%">
// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ViewJSPixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //           View JS Pixel
// //         </InputLabel>
// //          <TextField
// //         fullWidth
// //         id="ViewJSPixel"
// //         placeholder="URL"
// //         autoFocus
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //             <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('copy url')}>
// //     <Copy size="20" color="#FF8A65" />
// //   </Box>
// //             </InputAdornment>
// //           ),
// //         }}
// //       />
// //       </Box>
// //     </Grid>

// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ApplyStartJSPixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //           Apply Start JS Pixel
// //         </InputLabel>
// //           <TextField
// //         fullWidth
// //         id="ApplyStartJSPixel"
// //         placeholder="URL"
// //         autoFocus
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //             <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
// //     <Copy size="20" color="#FF8A65" />
// //   </Box>
// //             </InputAdornment>
// //           ),
// //         }}
// //       />
// //       </Box>
// //     </Grid>

// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ApplyEndJSPixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //           Apply End JS Pixel
// //         </InputLabel>
// //         <TextField
// //         fullWidth
// //         id="ApplyEndJSPixel"
// //         placeholder="URL"
// //         autoFocus
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //               <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
// //     <Copy size="20" color="#FF8A65" />
// //   </Box>
// //             </InputAdornment>
// //           ),
// //         }}
// //       />
// //       </Box>
// //     </Grid>
// //   </Grid>
// // </MainCard>
// // <MainCard sx={{ overflow: 'visible' }}>
// //   <Grid container spacing={2.5} width="100%">
// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ViewImagePixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //      View Image Pixel
// //         </InputLabel>
// //         <TextField fullWidth id="ViewImagePixel" placeholder="URL" autoFocus />
        
// //       </Box>
// //     </Grid>

// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ApplyStartImagePixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //           Apply Start Image Pixel
// //         </InputLabel>
// //         <TextField fullWidth id="ApplyStartImagePixel" placeholder="URL" autoFocus />
// //       </Box>
// //     </Grid>

// //     <Grid item xs={12} sm={6} width="100%">
// //       <Box display="flex" alignItems="center" width="100%">
// //         <InputLabel
// //           htmlFor="ApplyEndImagePixel"
// //           sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
// //         >
// //           Apply End Image Pixel
// //         </InputLabel>
// //         <TextField fullWidth id="ApplyEndImagePixel" placeholder="URL" autoFocus />
// //       </Box>
// //     </Grid>
// //   </Grid>
// // </MainCard>

// //     </Stack>
// //   );
// // };

// // export default ConversionTracking;
// import React, { useState } from 'react';
// import { Box, Tabs, Tab } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { Stack, TextField, InputAdornment } from '@mui/material';
// import MainCard from 'components/MainCard';
// import Button from '@mui/material/Button';
// import { Grid } from '@mui/system';
// import { Copy } from 'iconsax-react';

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`conversion-tabpanel-${index}`}
//       aria-labelledby={`conversion-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `conversion-tab-${index}`,
//     "aria-controls": `conversion-tabpanel-${index}`,
//   };
// }

// const ConversionTracking = () => {
//   const [client, setClient] = useState('');
//   const [tabValue, setTabValue] = useState(0);
//   const placeholderStyle = { color: '#9e9e9e' };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleCopy = (text) => {
//     alert(text);
//   };

//   return (
//     <Stack spacing={2}>
//       <MainCard sx={{ overflow: 'visible' }}> 
//         <Stack
//           direction="row"
//           spacing={2}
//           flexWrap="wrap"
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <Box sx={{ minWidth: 160, flexGrow: 1 }} spacing={2}>
//             <InputLabel id="selectClient-label">Select Client</InputLabel>
//             <Select
//               labelId="selectClient-label"
//               value={client}
//               onChange={(e) => setClient(e.target.value)}
//               displayEmpty
//               renderValue={(selected) =>
//                 selected ? selected : <span style={placeholderStyle}>Select an option</span>
//               }
//               fullWidth
//             >
//               <MenuItem value="" disabled>
//                 Select Client
//               </MenuItem>
//               <MenuItem value="Amazon">Amazon</MenuItem>
//               <MenuItem value="Myntra">Myntra</MenuItem>
//               <MenuItem value="Flipkart">Flipkart</MenuItem>
//             </Select>
//           </Box>

//           <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">  
//             <Box>
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: 'black',
//                   mt: 2,
//                   color: 'white',
//                   '&:hover': { backgroundColor: '#333' },
//                 }}
//               >
//                 Show Codes
//               </Button>
//             </Box>
//           </Stack>
//         </Stack>
//       </MainCard>

//       <MainCard sx={{ overflow: 'visible' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs 
//             value={tabValue} 
//             onChange={handleTabChange} 
//             aria-label="conversion tracking tabs"
//           >
//             <Tab label="JS Pixel" {...a11yProps(0)} />
//             <Tab label="S2S" {...a11yProps(1)} />
//             <Tab label="Client Tracking Status" {...a11yProps(2)} />
//             <Tab label="Publisher Tracking Status" {...a11yProps(3)} />
//           </Tabs>
//         </Box>

//         <TabPanel value={tabValue} index={0}>
//           {/* JS Pixel Section */}
//           <Grid container spacing={2.5} width="100%" sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ViewJSPixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   View JS Pixel
//                 </InputLabel>
//                 <TextField
//                   fullWidth
//                   id="ViewJSPixel"
//                   placeholder="URL"
//                   autoFocus
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('copy url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ApplyStartJSPixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   Apply Start JS Pixel
//                 </InputLabel>
//                 <TextField
//                   fullWidth
//                   id="ApplyStartJSPixel"
//                   placeholder="URL"
//                   autoFocus
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ApplyEndJSPixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   Apply End JS Pixel
//                 </InputLabel>
//                 <TextField
//                   fullWidth
//                   id="ApplyEndJSPixel"
//                   placeholder="URL"
//                   autoFocus
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Image Pixel Section */}
//           <Grid container spacing={2.5} width="100%">
//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ViewImagePixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   View Image Pixel
//                 </InputLabel>
//                 <TextField 
//                   fullWidth 
//                   id="ViewImagePixel" 
//                   placeholder="URL" 
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ApplyStartImagePixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   Apply Start Image Pixel
//                 </InputLabel>
//                 <TextField 
//                   fullWidth 
//                   id="ApplyStartImagePixel" 
//                   placeholder="URL"
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} width="100%">
//               <Box display="flex" alignItems="center" width="100%">
//                 <InputLabel
//                   htmlFor="ApplyEndImagePixel"
//                   sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
//                 >
//                   Apply End Image Pixel
//                 </InputLabel>
//                 <TextField 
//                   fullWidth 
//                   id="ApplyEndImagePixel" 
//                   placeholder="URL"
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
//                           <Copy size="20" color="#FF8A65" />
//                         </Box>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             </Grid>
//           </Grid>
//         </TabPanel>

//         <TabPanel value={tabValue} index={1}>
//           {/* S2S Tab - No content as requested */}
//         </TabPanel>

//         <TabPanel value={tabValue} index={2}>
//           {/* Client Tracking Status Tab - No content as requested */}
//         </TabPanel>

//         <TabPanel value={tabValue} index={3}>
//           {/* Publisher Tracking Status Tab - No content as requested */}
//         </TabPanel>
//       </MainCard>
//     </Stack>
//   );
// };

// export default ConversionTracking;
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack, TextField, InputAdornment } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { Grid } from '@mui/system';
import { Copy } from 'iconsax-react';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`conversion-tabpanel-${index}`}
      aria-labelledby={`conversion-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `conversion-tab-${index}`,
    "aria-controls": `conversion-tabpanel-${index}`,
  };
}

const ConversionTracking = () => {
  const [client, setClient] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const placeholderStyle = { color: '#9e9e9e' };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCopy = (text) => {
    alert(text);
  };

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

          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">  
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  mt: 2,
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="conversion tracking tabs"
          >
            <Tab label="JS Pixel" {...a11yProps(0)} />
            <Tab label="S2S" {...a11yProps(1)} />
            <Tab label="Client Tracking Status" {...a11yProps(2)} />
            <Tab label="Publisher Tracking Status" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {/* JS Pixel Card */}
          <MainCard sx={{ overflow: 'visible', mb: 2 }}>
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

          {/* Image Pixel Card */}
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
                  <TextField 
                    fullWidth 
                    id="ViewImagePixel" 
                    placeholder="URL" 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
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
                    htmlFor="ApplyStartImagePixel"
                    sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
                  >
                    Apply Start Image Pixel
                  </InputLabel>
                  <TextField 
                    fullWidth 
                    id="ApplyStartImagePixel" 
                    placeholder="URL"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
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
                    htmlFor="ApplyEndImagePixel"
                    sx={{ minWidth: '180px', whiteSpace: 'nowrap', mr: 5 }} 
                  >
                    Apply End Image Pixel
                  </InputLabel>
                  <TextField 
                    fullWidth 
                    id="ApplyEndImagePixel" 
                    placeholder="URL"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy('image url')}>
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
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* S2S Tab - No content as requested */}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {/* Client Tracking Status Tab - No content as requested */}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          {/* Publisher Tracking Status Tab - No content as requested */}
        </TabPanel>
      </MainCard>
    </Stack>
  );
};

export default ConversionTracking;