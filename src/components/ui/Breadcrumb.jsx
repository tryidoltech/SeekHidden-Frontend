import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Breadcrumbs,
  Link,
  Typography,
  Box
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { generateBreadcrumbs } from 'utils/breadcrumb';

const Breadcrumb = ({ sx, ...other }) => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <Box sx={{ mb: 3, ...sx }} {...other}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: '#999' }} />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1
          }
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          if (breadcrumb.current) {
            return (
              <Typography
                key={index}
                sx={{
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {breadcrumb.label}
              </Typography>
            );
          }
          
          return (
            <Link
              key={index}
              component={RouterLink}
              to={breadcrumb.href}
              underline="hover"
              sx={{
                color: '#666',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: '#1976d2',
                  textDecoration: 'underline'
                }
              }}
            >
              {breadcrumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;