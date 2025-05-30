import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

import Breadcrumb from 'components/ui/Breadcrumb';
import DashboardHeader from 'components/DashboardHeader';
import ClientUserTable from 'components/pagewise-partials/clients/ClientUserTable';
import { clientUsers } from 'data/clients';

const ClientUserList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAddUser = () => {
    console.log('Add user clicked');
  };

  const handleLockAll = () => {
    console.log('Lock all clicked');
  };

  const handleDeleteAll = () => {
    console.log('Delete all clicked');
  };

  const handleEdit = (id) => {
    console.log('Edit user:', id);
  };

  const handleLock = (id) => {
    console.log('Lock user:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete user:', id);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <DashboardHeader />
        
        <Breadcrumb />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 }
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: '#1a1a1a',
              fontSize: { xs: '24px', md: '32px' }
            }}
          >
            Client Users
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                padding: '10px 20px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)',
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Add Client User
            </Button>
            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              onClick={handleLockAll}
              sx={{
                borderColor: '#9c27b0',
                color: '#9c27b0',
                '&:hover': {
                  borderColor: '#7b1fa2',
                  backgroundColor: '#f3e5f5'
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                padding: '10px 20px',
                borderRadius: '6px',
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Lock All
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAll}
              sx={{
                borderColor: '#d32f2f',
                color: '#d32f2f',
                '&:hover': {
                  borderColor: '#c62828',
                  backgroundColor: '#ffebee'
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                padding: '10px 20px',
                borderRadius: '6px',
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Delete All
            </Button>
          </Stack>
        </Box>

        <ClientUserTable
          data={clientUsers}
          onEdit={handleEdit}
          onLock={handleLock}
          onDelete={handleDelete}
        />
      </Stack>
    </Box>
  );
};

export default ClientUserList;