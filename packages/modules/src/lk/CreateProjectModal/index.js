import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../module/selectors'
import {globalNavigation} from '../../../localIntegration'
import {Modal, Card, Text, Button} from '../../../import'

const localActions = globalNavigation.actions

function CreateProjectModal({...props}) {
	const modalOpened = useSelector(
		selectors.openCreateProjectFormModalSelector
	)
	const dispatch = useDispatch()
	const closeModal = () => dispatch(localActions.closeCreateModal())
	return (
		<Modal isOpen={modalOpened}>
			<Card bg="white" p={3}>
				<Text align="center">
					<Text>
						Сохраните все данные и завершите работу{' '}
						<Text bold>до 19:00</Text>. Система будет обновлена.
					</Text>
					<Button
						mt={2}
						type="secondary"
						size="small"
						onClick={closeModal}
					>
						Хорошо
					</Button>
				</Text>
			</Card>
		</Modal>
	)
}

CreateProjectModal.propTypes = {}

CreateProjectModal.defaultProps = {}

export default CreateProjectModal
