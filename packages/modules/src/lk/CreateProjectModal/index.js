import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../module/selectors'
import {globalNavigation} from '../../../localIntegration'
import {
	Modal,
	Text,
	Button,
	Heading,
	Flex,
	Input,
	Box,
	Select,
	Checkbox
} from '../../../import'

const localActions = globalNavigation.actions

const localFunctional = [
	{value: 'function1', label: `Функция 1`},
	{value: 'function2', label: `Функция 2`},
	{value: 'function3', label: `Функция 3`},
	{value: 'function4', label: `Функция 4`},
	{value: 'function5', label: `Функция 5`}
]

const localReasons = [
	{value: 'reason1', label: `Основание 1`},
	{value: 'reason2', label: `Основание 2`},
	{value: 'reason3', label: `Основание 3`},
	{value: 'reason4', label: `Основание 4`},
	{value: 'reason5', label: `Основание 5`}
]

const localTemplates = [
	{value: 'template1', label: `Шаблон ИМ многоквартирного дома`},
	{value: 'template2', label: `Шаблон ИМ производственного помещения`},
	{value: 'template3', label: `Шаблон ИМ образовательного учреждения`},
	{value: 'template4', label: `Шаблон ИМ складского помещения`},
	{value: 'template5', label: `Шаблон ИМ торгового центра`}
]

const projectTypes = [
	{value: 'type1', label: `ПН`},
	{value: 'type2', label: `НН`},
	{value: 'type3', label: `ОКС`}
]

const localStages = [
	{value: 'stage1', label: `ОБИН`},
	{value: 'stage2', label: `Проектирование`},
	{value: 'stage3', label: `Строительство`},
	{value: 'stage4', label: `Эксплуатация`},
	{value: 'stage5', label: `Снос`}
]

const localConstructionTypes = [
	{value: 'ConstructionType1', label: `Промышленное`},
	{value: 'ConstructionType2', label: `Транспортное`},
	{value: 'ConstructionType3', label: `Гражданское`},
	{value: 'ConstructionType4', label: `Военное`},
	{value: 'ConstructionType5', label: `Гидротехническое`},
	{value: 'ConstructionType6', label: `Гидромелиоративное`}
]

function CreateProjectModal({...props}) {
	/* Local state */
	const [functional, setFunctional] = useState(localFunctional[4])
	const [reason, setReason] = useState(localReasons[4])
	const [AIPMoscowChecked, setAIPMoscowChecked] = useState(false)
	const [selectedTemplate, setSelectedTemplate] = useState(localTemplates[1])
	const [projectType, setProjectType] = useState(projectTypes[1])
	const [projectStage, setProjectStage] = useState(localStages[1])
	const [projectConstructionType, setConstructionTypes] = useState(
		localConstructionTypes[1]
	)

	const handleChangeFunctional = newOption => {
		setFunctional(newOption)
	}
	const handleChangeReason = newOption => {
		setReason(newOption)
	}
	const handleAIPMoscowChecked = () => {
		setAIPMoscowChecked(!AIPMoscowChecked)
	}
	const handleSelectedTemplate = template => {
		setSelectedTemplate(template)
	}
	const handleProjectTypeSelect = selectedType => {
		setProjectType(selectedType)
	}
	const handleProjectStageSelect = selectedStage => {
		setProjectStage(selectedStage)
	}

	const handleConstructionTypesSelect = projectConstructionType => {
		setConstructionTypes(projectConstructionType)
	}

	/* Redux state */
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
					<Box mb={4}>
						<Heading tag={'h4'}>Создание ИМ ОКС</Heading>
					</Box>

					<Box width={1 / 1} mb={3}>
						<Text fontSize={'12px'} mb={2}>
							Наименование ОКС
						</Text>
						<Input placeholder={'Введите название ОКС'} />
					</Box>
					<Flex id={'field-columns'} mb={4}>
						<Flex
							id={'left-column'}
							flexDirection={'column'}
							width={1 / 2}
						>
							<Box width={352} pt={2} mb={4}>
								<Text
									fontSize={'12px'}
									color={'darkGray'}
									mb={2}
								>
									Функциональное назначение
								</Text>
								<Select
									options={localFunctional}
									placeholder={
										'Выберите код по классификатору'
									}
									onChange={handleChangeFunctional}
									size="medium"
								/>
							</Box>
							<Box width={352} mb={3}>
								<Text
									fontSize={'12px'}
									color={'darkGray'}
									mb={1}
								>
									Основание решения о строительстве ОКС
								</Text>
								<Select
									options={localReasons}
									placeholder={'Выбор из списка'}
									onChange={handleChangeReason}
									size="medium"
								/>
								<Box>
									<Checkbox
										mt={2}
										label="Включён в АИП Москвы"
										checked={AIPMoscowChecked}
										onChange={handleAIPMoscowChecked}
									/>
								</Box>
							</Box>
							<Box width={352} mb={4}>
								<Text fontSize={'12px'} mb={1}>
									Код в ЕИС Мосгорзаказ
								</Text>
								<Input placeholder={'Введите код'} />
							</Box>
							<Box width={352}>
								<Text
									fontSize={'12px'}
									mb={1}
									color={'darkGray'}
								>
									Выбор шаблона
								</Text>
								<Select
									options={localTemplates}
									value={selectedTemplate}
									onChange={handleSelectedTemplate}
									size="medium"
								/>
							</Box>
						</Flex>
						<Flex
							id={'right-column'}
							flexDirection={'column'}
							width={1 / 2}
						>
							<Box width={352} pt={2} mb={4}>
								<Text
									fontSize={'12px'}
									color={'darkGray'}
									mb={2}
								>
									Вид ОКС
								</Text>
								<Select
									options={projectTypes}
									placeholder={'Выберите Вид ОКС'}
									onChange={handleProjectTypeSelect}
									size="medium"
								/>
							</Box>
							<Box width={352} mb={4}>
								<Text
									fontSize={'12px'}
									color={'darkGray'}
									mb={1}
								>
									Начальная стадия
								</Text>
								<Select
									options={localStages}
									placeholder={'Выбор из списка'}
									onChange={handleProjectStageSelect}
									size="medium"
								/>
							</Box>
							<Box width={352} mb={3} mt={2} p={1}>
								<Text fontSize={'12px'} mb={1}>
									Вид строительства
								</Text>
								<Select
									options={localConstructionTypes}
									placeholder={'Выбор из списка'}
									value={projectConstructionType}
									onChange={handleConstructionTypesSelect}
									size="medium"
								/>
							</Box>
							<Box width={352} mt={2} pt={1}>
								<Text
									fontSize={'12px'}
									mb={1}
									color={'darkGray'}
								>
									Выбор готового проекта
								</Text>
								<Select
									options={localTemplates}
									value={selectedTemplate}
									onChange={handleSelectedTemplate}
									size="medium"
								/>
							</Box>
						</Flex>
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
