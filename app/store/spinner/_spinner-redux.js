import { createReducer, createActions } from 'reduxsauce'
import produce from 'immer'

const { Types, Creators } = createActions({
  open: [],
  hide: [],
})

export const SpinnerTypes = Types
export default Creators

export const INITIAL_STATE = {
  status: false
}

export const open = state => produce(state, draft => {
  draft.status = true
})

export const hide = state => produce(state, draft => {
  draft.status = false
})

export const reducer = createReducer(INITIAL_STATE, {
  [SpinnerTypes.OPEN]: open,
  [SpinnerTypes.HIDE]: hide,
})
