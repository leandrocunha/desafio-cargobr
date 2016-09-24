import React from 'react'
import Sidebar from './Sidebar'
import TaskList from './TaskList'

export default class Wrapper extends React.Component {

  render() {

    return (
      <div id="Wrapper">
      	<Sidebar />
        <TaskList />
      </div>
    );
  }
}
