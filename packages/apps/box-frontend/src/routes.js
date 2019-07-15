import React from 'react'
import {Helmet} from 'react-helmet'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router-dom'

import {name as appName} from '../package.json'

// import {baseRoute as nsiModuleRoute} from './components/nsi/module';

import {projectCard, Layout, Loading, NotFound, Main, nsi, lk} from './import'
import './LazyLoad/ProjectCard'

const projectCardRoute = projectCard.baseRoute
const nsiModuleRoute = nsi.baseRoute
const lkModuleRoute = lk.baseRoute

const routes = [
	{
		key: 'Main',
		path: '/',
		exact: true,
		component: React.lazy(() => import('./LazyLoad/Main'))
	},
	{
		key: 'Nsi',
		path: nsiModuleRoute,
		component: React.lazy(() => import('./LazyLoad/Nsi'))
	},
	{
		key: 'project-card',
		path: projectCardRoute,
		component: React.lazy(() => import('./LazyLoad/ProjectCard'))
	},
	{
		key: 'lk',
		path: lkModuleRoute,
		component: React.lazy(() => import('./LazyLoad/LK'))
	}
]

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
	)
}

export default Routes
