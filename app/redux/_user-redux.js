import { createReducer, createActions } from 'reduxsauce'
import produce from 'immer'

const { Types, Creators } = createActions({
  getUserRequest: [],
  getUserSuccess: ['user'],
  sideEffectScheduleFail: ['error'],
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = {
  data: {
    user: [],
  },
  processing: false,
  error: {},
}

export const request = state => produce(state, draft => {
  draft.processing = true
})
export const getUserSuccess = (state, { user }) => produce(state, draft => {
  draft.data.user = user
  draft.processing = false
})

export const fail = (state, { error }) => produce(state, draft => {
  draft.processing = false
  draft.error = error
})

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.GET_USER_REQUEST]: request,
  [UserTypes.GET_USER_SUCCESS]: getUserSuccess,
  [UserTypes.SIDE_EFFECT_SCHEDULE_FAIL]: fail,
})
