// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Proper initial state
const initialState = {
  darkMode: true,
  user: null,
  leaderboard: {
    currentVersion: null,
    versions: {},
    allVersions: [] 
  },
  ratings: {
    // Structure: { [userId]: { [projectId]: rating } }
    userRatings: {},
    // Global averages by project
    averages: {} 
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, darkMode: action.payload };
    
    case "SET_USER":
      return {
        ...state,
        user: {
          uid: action.payload.uid,
          email: action.payload.email,
          username: action.payload.username,
          roles: action.payload.roles,
          lastVerified: Date.now()
        }
      };

    case "CLEAR_USER":
      return {
        ...initialState, // Reset to initial state
        darkMode: state.darkMode // Keep dark mode preference
      };

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
              versions: data.versions || state.leaderboard.versions[version]?.versions || []
            }
          },
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

      case "SET_RATING":
        { const { userId, projectId, rating } = action.payload; // Change project_id to projectId
        return {
          ...state,
          ratings: {
            ...state.ratings,
            userRatings: {
              ...state.ratings.userRatings,
              [userId]: {
                ...state.ratings.userRatings[userId],
                [projectId]: rating // Match parameter name
              }
            }
          }
        }; }

    case "SET_AVERAGE_RATING":
      return {
        ...state,
        ratings: {
          ...state.ratings,
          averages: {
            ...state.ratings.averages,
            [action.payload.projectId]: action.payload.average
          }
        }
      };

    default:
      return state;
  }
};

// Persist config remains the same
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['darkMode', 'user', 'leaderboard', 'ratings'],
  migrate: (state) => {
    if (!state.leaderboard) {
      state.leaderboard = initialState.leaderboard;
    }
    return Promise.resolve(state);
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

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