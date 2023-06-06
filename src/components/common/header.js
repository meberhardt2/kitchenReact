import React from 'react';
import { NavLink } from 'react-router-dom';

/**************************************************************************************/
function Header() {

	/****************************************/
	return(
		<div className="header">
			<div className="row">
				<div className="col-12 col-md-6 text-center"><h3>RecipeDB</h3></div>
				<div className="col-12 col-md-6 text-center top-nav">
					<div>
						<NavLink to="/" className={(navigationData) => navigationData.isActive ? 'active' : null}>Home</NavLink>
						<NavLink to="/search" className={(navigationData) => navigationData.isActive ? 'active' : null}>Search</NavLink>
						<NavLink to="/recipe/0" className={(navigationData) => navigationData.isActive ? 'active' : null}>Add</NavLink>
						<NavLink to="/camera" className={(navigationData) => navigationData.isActive ? 'active' : null}>Camera</NavLink>
					</div>
					<div>
						<NavLink to="/list" className={(navigationData) => navigationData.isActive ? 'active' : null}>Shopping List</NavLink>
						<NavLink to="/upload" className={(navigationData) => navigationData.isActive ? 'active' : null}>Upload</NavLink>
						<NavLink to="/tags" className={(navigationData) => navigationData.isActive ? 'active' : null}>Tags</NavLink>
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
	);
	/****************************************/

}
/**************************************************************************************/

export default Header;
