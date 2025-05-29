import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import {
  SearchNormal1,
  Filter,
  Calendar,
  More
} from 'iconsax-react';
import { visuallyHidden } from '@mui/utils';

// Sample client data matching the design
function createClientData(clientName, clientType, status, budgetCap, spend, reconSpend, clicks, validClicks, invalidClicks) {
  return {
    clientName,
    clientType,
    status,
    budgetCap,
    spend,
    reconSpend,
    clicks,
    validClicks,
    invalidClicks
  };
}

const clientRows = [
  createClientData('Client Name', 'CPA', 'active', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPA', 'inactive', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPC', 'active', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPC', 'active', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPA', 'inactive', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPC', 'inactive', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPA', 'paused', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPC', 'inactive', 1000.00, 0.00, 0.00, 0, 0, 0),
  createClientData('Client Name', 'CPA', 'paused', 1000.00, 0.00, 0.00, 0, 0, 0),
];

const headCells = [
  { id: 'clientName', numeric: false, disablePadding: true, label: 'Client Name' },
  { id: 'clientType', numeric: false, disablePadding: false, label: 'Client Type' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'budgetCap', numeric: true, disablePadding: false, label: 'Budget Cap' },
  { id: 'spend', numeric: true, disablePadding: false, label: 'Spend' },
  { id: 'reconSpend', numeric: true, disablePadding: false, label: 'Recon Spend' },
  { id: 'clicks', numeric: true, disablePadding: false, label: 'Clicks' },
  { id: 'validClicks', numeric: true, disablePadding: false, label: 'Valid Clicks' },
  { id: 'invalidClicks', numeric: true, disablePadding: false, label: 'Invalid Clicks' }
];

// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case 'active': return '#4caf50';
    case 'inactive': return '#f44336';
    case 'paused': return '#9e9e9e';
    default: return '#9e9e9e';
  }
};

// Client Type chip styling
const getClientTypeStyle = (type) => {
  return {
    backgroundColor: type === 'CPA' ? '#e1bee7' : '#bbdefb',
    color: type === 'CPA' ? '#7b1fa2' : '#1976d2',
    fontWeight: 500
  };
};

// Table Header Component
function ClientTableHeader({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onApplyFilters,
  recordsFound 
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack spacing={2}>
        {/* First Row - Action buttons and Date Range */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filters.action}
                onChange={(e) => onFilterChange('action', e.target.value)}
                displayEmpty
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="">Action</MenuItem>
                <MenuItem value="edit">Edit</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
                <MenuItem value="duplicate">Duplicate</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={filters.budgetCap}
                onChange={(e) => onFilterChange('budgetCap', e.target.value)}
                displayEmpty
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="">Budget Cap</MenuItem>
                <MenuItem value="0-500">$0 - $500</MenuItem>
                <MenuItem value="500-1000">$500 - $1000</MenuItem>
                <MenuItem value="1000+">$1000+</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filters.margin}
                onChange={(e) => onFilterChange('margin', e.target.value)}
                displayEmpty
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="">Margin</MenuItem>
                <MenuItem value="low">Low (0-10%)</MenuItem>
                <MenuItem value="medium">Medium (10-20%)</MenuItem>
                <MenuItem value="high">High (20%+)</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Date Range:
            </Typography>
            <TextField
              size="small"
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              placeholder="01-01-2000 to 01-01-2020"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Calendar size="20" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Stack>
        </Stack>

        {/* Second Row - Search and other filters */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {recordsFound} Records Found
            </Typography>
            
            <TextField
              size="small"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => onSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal1 size="20" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.currency}
                onChange={(e) => onFilterChange('currency', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="USD">USD - $</MenuItem>
                <MenuItem value="EUR">EUR - €</MenuItem>
                <MenuItem value="GBP">GBP - £</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                displayEmpty
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="">Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filters.columns}
                onChange={(e) => onFilterChange('columns', e.target.value)}
                displayEmpty
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value="">Columns</MenuItem>
                <MenuItem value="basic">Basic View</MenuItem>
                <MenuItem value="detailed">Detailed View</MenuItem>
                <MenuItem value="custom">Custom View</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Filter size="20" />}
              onClick={onApplyFilters}
              sx={{ 
                borderColor: '#ddd',
                color: 'text.primary',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              Apply Filters
            </Button>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.rowsPerPage}
                onChange={(e) => onFilterChange('rowsPerPage', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

// Enhanced Table Head
function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

// Utility functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Main Client Table Component
export default function TableComponent() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('clientName');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    action: '',
    budgetCap: '',
    margin: '',
    dateRange: '01-01-2000 to 01-01-2020',
    search: '',
    currency: 'USD',
    status: '',
    columns: '',
    rowsPerPage: 10
  });

  // Filter and search functionality
  const filteredRows = useMemo(() => {
    return clientRows.filter(row => {
      const matchesSearch = !filters.search || 
        row.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.clientType.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = !filters.status || row.status === filters.status;
      
      return matchesSearch && matchesStatus;
    });
  }, [filters.search, filters.status]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(0); // Reset to first page when filtering
  };

  const handleSearch = (searchValue) => {
    setFilters(prev => ({
      ...prev,
      search: searchValue
    }));
    setPage(0);
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n, index) => `${n.clientName}-${index}`);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, name) => {
    event.stopPropagation(); // Prevent row click from firing
    
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleRowClick = (event, name) => {
    // Only handle row click if it's not coming from checkbox or other interactive elements
    if (event.target.type === 'checkbox' || event.target.closest('button')) {
      return;
    }
    handleCheckboxClick(event, name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setFilters(prev => ({
      ...prev,
      rowsPerPage: newRowsPerPage
    }));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * filters.rowsPerPage - filteredRows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <ClientTableHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onApplyFilters={handleApplyFilters}
        recordsFound={filteredRows.length}
      />
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * filters.rowsPerPage, page * filters.rowsPerPage + filters.rowsPerPage)
                .map((row, index) => {
                  const rowId = `${row.clientName}-${index}`;
                  const isItemSelected = isSelected(rowId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, rowId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={rowId}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox" sx={{ pl: 3 }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleCheckboxClick(event, rowId)}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.clientName}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.clientType}
                          size="small"
                          sx={getClientTypeStyle(row.clientType)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            backgroundColor: getStatusColor(row.status),
                            display: 'inline-block'
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="success.main">
                          {row.budgetCap.toFixed(2)}USD
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="success.main">
                          {row.spend.toFixed(2)}USD
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.reconSpend.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.clicks}</TableCell>
                      <TableCell align="right">{row.validClicks}</TableCell>
                      <TableCell align="right">{row.invalidClicks}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <More size="20" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={filters.rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

ClientTableHeader.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
  recordsFound: PropTypes.number.isRequired
};