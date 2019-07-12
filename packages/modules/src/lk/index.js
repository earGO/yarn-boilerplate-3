import React from 'react';
import {useSelector} from 'react-redux';
import * as module from './module';
import {Flex, Box} from '@ursip/design-system';
import * as selectors from './module/selectors';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import {Loading} from '../../import';
import ProjectsTable from './ProjectsTable';
import SearchAndFilter from './SearchAndFilter';
import styled from 'styled-components';

const BottomPart = styled(Box)`
	border-width: 1px;
	border-style: solid;
	border-color: ${props => props.theme.colors.semiLightGrey};
	margin: 0 auto;
	width: 1120px;
`;

function LK({props}) {
	const loading = useSelector(selectors.projectsLoading);
	const data = useSelector(selectors.projectsDataSelector);
	const arrayOfProjects = useSelector(selectors.projectsArraySelector);
	const flattenArrayOfProjects = useSelector(
		selectors.projectsFlattenArraySelector
	);

	const notReady = loading && !data;
	return (
		<DynamicModuleLoader modules={[module.default]}>
			{notReady ? (
				<Loading overlay>Загрузка личного кабинета</Loading>
			) : (
				<Flex
					style={{height: '100%'}}
					flexDirection={'column'}
					justifyContent={'flex-start'}
				>
					<BottomPart>
						<SearchAndFilter
							something={'something'}
							amnt={flattenArrayOfProjects.length}
						/>
						<ProjectsTable projects={flattenArrayOfProjects} />
					</BottomPart>
				</Flex>
			)}
		</DynamicModuleLoader>
	);
}

LK.propTypes = {};

LK.defaultProps = {};

LK.baseRoute = module.baseRoute;

export default LK;
