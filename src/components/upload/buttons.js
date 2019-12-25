import React, { Fragment } from 'react';


/**************************************************************************************/
export default class Buttons extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>
				<div className="row button-row">
					<div className="col-12">
						<button type="button" className="btn btn-primary" onClick={this.props.addRecipe}>Add</button>
						<button type="button" className="btn btn-primary" onClick={this.props.backToUpload}>Back To Upload</button>
					</div>
				</div>
				<br /><br />
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/

