import React from 'react';

import minus from 'images/minus-circle.png';

/**************************************************************************************/
function AssignedTag(props) {

	/****************************************/
	const removeTag = (e) =>{
		e.preventDefault();
		props.removeTag(props.tag);
	}
	/****************************************/

	
	/****************************************/
	return(
		<div className="row">
			<div className="col-12">
				<a href="# " onClick={(e) => removeTag(e)}>
					<img src={minus} alt="remove tag" />&nbsp;
					<span className="tag-link">{props.tag.tag}</span>
				</a>
			</div>
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default AssignedTag;