import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = combineReducers({
  modal,
  // eslint-disable-next-line global-require
  user: require('../store/user/_user-redux').reducer,
  spinner: require('../store/spinner/_spinner-redux').reducer,
  language: languageProviderReducer,
  router: connectRouter(history),
})

export default rootReducer
