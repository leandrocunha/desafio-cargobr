import React, {findDOMNode} from 'react'
import {assign} from 'lodash'
import store from 'store'
import TaskList from './TaskList'

export default class Wrapper extends React.Component {
  
 constructor(props) {
    super(props);
    this.state = {};
  }

  _submit(e) {
    e.preventDefault();

    const newTask = findDOMNode(this.refs.newTask);

    newTask.value && this._saveTask(newTask.value);
    this._clear(newTask);
  }

  _clear(input) {
    input.value = '';
  }

  _saveTask(task) {
    const now = new Date().toLocaleString();
    const tasks = store.get('tasks') ? store.get('tasks') : [];

    tasks.push({task: task, status: "uncompleted", datetime: now});
    store.set('tasks', tasks);
    this.setState({update: true});
  }

  render() {

    const tasks = store.get('tasks');

    return (
      <div id="Wrapper">
        <h1><i className="fa fa-check"></i> Tasks</h1>
        <form onSubmit={this._submit.bind(this)}>
          <input placeholder="add new task"
                 ref="newTask"
                 type="text" />
        </form>
        <TaskList tasks={tasks} />
      </div>
    );
  }
}
