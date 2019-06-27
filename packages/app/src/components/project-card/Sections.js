import React from 'react'
import PropTypes from 'prop-types'
import SectionsItem from './SectionsItem'
import { Flex } from '@ursip/design-system'
import ContentBox from '../common/ContentBox'
import AddSection from './AddSection'

function Sections({ projectSections }) {
  if (projectSections !== undefined) {
    return (
      <ContentBox>
        <Flex flexDirection={'column'}>
          <AddSection />
          <Flex flexDirection={'column'}>
            {projectSections.map((section, key) => {
              return <SectionsItem key={key}>{section.name}</SectionsItem>
            })}
          </Flex>
        </Flex>
      </ContentBox>
    )
  } else {
    return null
  }
}

Sections.propTypes = {
  projectSections: PropTypes.array,
}

Sections.defaultProps = {
  projectSections: [
    {
      author: 'Barney Stinson',
      dateCreated: '02-02-2019',
      id: 'm21n-solutions-id',
      name: "Something wrong, data haven't came",
      nick: 'someNick',
      sort: 'some-sort',
      tabId: 'someId',
      version: '1.0.0',
    },
  ],
}

SectionsItem.propTypes = {
  projectSections: PropTypes.array,
}

SectionsItem.defaultProps = {
  projectSections: [],
}

export default Sections
