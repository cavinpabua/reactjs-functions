import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT,
    RESET,
    RESET_SUCCESS,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./Protected.types";

const initialState = {
    authError: null,
    loading: false,
    match: false,
    loggedIn: false,
}

const protectedReducer = (state = initialState, action = null) => {
    switch (action.type) {
        case AUTH_FAILURE:
            return {
                ...state,
                authError: "Login Failed",
                loading: false,
                match: false,
            }
        case AUTH_SUCCESS:
            console.log("Login Success!")
            return {
                ...state,
                authError: null,
                loading: false,
                match: true,
                loggedIn: true
            }
        case LOGOUT_SUCCESS:
            console.log("signout Success")
            return {
                state,
                loading: false,
                match: true,
                loggedIn: false
            }
        case LOGOUT:
            console.log("Logout Request")
            return {
                state,
                loading: true,
                match: true,
            }
        case AUTH_REQUEST:
            console.log("Login Request")
            return {
                ...state,
                loading: true,
            }

        case REGISTER:
            console.log("Register Request")
            return {
                state,
                loading: true,
                match: true,
            }

        case REGISTER_SUCCESS:
            console.log("Register Success")
            return {
                state,
                loading: true,
                match: true,
                signedIn: true
            }
        case REGISTER_FAIL:
            console.log("Register Failed")
            return {
                state,
                loading:false,
                match: false,
            }
        case RESET:
            return{
                state,
                loading: true,
                match:true,
            }
        case RESET_SUCCESS:
            return {
                state,
                loading:false,
                match:true
            }
        default:
            return state
    }
}



export default protectedReducer
