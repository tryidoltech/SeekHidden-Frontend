import React, { useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { Add, Profile2User, User } from "iconsax-react";
import { useNavigate } from "react-router";

const AddDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddClient = () => {
        navigate('/clients/add-client')
        handleClose()
    }

    const handleAddClientUser = () => {
        navigate('/clients/add-client-user')
        handleClose()
    }

    return (
        <div>
            <Button
                variant="contained"
                startIcon={<Add size="20" variant="Bulk" />}
                onClick={handleClick}

            >
                Add Client
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleAddClient }>
                    <ListItemIcon>
                        <Profile2User size={20} variant="Bulk" />
                    </ListItemIcon>
                    <ListItemText>Add Client</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleAddClientUser}>
                    <ListItemIcon>
                        <User size={20} variant="Bulk" />
                    </ListItemIcon>
                    <ListItemText>Add Client User</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AddDropdown;