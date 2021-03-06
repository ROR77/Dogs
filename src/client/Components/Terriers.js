import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

export default class Terriers extends Component {

  constructor(props) {
    super(props);


    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeTemprement = this.onChangeTemprement.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      dogs_breed: '',
      dogs_group: '',
      dogs_size: '',
      dogs_temprement: '',
      dogs_completed: false
    };
  }

  onChangeBreed(e) {
    this.setState({
      dogs_breed: e.target.value
    });
  }

  onChangeGroup(e) {
    this.setState({
      dogs_group: e.target.value
    });
  }

  onChangeSize(e) {
    this.setState({
      dogs_size: e.target.value
    });
  }

  onChangeTemprement(e) {
    this.setState({
      dogs_temprement: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('Form submitted:');
    console.log(`Dogs Breed: ${this.state.dogs_breed}`);
    console.log(`Dogs Group: ${this.state.dogs_group}`);
    console.log(`Dogs Size: ${this.state.dogs_size}`);
    console.log(`Dogs Temprement: ${this.state.dogs_temprement}`);
    console.log(`Dogs Completed: ${this.state.dogs_completed}`);



    const newDog = {
      dogs_breed: this.state.dogs_breed,
      dogs_group: this.state.dogs_group,
      dogs_size: this.state.dogs_size,
      dogs_temprement: this.state.dogs_temprement,
      dogs_completed: this.state.dogs_completed
    };

    axios.post('/api/dogs', newDog)
      .then(res => console.log(res.data));

    this.setState({
      dogs_breed: '',
      dogs_group: '',
      dogs_size: '',
      dogs_temprement: '',
      dogs_completed: false
    });
  }


  render() {
    return (

      <div style={{marginTop: 20}}>
        <h3>Add New Terrier</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Dog Breed: </label>
            <input  type="text"
              className="form-control"
              value={this.state.dogs_breed}
              onChange={this.onChangeBreed}
            />
          </div>
          <div className="form-group">
            <label>Dog Group: </label>
            <input  type="text"
              className="form-control"
              value={this.state.dogs_group = 'Terrier'}
              onChange={this.onChangeGroup}
            />

          </div>
          <div className="form-group">
            <label>Dog Temprement: </label>
            <input  type="text"
              className="form-control"
              value={this.state.dogs_temprement}
              onChange={this.onChangeTemprement}
            />
          </div>
          <label>Dog Size: </label>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Small"
                checked={this.state.dogs_size === 'Small'}
                onChange={this.onChangeSize}
              />
              <label className="form-check-label">Small</label>
            </div>
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.dogs_size === 'Medium'}
                onChange={this.onChangeSize}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Large"
                checked={this.state.dogs_size === 'Large'}
                onChange={this.onChangeSize}
              />
              <label className="form-check-label">Large</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Add Dog" className="btn btn-primary" />
          </div>
        </form>


      </div>
    );
  }
}
