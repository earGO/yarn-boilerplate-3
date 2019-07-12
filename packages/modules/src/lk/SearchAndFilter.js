import React, {useState} from 'react';
import {TableContentBox, SearchInput, AnimatedSearchInput} from '../../import';
import {
	Box,
	Select,
	Form,
	Heading,
	Input,
	Button,
	Text
} from '@ursip/design-system';
import DatePicker from './DatePickerRange';

import styled from 'styled-components';
import {debounce} from 'throttle-debounce';
import * as actions from '../nsi/module/actions';
import {useDispatch} from 'react-redux';

const Corrector = styled(TableContentBox)`
	z-index: 12;
`;

const createForm = Form.create;
const FormItem = Form.Item;

function SearchAndFilterForm(props) {
	const dispatch = useDispatch();
	/* A group of variables for the filtering input */
	const options = [
		{value: 'type', label: `По типу`},
		{value: 'number', label: `По номеру`},
		{value: 'objectName', label: `По объекту`},
		{value: 'stageName', label: `По стадии`},
		{value: 'dateChange', label: `По дате изменения`}
	];

	/*  */
	const [value, setOption] = useState(options[4]);

	const searchQuery = '';

	const onChange = newOption => {
		setOption(newOption);
	};

	const {getFieldDecorator, getFieldValue} = props.form;

	const handleSearch = debounce(200, query =>
		dispatch(actions.searchCatalogs(query))
	);

	if (props !== undefined) {
		return (
			<Corrector>
				<Box>
					<AnimatedSearchInput
						value={searchQuery}
						onSearch={handleSearch}
						placeholder="Поиск"
						shrinkWidth={80}
						growWidth={160}
					/>
					<Heading>Проекты</Heading>
				</Box>
				<Box>
					<Box width={160}>
						<Select
							value={value}
							onChange={onChange}
							options={options}
							size="small"
						/>
					</Box>
				</Box>
				<Box width={292}>
					<DatePicker />
				</Box>
			</Corrector>
		);
	} else {
		return null;
	}
}

const SearchAndFilter = createForm()(SearchAndFilterForm);

export default SearchAndFilter;
