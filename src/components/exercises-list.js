import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}> Edit</Link>|
      <button onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </button>
    </td>
  </tr>
);
export default class ExerciseList extends Component {
  state = {
    exercises: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3002/exercises/")
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }
  deleteExercise(id) {
    axios
      .delete("http://localhost:3002/exercises/" + id)
      .then((res) => {
        this.setState({
          exercises: res.data.filter((el) => el._id !== id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  exerciseList() {
    // const change = Object.entries();
    console.log(this.state.exercises);
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3> Logged Exercises</h3>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Descripation</th>
              <th>Duration</th>
              <th>Date</th>
              <th>
                Actions
                {/* <div className="form-group">
                  <input
                    type="submit"
                    value="Delete User"
                    className="btn btn-primary"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Edit User"
                    className="btn btn-primary"
                  />
                </div> */}
              </th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
