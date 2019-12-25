import React from 'react';

/**************************************************************************************/
export default class Recipe extends React.Component {

	/****************************************/
	render(){
		return(
			<div className="recipe-viewer">
				<h3>{this.props.recipe.recipe_name}</h3>

				<div className="row">
					<div className="col-12">
						<div><strong>Ingredients</strong></div>
						<br />
						{this.props.recipe.ingredients}
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<div><strong>Recipe</strong></div>
						<br />
						{this.props.recipe.recipe}
					</div>
				</div>
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
