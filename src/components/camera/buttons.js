import React, { Fragment } from 'react';


/**************************************************************************************/
function Buttons(props) {

	/****************************************/
	return(
		<Fragment>
			<div className="row button-row">
				<div className="col-12">
					<button type="button" className="btn btn-primary" onClick={props.addRecipe}>Add</button>
					<button type="button" className="btn btn-primary" onClick={props.backToCamera}>Back To Camera</button>
				</div>
			</div>
			<br /><br />
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Buttons;
