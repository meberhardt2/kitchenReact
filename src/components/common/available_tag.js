import React from 'react';

import plus from 'images/plus-circle.png';

/**************************************************************************************/
export default class AvailableTag extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.addTag = this.addTag.bind(this);
	}
	/****************************************/


	/****************************************/
	addTag(e){
		e.preventDefault();
		this.props.addTag(this.props.tag);
	}
	/****************************************/

	
	/****************************************/
	render(){
		return(
			<div className="row">
				<div className="col-12">
					<a href="# " onClick={(e) => this.addTag(e)}>
						<img src={plus} alt="add tag" />&nbsp;
						<span className="tag-link">{this.props.tag.tag}</span>
					</a>
				</div>
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
