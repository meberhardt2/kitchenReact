import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

import API from 'api/api';
import Form from 'components/upload/form';
import UploadForm from 'components/upload/upload_form';
import Buttons from 'components/upload/buttons'

/**************************************************************************************/
function Upload() {

	/****************************************/
	const [state, setValues] = useState({
		showForm: false,
		showUpload: true,
		image: '',
		recipe: '',
		recipe_name: ''
	});
	/****************************************/


	/****************************************/
	const handleInputChange = (event) =>{
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
	const backToUpload = () =>{
		setValues({
			...state,
			recipe_name: '',
			recipe: '',
			showUpload: true,
			showForm: false,
		});
	}
	/****************************************/


	/****************************************/
	const handleUpload = (event) =>{
		let fileInput = '';
		fileInput = document.getElementById('imagefile');

		document.getElementById('spinner-holder').style.display = 'block';
		
		let data = {
			file: fileInput.files[0],
			filename: 'imagefile'
		};
		API.upload(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';
			
			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					setValues({
						...state,
						recipe:data.text,
						showUpload: false,
						showForm: true
					});
				}
			}
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

		if(!errors){
			let data = {
				recipe_name: tempState.recipe_name,
				recipe: tempState.recipe,
				bookmarked: 'n',
				ingredients: '',
				tags: []
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
								showCamera: true,
								showPictureForm: false,
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
	return(
		<Fragment>
			<div className={state.showUpload  ? '' : 'hidden'} >
				<UploadForm handleUpload={handleUpload} />
			</div>

			<div className={state.showForm  ? '' : 'hidden'} >
				<Buttons addRecipe={addRecipe} backToUpload={backToUpload} />

				<Form handleInputChange={handleInputChange} recipe={state.recipe} recipe_name={state.recipe_name} />

				<Buttons addRecipe={addRecipe} backToUpload={backToUpload} />
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default Upload;