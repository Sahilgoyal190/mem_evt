import { createStore, compose, applyMiddleware } from "redux";
// import {autoRehydrate} from 'redux-persist'
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from "redux-thunk";
import rootReducer from "../reducers";

function configureStoreProd(initialState) {
  const middlewares = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
      // autoRehydrate()
    )
  );
  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [thunk];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
      // autoRehydrate()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

const store = configureStore();
export default store;
