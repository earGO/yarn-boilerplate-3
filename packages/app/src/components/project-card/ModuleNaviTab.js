import React from 'react'
import PropTypes from 'prop-types'
import OptionUnderline from '../common/OptionUnderline'
import FlexContainerBottomDivider from '../common/FlexContainerBottomDivider'
import ContentBox from '../common/ContentBox'

/*other import goes here*/

function ModuleNaviTab({ projectTabs }) {
  if (projectTabs !== undefined) {
    console.log(projectTabs)
    return (
      <FlexContainerBottomDivider>
        <ContentBox>
          {projectTabs.map((tab, key) => {
            return (
              <OptionUnderline key={key} bottomColor={'primary'}>
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
