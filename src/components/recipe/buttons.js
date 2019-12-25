import React, { Fragment } from 'react';


/**************************************************************************************/
export default class Buttons extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.handleModal = this.handleModal.bind(this);
	}
	/****************************************/


	/****************************************/
	handleModal(){
		this.props.handleModal('delete_recipe');
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<Fragment>

				<div className="row button-row">
					<div className="col-12">
						{parseInt(this.props.id) === 0 &&
							<button type="button" className="btn btn-primary" onClick={this.props.addRecipe}>Add</button>
						}

						{parseInt(this.props.id) !== 0 &&
							<Fragment>
								<button type="button" className="btn btn-primary" onClick={this.props.saveRecipe}>Save</button>
								<button type="button" className="btn btn-danger" onClick={this.handleModal}>Delete</button>
							</Fragment>
						}
					</div>
				</div>
				<br /><br />
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/

