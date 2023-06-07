import React, { Fragment } from 'react';

import Tag from 'components/tags/tag';

/**************************************************************************************/
function Tags(props) {

	/****************************************/
	return(
		<div className="results-tags">
			{props.tags.length > 0 &&
				<Fragment>
					{props.tags.map((tag,index) =>
						<Tag key={tag.id} tag={tag} handleModal={props.handleModal} handleShowEdit={props.handleShowEdit} />
					)}
				</Fragment>
			}
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default Tags;