import React from 'react'
import PropTypes from 'prop-types'

function Fields({ projectFields }) {
  if (projectFields !== undefined) {
    console.log(projectFields)
    return null
  } else {
    return null
  }
}

Fields.propTypes = {}

Fields.defaultProps = {}

export default Fields
