import React, { Fragment } from 'react';
import { NotificationManager } from 'react-notifications';

import API from 'api/api';
import { compareForObjectsTag } from 'components/common/utilities';
import Tags from 'components/tags/tags';
import Edit from 'components/tags/edit';
import DeleteModal from 'components/common/modal_delete';

/**************************************************************************************/
export default class TagIndex extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
			tags: [],
			tag: {},
			new_tag: '',
			showModal: false,
			showEdit: false,
			delete_id: 0,
			modalAction: ''
		}

		this.handleNewTag = this.handleNewTag.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.getTags = this.getTags.bind(this);
		this.modalAction = this.modalAction.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleModal = this.handleModal.bind(this);
		this.handleEditTag = this.handleEditTag.bind(this);
		this.handleShowEdit = this.handleShowEdit.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	/****************************************/


	/****************************************/
	componentDidMount(){
		this.getTags();
	}
	/****************************************/

	
	/****************************************/
	getTags(){
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				tags: data
			});
		});
	}
	/****************************************/


	/****************************************/
	handleShowEdit(tag){
		this.setState({
			tag: tag,
			showEdit: true
		});
	}
	/****************************************/


	/****************************************/
	handleCancelEdit(){
		this.setState({
			showEdit: false
		});
	}
	/****************************************/


	/****************************************/
	handleEditTag(event) {
		let tempState = JSON.parse(JSON.stringify(this.state));
		let tempTag = tempState.tag;
		const target = event.target;
		let value = target.value;

		tempTag.tag = value;

		this.setState({
			tag: tempTag
		});
	}
	/****************************************/


	/****************************************/
	handleUpdate(){
		document.getElementById('spinner-holder').style.display = 'block';

		API.updateTag(this.state.tag).then((data) => {
			let tempState = JSON.parse(JSON.stringify(this.state));
			let tempTags = tempState.tags.slice(0);

			for(let i = 0; i < tempTags.length; i++){
				if(parseInt(tempTags[i].id,10) === parseInt(data.id,10)){
					tempTags[i].tag = data.tag;
				}
			}

			tempTags.sort(compareForObjectsTag);

			this.setState({
				tags: tempTags,
				tag: {},
				showEdit: false
			});

			document.getElementById('spinner-holder').style.display = 'none';
		});
	}
	/****************************************/


	/****************************************/
	handleNewTag(event) {
		const target = event.target;
		const name = target.name;
		let value = target.value;

		this.setState({
			[name]: value
		});
	}
	/****************************************/


	/****************************************/
	handleAdd(){
		let tempState = JSON.parse(JSON.stringify(this.state));

		if(tempState.new_tag.length === 0){
			NotificationManager.error('Error', 'Tag can\'t be empty', 2000);
		}
		else{
			document.getElementById('spinner-holder').style.display = 'block';

			let data = {new_tag: tempState.new_tag}
			API.addTag(data).then((data) => {
				document.getElementById('spinner-holder').style.display = 'none';

				if(data.id === 0){
					NotificationManager.error('Error', 'Oops, error adding tag', 2000);
				}
				else{
					let tempTags = tempState.tags;
					tempTags.push({
						id: data.id,
						tag: tempState.new_tag
					});

					tempTags.sort(compareForObjectsTag);

					this.setState({
						tags: tempTags,
						new_tag: ''
					});

					NotificationManager.success('Added', 'Tag has been added', 2000);
				}
			});
		}
	}
	/****************************************/


	/****************************************/
	handleModal(action,id){
		this.setState({
			showModal: true,
			modalAction: action,
			delete_id: id
		});
	}
	/****************************************/


	/****************************************/
	closeModal(){
		this.setState({
			showModal: false
		});
	}
	/****************************************/


	/****************************************/
	modalAction(){
		this.setState({
			showModal: false
		});

		document.getElementById('spinner-holder').style.display = 'block';

		API.deleteTag(this.state.delete_id).then((data) => {
			let tempState = JSON.parse(JSON.stringify(this.state));
			let tempTags = tempState.tags.slice(0);
			let indexOfTagToDelete = -1;

			for(let i = 0; i < tempTags.length; i++){
				if(parseInt(tempTags[i].id,10) === parseInt(tempState.delete_id,10)){
					indexOfTagToDelete = i;
				}
			}

			if(indexOfTagToDelete >= 0){
				tempTags.splice(indexOfTagToDelete, 1);
			}

			this.setState({
				tags: tempTags
			});

			NotificationManager.success('Deleted', 'Tag has been deleted', 2000);
			document.getElementById('spinner-holder').style.display = 'none';
		});
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<Fragment>

				<div className="row">
					<div className="col-12 col-md-4"><input type="text" placeholder='New Tag' className="form-control" name="new_tag" onChange={this.handleNewTag} value={this.state.new_tag || ''} /></div>
					<div className="col-12 col-md-1 button-row"><button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add</button></div>
				</div>

				<hr size="1" width="80%" />

				<Edit tag={this.state.tag} showEdit={this.state.showEdit} handleEditTag={this.handleEditTag} handleCancelEdit={this.handleCancelEdit} handleUpdate={this.handleUpdate} />

				<Tags tags={this.state.tags} handleModal={this.handleModal} handleShowEdit={this.handleShowEdit} />

				<DeleteModal
					showModal={this.state.showModal}
					closeModal={this.closeModal}
					modalAction={this.modalAction}
				/>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
