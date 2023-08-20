import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user/user";

export const store = configureStore({
    reducer: { movie: moviesReducer, user: userReducer }
});

// import thunk from 'redux-thunk'
// import rootReducer from './reducers/index'

// const store = createStore(rootReducer, applyMiddleware(thunk))