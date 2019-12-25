import axios from 'axios';

/**************************************************************************************/
class API {
	
	/********************************************/
	static getBookmark(){
		return axios({
			method: 'GET',
			url: 'https://eberhardt.cloud:2001/api/bookmark',
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
			url: 'https://eberhardt.cloud:2001/api/bookmark',
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
			url: 'https://eberhardt.cloud:2001/api/tags',
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
			url: 'https://eberhardt.cloud:2001/api/tags',
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
			url: `https://eberhardt.cloud:2001/api/tags/${id}`,
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
			url: `https://eberhardt.cloud:2001/api/tags/${data.id}`,
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
			url: `https://eberhardt.cloud:2001/api/recipe`,
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
			url: `https://eberhardt.cloud:2001/api/recipe/${id}`,
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
			url: `https://eberhardt.cloud:2001/api/recipe/${data.id}`,
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
			url: `https://eberhardt.cloud:2001/api/search`,
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
			url: `https://eberhardt.cloud:2001/api/random`,
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
			url: `https://eberhardt.cloud:2001/api/recipe/${id}`,
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
			url: `https://eberhardt.cloud:2001/api/camera`,
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
			url: `https://eberhardt.cloud:2001/api/recipe/${data.id}/gmail`,
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
			url: `https://eberhardt.cloud:2001/api/recipe/${data.id}/sendgrid`,
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

		const request = new Request(`https://eberhardt.cloud:2001/api/upload`, {
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