const Clarifai = require('clarifai');

// Clarifai api key configuration
const app = new Clarifai.App({
 apiKey: 'd75558f6066f42bf9f752e0eff36811f'
});

const apiCall = (request, response) => {
	app.models
		.predict(Clarifai.DEMOGRAPHICS_MODEL, request.body.faceInput) // first parameter is a model, second input that is scanning
		.then(data => { response.json(data) })
		.catch(error => response.status(400).json('Can not load API!'))
	}

const updateImageCount = (request, response, db) => {
	const {id} = request.body;
	 db('users')
	   .where('id', '=', id)
  	   .increment('entries', 1) 
	   .returning('entries')
	   .then(entries => {
	   		response.json(entries[0])
	   })
	   .catch(error => response.status(400).json('UNABLE TO GET ENTRIES!'))
	}

module.exports = {
	updateImageCount: updateImageCount,
	apiCall: apiCall
};