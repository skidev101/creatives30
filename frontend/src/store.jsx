// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Initial state with proper structure for leaderboard
const initialState = {
  darkMode: true,
  user: null,
  leaderboard: {
    currentVersion: null,
    versions: {}, // Structure: { 'v1': { data: [], page: 1, ... }, 'v2': {...} }
    allVersions: [] // List of all available version strings ['v1', 'v2']
  }
};

// Reducer with improved leaderboard handling
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, darkMode: action.payload };
    
    case "SET_USER":
      return { ...state, user: action.payload };
    
    case "SAVE_LEADERBOARD_DATA":
      { const { version, data } = action.payload;
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          versions: {
            ...state.leaderboard.versions,
            [version]: {
              ...data,
              // Ensure we maintain existing versions list if not provided
              versions: data.versions || state.leaderboard.versions[version]?.versions || []
            }
          },
          // Update allVersions with unique versions
          allVersions: [...new Set([...state.leaderboard.allVersions, version])]
        }
      }; }
    
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

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['darkMode', 'user', 'leaderboard'],
  // Optional: You can add state reconciliation for versions
  migrate: (state) => {
    // Migration logic if needed when store structure changes
    if (!state.leaderboard) {
      state.leaderboard = initialState.leaderboard;
    }
    return Promise.resolve(state);
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create store with middleware configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

