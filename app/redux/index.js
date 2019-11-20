import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from '../sagas/index';
import rootReducer from './root-reducer';

export const history = createBrowserHistory();

function configureStore(preloadedState) {
  // Create middleware
  const sagaMiddleware = createSagaMiddleware();

  // Create Store
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  );
  // Run middleware
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
