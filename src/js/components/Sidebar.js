import React, {findDOMNode} from 'react'

export default class Sidebar extends React.Component {

  _submit(e) {
    e.preventDefault();

    const newTask = findDOMNode(this.refs.newTask);
    console.log(newTask.value);
    this._clear(newTask);
  }

  _clear(input) {
    input.value = '';
  }

  render() {

    return(
      <div id="Sidebar">
        <form onSubmit={this._submit.bind(this)}>
          <label>New task:</label>
          <input ref="newTask" type="text" />
          <button type="submit">Add task</button>
        </form>
      </div>
    )
  }
}
