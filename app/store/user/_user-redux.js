import { createReducer, createActions } from 'reduxsauce'
import produce from 'immer'

const { Types, Creators } = createActions({
  getUserRequest: [],
  getUserSuccess: ['users'],
  createUserRequest: ['user'],
  deleteUserRequest: [],
  getDetailUserRequest: ['id'],
  getDetailUserSuccess: ['userDetail'],
  updateUserRequest: ['user'],
  sideEffectFail: ['error'],
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = {
  data: {
    users: [],
    userDetail: {}
  },
  processing: false,
  error: {},
}

export const request = state => produce(state, draft => {
  draft.processing = true
})

export const getUserSuccess = (state, { users }) => produce(state, draft => {
  draft.data.users = users
  draft.processing = false
})

export const getDetailUserSuccess = (state, { userDetail }) => produce(state, draft => {
  draft.data.userDetail = userDetail
  draft.processing = false
})

export const fail = (state, { error }) => produce(state, draft => {
  draft.processing = false
  draft.error = error
})

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.GET_USER_REQUEST]: request,
  [UserTypes.CREATE_USER_REQUEST]: request,
  [UserTypes.GET_USER_SUCCESS]: getUserSuccess,
  [UserTypes.DELETE_USER_REQUEST]: request,
  [UserTypes.GET_DETAIL_USER_REQUEST]: request,
  [UserTypes.GET_DETAIL_USER_SUCCESS]: getDetailUserSuccess,
  [UserTypes.UPDATE_USER_REQUEST]: request,
  [UserTypes.SIDE_EFFECT_FAIL]: fail,
})
