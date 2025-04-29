import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../action';

export const LogoutModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(clearUser()); 
      await new Promise(resolve => setTimeout(resolve, 2000));
      onClose();
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        Are you sure you want to logout?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleLogout} 
          color="primary" 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Logout'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};