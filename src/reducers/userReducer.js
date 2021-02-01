import { SET_USER, LOGOUT, GET_USERS } from "../actions/user"

const defaultState = {
    currentUser: {},
    isAuth: false,
    listUsers: {}
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case GET_USERS:
            return {
                ...state,
                listUsers: action.payload
            }
        default:
            return state
    }
}
