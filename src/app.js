import React,{ Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Header from 'components/common/header';
import Homepage from 'components/homepage/index';
import Recipe from 'components/recipe/index';
import Tags from 'components/tags/index';
import Search from 'components/search/index';
import Camera from 'components/camera/index';
import Upload from 'components/upload/index';

/**************************************************************************************/
export default class App extends React.Component {

	/********************************************/
	render(){
		return(
			<Router>
				<Fragment>
					<Header />

					<div className="content">
						<Switch>
							<Route exact path="/" component={Homepage} />
							<Route path="/recipe/:id" component={Recipe} />
							<Route exact path="/tags" component={Tags} />
							<Route exact path="/search/" component={Search} />
							<Route exact path="/camera" component={Camera} />
							<Route exact path="/upload" component={Upload} />
						</Switch>
					</div>
					
					<NotificationContainer />
				</Fragment>
			</Router>
		)
	}
	/********************************************/

}
/**************************************************************************************/

