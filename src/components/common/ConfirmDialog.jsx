// components/common/ConfirmDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

const ConfirmDialog = ({ open, title, message, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || 'Confirm your action.'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm?.();
          }}
          color="error"
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
