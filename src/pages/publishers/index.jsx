import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';

// project-imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';
import MainCard from 'components/MainCard';
import DynamicTable from '../../components/tables/datatable'; // Import your DynamicTable component

// assets
import { ArrowDown, ArrowSwapHorizontal, ArrowUp, Filter, Calendar, SearchNormal1 } from 'iconsax-react';

// ==============================|| TAB PANEL ||============================== //

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| DATA WIDGET - TRANSACTIONS ||============================== //

export default function Publisher() {
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('');
    const [action, setAction] = useState('');
    const [dateRange, setDateRange] = useState('01-01-2000 to 01-01-2020');
    const [selectedRows, setSelectedRows] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Updated sample data to match the image
    const publishersData = [
        {
            id: 1,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 2,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 3,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 4,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 5,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 6,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 7,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        },
        {
            id: 8,
            name: 'ATTB US CPA (A)',
            status: 'active',
            currency: 'USD',
            country: 'USA',
            bidType: 'CPA',
            minBid: 0.25,
            industry: 'Accounting',
            creationDate: '01-01-2000'
        }
    ];

    // Publisher Stats data
    const publisherStatsData = [
        {
            id: 1,
            name: 'Monester CPA UK',
            grossSpend: '0.93 USD',
            validClicks: '00',
            foreignClicks: '00',
            latentClicks: '00',
            botClicks: '00',
            duplicateClicks: '00'
        },
        {
            id: 2,
            name: 'ATTB US CPA',
            grossSpend: '1.25 USD',
            validClicks: '15',
            foreignClicks: '02',
            latentClicks: '03',
            botClicks: '01',
            duplicateClicks: '00'
        },
        {
            id: 3,
            name: 'Global Leads EU',
            grossSpend: '2.50 USD',
            validClicks: '28',
            foreignClicks: '05',
            latentClicks: '02',
            botClicks: '03',
            duplicateClicks: '01'
        },
        {
            id: 4,
            name: 'Asia Converters',
            grossSpend: '1.75 USD',
            validClicks: '20',
            foreignClicks: '03',
            latentClicks: '01',
            botClicks: '02',
            duplicateClicks: '00'
        },
        {
            id: 5,
            name: 'Affiliate Hub US',
            grossSpend: '3.20 USD',
            validClicks: '35',
            foreignClicks: '07',
            latentClicks: '04',
            botClicks: '05',
            duplicateClicks: '02'
        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedRows(publishersData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }

        setSelectedRows(newSelected);
    };

    const isSelected = (id) => selectedRows.indexOf(id) !== -1;

    // Custom table component matching the design
    const PublisherTable = () => (
        <Box>
            {/* Filters Row */}
            <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                            value={action || ""}
                            onChange={(e) => setAction(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Actions' }} // For accessibility
                        >
                            <MenuItem value="" disabled>
                                Actions
                            </MenuItem>
                            <MenuItem value="XML">XML</MenuItem>
                            <MenuItem value="Status">Status</MenuItem>
                            <MenuItem value="Edit">Edit</MenuItem>
                            <MenuItem value="Admin Active">Admin Active</MenuItem>
                            <MenuItem value="Admin Paused">Admin Paused</MenuItem>
                            <MenuItem value="Admin Churn">Admin Churn</MenuItem>
                            <MenuItem value="Reset Password">Reset Password</MenuItem>
                        </Select>
                    </FormControl>


                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">Date Range :</Typography>
                    <TextField
                        size="small"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />
                </Stack>
            </Stack>

            {/* Search and Filter Row */}
            <Stack direction="row" spacing={2} sx={{ px: 2, pb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Added Box with records count before search */}
                    <Box sx={{
                        backgroundColor: 'grey.100',
                        px: 1.5,
                        py: 1,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            73 Records Found
                        </Typography>
                    </Box>

                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={currencyFilter}
                            label="Currency"
                            onChange={(e) => setCurrencyFilter(e.target.value)}
                        >
                            <MenuItem value="USD - $">USD - $</MenuItem>
                            <MenuItem value="EUR - €">EUR - €</MenuItem>
                            <MenuItem value="GBP - £">GBP - £</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="outlined" size="small" startIcon={<Filter size="16" />}>
                        Apply Filters
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">Rows per page :</Typography>
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            {/* Table */}
            <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                            <th style={{ padding: '12px', textAlign: 'left', width: '50px' }}>
                                <Checkbox
                                    checked={selectedRows.length === publishersData.length}
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < publishersData.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Publisher Name</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Currency</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Country</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Bid Type</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Min Bid</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Industry</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Creation Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '12px' }}>
                                    <Checkbox
                                        checked={isSelected(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.name}
                                    </Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: row.status === 'active' ? 'success.main' : 'error.main',
                                                mr: 1
                                            }}
                                        />
                                    </Box>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.currency}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.country}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.bidType}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.minBid}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.industry}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.creationDate}</Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}>
                        <ArrowDown style={{ transform: 'rotate(90deg)' }} size={16} />
                    </IconButton>

                    {[...Array(Math.ceil(publishersData.length / rowsPerPage))].map((_, index) => (
                        <Button
                            key={index}
                            variant={page === index ? 'contained' : 'text'}
                            size="small"
                            onClick={() => setPage(index)}
                            sx={{ minWidth: '32px', height: '32px' }}
                        >
                            {index + 1}
                        </Button>
                    ))}

                    <IconButton
                        disabled={page >= Math.ceil(publishersData.length / rowsPerPage) - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        <ArrowDown style={{ transform: 'rotate(-90deg)' }} size={16} />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );

    // Publisher Stats Table component
    const PublisherStatsTable = () => (
        <Box>
            {/* Filters Row */}
            <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant="outlined" size="small">
                        Actions
                    </Button>
                    
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">Date Range :</Typography>
                    <TextField
                        size="small"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />
                </Stack>
            </Stack>

            {/* Search and Filter Row */}
            <Stack direction="row" spacing={2} sx={{ px: 2, pb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                     <Box sx={{
                        backgroundColor: 'grey.100',
                        px: 1.5,
                        py: 1,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            73 Records Found
                        </Typography>
                    </Box>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />

                    <Button variant="outlined" size="small" startIcon={<Filter size="16" />}>
                        Apply Filters
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">Rows per page :</Typography>
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            {/* Table */}
            <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                            <th style={{ padding: '12px', textAlign: 'left', width: '50px' }}>
                                <Checkbox
                                    checked={selectedRows.length === publisherStatsData.length}
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < publisherStatsData.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Publisher Name</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Gross Spend</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Valid Clicks</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Foreign Clicks</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Latent Clicks</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Bot Clicks</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Duplicate Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publisherStatsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '12px' }}>
                                    <Checkbox
                                        checked={isSelected(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.name}
                                    </Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.grossSpend}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.validClicks}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.foreignClicks}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.latentClicks}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.botClicks}</Typography>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <Typography variant="body2">{row.duplicateClicks}</Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}>
                        <ArrowDown style={{ transform: 'rotate(90deg)' }} size={16} />
                    </IconButton>

                    {[...Array(Math.ceil(publisherStatsData.length / rowsPerPage))].map((_, index) => (
                        <Button
                            key={index}
                            variant={page === index ? 'contained' : 'text'}
                            size="small"
                            onClick={() => setPage(index)}
                            sx={{ minWidth: '32px', height: '32px' }}
                        >
                            {index + 1}
                        </Button>
                    ))}

                    <IconButton
                        disabled={page >= Math.ceil(publisherStatsData.length / rowsPerPage) - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        <ArrowDown style={{ transform: 'rotate(-90deg)' }} size={16} />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="publisher management tabs" sx={{ px: 3 }}>
                        <Tab label="All Publishers" {...a11yProps(0)} />
                        <Tab label="Publishers Stats" {...a11yProps(1)} />
                        <Tab label="Publisher Feeds" {...a11yProps(2)} />
                        <Tab label="Tag Management" {...a11yProps(3)} />
                        <Tab label="Add Publisher" {...a11yProps(4)} />
                    </Tabs>
                </Box>

                {/* All Publishers Tab with Custom Table */}
                <TabPanel value={value} index={0}>
                    <PublisherTable />
                </TabPanel>

                {/* Publisher Stats Tab with Custom Table */}
                <TabPanel value={value} index={1}>
                    <PublisherStatsTable />
                </TabPanel>

                {/* Original List components for other tabs */}
                <TabPanel value={value} index={2}>
                    <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">-10,000</Typography>
                                    <Typography sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 30.6%
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    type="outlined"
                                    color="secondary"
                                    sx={{ color: 'secondary.darker', borderColor: 'secondary.light', fontWeight: 600 }}
                                >
                                    SM
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Spotify Music</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        #ABLE-PRO-T00233
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">-10,000</Typography>
                                    <Typography sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 30.6%
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    type="outlined"
                                    color="secondary"
                                    sx={{ color: 'secondary.darker', borderColor: 'secondary.light', fontWeight: 600 }}
                                >
                                    TG
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Technology Tags</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        #TAG-001
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">+15,000</Typography>
                                    <Typography sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 25.3%
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar variant="rounded" color="warning" sx={{ fontWeight: 600 }}>
                                    BT
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Business Tags</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        #TAG-002
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">+8,500</Typography>
                                    <Typography sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> 18.7%
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    type="outlined"
                                    color="secondary"
                                    sx={{ color: 'secondary.darker', borderColor: 'secondary.light', fontWeight: 600 }}
                                >
                                    ET
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Entertainment Tags</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        #TAG-003
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">New</Typography>
                                    <Typography sx={{ color: 'info.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> Ready
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    type="outlined"
                                    color="primary"
                                    sx={{ color: 'primary.darker', borderColor: 'primary.light', fontWeight: 600 }}
                                >
                                    NP
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">New Publisher Form</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        Ready to add
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">Draft</Typography>
                                    <Typography sx={{ color: 'warning.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowSwapHorizontal size={14} /> Pending
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar variant="rounded" color="warning" sx={{ fontWeight: 600 }}>
                                    DP
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Draft Publishers</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        3 pending approval
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            divider
                            secondaryAction={
                                <Stack sx={{ gap: 0.25, alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">Import</Typography>
                                    <Typography sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUp style={{ transform: 'rotate(45deg)' }} size={14} /> Available
                                    </Typography>
                                </Stack>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    type="outlined"
                                    color="success"
                                    sx={{ color: 'success.darker', borderColor: 'success.light', fontWeight: 600 }}
                                >
                                    IP
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">Import Publishers</Typography>}
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        Bulk import available
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </TabPanel>
            </Box>
        </MainCard>
    );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };