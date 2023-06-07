import React from 'react';

import del from 'images/trash.png';
import edit from 'images/edit.png';

/**************************************************************************************/
function Tag(props){

	/****************************************/
	const handleModal = () =>{
		props.handleModal('delete_tag',props.tag.id);
	}
	/****************************************/


	/****************************************/
	const handleShowEdit = () =>{
		props.handleShowEdit(props.tag);
	}
	/****************************************/


	/****************************************/
	return(
		<div className="row">
			<div className="col-12">
				<button className="btn button-icon"><img src={del} alt="delete" onClick={handleModal} /></button>
				<button className="btn button-icon"><img src={edit} alt="edit" onClick={handleShowEdit} /></button>
				<span className="tag-name">{props.tag.tag}</span>
			</div>
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default Tag;