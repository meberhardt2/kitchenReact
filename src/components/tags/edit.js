import React, { Fragment } from 'react';


/**************************************************************************************/
export default class TagIndex extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>
				{this.props.showEdit &&
					<div className="row">
						<div className="col-12 col-md-4"><input type="text" placeholder='New Tag' className="form-control" name="new_tag" onChange={this.props.handleEditTag} value={this.props.tag.tag} /></div>
						<div className="col-12 col-md-3 button-row">
							<button type="button" className="btn btn-primary" onClick={this.props.handleUpdate}>Update</button>
							<button type="button" className="btn btn-secondary" onClick={this.props.handleCancelEdit}>Cancel</button>
						</div>
					</div>
				}
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
