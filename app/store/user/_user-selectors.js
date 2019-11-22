/**
 * User selectors
 */

import { createSelector } from 'reselect'

const selectHome = state => state.user

const makeSelectUserList = createSelector(
    selectHome,
    homeState => homeState.data.users
)

const makeSelectUserDetail = createSelector(
  selectHome,
  homeState => homeState.data.userDetail
)

export {
  makeSelectUserList,
  makeSelectUserDetail
}