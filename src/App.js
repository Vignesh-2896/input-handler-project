import React, { Component } from 'react';
import {Overview} from './components/Overview';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks : [],
    }

    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.editTaskBtn =  this.editTaskBtn.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  editTaskBtn (event) {   // Code Flow for amending a task.
    let editPos = event.target.getAttribute("data-pos");
    let editValue = this.state.tasks[editPos]; // Find the task to be updated.

    var newButton = document.getElementById("submit_task_btn").cloneNode(true); // Updating the submit button for the Edit Functionality.
    var oldButton = document.getElementById("submit_task_btn");
    oldButton.parentNode.replaceChild(newButton, oldButton);
    newButton.textContent = "Resubmit";
    newButton.addEventListener("click",this.onEditSubmit);

    document.getElementById("add_task_input").setAttribute("data-edit-pos", editPos);
    document.getElementById("add_task_input").value = editValue; // Updating the Input form for edit Functionality.
    document.getElementById("add_task_input").focus();
  }

  formSubmit (event) {
    event.preventDefault();
  }

  componentDidUpdate() {    // Adding event listener for the Edit Buttons after render.
    document.querySelectorAll("#edit_task_btn").forEach((editBtn) => {
      editBtn.addEventListener("click",this.editTaskBtn);
    });
  }

  onEditSubmit () {   // Function to update state with amended task value.
    let currentTaskList = this.state.tasks;
    let editPos = document.getElementById("add_task_input").getAttribute("data-edit-pos");
    let editValue  = document.getElementById("add_task_input").value;
    currentTaskList[editPos] = editValue;
    this.setState({
      tasks : currentTaskList,
    })
    document.getElementById("task_form").reset();
  }

  onAddSubmit () { // Function to add to state with newly added task.
    var newTaskToAdd = document.getElementById("add_task_input").value;
    this.setState({
      tasks : this.state.tasks.concat(newTaskToAdd),
    });
    document.getElementById("task_form").reset();
  }

  render() {
    return ( // Create the Form with a TextBox and a Submit button.
      <div>
        <h1> To-Do-Task</h1>
        <form id = "task_form" onSubmit = {this.formSubmit} >
          <input  type = "text" id = "add_task_input" data-edit-pos = "" placeholder = "Task to be Added" minLength="1"></input>
          <button type = "Submit" id = "submit_task_btn" onClick = {this.onAddSubmit} >Submit</button>
          <Overview arrayList = {this.state.tasks}/>
        </form>
      </div>
    );
  }
}

export default App;