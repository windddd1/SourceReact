/**
 * User selectors
 */

import { createSelector } from 'reselect'

const selectHome = state => state.spinner

const makeSelectSpinner = createSelector(
    selectHome,
    homeState => homeState.status
)


export {
  makeSelectSpinner
}