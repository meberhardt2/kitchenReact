import React, { Fragment } from 'react';
import { toast } from 'react-toastify';

import API from 'api/api';
import Form from 'components/search/form';
import Results from 'components/search/results';
import Recipe from 'components/common/recipe';
import Buttons from 'components/search/buttons';
import { compareForObjectsTag } from 'components/common/utilities';
import Email from 'components/search/email';

/**************************************************************************************/
export default class Search extends React.Component {

	/****************************************/
	constructor(props) {
		super(props);

		this.state = {
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
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.addTag = this.addTag.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleShowForm = this.handleShowForm.bind(this);
		this.viewRecipe = this.viewRecipe.bind(this);
		this.handleShowResults = this.handleShowResults.bind(this);
		this.handleBookmark = this.handleBookmark.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleRandom = this.handleRandom.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.sendEmailForReals = this.sendEmailForReals.bind(this);
		this.cancelEmail = this.cancelEmail.bind(this);
	}
	/****************************************/


	/****************************************/
	componentDidMount(){
		document.getElementById('spinner-holder').style.display = 'block';

		API.getTags().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				all_tags: data,
				all_tags_immutable: data
			});
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
	handleRandom(){
		API.random().then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				showForm: false,
				showResults: true,
				results: data
			});
		});
	}
	/****************************************/
	

	/****************************************/
	handleSearch(){
		let tempState = JSON.parse(JSON.stringify(this.state));

		let data = {
			recipe_name: tempState.recipe_name,
			ingredients: tempState.ingredients,
			tags: tempState.tags
		}

		document.getElementById('spinner-holder').style.display = 'block';

		API.search(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				showForm: false,
				showResults: true,
				results: data
			});
		});
	}
	/****************************************/


	/****************************************/
	handleShowForm(){
		window.scrollTo(0,0);
		this.setState({
			showResults: false,
			showForm: true,
			showRecipe: false
		});
	}
	/****************************************/


	/****************************************/
	handleShowResults(){
		window.scrollTo(0,0);
		this.setState({
			showResults: true,
			showRecipe: false
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
	viewRecipe(id){
		window.scrollTo(0,0);
		document.getElementById('spinner-holder').style.display = 'block';

		API.getRecipe(id).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
				showRecipe: true,
				showResults: false,
				recipe: data
			});
		});
	}
	/****************************************/


	/****************************************/
	handleBookmark(){
		document.getElementById('spinner-holder').style.display = 'block';

		let data = {
			id: this.state.recipe.id
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
	handleEdit(){
		this.props.history.push('/recipe/'+this.state.recipe.id);
	}
	/****************************************/


	/****************************************/
	cancelEmail(){
		this.setState({
			showEmail: false
		});
	}
	/****************************************/


	/****************************************/
	sendEmail(){
		this.setState({
			showEmail: true
		});
	}
	/****************************************/


	/****************************************/
	sendEmailForReals(){
		let tempState = JSON.parse(JSON.stringify(this.state));

		let data = {
			email: tempState.email,
			id: tempState.recipe.id
		};

		document.getElementById('spinner-holder').style.display = 'block';
		API.gmail(data).then((data) => {
			document.getElementById('spinner-holder').style.display = 'none';

			this.setState({
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
	render(){
		return(
			<Fragment>
				
				<Buttons sendEmail={this.sendEmail} handleRandom={this.handleRandom} handleBookmark={this.handleBookmark} handleEdit={this.handleEdit} handleSearch={this.handleSearch} handleShowResults={this.handleShowResults} handleShowForm={this.handleShowForm} showForm={this.state.showForm} showResults={this.state.showResults} showRecipe={this.state.showRecipe} />

				<div className={this.state.showForm  ? '' : 'hidden'} >
					<Form handleInputChange={this.handleInputChange} {...this.state} addTag={this.addTag} removeTag={this.removeTag} />
				</div>

				<div className={this.state.showResults  ? '' : 'hidden'} >
					<Results results={this.state.results} viewRecipe={this.viewRecipe} />
				</div>

				<div className={this.state.showRecipe  ? '' : 'hidden'} >
					<Recipe recipe={this.state.recipe} />
				</div>

				<br /><br />
				<Buttons sendEmail={this.sendEmail} handleRandom={this.handleRandom} handleBookmark={this.handleBookmark} handleEdit={this.handleEdit} handleSearch={this.handleSearch} handleShowResults={this.handleShowResults} handleShowForm={this.handleShowForm} showForm={this.state.showForm} showResults={this.state.showResults} showRecipe={this.state.showRecipe} />

				<Email sendEmailForReals={this.sendEmailForReals} email={this.state.email} showEmail={this.state.showEmail} cancelEmail={this.cancelEmail} handleInputChange={this.handleInputChange} />
			</Fragment>
		)
	}
	/****************************************/

}
/**************************************************************************************/
