import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as projectCard from './module'
import Loading from '../common/Loading'
import { Flex, Box, Divider } from '@ursip/design-system'
import * as selectors from './module/selectors'
import { DynamicModuleLoader } from 'redux-dynamic-modules'
import Title from './Title'
import ModuleNaviTab from './ModuleNaviTab'
import styled from 'styled-components'

const debugDivider = styled(Divider)`
  border: 1px solid blue;
`

function ProjectCard({ props }) {
  const loading = useSelector(selectors.projectLoading)
  const projectData = useSelector(selectors.projectSelector)
  const projectTitle = useSelector(selectors.projectTitleSelector)
  const projectTabs = useSelector(selectors.tabsSelector)
  const notReady = loading && !(projectData !== undefined)
  return (
    <DynamicModuleLoader modules={[projectCard.default]}>
      {notReady ? (
        <Loading overlay>Загрузка карточки проекта</Loading>
      ) : (
        <Flex style={{ height: '100%' }} flexDirection={'column'} justifyContent={'flex-start'}>
          <Title projectTitle={projectTitle} />
          <debugDivider m={0} p={0} color={'border'} />
          <ModuleNaviTab projectTabs={projectTabs} />
          <debugDivider m={0} p={0} color={'border'} />
        </Flex>
      )}
    </DynamicModuleLoader>
  )
}

ProjectCard.propTypes = {}

ProjectCard.defaultProps = {}

export default ProjectCard
