/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import UserActions from '../../redux/_user-redux';
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Button from './Button';
import Layout from './Layout'


const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    width: '20%'
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    width: '30%'
  },
  {
    name: "Username",
    selector: "username",
    sortable: true,
    width: '30%'
  },
  {
    cell: () => <Button variant="contained" color="primary">Action</Button>,
    button: true,
    width: '15%'
  },
]
const isIndeterminate = indeterminate => indeterminate;

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data.user)
  const getDataRequest = useCallback(() => {
    dispatch(UserActions.getUserRequest())
  })

  useEffect(() => {
    getDataRequest()
  }, [])

  return (
    <Layout>
      <Button size='medium' witdh='100px' type='add'>Add</Button>
      <Card>
        <DataTable
          title="Users"
          columns={columns}
          data={user}
          highlightOnHover
          pointerOnHover
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
          onRowClicked ={(item)=>{ console.log(item)}}
          selectableRows
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{ indeterminate: isIndeterminate }}
        />
      </Card>
    </Layout>
  );
}
