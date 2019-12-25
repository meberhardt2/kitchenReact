import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/common/loading';
import ErrorBoundary from 'components/common/error_boundary';
import Header from 'components/common/header';

const Homepage = lazy(() => import('components/homepage/index'));
const Recipe = lazy(() => import('components/recipe/index'));
const Tags = lazy(() => import('components/tags/index'));
const Search = lazy(() => import('components/search/index'));
const Camera = lazy(() => import('components/camera/index'));
const Upload = lazy(() => import('components/upload/index'));

/**************************************************************************************/
export default class App extends React.Component {

	/********************************************/
	render(){
		return(
			<Router>
				<Header />

				<div className="content">
					<ErrorBoundary>
						<Suspense fallback={<Loading />}>
							<Switch>
								<Route exact path="/" component={Homepage} />
								<Route path="/recipe/:id" component={Recipe} />
								<Route exact path="/tags" component={Tags} />
								<Route exact path="/search/" component={Search} />
								<Route exact path="/camera" component={Camera} />
								<Route exact path="/upload" component={Upload} />
							</Switch>
						</Suspense>
					</ErrorBoundary>
				</div>
				
			</Router>
		);
	}
	/********************************************/

}
/**************************************************************************************/

