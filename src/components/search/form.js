import React, { Fragment } from 'react';

import AvailableTag from 'components/common/available_tag';
import AssignedTag from 'components/common/assigned_tag';

/**************************************************************************************/
function Form(props) {

	/****************************************/
	return(
		<Fragment>
			<div className="row">
				<div className="col-12 col-md-1">Name</div>
				<div className="col-12 col-md-7"><input type="text" className="form-control" name="recipe_name" onChange={props.handleInputChange} value={props.recipe_name || ''} /></div>
			</div>
			
			<div className="row">
				<div className="col-12 col-md-1"></div>

				<div className="col-12 col-md-5">
					<div className="tag-holder">
						<div className="tag-holder-header">Search Tag(s)</div>
						{props.tags.map((tag,index) =>
							<AssignedTag key={tag.id} tag={tag} removeTag={props.removeTag} />
						)}
					</div>
				</div>

				<div className="col-12 col-md-5">
					<div className="tag-holder">
						<div className="tag-holder-header">Available Tag(s)</div>
						{props.all_tags.map((tag,index) =>
							<AvailableTag key={tag.id} tag={tag} addTag={props.addTag} />
						)}
					</div>
				</div>

			</div>

			<div className="row">
				<div className="col-12 col-md-1">Ingredients</div>
				<div className="col-12 col-md-10"><textarea className="form-control ingredients" name="ingredients" onChange={props.handleInputChange} value={props.ingredients || ''} /></div>
			</div>

		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Form;