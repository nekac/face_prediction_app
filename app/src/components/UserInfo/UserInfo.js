import React from 'react';
import user from './user.png'
import './userinfo.css';

const UserInfo = ({name, entries, email}) => {
	return ( // using template literal ES6 to get string + property from the response
		<div className="mt4">
			<article className="mw6 center bg-white br3 pa3-ns mv3 ba b--black-10 shadow-3">
			  <div className="tl">
			  	<img alt='user' width='40px' src={user} /> 
			    <h1 className="f4">{`User: ${name}`}</h1> 
			    <h2 className="f5">{`email: ${email}`}</h2>
			    <h2 className="f5 red">{`Scanned images: ${entries}`}</h2>
			  </div>
			</article>
		</div>
	);
}

export default UserInfo;