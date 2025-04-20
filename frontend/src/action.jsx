
export const setMode = (mode) => ({
    type: "SET_MODE",
    payload:mode
    })

        
export const setUser = (user) => ({
    type: "SET_USER",
    payload:user
})
export const saveLeaderboardData = (version, data) => ({
    type: "SAVE_LEADERBOARD_DATA",
    payload: { version, data }
  });
  
  export const setCurrentVersion = (version) => ({
    type: "SET_CURRENT_VERSION",
    payload: version
  });