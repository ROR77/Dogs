import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap/Dropdown';

const Dog = props => (
  <tr>
    <td className={props.dog.dog_completed ? 'completed' : ''}><Link to={`/view_dogs_group/${props.dog.dogs_breed}`}>{props.dog.dogs_breed}</Link></td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_group}</td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_size}</td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_temprement}</td>
    <td>
      <Link to={'/edit/' + props.dog._id}>Edit</Link>
    </td>
  </tr>
);

export default class DogsList extends Component {

  constructor(props) {
    super(props);
    this.state = {dogs: []};

    // used to ensure setState will not be called on this component if it is unmounted
    this._isMounted = false;
  }

  // Lifecycle method to ensure database is not accessed
  // until the component is mounted
  componentDidMount() {
    this._isMounted = true;

    // retrieve all instances of Dog from Database
    axios.get('/api/dogs/')
      .then(response => {
        if (this._isMounted) {
          this.setState({dogs: response.data});
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios.get('/api/dogs/')
      .then(response => {
        if (this._isMounted) {
          this.setState({dogs: response.data});
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    // component is being unmounted, ensure setState cannot be run, i.e. when the async axios calls resolve
    this._isMounted = false;
  }
  // cycle through the full list returned from database
  // and return each entry to be rendered
  dogList() {
    return this.state.dogs.map(function(currentDog, i) {
      return <Dog dog={currentDog} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Dogs List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Dog Breed</th>
              <th>Dog Group</th>
              <th>Dog Size</th>
              <th>Dog Temprement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.dogList() }
          </tbody>
        </table>
      </div>
    );
  }
}
