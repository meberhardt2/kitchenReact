import React from 'react';

import Modal from 'components/common/modal';


/*******************************************************************************/
export default class DeleteModal extends React.Component {

	/****************************************/
	render() {
		return (
			<Modal 
				showModal={this.props.showModal}
				title="Confirmation"
				body="Proceed with deletion?"
				primaryText="Delete"
				primaryAction={this.props.modalAction}
				primaryStyle="btn-danger"
				secondaryText="Cancel"
				secondaryAction={this.props.closeModal}
				secondaryStyle="btn-secondary"
			/>
		);
	}
	/****************************************/
}
/*******************************************************************************/
