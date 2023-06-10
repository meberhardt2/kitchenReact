import axios from 'axios';

let backendHost = '';
//const apiVersion = 'v1';
const hostname = window && window.location && window.location.hostname;

if(hostname === 'dev.eberhardt.cloud'){
	backendHost = 'http://dev.eberhardt.cloud:4000';
}
else{
	backendHost = '';
}

//const api_url = `${backendHost}/api/${apiVersion}`;
const api_url = `${backendHost}`;


/**************************************************************************************/
class API {

	/********************************************/
	static getBookmark(){
		return axios({
			method: 'GET',
			url: api_url+'/api/bookmark',
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static addBookmark(data){
		return axios({
			method: 'POST',
			url: api_url+'/api/bookmark',
			data: data
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static getTags(){
		return axios({
			method: 'GET',
			url: api_url+'/api/tags',
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static addTag(data){
		return axios({
			method: 'POST',
			url: api_url+'/api/tags',
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static deleteTag(id){
		return axios({
			method: 'DELETE',
			url: `${api_url}/api/tags/${id}`,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static updateTag(data){
		return axios({
			method: 'PATCH',
			url: `${api_url}/api/tags/${data.id}`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static addRecipe(data){
		return axios({
			method: 'POST',
			url: `${api_url}/api/recipe`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static deleteRecipe(id){
		return axios({
			method: 'DELETE',
			url: `${api_url}/api/recipe/${id}`,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static saveRecipe(data){
		return axios({
			method: 'PATCH',
			url: `${api_url}/api/recipe/${data.id}`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static search(data){
		return axios({
			method: 'POST',
			url: `${api_url}/api/search`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static random(){
		return axios({
			method: 'POST',
			url: `${api_url}/api/random`,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static getRecipe(id){
		return axios({
			method: 'GET',
			url: `${api_url}/api/recipe/${id}`,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static cameraUpload(data){
		return axios({
			method: 'POST',
			url: `${api_url}/api/camera`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static gmail(data){
		return axios({
			method: 'POST',
			url: `${api_url}/api/recipe/${data.id}/gmail`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/********************************************/
	static sendgrid(data){
		return axios({
			method: 'POST',
			url: `${api_url}/api/recipe/${data.id}/sendgrid`,
			data: data,
		})
		.then(function (response){
			return response.data;
		});
	}
	/********************************************/


	/****************************************/
	static upload(data) {
		var form_data = new FormData();
		form_data.append(data.filename, data.file);

		const request = new Request(`${api_url}/api/upload`, {
			method: 'POST',
			'content-type': 'multipart/form-data',
			body: form_data,
		});

		return fetch(request).then(response => {
			return response.json();
		}).catch(error => {
			alert("Server error.")

			return error;
		});
	}
	/****************************************/
}
/**************************************************************************************/

export default API;