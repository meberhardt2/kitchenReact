import React, { Fragment } from 'react';

/**************************************************************************************/
function Buttons(props) {

	/****************************************/
	const handleModal = () =>{
		props.handleModal('delete_recipe');
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>
			<div className="row button-row">
				<div className="col-12">
					{parseInt(props.id) === 0 &&
						<button type="button" className="btn btn-primary" onClick={props.addRecipe}>Add</button>
					}

					{parseInt(props.id) !== 0 &&
						<Fragment>
							<button type="button" className="btn btn-primary" onClick={props.saveRecipe}>Save</button>
							<button type="button" className="btn btn-danger" onClick={handleModal}>Delete</button>
						</Fragment>
					}
				</div>
			</div>
			<br /><br />
		</Fragment>
	)
	/****************************************/

}
/**************************************************************************************/

export default Buttons;
