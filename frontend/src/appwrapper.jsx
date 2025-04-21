import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // your firebase config
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          payload: {
            uid: user.uid,
            email: user.email,
            username:user.username
          },
        });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AppWrapper;
