// components/AuthHandler.js
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './action';


export const AuthHandler = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser && user) {
        // Firebase says no user but Redux has user
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch, user]);

  return children;
};

// Wrap your App with this component