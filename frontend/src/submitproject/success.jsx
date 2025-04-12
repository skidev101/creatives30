
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 export const MessageAlert = ({ open, message, onClose }) => {
  return (
<section>
<Snackbar  open={open}      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  autoHideDuration={3000} onClose={onClose} className=''>
      <Alert onClose={onClose}
    
      severity="success" sx={{ width: '100%' }} className='text-nowrap'>
        {message}
      </Alert>
    </Snackbar>
</section>
  
  );
};