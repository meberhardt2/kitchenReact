import React from 'react';

import plus from 'images/plus-circle.png';

/**************************************************************************************/
function AvailableTag(props) {

	/****************************************/
	const addTag = (e) =>{
		e.preventDefault();
		props.addTag(props.tag);
	}
	/****************************************/

	
	/****************************************/
	return(
		<div className="row">
			<div className="col-12">
				<a href="# " onClick={(e) => addTag(e)}>
					<img src={plus} alt="add tag" />&nbsp;
					<span className="tag-link">{props.tag.tag}</span>
				</a>
			</div>
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default AvailableTag;
