import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Menu,
  InputLabel,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import { SearchNormal1, Filter, Calendar, More, Edit, TickSquare, CloseSquare, ArrowDown2 } from "iconsax-react";
import { visuallyHidden } from "@mui/utils";
import { Link } from 'react-router-dom';

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

                  {filter.type === 'multiselect' && (
                    <FormControl size="small" sx={{ minWidth: filter.minWidth || 140 }}>
                      <InputLabel>{filter.placeholder}</InputLabel>
                      <Select
                        multiple
                        value={filter.selectedValues || []}
                        onChange={(e) => {
                          const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                          if (filter.onChange) {
                            filter.onChange(value);
                          }
                        }}
                        input={<OutlinedInput label={filter.placeholder} />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return '';
                          }
                          
                          // Show count if more than 3 selections, otherwise show chips
                          if (selected.length > 3) {
                            return (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip 
                                  label={`${selected.length} selected`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ 
                                    height: 20, 
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                  }}
                                />
                              </Box>
                            );
                          }
                          
                          // Show individual chips for 3 or fewer selections
                          return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const option = filter.options?.find(opt => opt.value === value);
                                return (
                                  <Chip 
                                    key={value} 
                                    label={option?.label || value} 
                                    size="small"
                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                  />
                                );
                              })}
                            </Box>
                          );
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                              width: 280,
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                          backgroundColor: 'white',
                          '& .MuiSelect-select': {
                            maxHeight: '40px',
                            overflow: 'hidden'
                          }
                        }}
                      >
                        {/* Add "Select All" and "Clear All" options at the top */}
                        <MenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (filter.selectedValues?.length === filter.options?.length) {
                              // Clear all
                              if (filter.onChange) {
                                filter.onChange([]);
                              }
                            } else {
                              // Select all
                              if (filter.onChange) {
                                filter.onChange(filter.options?.map(opt => opt.value) || []);
                              }
                            }
                          }}
                          sx={{ 
                            borderBottom: '1px solid #e0e0e0', 
                            mb: 1,
                            fontWeight: 500,
                            color: 'primary.main'
                          }}
                        >
                          {filter.selectedValues?.length === filter.options?.length ? 'Clear All' : 'Select All'}
                        </MenuItem>
                        
                        {filter.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Checkbox 
                              checked={(filter.selectedValues || []).indexOf(option.value) > -1} 
                              size="small"
                            />
                            <ListItemText 
                              primary={option.label} 
                              sx={{ 
                                '& .MuiTypography-root': { 
                                  fontSize: '0.875rem' 
                                } 
                              }}
                            />
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

                  {filter.type === 'dateRange' && (
                    <TextField
                      size="small"
                      value={filters[filter.key] || filter.defaultValue || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      placeholder={filter.placeholder}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Calendar size="20" />
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

                  {filter.type === 'multiselect' && (
                    <FormControl size="small" sx={{ minWidth: filter.minWidth || 140 }}>
                      <InputLabel>{filter.placeholder}</InputLabel>
                      <Select
                        multiple
                        value={filter.selectedValues || []}
                        onChange={(e) => {
                          const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                          if (filter.onChange) {
                            filter.onChange(value);
                          }
                        }}
                        input={<OutlinedInput label={filter.placeholder} />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return '';
                          }
                          
                          // Show count if more than 3 selections, otherwise show chips
                          if (selected.length > 3) {
                            return (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip 
                                  label={`${selected.length} selected`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ 
                                    height: 20, 
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                  }}
                                />
                              </Box>
                            );
                          }
                          
                          // Show individual chips for 3 or fewer selections
                          return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const option = filter.options?.find(opt => opt.value === value);
                                return (
                                  <Chip 
                                    key={value} 
                                    label={option?.label || value} 
                                    size="small"
                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                  />
                                );
                              })}
                            </Box>
                          );
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                              width: 280,
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' },
                          backgroundColor: 'white',
                          '& .MuiSelect-select': {
                            maxHeight: '40px',
                            overflow: 'hidden'
                          }
                        }}
                      >
                        {/* Add "Select All" and "Clear All" options at the top */}
                        <MenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (filter.selectedValues?.length === filter.options?.length) {
                              // Clear all
                              if (filter.onChange) {
                                filter.onChange([]);
                              }
                            } else {
                              // Select all
                              if (filter.onChange) {
                                filter.onChange(filter.options?.map(opt => opt.value) || []);
                              }
                            }
                          }}
                          sx={{ 
                            borderBottom: '1px solid #e0e0e0', 
                            mb: 1,
                            fontWeight: 500,
                            color: 'primary.main'
                          }}
                        >
                          {filter.selectedValues?.length === filter.options?.length ? 'Clear All' : 'Select All'}
                        </MenuItem>
                        
                        {filter.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Checkbox 
                              checked={(filter.selectedValues || []).indexOf(option.value) > -1} 
                              size="small"
                            />
                            <ListItemText 
                              primary={option.label} 
                              sx={{ 
                                '& .MuiTypography-root': { 
                                  fontSize: '0.875rem' 
                                } 
                              }}
                            />
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
  actionsEnabled = true,
  rowActionsEnabled = false // Add new prop for row-level actions
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
        {rowActionsEnabled && (
          <TableCell 
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
                left: (selectable ? 58 : 0) + (rowActionsEnabled ? 60 : 0),
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
  const [editValue, setEditValue] = useState(value||'');
  const [marginMode, setMarginMode] = useState(row[`${column.id}Mode`] || 'percentage');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    setMarginMode(row[`${column.id}Mode`] || 'percentage');
  }, [row, column.id]);

  const handleSave = () => {
    if (column.type === 'editableMargin') {
      onUpdate(row.id, editValue, marginMode);
    } else {
      onUpdate(row.id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setMarginMode(row[`${column.id}Mode`] || 'percentage');
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    const displayNode = column.id === 'clientName'
      ? (
        <Link
          to={`/campaigns`}
          onClick={e => e.stopPropagation()}
          style={{
            color: '#1976d2',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {value}
        </Link>
      )
      : (
        <Typography variant="body2">
          {value ?? '-'}
        </Typography>
      );

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        {displayNode}
        <IconButton
          size="small"
          onClick={() => setIsEditing(true)}
          sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
        >
          <Edit size="16" />
        </IconButton>
      </Box>
    );
  }

  // Render margin editor with dropdown
  if (column.type === 'editableMargin') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200, maxWidth: 200 }}>
        <TextField
          ref={inputRef}
          size="small"
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          inputProps={{ 
            min: 0, 
            step: marginMode === 'percentage' ? 0.1 : 0.01,
            max: marginMode === 'percentage' ? 100 : undefined
          }}
          sx={{ 
            flex: '1 1 60px',
            minWidth: 60,
            maxWidth: 80,
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              padding: '4px 8px'
            }
          }}
        />
        <Select
          size="small"
          value={marginMode}
          onChange={(e) => setMarginMode(e.target.value)}
          sx={{ 
            minWidth: 45,
            maxWidth: 45,
            '& .MuiSelect-select': {
              fontSize: '0.75rem',
              padding: '4px 8px',
              paddingRight: '20px !important'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1rem'
            }
          }}
        >
          <MenuItem value="percentage" sx={{ fontSize: '0.75rem' }}>%</MenuItem>
          <MenuItem value="value" sx={{ fontSize: '0.75rem' }}>$</MenuItem>
        </Select>
        <Box sx={{ display: 'flex', gap: 0.5, minWidth: 60 }}>
          <IconButton 
            size="small" 
            onClick={handleSave} 
            color="primary"
            sx={{ 
              padding: '2px',
              '& svg': { fontSize: '14px' }
            }}
          >
            <TickSquare size="14" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleCancel} 
            color="secondary"
            sx={{ 
              padding: '2px',
              '& svg': { fontSize: '14px' }
            }}
          >
            <CloseSquare size="14" />
          </IconButton>
        </Box>
      </Box>
    );
  }

  // Regular editable fields
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: 200 }}>
      <TextField
        ref={inputRef}
        size="small"
        type={column.type === 'editablePercentage' || column.type === 'editableCurrency' ? 'number' : 'text'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyPress}
        inputProps={
          column.type === 'editablePercentage' 
            ? { min: 0, max: 100, step: 0.1 }
            : column.type === 'editableCurrency'
            ? { min: 0, step: 0.01 }
            : {}
        }
        InputProps={
          column.type === 'editableCurrency' 
            ? { startAdornment: <InputAdornment position="start">$</InputAdornment> }
            : column.type === 'editablePercentage'
            ? { endAdornment: <InputAdornment position="end">%</InputAdornment> }
            : {}
        }
        sx={{ 
          flex: '1 1 100px',
          minWidth: 100,
          maxWidth: 140,
          '& .MuiInputBase-input': {
            fontSize: '0.875rem',
            padding: '6px 8px'
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 0.5, minWidth: 60 }}>
        <IconButton 
          size="small" 
          onClick={handleSave} 
          color="primary"
          sx={{ 
            padding: '3px',
            '& svg': { fontSize: '14px' }
          }}
        >
          <TickSquare size="14" />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={handleCancel} 
          color="secondary"
          sx={{ 
            padding: '3px',
            '& svg': { fontSize: '14px' }
          }}
        >
          <CloseSquare size="14" />
        </IconButton>
      </Box>
    </Box>
  );
}

function CellRenderer({ column, value, row, onCellEdit }) {
  if (column.render) {
    // stopPropagation here so row‐click won’t swallow it
    return (
      <span onClick={e => e.stopPropagation()}>
        {column.render(value, row)}
      </span>
    );
  }

  // Handle editable fields with custom edit handlers
  if (column.editable && column.customEditHandler) {
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
          onClick={() => {
            if (column.customEditHandler) {
              column.customEditHandler(row, column.id);
            }
          }}
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

  // Handle editable fields with inline editing - ADD editableMargin here
  if (column.editable && (
    column.type === 'editableCurrency' || 
    column.type === 'editablePercentage' || 
    column.type === 'editableText' ||
    column.type === 'editableMargin'  // Add this line
  )) {
    return (
      <EditableCell
        column={column}
        value={value}
        row={row}
        onUpdate={column.onUpdate}
      />
    );
  }

  // Handle custom render functions for non-editable fields
  if (column.render) {
    return column.render(value, row);
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
  actions = [],
  rowActions = [], // Add new prop for row-level actions
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
  const [rowMenuAnchorEl, setRowMenuAnchorEl] = useState(null); // Add state for row menu
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

  const handleRowActionClick = (event, row) => {
    event.stopPropagation();
    setRowMenuAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleRowActionClose = () => {
    setRowMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const handleRowMenuItemClick = (action) => {
    if (action.onClick && selectedRow) {
      action.onClick(selectedRow);
    }
    handleRowActionClose();
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
              rowActionsEnabled={rowActions.length > 0}
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
                        cursor: onRowClick ? 'pointer' : 'default'
                      }}
                    >
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

                      {/* Row Actions Column */}
                      {rowActions.length > 0 && (
                        <TableCell
                          sx={{
                            width: 60,
                            position: 'sticky',
                            left: selectable ? 58 : 0,
                            backgroundColor: isItemSelected ? 'action.selected' : 'background.paper',
                            zIndex: 1,
                            borderRight: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(event) => handleRowActionClick(event, row)}
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
                              left: (selectable ? 58 : 0) + (rowActions.length > 0 ? 60 : 0),
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
                  <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (actionsEnabled ? 1 : 0) + (rowActions.length > 0 ? 1 : 0)} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Row Actions Menu */}
        <Menu
          anchorEl={rowMenuAnchorEl}
          open={Boolean(rowMenuAnchorEl)}
          onClose={handleRowActionClose}
          PaperProps={{
            sx: {
              minWidth: 180,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {rowActions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => handleRowMenuItemClick(action)}
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

// Update PropTypes to include rowActions
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
  rowActions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  title: PropTypes.string,
  rowsPerPageOptions: PropTypes.array,
  defaultRowsPerPage: PropTypes.number,
  getRowId: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};