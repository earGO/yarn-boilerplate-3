import React from 'react'

import styled from 'styled-components'
import ViewHeader from './ViewCatalogHeader'
import { Route, Switch } from 'react-router-dom'
import { Text, Box, Flex, Button } from '@ursip/design-system'
import { Sticky } from 'react-sticky'

/** Вот как из отсюда забрать данные из формы?
 * Как вариант - пихать состояние формы в редакс,
 * по клику Создать - забирать оттуда значения, отправлять. */
/* НО ПОКА- ИДЕАЛЬНОЕ РЕШЕНИЕ! */
// Получились создание и редактирование немного одинаковыми. :(

const CreateHeader = props => {
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Создание справочника</Text>
      <Box className="buttonsWrapper">
        <Box width={96} style={{ display: 'inline-block' }} id="createCatalogButtonContainer" />
        <Box ml={3} width={96} style={{ display: 'inline-block' }}>
          <Button type="bordered" block onClick={() => props.history.goBack()}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

const EditHeader = props => {
  const { history } = props
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Редактирование справочника</Text>
      <Box className="buttonsWrapper">
        <Box width={96} style={{ display: 'inline-block' }} id="editCatalogButtonContainer" />
        <Box ml={3} width={96} style={{ display: 'inline-block' }}>
          <Button block type="secondary" onClick={() => history.goBack()}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

const Placeholder = props => {
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Cправочники</Text>
    </Flex>
  )
}

const HeaderWrapper = styled(Flex)`
  height: 87px;
  align-items: center;
  border-bottom: 1px solid #ecebeb;
  background-color: white;
`

const Header = () => {
  return (
    <Sticky topOffset={0}>
      {({ style }) => (
        <HeaderWrapper style={{ ...style, zIndex: 10, top: 150 }}>
          <Switch>
            <Route exact path="/nsi/create" component={CreateHeader} />
            <Route exact path="/nsi/:id/edit" component={EditHeader} />
            <Route path="/nsi/:id" component={ViewHeader} />
            <Route exact path="/nsi" component={Placeholder} />
          </Switch>
        </HeaderWrapper>
      )}
    </Sticky>
  )
}

export default Header
