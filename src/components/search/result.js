import React, { Fragment } from 'react';

/**************************************************************************************/
export default class Result extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.viewRecipe = this.viewRecipe.bind(this);
	}
	/****************************************/


	/****************************************/
	viewRecipe(e){
		e.preventDefault();
		this.props.viewRecipe(this.props.result.id);
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<Fragment>
				<div className="row">
					<div className="col-12">
						<a href="# " onClick={(e) => this.viewRecipe(e)}>
							{this.props.result.recipe_name}
						</a>
					</div>
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
