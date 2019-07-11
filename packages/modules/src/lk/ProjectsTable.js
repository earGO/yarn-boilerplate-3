import React from 'react';
import {Table, Flex, Box, Button} from '@ursip/design-system';
import {Icon} from '../../import';
import {TableContentBox} from '../../import';
import styled from 'styled-components';

const ActionButtom = styled(Button)`
	position: relative;
	top: 3px;
	transition: all 0.15s ease-in-out;
	&:hover {
		transform: scale(1.15);
	}
`;

const CenteredHeadee = ({width, ...props}) => (
	<Table.HeaderCell>
		<Flex width={width} justifyContent={'center'}>
			{props.children}
		</Flex>
	</Table.HeaderCell>
);

const ProgressCell = ({rowData, dataKey, ...props}) => (
	<Table.Cell {...props} style={{padding: 0}}>
		<Flex justifyContent={'center'} width={140}>
			<Box>{rowData[dataKey]}</Box>
		</Flex>
	</Table.Cell>
);

const ActionCell = ({rowData, dataKey, ...props}) => {
	function handleAction() {
		console.log(rowData[dataKey]);
	}
	return (
		<Table.Cell {...props} style={{padding: 0}}>
			<Flex justifyContent={'center'} width={96}>
				<ActionButtom type={`flat`} onClick={handleAction}>
					<Icon name={'more_horiz'} />
				</ActionButtom>
			</Flex>
		</Table.Cell>
	);
};

const handleOnEditClick = rowData => {
	console.log('click', rowData);
};

class ProjectsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editRowId: null
		};
	}

	render() {
		return (
			<TableContentBox>
				<Table disabledScroll data={this.props.projects} height={144}>
					<Table.Column width={160}>
						<Table.HeaderCell style={{paddingLeft: '16px'}}>
							Тип
						</Table.HeaderCell>
						<Table.Cell dataKey="type" />
					</Table.Column>
					<Table.Column width={80}>
						<Table.HeaderCell>Номер</Table.HeaderCell>
						<Table.Cell dataKey="number" />
					</Table.Column>

					<Table.Column width={272}>
						<Table.HeaderCell>Объект</Table.HeaderCell>
						<Table.Cell dataKey="objectName" />
					</Table.Column>
					<Table.Column width={192}>
						<Table.HeaderCell>Стадии</Table.HeaderCell>
						<Table.Cell dataKey="stageName" />
					</Table.Column>
					<Table.Column width={160}>
						<Table.HeaderCell>Дата изменения</Table.HeaderCell>
						<Table.Cell dataKey="dateChange" />
					</Table.Column>
					<Table.Column width={160}>
						<Table.HeaderCell style={{padding: '6px'}}>
							Прогресс выполнения
						</Table.HeaderCell>
						<ProgressCell dataKey="progress" />
					</Table.Column>

					<Table.Column width={96}>
						<Table.HeaderCell>Действия</Table.HeaderCell>
						<ActionCell dataKey="progress" />
					</Table.Column>
				</Table>
			</TableContentBox>
		);
	}
}

export default ProjectsTable;
