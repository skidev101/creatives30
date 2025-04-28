
export const setMode = (mode) => ({
    type: "SET_MODE",
    payload:mode
    })

        
export const setUser = (user) => ({
    type: "SET_USER",
    payload:user
})

export const clearUser = (CLEAR_USER) => ({
  type: CLEAR_USER
});

export const saveLeaderboardData = (version, data) => ({
    type: "SAVE_LEADERBOARD_DATA",
    payload: { version, data }
  });
  
  export const setCurrentVersion = (version) => ({
    type: "SET_CURRENT_VERSION",
    payload: version
  });

  export const setRating = (projectId, rating) => ({
    type: "SET_RATING",
    payload: { projectId, rating }
  });
  export const setAverageRating = (projectId, average) => ({
    type: "SET_AVERAGE_RATING",
    payload: { projectId, average }
  });
  
  // export const addNewVersion = (version) => ({
  //   type: "ADD_NEW_VERSION",
  //   payload: version
  // });