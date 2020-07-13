import React from 'react';
import './faceinputform.css';

const FaceInputForm = ({ onInputChange, onButtonSubmit }) => { // destructure from the props, click event
	return (
		<div>
			<hr className="bb bw2 b--black-10 mt4" />
			<p className='p3 f3 fw6 ph0 mh0'>
				{'FACE DETECTION AND DEMOGRAPHICS PREDICTION'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 link grow ph3 f4 pv2 dib bw0 white bg-orange' onClick={onButtonSubmit}> 
						SCAN 
					</button>
				</div>
			</div>
		</div>
	);
}

export default FaceInputForm;