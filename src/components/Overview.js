import React from 'react';

function List(props){
    if(!props.taskList[0]) return "";
    const newList = props.taskList.map((task,index) => {
       return <li key = {index}> <p>{task}</p> <button id = "edit_task_btn" data-pos = {index}>Edit Task</button> </li>
    });
    return newList
}

function Overview(props){
    return (
        <div>
            <h1> Tasks Added : </h1>
            <ul>
                <List taskList = {props.arrayList} />
            </ul>
        </div>
    );
}

export {Overview};