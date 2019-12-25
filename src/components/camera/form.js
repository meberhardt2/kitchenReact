import React, { Fragment } from 'react';

/**************************************************************************************/
export default class Form extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>
				<div className="row">
					<div className="col-12 col-md-2">Name</div>
					<div className="col-12 col-md-7"><input type="text" className="form-control" name="recipe_name" onChange={this.props.handleInputChange} value={this.props.recipe_name || ''} /></div>
				</div>

				<div className="row">
					<div className="col-12 col-md-2">Recipe</div>
					<div className="col-12 col-md-8">
						<textarea name="recipe" value={this.props.recipe} onChange={this.props.handleInputChange} className="form-control ocr-textbox"></textarea>
					</div>
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
