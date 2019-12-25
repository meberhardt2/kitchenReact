import React, { Fragment } from 'react';


/**************************************************************************************/
export default class Buttons extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>

				<div className="row button-row">
					<div className="col-12">

						{this.props.showForm && 
							<Fragment>
								<button type="button" className="btn btn-primary" onClick={this.props.handleSearch}>Search</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.handleRandom}>Random</button>
							</Fragment>
						}

						{this.props.showResults && 
							<Fragment>
								<button type="button" className="btn btn-primary" onClick={this.props.handleShowForm}>Show Form</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.handleRandom}>Random</button>
							</Fragment>
						}

						{this.props.showRecipe && 
							<Fragment>
								<button type="button" className="btn btn-primary" onClick={this.props.handleShowResults}>Back To Results</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.handleShowForm}>Show Form</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.handleEdit}>Edit</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.handleBookmark}>Bookmark</button>
								&nbsp;
								<button type="button" className="btn btn-primary" onClick={this.props.sendEmail}>Email</button>
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

