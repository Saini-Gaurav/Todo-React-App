import {nanoid} from 'nanoid';
import React, {useEffect, useRef, useState} from 'react'
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo'

const usePrevious = (value)=> {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: ()=> true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)

  const [filter, setFilter] = useState('All');

  const toggleTaskCompleted = (id)=>{
    const updatedTasks = tasks.map((task)=>{
      // if this task has the same ID as the edited task
      if(id === task.id){
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return {...tasks, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  //To delete the Task
  const deleteTask = (id)=>{
    console.log(id);
    const remainingTask = tasks.filter((task)=> id!==task.id)
    setTasks(remainingTask);
  }
  
  //To add the Task
  const addTask = (name)=>{
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }
  
  //To edit the Task
  const editTask = (id, newName)=>{
  const editedTaskList = tasks.map((task)=>{
    if(id === task.id){
      return {...tasks, name: newName};
    }
    return task;
  })
  setTasks(editedTaskList);
  }
  const tasklist = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed = {name === filter} setFilter={setFilter}/>
  ));

  const taskNouns = tasklist.length !== 1 ? 'tasks': 'task';
  const headingTask = `${tasklist.length} ${taskNouns} remaining`

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);
  
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  
  return (
    <div className="todoapp stack-large">
      <h1>Todo App</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex='-1' ref={listHeadingRef}>{headingTask}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasklist}
      </ul>
    </div>
  );
}


export default App;
