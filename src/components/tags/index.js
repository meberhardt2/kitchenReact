import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import API from 'api/api';
import { compareForObjectsTag } from 'components/common/utilities';
import Tags from 'components/tags/tags';
import Edit from 'components/tags/edit';
import DeleteModal from 'components/common/modal_delete';

/**************************************************************************************/
function TagIndex() {

	/****************************************/
	const [state, setValues] = useState({
		tags: [],
		tag: {},
		new_tag: '',
		showModal: false,
		showEdit: false,
		delete_id: 0,
		modalAction: ''
	});
	/****************************************/


	/****************************************/
	useEffect(() => {
		getTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);	
	/****************************************/

	
	/****************************************/
	const getTags = () =>{
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state,
				tags: data
			});
		});
	}
	/****************************************/


	/****************************************/
	const handleShowEdit = (tag) =>{
		setValues({
			...state,
			tag: tag,
			showEdit: true
		});
	}
	/****************************************/


	/****************************************/
	const handleCancelEdit = () =>{
		setValues({
			...state,
			showEdit: false
		});
	}
	/****************************************/


	/****************************************/
	const handleEditTag = (event) =>{
		let tempState = JSON.parse(JSON.stringify(state));
		let tempTag = tempState.tag;
		const target = event.target;
		let value = target.value;

		tempTag.tag = value;

		setValues({
			...state,
			tag: tempTag
		});
	}
	/****************************************/


	/****************************************/
	const handleUpdate = () =>{
		document.getElementById('spinner-holder').style.display = 'block';

		API.updateTag(state.tag).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					let tempState = JSON.parse(JSON.stringify(state));
					let tempTags = tempState.tags.slice(0);

					for(let i = 0; i < tempTags.length; i++){
						if(parseInt(tempTags[i].id,10) === parseInt(data.id,10)){
							tempTags[i].tag = data.tag;
						}
					}

					tempTags.sort(compareForObjectsTag);

					setValues({
						...state,
						tags: tempTags,
						tag: {},
						showEdit: false
					});
				}
			}
		});
	}
	/****************************************/


	/****************************************/
	const handleNewTag = (event) =>{
		const target = event.target;
		const name = target.name;
		let value = target.value;

		setValues({
			...state,
			[name]: value
		});
	}
	/****************************************/


	/****************************************/
	const handleAdd = () =>{
		let tempState = JSON.parse(JSON.stringify(state));

		if(tempState.new_tag.length === 0){
			toast.error('Tag can\'t be empty');
		}
		else{
			document.getElementById('spinner-holder').style.display = 'block';

			let data = {new_tag: tempState.new_tag}
			API.addTag(data).then((data) => {
				document.getElementById('spinner-holder').style.display = 'none';

				if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
					toast.error('Denied');
				}
				else{
					if(data.status === 'ok'){
						if(data.id === 0){
							toast.error('Oops, error adding tag');
						}
						else{
							let tempTags = tempState.tags;
							tempTags.push({
								id: data.id,
								tag: tempState.new_tag
							});

							tempTags.sort(compareForObjectsTag);

							setValues({
								...state,
								tags: tempTags,
								new_tag: ''
							});

							toast.success('Tag has been added');
						}
					}
				}
			});
		}
	}
	/****************************************/


	/****************************************/
	const handleModal = (action,id) =>{
		setValues({
			...state,
			showModal: true,
			modalAction: action,
			delete_id: id
		});
	}
	/****************************************/


	/****************************************/
	const closeModal = () =>{
		setValues({
			...state,
			showModal: false
		});
	}
	/****************************************/


	/****************************************/
	const modalAction = () =>{
		setValues({
			...state,
			showModal: false
		});

		document.getElementById('spinner-holder').style.display = 'block';

		API.deleteTag(state.delete_id).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					let tempState = JSON.parse(JSON.stringify(state));
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

					setValues({
						...state,
						tags: tempTags
					});

					toast.success('Tag has been deleted');
				}
			}
		});
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>

			<div className="row">
				<div className="col-12 col-md-4"><input type="text" placeholder='New Tag' className="form-control" name="new_tag" onChange={handleNewTag} value={state.new_tag || ''} /></div>
				<div className="col-12 col-md-1 button-row"><button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button></div>
			</div>

			<hr size="1" width="80%" />

			<Edit tag={state.tag} showEdit={state.showEdit} handleEditTag={handleEditTag} handleCancelEdit={handleCancelEdit} handleUpdate={handleUpdate} />

			<Tags tags={state.tags} handleModal={handleModal} handleShowEdit={handleShowEdit} />

			<DeleteModal
				showModal={state.showModal}
				closeModal={closeModal}
				modalAction={modalAction}
			/>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default TagIndex;