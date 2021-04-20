import React, { Fragment } from 'react';
import Camera from 'react-html5-camera-photo';
import { toast } from 'react-toastify';

import 'react-html5-camera-photo/build/css/index.css';

import API from 'api/api';
import Form from 'components/camera/form';
import Buttons from 'components/camera/buttons'

/**************************************************************************************/
export default class CameraIndex extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
			showCamera: true,
			showPictureForm: false,
			binaryData: '',
			recipe: '',
			recipe_name: ''
		}

		this.onTakePhoto = this.onTakePhoto.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.backToCamera = this.backToCamera.bind(this);
	}
	/****************************************/


	/****************************************/
	onTakePhoto (dataUri) {
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
					this.setState({
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
	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		let value = target.value;


		this.setState({
			[name]: value
		});
	}
	/****************************************/


	/****************************************/
	backToCamera(){
		this.setState({
			recipe_name: '',
			recipe: '',
			showCamera: true,
			showPictureForm: false,
		});
	}
	/****************************************/


	/****************************************/
	addRecipe(){
		let tempState = JSON.parse(JSON.stringify(this.state));
		let errors = false;
		
		if(this.state.recipe_name === ''){
			errors = true;
			toast.error('Missing recipe name');
		}

		if(this.state.recipe === ''){
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

							this.setState({
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
	render(){
		return(
			<Fragment>
				<div className={this.state.showCamera  ? '' : 'hidden'} >
					<Camera onTakePhoto={ (dataUri) => { this.onTakePhoto(dataUri); } } idealFacingMode='environment' isImageMirror={false} />
				</div>

				<div className={this.state.showPictureForm  ? '' : 'hidden'} >
					<Buttons addRecipe={this.addRecipe} backToCamera={this.backToCamera} />

					<Form handleInputChange={this.handleInputChange} recipe={this.state.recipe} recipe_name={this.state.recipe_name} />

					<Buttons addRecipe={this.addRecipe} backToCamera={this.backToCamera} />
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/


