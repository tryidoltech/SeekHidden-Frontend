import React from 'react'
import Statistics from '../../components/dashboard/statistics'
import { Grid } from '@mui/system'
import Clicks from '../../components/dashboard/clicks'
import { GRID_COMMON_SPACING, ThemeMode } from 'config';
import Feeds from '../../components/dashboard/feeds';

function Dashboard() {
    return (
        <>
            <Statistics />

            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                <Grid container spacing={GRID_COMMON_SPACING}>
                    <Grid size={8}>
                        <Clicks />
                    </Grid>
                    <Grid size={4}>
                        <Feeds />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard