
const registerUser = (request, response, db, bcrypt) => {
	const {email, name, password} = request.body; // destructuring request that is from the user
	const hash = bcrypt.hashSync(password);
	
	if (!email || !name || !password) { // response validation
		return response.status(400).json('Bad form submission!');
	} 

	db.transaction(trx => { // create transaction when there is more than two things to do at once
		trx.insert({ // add hash and email
			hash: hash,
			email: email
		})
		.into('login') // put into the 'login'
		.returning('email')
		.then(loginEmail => {
			return trx('users') // transaction object, on that we run commands, put into the 'users'
				.returning('*') 
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				})
				.then(user => {
					response.json(user[0]);	
				})
				.then(trx.commit) // if everything is good do commit
				.catch(trx.rollback) // if not just rollback everything
			})
		.catch(error => response.status(400).json('CAN NOT REGISTER!'))
		})
};

module.exports = {
	registerUser: registerUser
};