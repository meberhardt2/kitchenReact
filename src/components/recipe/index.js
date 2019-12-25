import React, { Fragment } from 'react';
import { toast } from 'react-toastify';

import API from 'api/api';
import Form from 'components/recipe/form';
import Buttons from 'components/recipe/buttons';
import { compareForObjectsTag } from 'components/common/utilities';
import DeleteModal from 'components/common/modal_delete';

/**************************************************************************************/
export default class Recipe extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
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
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.getRecipe = this.getRecipe.bind(this);
		this.addTag = this.addTag.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.saveRecipe = this.saveRecipe.bind(this);
		this.modalAction = this.modalAction.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}
	/****************************************/


	/****************************************/
	componentDidMount(){
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			this.setState({
				all_tags: data,
				all_tags_immutable: data
			},function(){
				if(parseInt(this.props.match.params.id,0) !== 0){
					this.getRecipe(this.props.match.params.id);
				}
				else{
					document.getElementById('spinner-holder').style.display = 'none';
				}	
			});
		});
	}
	/****************************************/


	/****************************************/
	/* i dont think we want to do this
	componentDidUpdate(prevProps, prevState){
		if(parseInt(this.props.match.params.id,0) !== 0 && parseInt(this.props.match.params.id,10) !== parseInt(prevProps.id,10)){
			this.getRecipe();
		}
	}
	*/
	/****************************************/


	/****************************************/
	getRecipe(id){
		//remember to remove assigned tags from all tags
		API.getRecipe(id).then((data) => {
			for(let i = 0; i < data.tags.length; i++){
				this.addTag(data.tags[i]);
			}

			this.setState({
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
	handleInputChange(event) {
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

		this.setState({
			[name]: value
		});
	}
	/****************************************/


	/****************************************/
	addTag(tag){
		let tempState = JSON.parse(JSON.stringify(this.state));
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

		this.setState({
			all_tags: tempAllTags,
			tags: tempTags
		});
	}
	/****************************************/


	/****************************************/
	removeTag(tag){
		let tempState = JSON.parse(JSON.stringify(this.state));
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

		this.setState({
			all_tags: tempAllTags,
			tags: tempTags
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

		if(this.state.tags.length === 0){
			errors = true;
			toast.error('Missing tag(s)');
		}

		if(this.state.ingredients === ''){
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

				if(parseInt(data.id) !== 0){
					toast.success('Recipe added!');

					this.setState({
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
			});
		}
	}
	/****************************************/


	/****************************************/
	saveRecipe(){
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

		if(this.state.tags.length === 0){
			errors = true;
			toast.error('Missing tag(s)');
		}

		if(this.state.ingredients === ''){
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

				toast.success('Recipe saved!');
			});
		}
	}
	/****************************************/


	/****************************************/
	handleModal(action,id){
		this.setState({
			showModal: true,
			modalAction: action,
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
		let tempState = JSON.parse(JSON.stringify(this.state));

		this.setState({
			showModal: false
		});

		document.getElementById('spinner-holder').style.display = 'block';

		API.deleteRecipe(tempState.id).then((data) => {
			this.setState({
				id: 0,
				recipe_name: '',
				recipe: '',
				bookmarked: 'n',
				ingredients: '',
				tags: [],
				all_tags: tempState.all_tags_immutable
			});

			toast.success('Recipe has been deleted');
			document.getElementById('spinner-holder').style.display = 'none';
		});
	}
	/****************************************/


	/****************************************/
	render(){
		return(
			<Fragment>
				
				<Buttons id={this.state.id} addRecipe={this.addRecipe} saveRecipe={this.saveRecipe} handleModal={this.handleModal} />

				<Form handleInputChange={this.handleInputChange} {...this.state} addTag={this.addTag} removeTag={this.removeTag} />

				<Buttons id={this.state.id} addRecipe={this.addRecipe} saveRecipe={this.saveRecipe} handleModal={this.handleModal} />

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
