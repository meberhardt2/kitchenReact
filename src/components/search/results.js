import React from 'react';

import Result from 'components/search/result';

/**************************************************************************************/
function Results(props) {

	/****************************************/
	return(
		<div className="results-holder">
			<h4>Total: {props.results.length}</h4>
			<br />
			{props.results.map((result,index) =>
				<Result key={result.id} result={result} viewRecipe={props.viewRecipe} />
			)}
		</div>
	);
	/****************************************/

}
/**************************************************************************************/

export default Results;