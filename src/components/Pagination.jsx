import { Box, Pagination as MuiPagination, Typography, Stack } from '@mui/material';

const Pagination = ({ 
  count, 
  page, 
  onChange, 
  rowsPerPage = 10,
  totalItems,
  showInfo = true,
  size = 'medium',
  sx,
  ...other 
}) => {
  const startItem = (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalItems);
  
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, ...sx }}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={onChange}
        size={size}
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '14px',
            minWidth: '36px',
            height: '36px',
            margin: '0 4px',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            color: '#666',
            backgroundColor: 'white',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: 'white',
              border: '1px solid #1976d2',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            },
            '&:hover': {
              backgroundColor: '#f8f9fa',
              borderColor: '#ccc'
            }
          },
          '& .MuiPaginationItem-previousNext': {
            color: '#666',
            '&:hover': {
              backgroundColor: '#f8f9fa'
            }
          },
          '& .MuiPaginationItem-ellipsis': {
            border: 'none',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }
        }}
        {...other}
      />
    </Box>
  );
};

export default Pagination;