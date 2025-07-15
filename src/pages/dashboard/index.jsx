import React from 'react';
import Statistics from '../../components/dashboard/statistics';
import { Grid } from '@mui/system';
import Clicks from '../../components/dashboard/clicks';
import { GRID_COMMON_SPACING, ThemeMode } from 'config';
import Feeds from '../../components/dashboard/feeds';
import ClientTable from '../../components/dashboard/client-table';

function Dashboard() {
  return (
    <>
      <Statistics />

      <Grid item size={{ xs: 12, md: 8, lg: 9 }} sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Clicks />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Feeds />
          </Grid>
        </Grid>
      </Grid>
      <ClientTable />
    </>
  );
}

export default Dashboard;
