import React, { Fragment } from 'react';

import Tag from 'components/tags/tag';

/**************************************************************************************/
export default class Tags extends React.Component {

	/****************************************/
	render(){
		return(
			<div className="results-tags">
				{this.props.tags.length > 0 &&
					<Fragment>
						{this.props.tags.map((tag,index) =>
							<Tag key={tag.id} tag={tag} handleModal={this.props.handleModal} handleShowEdit={this.props.handleShowEdit} />
						)}
					</Fragment>
				}
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
