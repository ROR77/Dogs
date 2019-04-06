import React, {Component} from 'react';
import axios from 'axios';

export default class EditDog extends Component {

  constructor(props) {
    super(props);

    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeTemprement = this.onChangeTemprement.bind(this);
    this.onChangeCompleted = this.onChangeCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      dogs_breed: '',
      dogs_group: '',
      dogs_size: '',
      dogs_temprement: '',
      dogs_completed: false
    };
  }

  componentDidMount() {
    axios.get('/api/dogs/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          dogs_breed: response.data.dogs_breed,
          dogs_group: response.data.dogs_group,
          dogs_size: response.data.dogs_size,
          dogs_temprement: response.data.dogs_temprement,
          dogs_completed: response.data.dogs_completed
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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


  onChangeCompleted(e) {
    this.setState((prevState,props) => ({
      dogs_completed: !prevState.dogs_completed
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      _id: this.props.match.params.id,
      dogs_breed: this.state.dogs_breed,
      dogs_group: this.state.dogs_group,
      dogs_size: this.state.dogs_size,
      dogs_temprement: this.state.dogs_temprement,
      dogs_completed: this.state.dogs_completed
    };
    axios.put('/api/dogs/', obj)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Update Dogs</h3>
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
              value={this.state.dogs_group}
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
            <div className="form-check">
              <input  type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeTodoCompleted}
                checked={this.state.todo_completed}
                value={this.state.todo_completed}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
              </label>
            </div>
            <br/>
            <div className="form-group">
              <input type="submit" value="Update Dog" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
