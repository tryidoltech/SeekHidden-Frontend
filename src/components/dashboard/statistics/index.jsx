// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
import { GRID_COMMON_SPACING, ThemeMode } from 'config';

// assets
import {
  Apple,
  Dribbble,
  Facebook,
  Youtube
} from 'iconsax-react';

// ===========================|| WIDGET - STATISTICS ||=========================== //

export default function Statistics() {
  const theme = useTheme();

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard primary="Jobs" secondary="1165 +"/>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard primary="Applies" secondary="0" color="info.main" />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard
          primary="CR %"
          secondary="0.00 %"
          color={theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.dark'}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard primary="Spend" secondary="00.00USD" color="error.main" />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard primary="CPA" secondary="00.00USD"/>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2, sm: 6 }}>
        <HoverSocialCard primary="CPC" secondary="00.00USD" color="info.main" />
      </Grid>
    </Grid>
  );
}
