import React, { Fragment } from 'react';

import AvailableTag from 'components/common/available_tag';
import AssignedTag from 'components/common/assigned_tag';

/**************************************************************************************/
export default class Form extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>

				<div className="row">
					<div className="col-12 col-md-2">Name</div>
					<div className="col-12 col-md-7"><input type="text" className="form-control" name="recipe_name" onChange={this.props.handleInputChange} value={this.props.recipe_name || ''} /></div>
					<div className="col-12 col-md-2"><label><input type="checkbox" value="y" name="bookmarked" checked={this.props.bookmarked === "y" ? true : false} onChange={this.props.handleInputChange} /> bookmarked</label></div>
				</div>
				
				<div className="row">
					<div className="col-12 col-md-2"></div>

					<div className="col-12 col-md-5">
						<div className="tag-holder">
							<div className="tag-holder-header">Assigned Tag(s)</div>
							{this.props.tags.map((tag,index) =>
								<AssignedTag key={tag.id} tag={tag} removeTag={this.props.removeTag} />
							)}
						</div>
					</div>

					<div className="col-12 col-md-5">
						<div className="tag-holder">
							<div className="tag-holder-header">Available Tag(s)</div>
							{this.props.all_tags.map((tag,index) =>
								<AvailableTag key={tag.id} tag={tag} addTag={this.props.addTag} />
							)}
						</div>
					</div>

				</div>

				<div className="row">
					<div className="col-12 col-md-2">Ingredients</div>
					<div className="col-12 col-md-10"><textarea className="form-control ingredients" name="ingredients" onChange={this.props.handleInputChange} value={this.props.ingredients || ''} /></div>
				</div>

				<div className="row">
					<div className="col-12 col-md-2">Recipe</div>
					<div className="col-12 col-md-10"><textarea className="form-control recipe" name="recipe" onChange={this.props.handleInputChange} value={this.props.recipe || ''} /></div>
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
