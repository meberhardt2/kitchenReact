import React, { Fragment } from 'react';

/**************************************************************************************/
function Result(props) {

	/****************************************/
	const viewRecipe = (e) =>{
		e.preventDefault();
		props.viewRecipe(props.result.id);
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>
			<div className="row">
				<div className="col-12">
					<a href="# " onClick={(e) => viewRecipe(e)}>
						{props.result.recipe_name}
					</a>
				</div>
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Result;