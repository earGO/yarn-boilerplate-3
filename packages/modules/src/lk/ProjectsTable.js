import React from 'react';
import PropTypes from 'prop-types';
import {Table, Box} from '@ursip/design-system';
import {TableContentBox} from '../../import';

function ProjectsTable({projects, ...props}) {
	if (projects !== undefined) {
		return (
			<TableContentBox>
				<Table
					data={projects}
					height={216}
					hover={true}
					headerHeight={48}
					disabledScroll={true}
				>
					<Table.Column width={160} sort fixed>
						<Table.HeaderCell style={{paddingLeft: '16px'}}>
							Тип
						</Table.HeaderCell>
						<Table.Cell dataKey="type" />
					</Table.Column>

					<Table.Column resizable width={80} sort>
						<Table.HeaderCell>Номер</Table.HeaderCell>
						<Table.Cell dataKey="number" />
					</Table.Column>

					<Table.Column width={272} sort>
						<Table.HeaderCell>Объект</Table.HeaderCell>
						<Table.Cell dataKey="objectName" />
					</Table.Column>
					<Table.Column width={192}>
						<Table.HeaderCell>Стадия</Table.HeaderCell>
						<Table.Cell dataKey="progress" />
					</Table.Column>

					<Table.Column width={160}>
						<Table.HeaderCell>Дата изменения</Table.HeaderCell>
						<Table.Cell dataKey="dateChange" />
					</Table.Column>
					<Table.Column width={192}>
						<Table.HeaderCell>Прогресс выполнения</Table.HeaderCell>
						<Table.Cell dataKey="progress" />
					</Table.Column>
					<Table.Column width={96}>
						<Table.HeaderCell>Действия</Table.HeaderCell>
						<Table.Cell dataKey="progress" />
					</Table.Column>
				</Table>
			</TableContentBox>
		);
	} else {
		return null;
	}
}

ProjectsTable.propTypes = {};

ProjectsTable.defaultProps = {};

export default ProjectsTable;
