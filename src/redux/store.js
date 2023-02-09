import { legacy_createStore, applyMiddleware, compose } from "redux";
import { RootReducer } from "./rootReducer";
import thunk from "redux-thunk";

export const Store = legacy_createStore(RootReducer, applyMiddleware(thunk));

// compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
