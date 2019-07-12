import React, {useState} from 'react';
import {
	TableContentBox,
	ContentBox,
	AnimatedSearchInput,
	FlexContainerBottomDivider
} from '../../import';
import {Box, Select, Heading, Text, Flex, Relative} from '@ursip/design-system';
import DatePicker from './DatePickerRange';

import styled from 'styled-components';
import {debounce} from 'throttle-debounce';
import * as actions from '../nsi/module/actions';
import {useDispatch} from 'react-redux';

const Corrector = styled(TableContentBox)`
	z-index: 12;
`;

function SearchAndFilter({amnt, ...props}) {
	const dispatch = useDispatch();
	/* A group of variables for the filtering input */
	const options = [
		{value: 'type', label: `По типу`},
		{value: 'number', label: `По номеру`},
		{value: 'objectName', label: `По объекту`},
		{value: 'stageName', label: `По стадии`},
		{value: 'dateChange', label: `По дате изменения`}
	];
	const functionOptions = [
		{value: 'type', label: `Есть многое такое `},
		{value: 'number', label: `Друг Горацио`},
		{value: 'objectName', label: `Что и не снилось`},
		{value: 'stageName', label: `Нашим мудрецам`}
	];

	/*  */
	const [value, setOption] = useState(options[4]);
	const [functionValue, setFunctionOption] = useState({});

	const searchQuery = '';

	const onChange = newOption => {
		setOption(newOption);
	};
	const onFunctionalChange = newOption => {
		setFunctionOption(newOption);
	};

	const handleSearch = debounce(200, query =>
		dispatch(actions.searchCatalogs(query))
	);

	if (props !== undefined) {
		return (
			<Corrector>
				<ContentBox flexDirection={'column'}>
					<FlexContainerBottomDivider flexDirection={'row'}>
						<Box p={3}>
							<AnimatedSearchInput
								value={searchQuery}
								onSearch={handleSearch}
								placeholder="Поиск"
								shrinkWidth={80}
								growWidth={160}
							/>
						</Box>
						<Box p={3} pl={0}>
							<Heading>Проекты ({amnt})</Heading>
						</Box>
					</FlexContainerBottomDivider>
					<Flex flexFlow={'row nowrap'} pt={1}>
						<Box p={2} id={'sortTypePickerGroup'}>
							<Box pl={1}>
								<Text fontSize={'12px'} color="grey">
									Сортировка
								</Text>
							</Box>
							<Box width={160} p={1}>
								<Select
									value={value}
									onChange={onChange}
									options={options}
									size="medium"
								/>
							</Box>
						</Box>
						<Box p={2} pl={0} id={'datePickerGroup'}>
							<Box pl={1}>
								<Text fontSize={'12px'} color="grey">
									Дата подачи от и до
								</Text>
							</Box>
							<Box width={292} p={1}>
								<DatePicker />
							</Box>
						</Box>
						<Relative
							p={2}
							pl={0}
							id={'functionPickerGroup'}
							left={-80}
						>
							<Box pl={1}>
								<Text fontSize={'12px'} color="grey">
									Функциональное значение
								</Text>
							</Box>
							<Box width={160} p={1}>
								<Select
									onChange={onFunctionalChange}
									options={functionOptions}
									size="medium"
									placeholder={'Выбрать'}
								/>
							</Box>
						</Relative>
					</Flex>
					<ContentBox
						flexDirection={'r0w'}
						justifyContent={'flex-end'}
						alignItems={'flex-end'}
						flexWrap={'nowrap'}
					>
						<Box p={2}>
							<Text fontSize={1} color={'primary'}>
								Сбросить фильтры
							</Text>
						</Box>
					</ContentBox>
				</ContentBox>
			</Corrector>
		);
	} else {
		return null;
	}
}

export default SearchAndFilter;