import React from 'react';

import Modal from 'components/common/modal';

/*******************************************************************************/
function DeleteModal(props) {

	/****************************************/
	return (
		<Modal 
			showModal={props.showModal}
			title="Confirmation"
			body="Proceed with deletion?"
			primaryText="Delete"
			primaryAction={props.modalAction}
			primaryStyle="btn-danger"
			secondaryText="Cancel"
			secondaryAction={props.closeModal}
			secondaryStyle="btn-secondary"
		/>
	);
	/****************************************/
}
/*******************************************************************************/

export default DeleteModal;