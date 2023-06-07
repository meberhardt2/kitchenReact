import React, { Fragment } from 'react';

/**************************************************************************************/
function Form(props) {

	/****************************************/
	return(
		<Fragment>
			<div className="row">
				<div className="col-12 col-md-2">Name</div>
				<div className="col-12 col-md-7"><input type="text" className="form-control" name="recipe_name" onChange={props.handleInputChange} value={props.recipe_name || ''} /></div>
			</div>

			<div className="row">
				<div className="col-12 col-md-2">Recipe</div>
				<div className="col-12 col-md-8">
					<textarea name="recipe" value={props.recipe} onChange={props.handleInputChange} className="form-control ocr-textbox"></textarea>
				</div>
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Form;