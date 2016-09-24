import React from 'react'
import store from 'store'

export default class TaskList extends React.Component {

  render() {
    const taskList = store.get('tasks');

    return(
        <div id="TaskList">
          <div id="Empty">
            <p>You haven't tasks yet!</p>
          </div>
          <div id="TasksWrapper">
            {
              taskList.map((task, i) =>
                <div className="task"
                     key={i}>
                  <p>{task}</p>
                </div>
              )
            }
          </div>
        </div>
      )
  }
}
