// currently not using becasue I collect data on main screen when the user is logged

const getUser = (request, response, db) => {
	const {id} = request.params;
	db.select('*').from('users').where({
		id:id
	}) 
	.then(user => {
		if(user.length){
			response.json(user[0]); // first element from the resposne array
		} else {
			response.status(400).json('USER NOT FOUND!');
		}
	})
	.catch(error => response.status(400).json('ERROR GETTING USER!'));
}

module.exports = {
	getUser: getUser
};