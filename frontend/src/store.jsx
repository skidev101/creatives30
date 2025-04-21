// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  darkMode: false,
  user: '',
  leaderboard: {
    currentVersion: null,
    versions: {}, 
    allVersions: [] // List of all available version numbers ['v1', 'v2']
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, darkMode: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SAVE_LEADERBOARD_DATA":
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          currentVersion: action.payload.version,
          versions: {
            ...state.leaderboard.versions,
            [action.payload.version]: action.payload.data
          },
          allVersions: [...new Set([...state.leaderboard.allVersions, action.payload.version])]
        }
      };
    case "SET_CURRENT_VERSION":
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          currentVersion: action.payload
        }
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['darkMode', 'user', 'leaderboard']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);