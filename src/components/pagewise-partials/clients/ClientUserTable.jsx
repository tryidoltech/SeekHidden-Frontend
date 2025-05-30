import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from 'components/Pagination';

const ClientUserTable = ({ data, onEdit, onLock, onDelete }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (isMobile) {
    return (
      <Box>
        <Stack spacing={2}>
          {paginatedData.map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
              <Paper
                key={row.id}
                elevation={0}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  p: 2,
                  backgroundColor: isItemSelected ? '#f5f5f5' : 'white'
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleSelect(event, row.id)}
                          size="small"
                        />
                        <Box sx={{ fontWeight: 600, fontSize: '16px', color: '#333' }}>
                          {row.name}
                        </Box>
                      </Box>
                      <Box sx={{ fontSize: '14px', color: '#666', mb: 1 }}>
                        {row.email}
                      </Box>
                      <Chip 
                        label={row.clients} 
                        size="small"
                        sx={{ 
                          fontSize: '12px',
                          maxWidth: '100%',
                          height: 'auto',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                            padding: '4px 8px'
                          }
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => onEdit && onEdit(row.id)}
                        sx={{ color: '#666', '&:hover': { color: '#1976d2' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onLock && onLock(row.id)}
                        sx={{ color: '#666', '&:hover': { color: '#9c27b0' } }}
                      >
                        <LockIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDelete && onDelete(row.id)}
                        sx={{ color: '#666', '&:hover': { color: '#d32f2f' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
        
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          totalItems={data.length}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAll}
                  size="small"
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>
                Clients
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '14px', color: '#333', width: '120px' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  selected={isItemSelected}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f8f9fa'
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#f0f7ff'
                    },
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleSelect(event, row.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', color: '#333', fontWeight: 500 }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', color: '#666', maxWidth: '300px' }}>
                    <Box sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {row.clients}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => onEdit && onEdit(row.id)}
                        sx={{
                          color: '#666',
                          '&:hover': { color: '#1976d2', backgroundColor: '#f0f7ff' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onLock && onLock(row.id)}
                        sx={{
                          color: '#666',
                          '&:hover': { color: '#9c27b0', backgroundColor: '#f8f0ff' }
                        }}
                      >
                        <LockIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDelete && onDelete(row.id)}
                        sx={{
                          color: '#666',
                          '&:hover': { color: '#d32f2f', backgroundColor: '#fff0f0' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
};

export default ClientUserTable;