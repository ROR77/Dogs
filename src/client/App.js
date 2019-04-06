import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateDog from './Components/CreateDog';
import EditDog from './Components/EditDog';
import DogsList from './Components/DogsList';
import Terriers from './Components/Terriers';
import Hounds from './Components/Hounds';
import ViewDogGroup from './Components/ViewDogGroup';

import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            {/* <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            //   <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com"
            </a>*/}
            <Link to="/" className="navbar-brand" id ="nav-link">Dogs Great and Small</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link" id ="nav-link">Dogs</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link" id ="nav-link">Add Dogs</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/terrier" className="nav-link" id ="nav-link">Add Terrier</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/hound" className="nav-link" id ="nav-link">Add Hound</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewgroup" className="nav-link" id ="nav-link">View Dog Groups</Link>
                </li>

              </ul>
            </div>
          </nav>

          <Route path="/" exact component={DogsList} />
          <Route path="/edit/:id" component={EditDog} />
          <Route path="/create" component={CreateDog} />
          <Route path="/terrier" component={Terriers} />
          <Route path="/viewgroup" component={ViewDogGroup} />
          <Route path="/hound" component={Hounds}/>
        </div>
      </Router>
    );
  }
}

export default App;
