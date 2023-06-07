import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import API from 'api/api';
import Form from 'components/search/form';
import Results from 'components/search/results';
import Recipe from 'components/common/recipe';
import Buttons from 'components/search/buttons';
import { compareForObjectsTag } from 'components/common/utilities';
import Email from 'components/search/email';

/**************************************************************************************/
function Search() {

	/****************************************/
	let navigate = useNavigate();
	
	const [state, setValues] = useState({
		email: '',
		recipe_name: '',
		ingredients: '',
		tags: [],
		all_tags: [],
		results: [],
		all_tags_immutable: [],
		recipe: {},
		showForm: true,
		showResults: false,
		showRecipe: false,
		showEmail: false
	});
	/****************************************/


	/****************************************/
	useEffect(() => {
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			let tempState = JSON.parse(JSON.stringify(state));
			tempState.all_tags = data;
			tempState.all_tags_immutable = data;

			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state, 
				all_tags: data, 
				all_tags_immutable: data
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);	
	/****************************************/


	/****************************************/
	const handleInputChange = (event) => {
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
	const handleRandom = () =>{
		API.random().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state,
				showForm: false,
				showResults: true,
				results: data
			});
		});
	}
	/****************************************/
	

	/****************************************/
	const handleSearch = () =>{
		let tempState = JSON.parse(JSON.stringify(state));

		let data = {
			recipe_name: tempState.recipe_name,
			ingredients: tempState.ingredients,
			tags: tempState.tags
		}

		document.getElementById('spinner-holder').style.display = 'block';

		API.search(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state,
				showForm: false,
				showResults: true,
				results: data
			});
		});
	}
	/****************************************/


	/****************************************/
	const handleShowForm = () =>{
		window.scrollTo(0,0);
		setValues({
			...state,
			showResults: false,
			showForm: true,
			showRecipe: false
		});
	}
	/****************************************/


	/****************************************/
	const handleShowResults = () =>{
		window.scrollTo(0,0);
		setValues({
			...state,
			showResults: true,
			showRecipe: false
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
	const viewRecipe = (id) =>{
		window.scrollTo(0,0);
		document.getElementById('spinner-holder').style.display = 'block';

		API.getRecipe(id).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state,
				showRecipe: true,
				showResults: false,
				recipe: data
			});
		});
	}
	/****************************************/


	/****************************************/
	const handleBookmark = () =>{
		document.getElementById('spinner-holder').style.display = 'block';

		let data = {
			id: state.recipe.id
		};

		API.addBookmark(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';
			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					toast.success('Recipe has been bookmarked!');
				}
			}
		});
	}
	/****************************************/


	/****************************************/
	const handleEdit = () =>{
		navigate('/recipe/'+state.recipe.id);
	}
	/****************************************/


	/****************************************/
	const cancelEmail = () =>{
		setValues({
			...state,
			showEmail: false
		});
	}
	/****************************************/


	/****************************************/
	const sendEmail = () =>{
		setValues({
			...state,
			showEmail: true
		});
	}
	/****************************************/


	/****************************************/
	const sendEmailForReals = () =>{
		let tempState = JSON.parse(JSON.stringify(state));

		let data = {
			email: tempState.email,
			id: tempState.recipe.id
		};

		document.getElementById('spinner-holder').style.display = 'block';
		API.gmail(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			setValues({
				...state,
				showEmail: false
			});

			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'sent'){
					toast.success('Recipe emailed!');
				}
			}
		});
	}
	/****************************************/


	/****************************************/
	return(
		<Fragment>
			
			<Buttons sendEmail={sendEmail} handleRandom={handleRandom} handleBookmark={handleBookmark} handleEdit={handleEdit} handleSearch={handleSearch} handleShowResults={handleShowResults} handleShowForm={handleShowForm} showForm={state.showForm} showResults={state.showResults} showRecipe={state.showRecipe} />

			<div className={state.showForm  ? '' : 'hidden'} >
				<Form handleInputChange={handleInputChange} {...state} addTag={addTag} removeTag={removeTag} />
			</div>

			<div className={state.showResults  ? '' : 'hidden'} >
				<Results results={state.results} viewRecipe={viewRecipe} />
			</div>

			<div className={state.showRecipe  ? '' : 'hidden'} >
				<Recipe recipe={state.recipe} />
			</div>

			<br /><br />
			<Buttons sendEmail={sendEmail} handleRandom={handleRandom} handleBookmark={handleBookmark} handleEdit={handleEdit} handleSearch={handleSearch} handleShowResults={handleShowResults} handleShowForm={handleShowForm} showForm={state.showForm} showResults={state.showResults} showRecipe={state.showRecipe} />

			<Email sendEmailForReals={sendEmailForReals} email={state.email} showEmail={state.showEmail} cancelEmail={cancelEmail} handleInputChange={handleInputChange} />
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Search;