/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useCallback,useLayoutEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserActions from '../../store/user/_user-redux'
import SpinnerActions from '../../store/spinner/_spinner-redux'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Spinner from '../../components/Spinner/Spinner'
import Button from '../HomePage/Button'
import { makeSelectUserDetail } from '../../store/user/_user-selectors'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection:'column',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}))


export default function EditPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [ user, setUser ] = useState({ name:'', userName: '', email: '' })
  const userToStore = useSelector(makeSelectUserDetail)
  const getDetailUserRequest = useCallback(() => {
    let id = props.history.location.pathname.split('/')[2]
    dispatch(UserActions.getDetailUserRequest(id))
  })

  const updateDataRequest = useCallback((user) => {
    dispatch(UserActions.updateUserRequest(user))
  })

  const openSpinner = useCallback(() => {
    dispatch(SpinnerActions.open())
  })

  useEffect(()=>{
    openSpinner()
    getDetailUserRequest()
    return (
      setUser({
        name: '',
        userName: '',
        email: ''
      })
    )
  },[])
  useLayoutEffect(() => {
    setUser({
      name: userToStore.name,
      userName: userToStore.username,
      email: userToStore.email
    })
  },[userToStore])

  const handleInputChange = useCallback(e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  },[user])

  const handleSubmit = (event) => {
    event.preventDefault()
    updateDataRequest({
      ...user,
      id: props.history.location.pathname.split('/')[2]
    })
    openSpinner()
  }
  const goBack = useCallback(() => {
    props.history.push('/')
  })
  return (
    <form onSubmit={handleSubmit}>
      <Spinner/>
      <div className={classes.container}>
      <TextField
          name='name'
          label="Name"
          className={classes.textField}
          margin="normal"
          value={user.name || ""}
          onChange={handleInputChange}
        />
        <TextField
          name='userName'
          label="Username"
          className={classes.textField}
          margin="normal"
          value={user.userName || ""}
          onChange={handleInputChange}
        />
        <TextField
          name='email'
          label="Email"
          className={classes.textField}
          margin="normal"
          value={user.email || ""}
          onChange={handleInputChange}
        />
      <div>
        <Button onClick={goBack}>Back</Button>
        <Button type='submit'>Edit</Button>
      </div>
    </div>
    </form>
  )
}
