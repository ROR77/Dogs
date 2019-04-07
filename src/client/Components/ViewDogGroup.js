import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap/Dropdown';

const Dog = props => (
  <tr>
    <td className={props.dog.dog_completed ? 'completed' : ''}><Link to={`/view_dogs_group/${props.dog.dogs_group}`}>{props.dog.dogs_group}</Link></td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_group}</td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_size}</td>
    <td className={props.dog.dog_completed ? 'completed' : ''}>{props.dog.dogs_temprement}</td>
    <td>
      <Link to={'/edit/' + props.dog._id}>Edit</Link>
    </td>
  </tr>
);

export default class ViewDogGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {dogs: []};

    // used to ensure setState will not be called on this component if it is unmounted
    this._isMounted = false;
  }

  componentDidMount() {
    console.log('hi');
    console.log(this.props.match.params.dogs_group);

    axios.get(`/api/dogs/${this.props.match.params.dogs_group}`)
      .then(response => {
        if (this._isMounted) {
          this.setState({dogs: response.data.dogs_group});
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }



  //   axios.get('/api/dogs/')
  //     .then(response => {
  //       if (this._isMounted) {
  //         this.setState({dogs: response.data.dogs.dogs_group = 'Terrier'});
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  componentDidUpdate() {
    axios.get('/api/dogs/')
      .then(response => {
        if (this._isMounted) {
          this.setState({dogs: response.data.dogs_group = 'Terrier'});
          console.log(response.data.dogs_group);
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

  dogList() {
    return this.state.dogs.map(function(currentDog, i) {
      return <Dog dog={currentDog} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Dog Group
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Terrier</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Herding</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hound</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Sporting</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h3>Group List</h3>
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
