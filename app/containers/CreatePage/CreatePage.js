/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useCallback,useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import UserActions from '../../store/user/_user-redux'
import SpinnerActions from '../../store/spinner/_spinner-redux'
import Spinner from '../../components/Spinner/Spinner'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../HomePage/Button'

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


export default function CreatePage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [ user, setUser ] = useState({ name:'', userName: '', email: '' })

  const createDataRequest = useCallback((user) => {
    dispatch(UserActions.createUserRequest(user))
  })

  const openSpinner = useCallback(() => {
    dispatch(SpinnerActions.open())
  })

  const handleInputChange = useCallback(e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  },[user])
  const handleSubmit = (event) => {
    openSpinner()
    event.preventDefault()
    createDataRequest(user)
  }
  const goBack = useCallback(() => {
    props.history.push('/')
  })
  return (
    <form onSubmit={handleSubmit}>
      <Spinner></Spinner>
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
        <Button onClick={goBack} >Back</Button>
        <Button type='submit'>Create</Button>
      </div>
    </div>
    </form>
  )
}
