/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import { css } from '@emotion/core'
import { makeSelectSpinner } from '../../store/spinner/_spinner-selectors'
import Layout from './Layout'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default function Spinner(props) {
  const status = useSelector(makeSelectSpinner)
  return (
    <Layout status={status}>
        <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={25}
          color={'tomato'}
          loading={status}
        />
    </Layout> 
  )
}
