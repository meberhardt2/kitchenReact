import React from 'react';

/*******************************************************************************/
function Modal(props) {

	/****************************************/
	return (
		<div className={props.showModal ? 'container generic-modal' : 'container generic-modal hidden'}>
			<div className='generic-modal-cover'></div>

			<div className='generic-modal-window'>
				<div className="generic-modal-header">
						<h5 className="modal-title">{props.title}</h5>
				</div>
				<div className="modal-body" dangerouslySetInnerHTML={{ __html: props.body}} />
				<div className="modal-footer">
					<button type="button" className={'btn '+props.primaryStyle} onClick={props.primaryAction}>{props.primaryText}</button>
					{props.secondaryText !== '' &&
						<button type="button" className={'btn '+props.secondaryStyle} onClick={props.secondaryAction}>{props.secondaryText}</button>
					}
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
	/****************************************/
}
/*******************************************************************************/

export default Modal;