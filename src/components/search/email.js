import React from 'react';


/****************************************************************************************/
function Email(props) {

	/****************************************/
	return (
		<div className={props.show ? 'container generic-modal' : 'container generic-modal hidden'}>
			<div className='generic-modal-window'>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Email Recipe</h5>
						</div>

						<div className="modal-body">
							<div className="row">
								<div className="col-12"><input type="text" name="email" className="form-control" onChange={props.handleInputChange} value={props.email} /></div>
							</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={props.sendEmailForReals}>Send</button>
							<button type="button" className="btn btn-cancel" onClick={props.cancelEmail}>Cancel</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal-backdrop fade show"></div>
		</div>
	);
	/****************************************/
}
/****************************************************************************************/

export default Email;