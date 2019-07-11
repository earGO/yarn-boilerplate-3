import React, {useState} from 'react';
import {TableContentBox} from '../../import';
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

const Corrector = styled(TableContentBox)`
	z-index: 3;
`;

const createForm = Form.create;
const FormItem = Form.Item;

function SearchAndFilterForm(props) {
	/* A group of variables for the filtering input */
	const options = [
		{value: 'type', label: `По типу`},
		{value: 'number', label: `По номеру`},
		{value: 'objectName', label: `По объекту`},
		{value: 'stageName', label: `По стадии`},
		{value: 'dateChange', label: `По дате изменения`}
	];
	const initialState = options[4];

	const [value, setOption] = useState(initialState);
	const [data, setData] = useState('');

	const onChange = newOption => {
		setOption(newOption);
	};

	const {getFieldDecorator, getFieldValue} = props.form;

	const handleSubmit = event => {
		event.preventDefault();
		const {validateFields} = props.form;
		validateFields((err, values) => {
			if (!err) {
				setData(JSON.stringify(values));
			} else {
				setData(JSON.stringify(err));
			}
		});
	};

	if (props !== undefined) {
		return (
			<Corrector>
				<Box>
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
					<DatePicker id="hello" placeholder="Выберите дату" />
				</Box>
			</Corrector>
		);
	} else {
		return null;
	}
}

const SearchAndFilter = createForm()(SearchAndFilterForm);

export default SearchAndFilter;
