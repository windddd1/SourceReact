/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useCallback,useLayoutEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserActions from '../../store/user/_user-redux'
import SpinnerActions from '../../store/spinner/_spinner-redux'
import DataTable from "react-data-table-component"
import Card from "@material-ui/core/Card"
import Checkbox from "@material-ui/core/Checkbox"
import SortIcon from "@material-ui/icons/ArrowDownward"
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { makeSelectUserList } from '../../store/user/_user-selectors'
import Spinner from '../../components/Spinner/Spinner'
import Button from './Button'
import Layout from './Layout'


const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    // width: '20%'
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    // width: '30%'
  },
  {
    name: "Username",
    selector: "username",
    sortable: true,
    // width: '30%'
  },
  // {
  //   cell: () => <Button variant="contained" color="primary">Action</Button>,
  //   button: true,
  //   width: '15%'
  // },
]
const contextActions = deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete />
  </IconButton>
)
const selectProps = { indeterminate: isIndeterminate => isIndeterminate }
const actions = redirect =>(
  <Button size='medium' witdh='100px' type='add' onClick={redirect}>Add</Button> 
)


export default function HomePage(props) {
  const dispatch = useDispatch()
  const users = useSelector(makeSelectUserList)
  const [ selectedRows, setSelectedRows ] = useState([])
  const [ toggleCleared, setToggleCleared ] = useState(false)
  const getDataRequest = useCallback(() => {
    dispatch(UserActions.getUserRequest())
  })
  const deleteDataRequest = useCallback(() => {
    dispatch(UserActions.deleteUserRequest())
  })
  const openSpinner = useCallback(() => {
    dispatch(SpinnerActions.open())
  })
  useEffect(() => {
    openSpinner()
    getDataRequest()
  }, [])

  const routeChange = useCallback(() => {
    props.history.push('/create')
  })
  const goToItemDetail = useCallback((item)=>{ 
    props.history.push(`edit/${item.id}`)
  })

  const deleteAll = () => {
    openSpinner()
    let idSelectedRows = selectedRows.map( item => item.id)
    deleteDataRequest(idSelectedRows)
    setToggleCleared(!toggleCleared)
  }
  const handleSelectedRows = table => {
    setSelectedRows(table.selectedRows)
  }
  // useEffect(() => {
  //   console.log(selectedRows)
  // },[selectedRows])
  return (
    <Layout>
      <Spinner/>
      <Card>
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          highlightOnHover
          pointerOnHover
          defaultSortField="name"
          sortIcon={<SortIcon />}
          actions={actions(routeChange)}
          contextActions={contextActions(deleteAll)}
          pagination
          onRowClicked ={goToItemDetail}
          selectableRows
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectProps}
          onRowSelected={handleSelectedRows}
          clearSelectedRows={toggleCleared}
        />
      </Card>
    </Layout>
  )
}
