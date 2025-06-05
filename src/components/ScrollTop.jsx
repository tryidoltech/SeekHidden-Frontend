import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

export default function ScrollTop({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return children || null;
}

ScrollTop.propTypes = { children: PropTypes.oneOfType([PropTypes.any, PropTypes.node]) };
