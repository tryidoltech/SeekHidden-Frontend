import React from "react";
import { Box, Button, Stack } from "@mui/material";

const ActionButtons = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="primary">
                        Job Stats
                    </Button>
                    <Button variant="outlined" color="primary">
                        Conversion Tracking
                    </Button>
                    <Button variant="outlined" color="primary">
                        Publisher Management
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default ActionButtons;