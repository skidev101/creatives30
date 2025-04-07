import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';

const LogoutModal = ({open, onClose, onLogout,loading }) => {


  return (
    <div>
    
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onLogout} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutModal;