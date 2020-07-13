import React, {Component} from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserInfo from './components/UserInfo/UserInfo';
import FaceInputForm from './components/FaceInputForm/FaceInputForm';
import FaceImageBox from './components/FaceImageBox/FaceImageBox';
import './App.css';
import 'tachyons';

// initial state
const initState = {
      faceInput: '', // link that is in input field and used for image display
      faceImageUrl: '', // url from face input field and used for API call
      faceBoxData: '', // response values for position of the box, creating blue border box
      route: 'signin', // keeps track where the user is on the website (routes: 'signin', 'signout', 'home')
      isSignedIn: false, // by default user is not signed in
      user: { // new user that is registred and/or signed in
        id: '',
        name: '',
        email: '',
        entries: 0, // by default when register
        joined: ''
      }
    }

// Main Class Component
class App extends Component {

  constructor(){ // state will be when input is updated
    super();
    this.state = initState; // initial state set to be used like that
  } 

// calculation for face box and collect all data for display details
  calculateFaceBoxData = (data) => {
    const clarifaiFaceData = data.outputs[0].data.regions; // all value details
    const image = document.getElementById('face-image'); // get image and its dimensions
    const width = Number(image.width);
    const height = Number(image.height);
    const faces = [];
    clarifaiFaceData.forEach((item, index) => {
      let boxData = {
        // Box layout with calculation
        leftColumn: item.region_info.bounding_box.left_col * width, // left top dot width
        topRow: item.region_info.bounding_box.top_row * height, // left top dot height
        rightColumn: width - (item.region_info.bounding_box.right_col * width), // right top dot width
        bottomRow: height - (item.region_info.bounding_box.bottom_row * height), // right top dot height
        // Demographics data for each face
        age: item.data.concepts[0].name,
        ageProbability: (item.data.concepts[0].value * 100).toFixed(2),
        gender: item.data.concepts[20].name,
        genderProbability: (item.data.concepts[20].value * 100).toFixed(2),
        color: item.data.concepts[22].name,
        multiCult0: item.data.concepts[22].name,
        multiCultProb0: (item.data.concepts[22].value * 100).toFixed(2),
        multiCult1: item.data.concepts[23].name,
        multiCultProb1: (item.data.concepts[23].value * 100).toFixed(2),
        multiCult2: item.data.concepts[24].name,
        multiCultProb2: (item.data.concepts[24].value * 100).toFixed(2),
        multiCult3: item.data.concepts[25].name,
        multiCultProb3: (item.data.concepts[25].value * 100).toFixed(2),
        multiCult4: item.data.concepts[26].name,
        multiCultProb4: (item.data.concepts[26].value * 100).toFixed(2),
        multiCult5: item.data.concepts[27].name,
        multiCultProb5: (item.data.concepts[27].value * 100).toFixed(2),
        multiCult6: item.data.concepts[28].name,
        multiCultProb6: (item.data.concepts[28].value * 100).toFixed(2),
      }
      faces.push(boxData);
      console.log(item);
      console.log(item.data);
      console.log(item.data.concepts);
  });
    return faces; // array of face boxes, if there is multiple faces in image
}

// put box/boxes on the image
  displayFaceBoxData = (boxData) => {
    this.setState({faceBoxData: boxData})
  }

// event for face recognition logic
  onFaceInputChange = (event) => {
    this.setState({faceInput: event.target.value}) // collect input value, and set state to be url value
  }

// submit face button click
  onButtonSubmitFaceInput = () => {
    this.setState({faceImageUrl: this.state.faceInput});
    fetch('http://localhost:3001/imageurl', { // get all details from server and API response
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        faceInput: this.state.faceInput // input is a response that keeps value, from state value
      })
    })
    .then(response => response.json())
    .then(response => { 
      if(response !== "Can not load API") { // API works fine, response is collected
        fetch('http://localhost:3001/image', { // update entries
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ // JS -> JSON need to be created so server can know what is received
            id: this.state.user.id // id that we have from the user that is logged
          })
        })
        .then(response => response.json())
        .then(entries => { // colect user entries
          this.setState(Object.assign(this.state.user, {entries: entries}))
        })
        .catch(console.log) // if there is some error, debugging
      }
      this.displayFaceBoxData(this.calculateFaceBoxData(response))
    })
    .catch(err => console.log(err));
  }

// change route state
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initState); // reset what was loaded before
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
      this.setState({route: route}); // dynamically change route value
  }

// return user when it is created, new one
  setUser = (data) => {
    this.setState({
      user: { // user returning when we register
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  } 

  render() {
    return (
    <div className="App">
      <NavigationBar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      {
      this.state.route === 'home' // main application screen, two scenarios MAIN or LOGG
          ? 
            <div>
              <UserInfo name={this.state.user.name} email={this.state.user.email} entries={this.state.user.entries} />
              <FaceInputForm onInputChange={this.onFaceInputChange} onButtonSubmit={this.onButtonSubmitFaceInput} />
              <FaceImageBox id="faceboxdata" imageUrl={this.state.faceImageUrl} imageBox={this.state.faceBoxData} />
            </div>
          : 
          (
            this.state.route === 'signin'
            ?
              <SignIn setUser = {this.setUser} onRouteChange = {this.onRouteChange} />
            :
              <Register setUser = {this.setUser} onRouteChange = {this.onRouteChange} />  
          )   
      }
    </div>
    );
  }  
}

export default App;
