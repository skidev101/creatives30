import { configureStore } from "@reduxjs/toolkit";
const initialState =  {
    darkMode: false,
     user:''
    
}
const reducer = ( state = initialState, action) => {
switch (action.type) {
    case "SET_MODE":
              return {
            ...state,
            darkMode: action.payload
        
            
        }
        case "SET_USER":
            return{
                ...state,
                user: action.payload
            }
    default:
        return state;
        
}

}
const store = configureStore({reducer})
export default store;