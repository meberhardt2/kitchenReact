import React from 'react';
import { NavLink } from 'react-router-dom';

/**************************************************************************************/
export default class Header extends React.Component {

	/****************************************/
	render(){
		const checkActive = (match, location) => {
			//some additional logic to verify you are in the home URI
			if(!location) return false;
			const {pathname} = location;
			return pathname === "/";
		}

		return(
			<div className="header">
				<div className="row">
					<div className="col-12 col-md-6 text-center"><h3>RecipeDB</h3></div>
					<div className="col-12 col-md-6 text-center top-nav">
						<div>
							<NavLink to="/" activeClassName="active" isActive={checkActive}>Home</NavLink>
							<NavLink to="/search" activeClassName="active">Search</NavLink>
							<NavLink to="/recipe/0" activeClassName="active">Add</NavLink>
							<NavLink to="/camera" activeClassName="active">Camera</NavLink>
						</div>
						<div>
							<NavLink to="/list" activeClassName="active">Shopping List</NavLink>
							<NavLink to="/upload" activeClassName="active">Upload</NavLink>
							<NavLink to="/tags" activeClassName="active">Tags</NavLink>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-center">
						<div className="d-sm-block d-md-none attention">
							New! You can now add this to your home screen<br />
							<a href="https://natomasunified.org/kb/add-website-to-mobile-device-home-screen/" target="_new">Learn How</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
	/****************************************/

}
/**************************************************************************************/

