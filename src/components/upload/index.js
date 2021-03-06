import React, { Fragment } from 'react';
import { toast } from 'react-toastify';

import API from 'api/api';
import Form from 'components/upload/form';
import UploadForm from 'components/upload/upload_form';
import Buttons from 'components/upload/buttons'

/**************************************************************************************/
export default class Upload extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
			showForm: false,
			showUpload: true,
			image: '',
			recipe: '',
			recipe_name: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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
	backToUpload(){
		this.setState({
			recipe_name: '',
			recipe: '',
			showUpload: true,
			showForm: false,
		});
	}
	/****************************************/


	/****************************************/
	handleUpload(event){
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
					this.setState({
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
				<div className={this.state.showUpload  ? '' : 'hidden'} >
					<UploadForm handleUpload={this.handleUpload} />
				</div>

				<div className={this.state.showForm  ? '' : 'hidden'} >
					<Buttons addRecipe={this.addRecipe} backToUpload={this.backToUpload} />

					<Form handleInputChange={this.handleInputChange} recipe={this.state.recipe} recipe_name={this.state.recipe_name} />

					<Buttons addRecipe={this.addRecipe} backToUpload={this.backToUpload} />
				</div>
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
