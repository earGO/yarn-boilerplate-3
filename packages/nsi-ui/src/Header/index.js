import React from 'react'
import styled from 'styled-components'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Text, Box, Flex, Button, Icon } from '@ursip/design-system'

/** Вот как из отсюда забрать данные из формы?
 * Как вариант - пихать состояние формы в редакс,
 * по клику Создать - забирать оттуда значения, отправлять. */
const CreateHeader = props => {
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Создание справочника</Text>
      <Box className="buttonsWrapper">
        <Button>Создать</Button>
        <Button type="bordered" ml={3}>
          Отмена
        </Button>
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
        <Button>Сохранить</Button>
        <Button type="bordered" ml={3} onClick={() => history.goBack()}>
          Отмена
        </Button>
      </Box>
    </Flex>
  )
}

const ViewHeader = props => {
  const { history, location } = props
  console.log('ViewHeader', props);
  return (
    <Flex justifyContent="space-between" flex={1} alignItems="center">
      <Text fontSize={3}>Cправочник</Text>
      <Box className="buttonsWrapper">
        <Button type="flat" onClick={() => { history.push(`${location.pathname}/edit`)}}>
          <Icon mr={3} name="edit" />
          Редактировать
        </Button>
        <Button type="flat" ml={3}>
          <Icon mr={3} name="save" />
          Удалить каталог
        </Button>
      </Box>
    </Flex>
  )
}

const Placeholder = props => <Box>НЕТ ТАКОГО В МАКЕТЕ УРУРУ</Box>

const HeaderWrapper = styled(Flex)`
  margin: 0 160px;
  height: 87px;
  align-items: center;
  border-bottom: 1px solid #ecebeb;
`

const Header = props => {
  return (
    <HeaderWrapper>
      <Switch>
        <Route exact path="/nsi/create" component={CreateHeader} />
        <Route exact path="/nsi/:id/edit" component={EditHeader} />
        <Route path="/nsi/:id" component={ViewHeader} />
        <Route exact path="/nsi" component={Placeholder} />
      </Switch>
    </HeaderWrapper>
  )
}

export default withRouter(Header)
