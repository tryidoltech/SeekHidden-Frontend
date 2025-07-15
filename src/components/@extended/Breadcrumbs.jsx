import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeDirection } from 'config';

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ArrowRight2, Buildings2, Home3 } from 'iconsax-react';

// ==============================|| BREADCRUMBS ||============================== //

export default function Breadcrumbs({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  links,
  maxItems,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
  ...others
}) {
  const theme = useTheme();
  const location = useLocation();
  const [breadcrumbPaths, setBreadcrumbPaths] = useState([]);

  const iconSX = {
    marginRight: theme.direction === ThemeDirection.RTL ? 0 : theme.spacing(0.75),
    marginLeft: theme.direction === ThemeDirection.RTL ? theme.spacing(0.75) : 0,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  // Generate breadcrumb paths from current location
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const paths = pathnames.map((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = pathname.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      return {
        path,
        label,
        isLast: index === pathnames.length - 1
      };
    });
    setBreadcrumbPaths(paths);
  }, [location.pathname]);

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon size={12} /> : <ArrowRight2 size={12} />;

  // Custom breadcrumbs using links prop
  if (custom && links && links?.length > 0) {
    return (
      <MainCard
        border={card}
        sx={card === false ? { mb: 3, bgcolor: 'transparent', borderRadius: 0, overflow: 'visible', ...sx } : { mb: 3, ...sx }}
        {...others}
        content={card}
        boxShadow={false}
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={0.5}
        >
          {title && !titleBottom && (
            <Grid>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                <FormattedMessage id={heading} />
              </Typography>
            </Grid>
          )}
          <Grid>
            <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
              {links?.map((link, index) => {
                const CollapseIcon = link.icon ? link.icon : Buildings2;
                return (
                  <Typography
                    key={index}
                    {...(link.to && { component: Link, to: link.to })}
                    variant="body1"
                    sx={{ textDecoration: 'none', fontWeight: 500, ...(link.to && { fontWeight: 400, cursor: 'pointer' }) }}
                    color={link.to ? 'text.secondary' : 'text.primary'}
                  >
                    {link.icon && <CollapseIcon style={iconSX} />}
                    <FormattedMessage id={link.title} />
                  </Typography>
                );
              })}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid sx={{ mt: card === false ? 0 : 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                <FormattedMessage id={heading} />
              </Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // Auto-generated breadcrumbs from location pathname
  return (
    <MainCard
      border={card}
      sx={card === false ? { mb: 3, bgcolor: 'transparent', borderRadius: 0, overflow: 'visible', ...sx } : { mb: 3, ...sx }}
      {...others}
      content={card}
      boxShadow={false}
    >
      <Grid
        container
        direction={rightAlign ? 'row' : 'column'}
        justifyContent={rightAlign ? 'space-between' : 'flex-start'}
        alignItems={rightAlign ? 'center' : 'flex-start'}
        spacing={0.5}
      >
        {title && !titleBottom && breadcrumbPaths.length > 0 && (
          <Grid>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {breadcrumbPaths[breadcrumbPaths.length - 1]?.label}
            </Typography>
          </Grid>
        )}
        <Grid>
          <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
            {/* Home link */}
            {location.pathname !== '/' && (
              <Typography
                component={Link}
                to="/"
                variant="body1"
                sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                color="text.secondary"
              >
                {icons && <Home3 style={iconSX} />}
                {icon && !icons && <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />}
                {(!icon || icons) && 'Home'}
              </Typography>
            )}

            {/* Dynamic breadcrumb items */}
            {breadcrumbPaths.map((breadcrumb, index) => (
              <Typography
                key={breadcrumb.path}
                {...(!breadcrumb.isLast && { component: Link, to: breadcrumb.path })}
                variant="body1"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: breadcrumb.isLast ? 500 : 400,
                  cursor: breadcrumb.isLast ? 'default' : 'pointer'
                }}
                color={breadcrumb.isLast ? 'text.primary' : 'text.secondary'}
              >
                {icons && <Buildings2 style={iconSX} />}
                {breadcrumb.label}
              </Typography>
            ))}
          </MuiBreadcrumbs>
        </Grid>
        {title && titleBottom && breadcrumbPaths.length > 0 && (
          <Grid sx={{ mt: card === false ? 0 : 1 }}>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {breadcrumbPaths[breadcrumbPaths.length - 1]?.label}
            </Typography>
          </Grid>
        )}
      </Grid>
      {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
    </MainCard>
  );
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any
};
