import { takeLatest, all } from 'redux-saga/effects';
/* ------------- Types ------------- */
import { UserTypes } from '../store/user/_user-redux';
/* ------------- Sagas ------------- */
import UserSagas from '../store/user/_user-sagas';

export default function* root() {
  yield all([
    takeLatest(UserTypes.GET_USER_REQUEST, UserSagas.getAllUser),
    takeLatest(UserTypes.CREATE_USER_REQUEST, UserSagas.createUser),
    takeLatest(UserTypes.DELETE_USER_REQUEST, UserSagas.deleteUser),
    takeLatest(UserTypes.GET_DETAIL_USER_REQUEST, UserSagas.getUserDetail),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, UserSagas.updateUser) // TODO: run side effects(wachter)
  ]);
}
