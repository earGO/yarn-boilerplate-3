import React from 'react'
import { compose, combineReducers } from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { injectReducer } from '@ursip/utils'
import nsi from '@ursip/nsi-service'
import { Text, Heading } from '@ursip/design-system'

class Catalog extends React.Component {
  state = {
    loading: false,
    selected: null
  }

  static defaultProps = {
    data: []
  }

  componentDidMount() {
    this.setState({
      loading: true,
      selected: null
    })

    this.props
      .getAll({ meta: { asPromise: true } })
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <React.Fragment>
        <Heading.h1>Hello from nsi</Heading.h1>
        {this.state.loading && <Text>Loading...</Text>}
      </React.Fragment>
    )
  }
}

const enhance = compose(
  injectReducer({
    key: nsi.name,
    reducer: combineReducers(nsi.reducers)
  }),
  connect(
    state => ({
      data: nsi.selectors.catalogs(state)
    }),
    nsi.actions.catalogs
  )
)

export default enhance(Catalog)
