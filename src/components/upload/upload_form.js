import React,{ Fragment } from 'react';

/**************************************************************************************/
export default class UploadForm extends React.Component {

	/****************************************/
	render(){
		return(
			<Fragment>
				<br /><br />
				<div className="row">
					<div className="col-12">Image:&nbsp;&nbsp;&nbsp;&nbsp;<input name="imagefile" id="imagefile" type="file" onChange={this.props.handleUpload} /></div>
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
