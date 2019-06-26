import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as projectCard from './module'
import Loading from '../common/Loading'
import { Flex, Box } from '@ursip/design-system'
import * as selectors from './module/selectors'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

/*other import goes here*/

function ProjectPage({ props }) {
  const loading = useSelector(selectors.loading)
  return (
    <DynamicModuleLoader modules={[projectCard.default]}>
      {loading ? (
        <Loading overlay>Загрузка карточки проекта</Loading>
      ) : (
        <Flex style={{ height: '100%' }}>
          <Box>Here's where project card be at</Box>
        </Flex>
      )}
    </DynamicModuleLoader>
  )
}

ProjectPage.propTypes = {}

ProjectPage.defaultProps = {}

export default ProjectPage
