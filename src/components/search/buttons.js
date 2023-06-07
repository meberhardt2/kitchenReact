import React, { Fragment } from 'react';

/**************************************************************************************/
function Buttons(props) {

	/****************************************/
	return(
		<Fragment>
			<div className="row button-row">
				<div className="col-12">

					{props.showForm && 
						<Fragment>
							<button type="button" className="btn btn-primary" onClick={props.handleSearch}>Search</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.handleRandom}>Random</button>
						</Fragment>
					}

					{props.showResults && 
						<Fragment>
							<button type="button" className="btn btn-primary" onClick={props.handleShowForm}>Show Form</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.handleRandom}>Random</button>
						</Fragment>
					}

					{props.showRecipe && 
						<Fragment>
							<button type="button" className="btn btn-primary" onClick={props.handleShowResults}>Back To Results</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.handleShowForm}>Show Form</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.handleEdit}>Edit</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.handleBookmark}>Bookmark</button>
							&nbsp;
							<button type="button" className="btn btn-primary" onClick={props.sendEmail}>Email</button>
						</Fragment>
					}

				</div>
			</div>
			<br /><br />
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Buttons;