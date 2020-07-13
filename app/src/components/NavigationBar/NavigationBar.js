import React from 'react';

const NavigationBar = ({isSignedIn, onRouteChange}) => {
		if(isSignedIn){
			return ( 
			<nav className='shadow-1' style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='br4 bg-orange ba link dim f5 white pa3 ma3 pointer'
				 onClick={() => onRouteChange('signout')} // route changes to home screen
				 > SIGN OUT </p>
			</nav>	
			);
		} else {
			return (
			<nav className='shadow-1' style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='br4 bg-white link dim f6 grey pa3 ma3 pointer'
				 onClick={() => onRouteChange('signin')} // route changes to home screen
				 > SIGN IN </p>
				<p className='br4 bg-orange ba link dim f5 white pa3 ma3 pointer'
				 onClick={() => onRouteChange('register')} // route changes to home screen
				 > REGISTER </p>
			</nav>
			);
		}
}

export default NavigationBar;