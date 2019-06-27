import React from 'react'
import PropTypes from 'prop-types'
import ContentBox from '../common/ContentBox'
import { Flex } from '@ursip/design-system'
import SectionsItem from './SectionsItem'
import styled from 'styled-components'
import FieldsItem from './FieldsItem'

const Bordered = styled(Flex)``

function Fields({ projectFields }) {
  if (projectFields !== undefined) {
    return (
      <ContentBox width={736}>
        <Bordered flexDirection={'column'}>
          <Flex flexDirection={'column'} width={'100%'}>
            {projectFields.map((field, key) => {
              return <FieldsItem key={key}>{field.name}</FieldsItem>
            })}
          </Flex>
        </Bordered>
      </ContentBox>
    )
  } else {
    return null
  }
}

Fields.propTypes = {
  projectFields: PropTypes.array,
}

Fields.defaultProps = {
  projectFields: [
    {
      id: 'common-info-is-it-dangerous-id-65',
      sectionId: 'tech-params-id',
      name: "Something wrong - data didn't come",
      nick: 'is-it-dangerous',
      value: "Something wrong - data didn't come",
      author: 'Barney Stinson',
      dateCreated: '03-02-2019',
      type: 'project_manager.project_user_element.type',
      version: 'project_manager.project_user_element.version',
      sort: 'project_manager.project_user_element.sort',
      idFile: 'project_manager.project_user_element.idFile',
      useElement: 'user_element BOOLEAN',
    },
  ],
}

export default Fields
