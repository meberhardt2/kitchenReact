import React from 'react';

/**************************************************************************************/
function Recipe(props) {

	/****************************************/
	return(
		<div className="recipe-viewer">
			<h3>{props.recipe.recipe_name}</h3>

			<div className="row">
				<div className="col-12">
					<div><strong>Ingredients</strong></div>
					<br />
					{props.recipe.ingredients}
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div><strong>Recipe</strong></div>
					<br />
					{props.recipe.recipe}
				</div>
			</div>
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default Recipe;