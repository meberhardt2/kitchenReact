import React from 'react';

/*******************************************************************************/
function Modal(props) {

	/****************************************/
	return (
		<div className={props.showModal ? 'container generic-modal' : 'container generic-modal hidden'}>
			<div className='generic-modal-cover'></div>

			<div className='generic-modal-window'>
				<div className="generic-modal-header">
						<div>{props.title}</div>
				</div>
				<div className='generic-modal-scroll'>
					<div dangerouslySetInnerHTML={{ __html: props.body}} />

					<div className='generic-modal-button-container'>
						<button type="button" className={'btn '+props.primaryStyle} onClick={props.primaryAction}>{props.primaryText}</button>
						{props.secondaryText !== '' &&
							<button type="button" className={'btn '+props.secondaryStyle} onClick={props.secondaryAction}>{props.secondaryText}</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
	/****************************************/
}
/*******************************************************************************/

export default Modal;