import React from 'react';

import minus from 'images/minus-circle.png';

/**************************************************************************************/
export default class AssignedTag extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.removeTag = this.removeTag.bind(this);
	}
	/****************************************/


	/****************************************/
	removeTag(e){
		e.preventDefault();
		this.props.removeTag(this.props.tag);
	}
	/****************************************/

	
	/****************************************/
	render(){
		return(
			<div className="row">
				<div className="col-12">
					<a href="# " onClick={(e) => this.removeTag(e)}>
						<img src={minus} alt="remove tag" />&nbsp;
						<span className="tag-link">{this.props.tag.tag}</span>
					</a>
				</div>
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
