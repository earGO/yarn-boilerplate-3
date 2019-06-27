import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as projectCard from './module'
import Loading from '../common/Loading'
import { Flex, Box } from '@ursip/design-system'
import * as selectors from './module/selectors'
import { DynamicModuleLoader } from 'redux-dynamic-modules'
import Title from './Title'
import ModuleNaviTab from './ModuleNaviTab'

/*other import goes here*/

function ProjectCard({ props }) {
  const loading = useSelector(selectors.projectLoading)
  const projectData = useSelector(selectors.projectSelector)
  const projectTitle = useSelector(selectors.projectTitleSelector)
  console.log(projectData)
  return (
    <DynamicModuleLoader modules={[projectCard.default]}>
      {loading ? (
        <Loading overlay>Загрузка карточки проекта</Loading>
      ) : (
        <Flex style={{ height: '100%' }} flexDirection={'column'} justifyContent={'flex-start'}>
          <Title projectTitle={projectTitle} />
          <ModuleNaviTab />
        </Flex>
      )}
    </DynamicModuleLoader>
  )
}

ProjectCard.propTypes = {}

ProjectCard.defaultProps = {}

export default ProjectCard
