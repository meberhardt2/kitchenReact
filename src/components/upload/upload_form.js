import React,{ Fragment } from 'react';

/**************************************************************************************/
function UploadForm(props) {

	/****************************************/
	return(
		<Fragment>
			<br /><br />
			<div className="row">
				<div className="col-12">Image:&nbsp;&nbsp;&nbsp;&nbsp;<input name="imagefile" id="imagefile" type="file" onChange={props.handleUpload} /></div>
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default UploadForm