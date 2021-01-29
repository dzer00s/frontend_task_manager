import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

window.store = store;

