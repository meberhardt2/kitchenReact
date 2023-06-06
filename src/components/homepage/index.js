import React, { Fragment, useEffect, useState } from 'react';

import API from 'api/api';
import RefreshIcon from 'images/refresh.png';
import Recipe from 'components/common/recipe';

/**************************************************************************************/
function Homepage(){

    /****************************************/
    const [state, setValues] = useState({
        recipe: {}
    });
	/****************************************/


	/****************************************/
	useEffect(() => {
		refresh();
	},[]);	
	/****************************************/
	

	/****************************************/
	const refresh = () =>{
		console.log('refresh');
		document.getElementById('spinner-holder').style.display = 'block';
		API.getBookmark().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				recipe: data
			});
		});
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>
			<div className="row button-row">
				<div className="col-12">
					<button className="btn refresh" onClick={refresh}><img src={RefreshIcon} alt="refresh" /></button>
				</div>
			</div>

			{typeof state.recipe.id !== 'undefined' &&
				<Recipe recipe={state.recipe} />
			}

			{typeof state.recipe.id === 'undefined' &&
				<Fragment>
					<div className="row">
						<div className="col-12 text-center">Nothing Bookmarked :-(</div>
					</div>			
				</Fragment>
			}
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Homepage;
