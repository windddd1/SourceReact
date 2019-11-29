import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import UserActions from './_user-redux'
import SpinnerActions from '../spinner/_spinner-redux'
import { push } from 'connected-react-router'

const httpClient = axios.create()
httpClient.defaults.timeout = 3000

const UserSagas = {
  *getAllUser() {
    try {
      const userList = yield call(apiGetUser)
      yield put(UserActions.getUserSuccess(userList.data))
      yield put(SpinnerActions.hide())
    } catch (err) {
      console.log(err)
      yield put(UserActions.sideEffectFail(err))
      yield put(SpinnerActions.hide())
    }
  },
  *deleteUser() {
    try {
      const response = yield call(apiDeleteUser)
      console.log(response)
      yield put(SpinnerActions.hide())
    } catch (err) {
      console.log(err)
      yield put(UserActions.sideEffectFail(err))
      yield put(SpinnerActions.hide())
    }
  },
  *createUser(action) {
    try {
      const { user } = action
      const response = yield call(apiPostUser, user)
      console.log(response)
      yield put(push('/'))
      yield put(SpinnerActions.hide())
    } catch (err) {
      console.log(err)
      yield put(UserActions.sideEffectFail(err))
      yield put(SpinnerActions.hide())
    }
  },
  *getUserDetail(action) {
    try {
      const { id } = action
      const response = yield call(apiGettUserDetail, id)
      yield put(UserActions.getDetailUserSuccess(response.data))
      yield put(SpinnerActions.hide())
    } catch (err) {
      console.log(err)
      yield put(UserActions.sideEffectFail(err))
      yield put(SpinnerActions.hide())
    }
  },
  *updateUser(action) {
    try {
      const { user } = action
      const response = yield call(apiPuttUserDetail, user)
      console.log(response)
      yield put(push('/'))
      yield put(SpinnerActions.hide())
    } catch (err) {
      console.log(err)
      yield put(UserActions.sideEffectFailure(err))
      yield put(SpinnerActions.hide())
    }
  }
}

function apiGetUser() {
  return httpClient.get('http://jsonplaceholder.typicode.com/users')
}

function apiDeleteUser() {
  return httpClient.delete('https://jsonplaceholder.typicode.com/posts/1')
}

function apiPostUser(user) {
  return httpClient.post('https://jsonplaceholder.typicode.com/posts', user)
}

function apiGettUserDetail(id) {
  return httpClient.get(`http://jsonplaceholder.typicode.com/users/${id}`)
}

function apiPuttUserDetail(user) {
  return httpClient.put(`http://jsonplaceholder.typicode.com/users/${user.id}`,user)
}

export default UserSagas
