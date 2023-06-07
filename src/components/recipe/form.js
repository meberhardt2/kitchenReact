import React, { Fragment } from 'react';

import AvailableTag from 'components/common/available_tag';
import AssignedTag from 'components/common/assigned_tag';

/**************************************************************************************/
function Form(props) {

	/****************************************/
	return(
		<Fragment>
			<div className="row">
				<div className="col-12 col-md-2">Name</div>
				<div className="col-12 col-md-7"><input type="text" className="form-control" name="recipe_name" onChange={props.handleInputChange} value={props.recipe_name || ''} /></div>
				<div className="col-12 col-md-2"><label><input type="checkbox" value="y" name="bookmarked" checked={props.bookmarked === "y" ? true : false} onChange={props.handleInputChange} /> bookmarked</label></div>
			</div>
			
			<div className="row">
				<div className="col-12 col-md-2"></div>

				<div className="col-12 col-md-5">
					<div className="tag-holder">
						<div className="tag-holder-header">Assigned Tag(s)</div>
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
				<div className="col-12 col-md-2">Ingredients</div>
				<div className="col-12 col-md-10"><textarea className="form-control ingredients" name="ingredients" onChange={props.handleInputChange} value={props.ingredients || ''} /></div>
			</div>

			<div className="row">
				<div className="col-12 col-md-2">Recipe</div>
				<div className="col-12 col-md-10"><textarea className="form-control recipe" name="recipe" onChange={props.handleInputChange} value={props.recipe || ''} /></div>
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Form;