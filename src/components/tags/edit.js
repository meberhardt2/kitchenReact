import React, { Fragment } from 'react';


/**************************************************************************************/
function TagIndex(props) {

	/****************************************/
	return(
		<Fragment>
			{props.showEdit &&
				<div className="row">
					<div className="col-12 col-md-4"><input type="text" placeholder='New Tag' className="form-control" name="new_tag" onChange={props.handleEditTag} value={props.tag.tag} /></div>
					<div className="col-12 col-md-3 button-row">
						<button type="button" className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
						<button type="button" className="btn btn-secondary" onClick={props.handleCancelEdit}>Cancel</button>
					</div>
				</div>
			}
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default TagIndex;