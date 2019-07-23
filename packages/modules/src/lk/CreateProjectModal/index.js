import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../module/selectors'
import {globalNavigation} from '../../../localIntegration'
import {
	Modal,
	Card,
	Text,
	Button,
	ContentBox,
	Heading,
	Flex,
	Input,
	Box,
	Select
} from '../../../import'

const localActions = globalNavigation.actions

function CreateProjectModal({...props}) {
	const localFunctional = [
		[
			{value: 'function1', label: `Функция 1`},
			{value: 'function2', label: `Функция 2`},
			{value: 'function3', label: `Функция 3`},
			{value: 'function4', label: `Функция 4`},
			{value: 'function5', label: `Функция 5`}
		]
	]
	/* Local state */
	const [functional, setFunctional] = useState(localFunctional[4])

	const handleChangeFunctional = newOption => {
		setFunctional(newOption)
	}

	const modalOpened = useSelector(
		selectors.openCreateProjectFormModalSelector
	)
	const dispatch = useDispatch()
	const closeModal = () => dispatch(localActions.closeCreateModal())

	return (
		<Modal isOpen={modalOpened}>
			<Box width={800} bg="white" height={680} p={2} pt={1}>
				<Flex
					m={4}
					flexDirection={'column'}
					justifyContent={'space-evenly'}
					flexWrap={'nowrap'}
				>
					<Box>
						<Heading tag={'h4'}>Создание ИМ ОКС</Heading>
					</Box>

					<Box width={1 / 1}>
						<Text fontSize={'12px'}>Наименование ОКС</Text>
						<Input placeholder={'Введите название ОКС'} />
					</Box>
					<Flex id={'field-columns'}>
						<Flex
							id={'left-column'}
							flexDirection={'column'}
							width={1 / 2}
						>
							<Box width={352} p={2}>
								<Select
									options={localFunctional}
									placeholder={
										'Выберите код по классификатору'
									}
									onChange={handleChangeFunctional}
									size="medium"
								/>
							</Box>
						</Flex>
						<Flex
							id={'right-column'}
							flexDirection={'column'}
							width={1 / 2}
						></Flex>
					</Flex>
					<Flex
						id={'buttons'}
						flexDirection={'row'}
						justifyContent={'flex-end'}
						width={'100%'}
					>
						<Button
							m={2}
							type="primary"
							size="small"
							onClick={closeModal}
						>
							Создать
						</Button>
						<Button
							m={2}
							type="primary"
							size="small"
							onClick={closeModal}
						>
							Отмена
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Modal>
	)
}

CreateProjectModal.propTypes = {}

CreateProjectModal.defaultProps = {}

export default CreateProjectModal
