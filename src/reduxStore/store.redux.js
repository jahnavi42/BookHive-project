import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainReducer from './main.slice'
import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
});
