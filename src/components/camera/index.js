import React, { Fragment, useState } from 'react';
import Camera from 'react-html5-camera-photo';
import { toast } from 'react-toastify';

import 'react-html5-camera-photo/build/css/index.css';

import API from 'api/api';
import Form from 'components/camera/form';
import Buttons from 'components/camera/buttons'

/**************************************************************************************/
function CameraIndex() {

	/****************************************/
	const [state, setValues] = useState({
		showCamera: true,
		showPictureForm: false,
		binaryData: '',
		recipe: '',
		recipe_name: ''
	});
	/****************************************/


	/****************************************/
	const onTakePhoto = (dataUri) =>{
		//the data comes in as a complete string with the below text as well as the base64 info. which works great to display the image, but tessaract needs that removed
		//data:image/png;base64,{bytes...}
		const base64string = dataUri.split(',')[1];

		document.getElementById('spinner-holder').style.display = 'block';

		let data = {
			'image': base64string
		};

		API.cameraUpload(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';
			if(typeof data === 'undefined' || typeof data.status === 'undefined' || data.status === 'forbidden'){
				toast.error('Denied');
			}
			else{
				if(data.status === 'ok'){
					//console.log(data);
					setValues({
						...state,
						recipe:data.text,
						showCamera: false,
						showPictureForm: true
					});
				}
			}
		});
	}
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
	const backToCamera = () =>{
		setValues({
			...state,
			recipe_name: '',
			recipe: '',
			showCamera: true,
			showPictureForm: false,
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
			<div className={state.showCamera  ? '' : 'hidden'} >
				<Camera onTakePhoto={ (dataUri) => { onTakePhoto(dataUri); } } idealFacingMode='environment' isImageMirror={false} />
			</div>

			<div className={state.showPictureForm  ? '' : 'hidden'} >
				<Buttons addRecipe={addRecipe} backToCamera={backToCamera} />

				<Form handleInputChange={handleInputChange} recipe={state.recipe} recipe_name={state.recipe_name} />

				<Buttons addRecipe={addRecipe} backToCamera={backToCamera} />
			</div>
		</Fragment>
	);
	/****************************************/

}
/**************************************************************************************/

export default CameraIndex;
