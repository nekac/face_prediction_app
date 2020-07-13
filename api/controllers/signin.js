
const signinUser = (request, response, db, bcrypt) => {
	const {email, password } = request.body;
	if (!email || !password) { // response validation
		return response.status(400).json('Bad form submission!');
	} 
	db.select('email', 'hash')
	  .from('login')
	  .where('email', '=', email)
	  .then(data => {
	  	const isValid = bcrypt.compareSync(password, data[0].hash); // variable used to validate access
	  	if (isValid) {
	  		return db.select('*')
	  		  .from('users')
	  		  .where('email', '=', email)
	  		  .then(user => {
	  			response.json(user[0])
	  		  })
	  		  .catch(error => response.status(400).json('UNABLE TO GET USER!'))
	  	} else {
	  		response.status(400).json('WRONG CREDENTIALS!');
	  	}
	  })
	  .catch(error => response.status(400).json('WRONG CREDENTIALS!'));
};

module.exports = {
	signinUser: signinUser
};