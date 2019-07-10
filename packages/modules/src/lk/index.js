import React from 'react';
import {useSelector} from 'react-redux';
import * as module from './module';
import {Flex} from '@ursip/design-system';
import * as selectors from './module/selectors';
import {DynamicModuleLoader} from 'redux-dynamic-modules';
import {ContentBox, Loading} from '../../import';

function LK({props}) {
	const loading = useSelector(selectors.projectLoading);

	const notReady = loading;
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
					<ContentBox
						flexDirection={'row'}
						alignItems={'flex-start'}
						padding={16}
					>
						Module working
					</ContentBox>
				</Flex>
			)}
		</DynamicModuleLoader>
	);
}

LK.propTypes = {};

LK.defaultProps = {};

LK.baseRoute = module.baseRoute;

export default LK;
