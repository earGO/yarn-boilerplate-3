import React from 'react';
import {Helmet} from 'react-helmet';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router-dom';

import {name as appName} from '../package.json';

import {baseRoute as nsiModuleRoute} from './components/nsi/module';

import {Common, Main} from '@project/components';
import {projectCard} from '@project/modules';

const {Layout, Loading, NotFound} = Common;
const projectCardRoute = projectCard.baseRoute;

const routes = [
	{
		key: 'Main',
		path: '/',
		exact: true,
		component: React.lazy(() => Main)
	},
	{
		key: 'Nsi',
		path: nsiModuleRoute,
		component: React.lazy(() => import('./components/nsi'))
	},
	{
		key: 'project-card',
		path: projectCardRoute,
		component: React.lazy(() => import(projectCard))
	}
];

function Routes({history}) {
	return (
		<React.Fragment>
			<Helmet>
				<title>{appName}</title>
			</Helmet>
			<ConnectedRouter history={history}>
				<Layout>
					<React.Suspense fallback={<Loading overlay />}>
						<Switch>
							{routes.map(route => (
								<Route {...route} />
							))}
							<Route component={NotFound} />
						</Switch>
					</React.Suspense>
				</Layout>
			</ConnectedRouter>
		</React.Fragment>
	);
}

export default Routes;
