import React from 'react'
import store from 'store'
import {reverse, sortBy} from 'lodash'

export default class TaskList extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      show: "all",
      order: "desc",
      tasks: []
    };
  }

  componentDidMount() {
    const {tasks} = this.props;
    this.setState({tasks: tasks});
  }

  componentWillReceiveProps(nextProps) {
    const {tasks} = nextProps;
    
    this.setState({tasks: tasks});
  }

  _complete(e) {
    e.preventDefault();

    const taskList = store.get('tasks');
    const key = e.target.nodeName === "I" ? e.target.parentElement.dataset.key : e.target.dataset.key;
    const task = taskList[key];

    task.status = "completed";
    taskList[key] = task;

    store.set('tasks', taskList);
    this.setState({tasks: taskList});
  }

  _delete(e) {
    e.preventDefault();

    const taskList = store.get('tasks');
    const key = e.target.nodeName === "I" ? e.target.parentElement.dataset.key : e.target.dataset.key;
    
    taskList.splice(key,1);
    store.clear();
    store.set('tasks', taskList);
    this.setState({tasks: taskList});
  }

  _filterByStatus(e) {
    e.preventDefault();

    const status = e.target.dataset.status;
    const taskList = store.get('tasks');
    const filteredTasks = [];

    if(status !== "all") {
      
      taskList.map((task, i) => {
        task.status === status && filteredTasks.push(task);
      });
      
      this.setState({tasks: filteredTasks, show: "all"})

    }else{
      
      this.setState({tasks: taskList, show: "all"})

    }
  }

  _orderBy(e) {
    e.preventDefault();

    const order = e.target.dataset.order;
    const taskList = this.state.tasks;
    const filteredTasks = sortBy(taskList, 'datetime');

    if(order === "asc"){
      this.setState({tasks: filteredTasks, show: order})
    }else{
      this.setState({tasks: filteredTasks.reverse(), show: order})
    }
  }

  render() {

    const {tasks} = this.state;

    return(
        <div id="TaskList">
          <div className="filter">
            <div className="status">
              <button data-status="all" onClick={this._filterByStatus.bind(this)} type="button">All</button>
              <button data-status="completed" onClick={this._filterByStatus.bind(this)} type="button">Completed</button>
              <button data-status="uncompleted" onClick={this._filterByStatus.bind(this)} type="button">Uncompleted</button>
            </div>
            <div className="order">
              <button data-order="desc" onClick={this._orderBy.bind(this)} type="button"><i className="fa fa-arrow-up"></i></button>
              <button data-order="asc" onClick={this._orderBy.bind(this)} type="button"><i className="fa fa-arrow-down"></i></button>
            </div>
          </div>  
          <div id="TasksWrapper">
            {
              tasks && tasks.map(({task, status, datetime}, i) =>
                  <div className="task"
                       key={i}>
                    <p>{task}</p>
                    <p className="datetime"><i className="fa fa-calendar"></i> {datetime}</p>
                    <ul className="actions">
                      <li className="delete">
                        <button data-key={i}
                                type="button"
                                onClick={this._delete.bind(this)}>
                          <i className="fa fa-close" />
                        </button>
                      </li>
                      <li className={`check ${status}`}>
                        <button data-key={i}
                                onClick={this._complete.bind(this)}
                                type="button">
                          <i className="fa fa-check" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )
            }
          </div>
        </div>
      )
  }
}
