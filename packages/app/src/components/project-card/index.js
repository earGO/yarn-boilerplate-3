import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as projectCard from './module'
import Loading from '../common/Loading'
import { Flex } from '@ursip/design-system'
import * as selectors from './module/selectors'
import { DynamicModuleLoader } from 'redux-dynamic-modules'
import Title from './Title'
import ModuleNaviTab from './ModuleNaviTab'
import Sections from './Sections'
import Fields from './Fields'

function ProjectCard({ props }) {
  const loading = useSelector(selectors.projectLoading)
  const projectData = useSelector(selectors.projectSelector)
  const projectTitle = useSelector(selectors.projectTitleSelector)
  const projectTabs = useSelector(selectors.tabsSelector)
  const projectSections = useSelector(selectors.sectionsSelector)
  const projectFields = useSelector(selectors.fieldsSelector)
  const notReady =
    loading && !(projectData !== undefined) && !(projectSections !== undefined) && !(projectFields !== undefined)
  return (
    <DynamicModuleLoader modules={[projectCard.default]}>
      {notReady ? (
        <Loading overlay>Загрузка карточки проекта</Loading>
      ) : (
        <Flex style={{ height: '100%' }} flexDirection={'column'} justifyContent={'flex-start'}>
          <Title projectTitle={projectTitle} />
          <ModuleNaviTab projectTabs={projectTabs} />
          <Flex flexDirection={'row'} justifyContent={'flex-start'}>
            <Sections projectSections={projectSections} />
            <Fields projectFields={projectFields} />
          </Flex>
        </Flex>
      )}
    </DynamicModuleLoader>
  )
}

ProjectCard.propTypes = {}

ProjectCard.defaultProps = {}

export default ProjectCard
