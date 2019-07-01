import React from 'react'
import PropTypes from 'prop-types'
import OptionUnderline from '../common/OptionUnderline'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'
import ContentBox from '../common/ContentBox'
import * as actions from './module/actions'
import { useDispatch } from 'react-redux'

/*other import goes here*/

function ModuleNaviTab({ projectTabs, tabSelected }) {
  const dispatch = useDispatch()
  const selectTab = tabId => dispatch(actions.selectTab(tabId))

  if (projectTabs !== undefined) {
    return (
      <FlexContainerBottomDivider>
        <ContentBox>
          {projectTabs.map((tab, key) => {
            return (
              <OptionUnderline
                key={key}
                bottomColor={'primary'}
                tabSelected={tabSelected}
                tabId={tab.id}
                selectTab={selectTab}
              >
                {tab.name}
              </OptionUnderline>
            )
          })}
        </ContentBox>
      </FlexContainerBottomDivider>
    )
  } else {
    return null
  }
}

ModuleNaviTab.propTypes = {
  projectTabs: PropTypes.array,
}

ModuleNaviTab.defaultProps = {
  projectTabs: [
    {
      name: 'loading tabs',
    },
  ],
}

export default ModuleNaviTab
