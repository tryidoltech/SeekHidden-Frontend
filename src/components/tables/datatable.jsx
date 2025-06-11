import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
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
  Stack,
  Tooltip,
  Menu
} from '@mui/material';
import { SearchNormal1, Filter, Calendar, More, Edit, TickSquare, CloseSquare } from 'iconsax-react';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
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

function DynamicTableHeader({
  filterConfig = [],
  filters,
  onFilterChange,
  onSearch,
  onApplyFilters,
  recordsFound,
  searchEnabled = true,
  title = "Records"
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack spacing={2}>
        {filterConfig.map((row, rowIndex) => (
          <Stack key={rowIndex} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              {row.leftFilters?.map((filter, filterIndex) => (
                <React.Fragment key={`${rowIndex}-${filterIndex}`}>
                  {filter.type === 'select' && (
                    <FormControl size="small" sx={{ minWidth: filter.minWidth || 120 }}>
                      <Select
                        value={filters[filter.key] || ''}
                        onChange={(e) => {
                          onFilterChange(filter.key, e.target.value);
                          // Call the specific onChange handler if provided
                          if (filter.onChange) {
                            filter.onChange(e.target.value);
                          }
                        }}
                        displayEmpty
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                          backgroundColor: 'white'
                        }}
                      >
                        <MenuItem value="">{filter.placeholder}</MenuItem>
                        {filter.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {filter.type === 'text' && (
                    <TextField
                      size="small"
                      value={filters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      placeholder={filter.placeholder}
                      InputProps={filter.icon ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            {filter.icon}
                          </InputAdornment>
                        ),
                      } : undefined}
                      sx={{
                        minWidth: filter.minWidth || 120,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  )}

                  {filter.type === 'label' && (
                    <Typography variant="body2" color="text.secondary">
                      {filter.text}
                    </Typography>
                  )}

                  {filter.type === 'recordCount' && (
                    <Typography variant="body2" color="text.secondary">
                      {recordsFound} {title} Found
                    </Typography>
                  )}

                  {filter.type === 'search' && searchEnabled && (
                    <TextField
                      size="small"
                      placeholder={filter.placeholder || "Search..."}
                      value={filters.search || ''}
                      onChange={(e) => onSearch(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchNormal1 size="20" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        minWidth: filter.minWidth || 200,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              {row.rightFilters?.map((filter, filterIndex) => (
                <React.Fragment key={`${rowIndex}-right-${filterIndex}`}>
                  {filter.type === 'select' && (
                    <FormControl size="small" sx={{ minWidth: filter.minWidth || 120 }}>
                      <Select
                        value={filters[filter.key] || ''}
                        onChange={(e) => {
                          onFilterChange(filter.key, e.target.value);
                          // Call the specific onChange handler if provided
                          if (filter.onChange) {
                            filter.onChange(e.target.value);
                          }
                        }}
                        displayEmpty
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                          backgroundColor: 'white'
                        }}
                      >
                        <MenuItem value="">{filter.placeholder}</MenuItem>
                        {filter.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {filter.type === 'button' && (
                    <Button
                      variant={filter.variant || "outlined"}
                      color={filter.color || "primary"}
                      startIcon={filter.icon}
                      onClick={() => {
                        if (filter.onClick) {
                          filter.onClick();
                        } else {
                          onApplyFilters();
                        }
                      }}
                      sx={{
                        borderColor: filter.color ? undefined : '#ddd',
                        color: filter.color ? undefined : 'text.primary',
                        '&:hover': {
                          borderColor: '#1976d2',
                          backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                      }}
                    >
                      {filter.label}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

function DynamicTableHead({
  columns,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selectable = true,
  actionsEnabled = true
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell 
            padding="checkbox" 
            sx={{ 
              pl: 3,
              position: 'sticky',
              left: 0,
              backgroundColor: 'background.paper',
              zIndex: 2,
              borderRight: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align={column.align}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
            sx={{
              minWidth: column.minWidth || 120,
              whiteSpace: 'nowrap',
              ...(column.sticky && {
                position: 'sticky',
                left: selectable ? 58 : 0, // Account for checkbox column width
                backgroundColor: 'background.paper',
                zIndex: 1,
                borderRight: '1px solid',
                borderColor: 'divider'
              })
            }}
          >
            {column.sortable !== false ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
        {actionsEnabled && (
          <TableCell 
            sx={{ 
              minWidth: 60,
              position: 'sticky',
              right: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
              borderLeft: '1px solid',
              borderColor: 'divider'
            }} 
          />
        )}
      </TableRow>
    </TableHead>
  );
}

function EditableCell({ column, value, row, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  const handleSave = () => {
    let processedValue = editValue;
    
    // Process value based on type
    if (column.type === 'editableCurrency' || column.type === 'editablePercentage') {
      processedValue = parseFloat(editValue) || 0;
    }
    
    if (onUpdate) {
      onUpdate(row.id, processedValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">
          {column.type === 'editableCurrency' 
            ? (typeof value === 'number' ? value.toLocaleString('en-US', {
                style: 'currency',
                currency: column.currency || 'USD'
              }) : value)
            : column.type === 'editablePercentage'
            ? `${value}%`
            : value
          }
        </Typography>
        <IconButton
          size="small"
          onClick={() => setIsEditing(true)}
          sx={{ 
            opacity: 0.6,
            '&:hover': { opacity: 1 },
            p: 0.5
          }}
        >
          <Edit size="14" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        size="small"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleSave}
        type="number"
        autoFocus
        InputProps={{
          startAdornment: column.type === 'editableCurrency' ? (
            <InputAdornment position="start">
              {column.currency === 'EUR' ? '€' : column.currency === 'GBP' ? '£' : '$'}
            </InputAdornment>
          ) : undefined,
          endAdornment: column.type === 'editablePercentage' ? (
            <InputAdornment position="end">%</InputAdornment>
          ) : undefined,
        }}
        sx={{
          width: 100,
          '& .MuiOutlinedInput-root': {
            fontSize: '0.875rem'
          }
        }}
      />
      <IconButton
        size="small"
        onClick={handleSave}
        sx={{ p: 0.5, color: 'success.main' }}
      >
        <TickSquare size="14" />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleCancel}
        sx={{ p: 0.5, color: 'error.main' }}
      >
        <CloseSquare size="14" />
      </IconButton>
    </Box>
  );
}

function CellRenderer({ column, value, row }) {
  if (column.render) {
    return column.render(value, row);
  }

  // Handle editable fields
  if (column.editable && (column.type === 'editableCurrency' || column.type === 'editablePercentage')) {
    return (
      <EditableCell
        column={column}
        value={value}
        row={row}
        onUpdate={column.onUpdate}
      />
    );
  }

  switch (column.type) {
    case 'chip':
      return (
        <Chip
          label={value}
          size="small"
          sx={column.getChipStyle ? column.getChipStyle(value) : undefined}
        />
      );

    case 'statusDot':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: column.getStatusColor ? column.getStatusColor(value) : '#9e9e9e',
            }}
          />
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {value}
          </Typography>
        </Box>
      );

    case 'status':
      return (
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: column.getStatusColor ? column.getStatusColor(value) : '#9e9e9e',
            display: 'inline-block',
            mr: 1
          }}
        />
      );

    case 'currency':
    case 'editableCurrency':
      return (
        <Typography variant="body2">
          {typeof value === 'number' ? value.toLocaleString('en-US', {
            style: 'currency',
            currency: column.currency || 'USD'
          }) : value}
        </Typography>
      );

    case 'editablePercentage':
      return (
        <Typography variant="body2">
          {value}%
        </Typography>
      );

    case 'number':
      return typeof value === 'number' ? value.toFixed(column.decimals || 0) : value;

    case 'actions':
      return (
        <Stack direction="row" spacing={1}>
          {column.actions?.map((action, index) => (
            <Tooltip key={index} title={action.tooltip || ''}>
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  if (action.onClick) {
                    action.onClick(row);
                  }
                }}
                sx={{
                  color: action.color || 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      );

    default:
      return value;
  }
}

export default function DynamicTable({
  data = [],
  columns = [],
  filterConfig = [],
  initialFilters = {},
  onRowClick,
  onRowSelect,
  onApplyFilters,
  customFilter,
  selectable = true,
  searchEnabled = true,
  searchFields = [],
  actionsEnabled = false,
  actions = [], // Add actions prop
  title = "Records",
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  getRowId = (row, index) => row.id || `row-${index}`,
  maxHeight = 'none'
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0]?.id || '');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    rowsPerPage: defaultRowsPerPage,
    ...initialFilters
  });

  const filteredRows = useMemo(() => {
    return data.filter(row => {
      // Search filter
      if (filters.search && searchEnabled) {
        const searchFields_ = searchFields.length > 0 ? searchFields : columns.map(col => col.id);
        const matchesSearch = searchFields_.some(field => {
          const value = row[field];
          return value && value.toString().toLowerCase().includes(filters.search.toLowerCase());
        });
        if (!matchesSearch) return false;
      }

      // Custom filter logic
      if (customFilter && !customFilter(row, filters)) {
        return false;
      }

      return true;
    });
  }, [data, filters, searchEnabled, searchFields, columns, customFilter]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(0);
  };

  const handleSearch = (searchValue) => {
    setFilters(prev => ({
      ...prev,
      search: searchValue
    }));
    setPage(0);
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row, index) => getRowId(row, index));
      setSelected(newSelected);
      if (onRowSelect) onRowSelect(newSelected);
      return;
    }
    setSelected([]);
    if (onRowSelect) onRowSelect([]);
  };

  const handleCheckboxClick = (event, rowId, row) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, rowId];
    } else {
      newSelected = selected.filter(id => id !== rowId);
    }

    setSelected(newSelected);
    if (onRowSelect) onRowSelect(newSelected);
  };

  const handleRowClick = (event, rowId, row) => {
    if (event.target.type === 'checkbox' || event.target.closest('button')) {
      return;
    }

    // Remove the selection logic from row click
    // if (selectable) {
    //   handleCheckboxClick(event, rowId, row);
    // }

    if (onRowClick) {
      onRowClick(row, rowId);
    }
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

  const handleActionClick = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuItemClick = (action) => {
    if (action.onClick && selectedRow) {
      action.onClick(selectedRow);
    }
    handleActionClose();
  };

  const isSelected = (rowId) => selected.indexOf(rowId) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * filters.rowsPerPage - filteredRows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {filterConfig.length > 0 && (
        <DynamicTableHeader
          filterConfig={filterConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onApplyFilters={handleApplyFilters}
          recordsFound={filteredRows.length}
          searchEnabled={searchEnabled}
          title={title}
        />
      )}

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer 
          sx={{ 
            overflowX: 'auto',
            maxHeight: maxHeight,
            // Add scrollbar styling for better UX
            '&::-webkit-scrollbar': {
              height: 8,
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
            },
          }}
        >
          <Table 
            sx={{ 
              minWidth: 750,
              // Calculate minimum width based on columns
              width: columns.length > 8 ? 'max-content' : '100%'
            }} 
            aria-labelledby="tableTitle"
            stickyHeader={maxHeight !== 'none'}
          >
            <DynamicTableHead
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              selectable={selectable}
              actionsEnabled={actionsEnabled}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * filters.rowsPerPage, page * filters.rowsPerPage + filters.rowsPerPage)
                .map((row, index) => {
                  const rowId = getRowId(row, index);
                  const isItemSelected = isSelected(rowId);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, rowId, row)}
                      tabIndex={-1}
                      key={rowId}
                      selected={isItemSelected}
                      sx={{ 
                        cursor: onRowClick ? 'pointer' : 'default' // Only show pointer cursor if onRowClick is provided
                      }}
                    >
                      {/* Remove role="checkbox" and aria-checked since row clicking doesn't select anymore */}
                      {selectable && (
                        <TableCell 
                          padding="checkbox" 
                          sx={{ 
                            pl: 3,
                            position: 'sticky',
                            left: 0,
                            backgroundColor: isItemSelected ? 'action.selected' : 'background.paper',
                            zIndex: 1,
                            borderRight: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleCheckboxClick(event, rowId, row)}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                      )}

                      {columns.map((column, colIndex) => (
                        <TableCell
                          key={column.id}
                          component={colIndex === 0 ? "th" : "td"}
                          id={colIndex === 0 ? labelId : undefined}
                          scope={colIndex === 0 ? "row" : undefined}
                          padding={column.disablePadding ? 'none' : 'normal'}
                          align={column.align}
                          sx={{
                            minWidth: column.minWidth || 120,
                            whiteSpace: 'nowrap',
                            ...(column.sticky && {
                              position: 'sticky',
                              left: selectable ? 58 : 0,
                              backgroundColor: isItemSelected ? 'action.selected' : 'background.paper',
                              zIndex: 1,
                              borderRight: '1px solid',
                              borderColor: 'divider'
                            })
                          }}
                        >
                          <CellRenderer
                            column={column}
                            value={row[column.id]}
                            row={row}
                          />
                        </TableCell>
                      ))}

                      {actionsEnabled && actions.length > 0 && (
                        <TableCell
                          sx={{
                            minWidth: 60,
                            position: 'sticky',
                            right: 0,
                            backgroundColor: isItemSelected ? 'action.selected' : 'background.paper',
                            zIndex: 1,
                            borderLeft: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(event) => handleActionClick(event, row)}
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                              }
                            }}
                          >
                            <More size="16" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (actionsEnabled ? 1 : 0)} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleActionClose}
          PaperProps={{
            sx: {
              minWidth: 150,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(action)}
              sx={{
                fontSize: '0.875rem',
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              {action.label}
            </MenuItem>
          ))}
        </Menu>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
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

DynamicTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    numeric: PropTypes.bool,
    disablePadding: PropTypes.bool,
    sortable: PropTypes.bool,
    align: PropTypes.string,
    type: PropTypes.oneOf(['chip', 'status', 'currency', 'number', 'boolean', 'date']),
    render: PropTypes.func,
    getChipStyle: PropTypes.func,
    getStatusColor: PropTypes.func,
    currency: PropTypes.string,
    decimals: PropTypes.number,
    minWidth: PropTypes.number,
    sticky: PropTypes.bool
  })).isRequired,
  filterConfig: PropTypes.array,
  initialFilters: PropTypes.object,
  onRowClick: PropTypes.func,
  onRowSelect: PropTypes.func,
  onApplyFilters: PropTypes.func,
  customFilter: PropTypes.func,
  selectable: PropTypes.bool,
  searchEnabled: PropTypes.bool,
  searchFields: PropTypes.array,
  actionsEnabled: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })), // Add actions prop type
  title: PropTypes.string,
  rowsPerPageOptions: PropTypes.array,
  defaultRowsPerPage: PropTypes.number,
  getRowId: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};