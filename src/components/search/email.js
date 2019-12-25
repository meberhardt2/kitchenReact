import React,{Fragment} from 'react';


/****************************************************************************************/
export default class Email extends React.Component {

	/****************************************/
	render() {
		let extraStyle = {};
		let whatClass = 'modal fade';
		let whatClass2 = 'modal-backdrop fade';

		if(this.props.showEmail){
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
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Email Recipe</h5>
							</div>

							<div className="modal-body">
								<div className="row">
									<div className="col-12"><input type="text" name="email" className="form-control" onChange={this.props.handleInputChange} value={this.props.email} /></div>
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-primary" onClick={this.props.sendEmailForReals}>Send</button>
								<button type="button" className="btn btn-cancel" onClick={this.props.cancelEmail}>Cancel</button>
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
/****************************************************************************************/