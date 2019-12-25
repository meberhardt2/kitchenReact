import React from 'react';

import del from 'images/trash.png';
import edit from 'images/edit.png';

/**************************************************************************************/
export default class Tag extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.handleModal = this.handleModal.bind(this);
		this.handleShowEdit = this.handleShowEdit.bind(this);
	}
	/****************************************/


	/****************************************/
	handleModal(){
		this.props.handleModal('delete_tag',this.props.tag.id);
	}
	/****************************************/


	/****************************************/
	handleShowEdit(){
		this.props.handleShowEdit(this.props.tag);
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<div className="row">
				<div className="col-12">
					<button className="btn button-icon"><img src={del} alt="delete" onClick={this.handleModal} /></button>
					<button className="btn button-icon"><img src={edit} alt="edit" onClick={this.handleShowEdit} /></button>
					<span className="tag-name">{this.props.tag.tag}</span>
				</div>
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
