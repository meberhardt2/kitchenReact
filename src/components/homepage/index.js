import React, { Fragment } from 'react';

import API from 'api/api';
import refresh from 'images/refresh.png';
import Recipe from 'components/common/recipe';

/**************************************************************************************/
export default class Homepage extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
			recipe: {},
		}

		this.refresh = this.refresh.bind(this);
	}
	/****************************************/


	/****************************************/
	componentDidMount(){
		this.refresh();
	}
	/****************************************/


	/****************************************/
	refresh(){
		document.getElementById('spinner-holder').style.display = 'block';
		API.getBookmark().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				recipe: data
			});
		});
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<Fragment>
				<div className="row button-row">
					<div className="col-12">
						<button className="btn refresh" onClick={this.refresh}><img src={refresh} alt="refresh" /></button>
					</div>
				</div>

				{typeof this.state.recipe.id !== 'undefined' &&
					<Recipe recipe={this.state.recipe} />
				}

				{typeof this.state.recipe.id === 'undefined' &&
					<Fragment>
						<div className="row">
							<div className="col-12 text-center">Nothing Bookmarked :-(</div>
						</div>			
					</Fragment>
				}
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/

