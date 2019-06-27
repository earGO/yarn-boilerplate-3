import React from 'react'
import PropTypes from 'prop-types'
import SectionsItem from './SectionsItem'
import { Flex } from '@ursip/design-system'
import styled from 'styled-components'
import ContentBox from '../common/ContentBox'
import AddSection from './AddSection'

const Bordered = styled(Flex)``

function Sections({ projectSections }) {
  if (projectSections !== undefined) {
    return (
      <ContentBox width={352} style={{ alignSelf: 'flex-start' }}>
        <Bordered flexDirection={'column'}>
          <AddSection />
          <Flex flexDirection={'column'}>
            {projectSections.map((section, key) => {
              return <SectionsItem key={key}>{section.name}</SectionsItem>
            })}
          </Flex>
        </Bordered>
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
