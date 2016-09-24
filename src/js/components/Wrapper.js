import React, {findDOMNode} from 'react'
import store from 'store'
import TaskList from './TaskList'

export default class Wrapper extends React.Component {
  
 constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      this.tasks = [];
  }  

  _submit(e) {
    e.preventDefault();

    const newTask = findDOMNode(this.refs.newTask);

    this._saveTask(newTask.value);
    this._clear(newTask);
  }

  _clear(input) {
    input.value = '';
  }

  _saveTask(task) {
    this.tasks.push(task);
    store.set('tasks', this.tasks);
    this.setState({update: true});
  }

  render() {    

    return (
      <div id="Wrapper">
        <form onSubmit={this._submit.bind(this)}>
          <label>New task:</label>
          <input ref="newTask" type="text" />
          <button type="submit">Add task</button>
        </form>
        <TaskList />
      </div>
    );
  }
}
