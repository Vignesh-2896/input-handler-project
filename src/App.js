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

  editTaskBtn (event) {
    let editPos = event.target.getAttribute("data-pos");
    let editValue = this.state.tasks[editPos];

    var newButton = document.getElementById("submit_task_btn").cloneNode(true);
    var oldButton = document.getElementById("submit_task_btn");
    oldButton.parentNode.replaceChild(newButton, oldButton);

    document.getElementById("add_task_input").setAttribute("data-edit-pos", editPos);
    document.getElementById("add_task_input").value = editValue;
    document.getElementById("add_task_input").focus();
    newButton.textContent = "Resubmit";
    newButton.addEventListener("click",this.onEditSubmit);
  }

  formSubmit (event) {
    event.preventDefault();
  }

  componentDidUpdate() {
    document.querySelectorAll("#edit_task_btn").forEach((editBtn) => {
      editBtn.addEventListener("click",this.editTaskBtn);
    });
  }

  onEditSubmit () {
    let currentTaskList = this.state.tasks;
    let editPos = document.getElementById("add_task_input").getAttribute("data-edit-pos");
    let editValue  = document.getElementById("add_task_input").value;
    currentTaskList[editPos] = editValue;
    this.setState({
      tasks : currentTaskList,
    })
    document.getElementById("task_form").reset();
  }

  onAddSubmit () {
    var newTaskToAdd = document.getElementById("add_task_input").value;
    this.setState({
      tasks : this.state.tasks.concat(newTaskToAdd),
    });
    document.getElementById("task_form").reset();
  }

  render() {
    return (
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