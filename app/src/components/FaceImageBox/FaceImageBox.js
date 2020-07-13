import React from 'react';
import './faceimagebox.css';

const FaceImageBox = ({imageUrl, imageBox}) => { // destructure what we receive
	const elements = imageBox; // API call response data
	const boxes = [];
	const data = [];
	if(elements.length > 0){
		elements.forEach((item, index) => { // apply data listing and borders for each face
			boxes.push( // boxes array for borders on each face in image
				<div key={index} id={index} className='bounding-box' 
					 style={{
					 	top: item.topRow, 
					 	right: item.rightColumn, 
					 	bottom:item.bottomRow, 
					 	left: item.leftColumn}}
					 	>
					<div className='bounding-box-concepts'>
						<div className='bounding-box-concept'>
							<span className='name'> Person #{index} </span>
						</div>
					</div>
				</div>)
			data.push( // data array for details about each face
				<div key={index} id={index} className='absolute' style={{marginTop: index * 380}}>		
					<table>
					<tbody>
					  <tr>
					    <th className="white bg-orange">PERSON #{index}</th>
					  </tr>
					  <tr>
					    <th>Age</th>
					    <th>Age Accuracy</th>
					  </tr>
					  <tr>
					    <td>{item.age}</td>
					    <td>{item.ageProbability}%</td>
					  </tr>
					  <tr>
					    <th>Gender</th>
					    <th>Accuracy</th>
					  </tr>
					  <tr>
					    <td>{item.gender}</td>
					     <td>{item.genderProbability}%</td>
					  </tr>
					  <tr>
					    <th className="bg-moon-gray white">MULTICULTURAL APPEARANCE</th>
					  </tr>
					  <tr>
					    <th>Appearance</th>
					    <th>Probability</th>
					  </tr>
					  <tr>
					    <td>{item.multiCult0}</td>
					    <td>{item.multiCultProb0}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult1}</td>
					    <td>{item.multiCultProb1}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult2}</td>
					    <td>{item.multiCultProb2}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult3}</td>
					    <td>{item.multiCultProb3}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult4}</td>
					    <td>{item.multiCultProb4}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult5}</td>
					    <td>{item.multiCultProb5}%</td>
					  </tr>
					  <tr>
					    <td>{item.multiCult6}</td>
					    <td>{item.multiCultProb6}%</td>
					  </tr>
					  </tbody>
					</table>
				</div>)
  	});	
	}
	return (
		<div className='center ma'>
			<div className='mt2 absolute'>
				<img id='face-image' alt='' src={imageUrl} width='400px' height='auto'/>
				<div>
			      {boxes}
			    </div>
			    <div>
			      {data}
			    </div>
			</div>
		</div>
	);
}

export default FaceImageBox;