import React from 'react';
import {useSelector} from 'react-redux';
import * as module from './module';
import {Flex, Table, Box} from '@ursip/design-system';
import * as selectors from './module/selectors';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import {ContentBox, Loading} from '../../import';
import ProjectsTable from './ProjectsTable';
import TableContentBox from '@project/components/src/common/TableContentBox';

function LK({props}) {
	const loading = useSelector(selectors.projectsLoading);
	const data = useSelector(selectors.projectsDataSelector);
	const arrayOfProjects = useSelector(selectors.projectsArraySelector);
	const flattenArrayOfProjects = useSelector(
		selectors.projectsFlattenArraySelector
	);

	const notReady = loading && !data;
	data ? console.log(flattenArrayOfProjects) : console.log('nope');
	return (
		<DynamicModuleLoader modules={[module.default]}>
			{notReady ? (
				<Loading overlay>Загрузка карточки проекта</Loading>
			) : (
				<Flex
					style={{height: '100%'}}
					flexDirection={'column'}
					justifyContent={'flex-start'}
				>
					<TableContentBox
						flexDirection={'row'}
						alignItems={'flex-start'}
						padding={16}
					>
						<ProjectsTable projects={flattenArrayOfProjects} />
					</TableContentBox>
				</Flex>
			)}
		</DynamicModuleLoader>
	);
}

LK.propTypes = {};

LK.defaultProps = {};

LK.baseRoute = module.baseRoute;

export default LK;
