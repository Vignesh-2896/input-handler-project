import React from "react";
import PropTypes from "prop-types";

function List(props) {
  // For Each of the tasks, we will prepare a list tag with the Task Content and a Button for Editing it.
  if (!props.taskList[0]) return "";
  const newList = props.taskList.map((task, index) => {
    //Map function used to modify all the tasks at once.
    return (
      <li key={index}>
        {" "}
        <p>{task}</p>{" "}
        <button id="edit_task_btn" data-pos={index}>
          Edit Task
        </button>{" "}
      </li>
    );
  });
  return newList;
}

function Overview(props) {
  return (
    //Return List Array
    <div>
      <h1> Tasks Added : </h1>
      <ul>
        <List taskList={props.arrayList} />
      </ul>
    </div>
  );
}

Overview.propTypes = {
  arrayList : PropTypes.array
}


export { Overview };
