import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import API from 'api/api';
import Form from 'components/recipe/form';
import Buttons from 'components/recipe/buttons';
import { compareForObjectsTag } from 'components/common/utilities';
import DeleteModal from 'components/common/modal_delete';

/**************************************************************************************/
function Recipe() {

    /****************************************/
	let { id } = useParams();

	const [state, setValues] = useState({
		id: 0,
		recipe_name: '',
		recipe: '',
		bookmarked: 'n',
		ingredients: '',
		tags: [],
		all_tags: [],
		all_tags_immutable: [],
		showModal: false,
		delete_id: 0,
		modalAction: ''
	});
	/****************************************/


	/****************************************/
	useEffect(() => {
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			setValues({
				...state,
				all_tags: data,
				all_tags_immutable: data
			});

			if(parseInt(id,0) !== 0){
				getRecipe(id);
			}
			else{
				document.getElementById('spinner-holder').style.display = 'none';
			}	
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);	
	/****************************************/


	/****************************************/
	const getRecipe = (id) =>{
		//remember to remove assigned tags from all tags
		API.getRecipe(id).then((data) => {
			for(let i = 0; i < data.tags.length; i++){
				addTag(data.tags[i]);
			}

			setValues({
				...state,
				id: data.id,
				recipe_name: data.recipe_name,
				recipe: data.recipe,
				bookmarked: data.bookmarked,
				ingredients: data.ingredients,
				tags: data.tags,
			});

			document.getElementById('spinner-holder').style.display = 'none';
		});
	}
	/****************************************/


	/****************************************/
	const handleInputChange = (event) =>{
		const target = event.target;
		const name = target.name;
		let value = '';

		if(target.type === 'checkbox'){
			if(target.checked){
				value = 'y';
			}
			else{
				value = 'n';
			}
		}
		else{
			value = target.value;
		}

		setValues({
			...state,
			[name]: value
		});
	}
	/****************************************/


	/****************************************/
	const addTag = (tag) =>{
		let tempState = JSON.parse(JSON.stringify(state));
		let tempAllTags = tempState.all_tags.slice(0);
		let tempTags = tempState.tags.slice(0);
		let indexOfTagToDelete = -1;

		for(let i = 0; i < tempAllTags.length; i++){
			if(parseInt(tempAllTags[i].id,10) === parseInt(tag.id,10)){
				indexOfTagToDelete = i;
			}
		}

		if(indexOfTagToDelete >= 0){
			tempAllTags.splice(indexOfTagToDelete, 1);
		}

		tempTags.push({
			id: tag.id,
			tag: tag.tag
		});

		tempTags.sort(compareForObjectsTag);

		setValues({
			...state,
			all_tags: tempAllTags,
			tags: tempTags
		});
	}
	/****************************************/


	/****************************************/
	const removeTag = (tag) =>{
		let tempState = JSON.parse(JSON.stringify(state));
		let tempAllTags = tempState.all_tags.slice(0);
		let tempTags = tempState.tags.slice(0);
		let indexOfTagToDelete = -1;

		for(let i = 0; i < tempTags.length; i++){
			if(parseInt(tempTags[i].id,10) === parseInt(tag.id,10)){
				indexOfTagToDelete = i;
			}
		}

		if(indexOfTagToDelete >= 0){
			tempTags.splice(indexOfTagToDelete, 1);
		}

		tempAllTags.push({
			id: tag.id,
			tag: tag.tag
		});

		tempAllTags.sort(compareForObjectsTag);

		setValues({
			...state,
			all_tags: tempAllTags,
			tags: tempTags
		});
	}
	/****************************************/

	
	/****************************************/
	const addRecipe = () =>{
		let tempState = JSON.parse(JSON.stringify(state));
		let errors = false;
		
		if(state.recipe_name === ''){
			errors = true;
			toast.error('Missing recipe name');
		}

		if(state.recipe === ''){
			errors = true;
			toast.error('Missing recipe');
		}

		if(state.tags.length === 0){
			errors = true;
			toast.error('Missing tag(s)');
		}

		if(state.ingredients === ''){
			errors = true;
			toast.error('Missing ingrediants');
		}

		if(!errors){
			let data = {
				recipe_name: tempState.recipe_name,
				recipe: tempState.recipe,
				bookmarked: tempState.bookmarked,
				ingredients: tempState.ingredients,
				tags: tempState.tags
			}

			document.getElementById('spinner-holder').style.display = 'block';
			API.addRecipe(data).then((data) => {
				document.getElementById('spinner-holder').style.display = 'none';

				if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
					toast.error('Denied');
				}
				else{
					if(data.status === 'ok'){
						if(parseInt(data.id) !== 0){
							toast.success('Recipe added!');

							setValues({
								...state,
								recipe_name: '',
								recipe: '',
								bookmarked: 'n',
								ingredients: '',
								tags: [],
								all_tags: tempState.all_tags_immutable
							});
						}
						else{
							toast.error('There was an error saving');
						}
					}
				}
			});
		}
	}
	/****************************************/


	/****************************************/
	const saveRecipe = () =>{
		let tempState = JSON.parse(JSON.stringify(state));
		let errors = false;
		
		if(state.recipe_name === ''){
			errors = true;
			toast.error('Missing recipe name');
		}

		if(state.recipe === ''){
			errors = true;
			toast.error('Missing recipe');
		}

		if(state.tags.length === 0){
			errors = true;
			toast.error('Missing tag(s)');
		}

		if(state.ingredients === ''){
			errors = true;
			toast.error('Missing ingrediants');
		}

		if(!errors){
			let data = {
				id: tempState.id,
				recipe_name: tempState.recipe_name,
				recipe: tempState.recipe,
				bookmarked: tempState.bookmarked,
				ingredients: tempState.ingredients,
				tags: tempState.tags
			}

			document.getElementById('spinner-holder').style.display = 'block';

			API.saveRecipe(data).then((data) => {
				document.getElementById('spinner-holder').style.display = 'none';
				if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
					toast.error('Denied');
				}
				else{
					if(data.status === 'ok'){
						toast.success('Recipe saved!');
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
		let tempState = JSON.parse(JSON.stringify(state));

		setValues({
			...state,
			showModal: false
		});

		document.getElementById('spinner-holder').style.display = 'block';

		API.deleteRecipe(tempState.id).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					setValues({
						...state,
						showModal: false,
						id: 0,
						recipe_name: '',
						recipe: '',
						bookmarked: 'n',
						ingredients: '',
						tags: [],
						all_tags: tempState.all_tags_immutable
					});

					toast.success('Recipe has been deleted');
				}
			}
		});
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>
			
			<Buttons id={state.id} addRecipe={addRecipe} saveRecipe={saveRecipe} handleModal={handleModal} />

			<Form handleInputChange={handleInputChange} {...state} addTag={addTag} removeTag={removeTag} />

			<Buttons id={state.id} addRecipe={addRecipe} saveRecipe={saveRecipe} handleModal={handleModal} />

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

export default Recipe;