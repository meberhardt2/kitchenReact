import React from 'react';

import Result from 'components/search/result';

/**************************************************************************************/
export default class Results extends React.Component {

	/****************************************/
	render(){
		return(
			<div className="results-holder">
				<h4>Total: {this.props.results.length}</h4>
				<br />
				{this.props.results.map((result,index) =>
					<Result key={result.id} result={result} viewRecipe={this.props.viewRecipe} />
				)}
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/
