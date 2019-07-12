import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import * as module from './module';
import {Flex, Box, Button, Text, Relative} from '@ursip/design-system';
import * as selectors from './module/selectors';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import {Loading, ContentBox, Icon} from '../../import';
import ProjectsTable from './ProjectsTable';
import SearchAndFilter from './SearchAndFilter';
import styled from 'styled-components';
import Infograph01 from './Infograph01';
import Infograph02 from './Infograph02';

const BottomPart = styled(Box)`
	border-width: 1px;
	border-style: solid;
	border-color: ${props => props.theme.colors.semiLightGrey};
	margin: 0 auto;
	width: 1120px;
`;

const InfoGraphics = styled(Relative)`
	border-width: 1px;
	border-style: solid;
	border-color: ${props => props.theme.colors.semiLightGrey};
	margin: 32px auto;
	width: 1120px;
	height:256px;!important;
`;

const Scaler = styled(Relative)`
	transform: scale(0.8, 0.65);
`;

const GraphPosition = styled(Relative)`
	margin: 0 auto;
`;

const IconPosition = styled(Flex)`
	position: absolute;
	width: 100%;
	top: 8px;
	right: 6px;
`;

function LK({props}) {
	const loading = useSelector(selectors.projectsLoading);
	const data = useSelector(selectors.projectsDataSelector);
	const flattenArrayOfProjects = useSelector(
		selectors.projectsFlattenArraySelector
	);

	const [openTable, setTableOpen] = useState(false);

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
					<InfoGraphics mt={4}>
						<Flex
							flexFlow={'row nowrap'}
							justifyContent={'center'}
							mt={2}
						>
							<Text fontSize={3}>Инфографика</Text>
						</Flex>
						<IconPosition justifyContent={'flex-end'}>
							<Icon
								name={'fullscreen'}
								color={'primary'}
								size={1}
							/>
						</IconPosition>
						<Flex flexFlow={'row nowrap'} justifyContent={'center'}>
							<GraphPosition top={5} left={-10}>
								{' '}
								<Scaler top={30}>
									<Infograph01 />
								</Scaler>
								<Scaler top={-184}>
									<Infograph02 />
								</Scaler>
							</GraphPosition>
						</Flex>
					</InfoGraphics>
					<BottomPart mb={4}>
						<SearchAndFilter amnt={flattenArrayOfProjects.length} />
						<ProjectsTable
							projects={flattenArrayOfProjects}
							openTable={openTable}
						/>
						<ContentBox justifyContent={'flex-end'}>
							<Button
								m={3}
								onClick={() => {
									setTableOpen(!openTable);
									console.log(openTable);
								}}
								type="primary"
							>
								{openTable ? (
									<Text color={'white'}>Показать меньше</Text>
								) : (
									<Text color={'white'}>Показать ещё</Text>
								)}
							</Button>
						</ContentBox>
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
