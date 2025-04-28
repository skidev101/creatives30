// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  darkMode: true,
  user: null,
  leaderboard: {
    currentVersion: null,
    versions: {}, // Structure: { 'v1': { data: [], page: 1, ... }, 'v2': {...} }
    allVersions: [] 
  },
  ratings: {
    // Structure: { projectId1: ratingValue, projectId2: ratingValue }
    userRatings: {},
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
          lastVerified: Date.now()          // Track freshness
        }
      };
      case "CLEAR_USER":
  return {
    ...state,
    user: null
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
      case "SET_RATING":
        return {
          ...state,
          ratings: {
            ...state.ratings,
            userRatings: {
              ...state.ratings.userRatings,
              [action.payload.projectId]: action.payload.rating
            }
          }
        };
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

// Persist configuration
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