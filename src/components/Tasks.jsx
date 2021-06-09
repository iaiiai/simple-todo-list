import React, { useState } from 'react';
import Task from './Task.jsx';
import makeID from '../utils/makeID';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const addToList = (event) => {
    event.preventDefault();
    setTasks([...tasks, { title, description, uid: makeID(5), state: 'uncompleted' }]);
    console.log(tasks);
    setTitle('');
    setDescription('');
  };

  const handleTitleChanges = (event) => {
    setTitle(event.target.value);

  };

  const handleDescriptionChanges = (event) => {
    setDescription(event.target.value);

  };

  const completeTask = (id) => () => {
    const newTask = tasks.map(task => {
      if (task.uid === id) return { ...task, state: task.state === 'completed' ? 'uncompleted' : 'completed' };
      return task;
    });
    setTasks(newTask);
    console.log(tasks);
  };

  const editTask = (title, description, id, mode) => (event) => {
    event.preventDefault();
    const editedTask = tasks.map(task => {
      if (task.uid === id) return { ...task, title, description };
      return task;
    });
    setTasks(editedTask);
    mode(false);
  }

  const deleteTask = (id) => () => {
    setTasks([...tasks.filter((task) => task.uid !== id)]);
  };

  const filter = (mode) => () => {
    setFilterMode(mode);
  };

  return (
    <div className="container">
      <h1 className="center-align"># TODO LIST</h1>
      <form onSubmit={addToList} >
        <input
          type="text"
          onChange={handleTitleChanges}
          value={title} placeholder="Title"
          required
        />
        <input
          type="text"
          onChange={handleDescriptionChanges}
          value={description}
          placeholder="Description"
          required />
        <div className="row arrange-content">
          <input
            type="submit"
            className="waves-effect  purple darken-1 btn mb"
            value="Add"
          />
        </div>
      </form>
      <div className="row">
        <h4 className="col s12">Filter:</h4>
        <button 
        onClick={filter('all')} className={filterMode === 'all' ? "waves-effect purple btn col s3 mr" : "waves-effect purple darken-4 btn col s3 mr"}>All</button>
        <button onClick={filter('uncompleted')} className={filterMode === 'uncompleted' ? "waves-effect purple btn col s3 mr" : "waves-effect purple darken-4 btn col s3 mr"}>Active</button>
        <button onClick={filter('completed')} className={filterMode === 'completed' ? "waves-effect purple btn col s3 mr" : "waves-effect purple darken-4 btn col s3 mr"}>Completed</button>
      </div>
      <div className="list">
        {tasks
          .filter((task) => {
            if (filterMode === 'all') return true;
            return task.state === filterMode;
          })
          .map((element) => (
            <Task
              key={element.uid}
              title={element.title}
              description={element.description}
              handleComplete={completeTask}
              handleDelete={deleteTask}
              uID={element.uid}
              state={element.state}
              handleEditTask={editTask}
              isEdit={false}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;