import React,{Fragment} from 'react';

/*******************************************************************************/
export default class Modal extends React.Component {

	/****************************************/
	render() {
		let extraStyle = {};
		let whatClass = 'modal fade';
		let whatClass2 = 'modal-backdrop fade';

		if(this.props.showModal){
			extraStyle = {
				paddingRight: '17px',
				display: 'block'
			};

			whatClass = 'modal fade show';
			whatClass2 = 'modal-backdrop fade show';
		}

		
		return (
			<Fragment>
				<div className={whatClass} role="dialog" style={extraStyle}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{this.props.title}</h5>
							</div>
							<div className="modal-body" dangerouslySetInnerHTML={{ __html: this.props.body}} />
							<div className="modal-footer">
								<button type="button" className={'btn '+this.props.primaryStyle} onClick={this.props.primaryAction}>{this.props.primaryText}</button>
								{this.props.secondaryText !== '' &&
									<button type="button" className={'btn '+this.props.secondaryStyle} onClick={this.props.secondaryAction}>{this.props.secondaryText}</button>
								}
							</div>
						</div>
					</div>
				</div>
				<div className={whatClass2}></div>
			</Fragment>
		);
	}
	/****************************************/
}
/*******************************************************************************/
