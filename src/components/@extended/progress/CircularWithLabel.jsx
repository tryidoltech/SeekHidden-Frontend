import PropTypes from 'prop-types';
// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ==============================|| PROGRESS - CIRCULAR LABEL ||============================== //

export default function CircularWithLabel({ value, ...others }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} {...others} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularWithLabel.propTypes = { value: PropTypes.any, others: PropTypes.any };
