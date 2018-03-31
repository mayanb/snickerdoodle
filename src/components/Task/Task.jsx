import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { formatAmount } from "../../utilities/stringutils"
import {icon, TaskTable} from './TaskHelpers.jsx'
import TaskInputTable from './TaskInputTable'
import TaskOutputTable from './TaskOutputTable'
import * as actions from './TaskActions'
import * as attributeActions from './TaskAttributeActions'
import TaskInformationTable from './TaskInformationTable'
import TaskFlag from './TaskFlag'
import './styles/task.css'

class Task extends React.Component {
  constructor(props) {
    super(props)
    
    this.markAsUsed = this.markAsUsed.bind(this)
    this.closeTask = this.closeTask.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.startEditing = this.startEditing.bind(this)
    this.finishEditing = this.finishEditing.bind(this)
    this.saveEditing = this.saveEditing.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.dispatch(actions.getTask(id))
    this.props.dispatch(actions.getTaskAncestors(id))
    this.props.dispatch(actions.getTaskDescendents(id))
  }

  render() {
    let { data, ui, ancestorsData, ancestorsUI, descendentsData, descendentsUI } = this.props
    
    if (!data || (data.length===0)) {
      return (
        <div className="task-detail">
        </div>
      )
    }

    let dialog = false;
    return (
      <div className="task-detail">
        {dialog}
        <div className="task-header">
          <div className="header-left">
            <img src={icon(data.process_type.icon)} alt="process type"/>
            <span>{data.display}</span>
            <div className='batch-size'>{this.getBatchSizeDisplayText(data)}</div>
          </div>
          <span>{moment(data.created_at).format('dddd, MMMM Do YYYY, h:mm a')}</span>
        </div>
        <div className="task-content">
          <div>
            <TaskFlag flagged={data.is_flagged} onUnflag={this.toggleTask} />
            <TaskInformationTable 
              attributes={data.organized_attrs}
              editingAttribute={ui.editingAttribute} 
              startEditing={this.startEditing} 
              finishEditing = {this.finishEditing}
              saveEditing={this.saveEditing}
            />

            {
              data.is_flagged?null:
                (<button className="task_button" onClick={this.toggleTask}>Flag this item</button>)
            }
            <button className="task_button" onClick={this.deleteTask}>Delete Task</button>
          </div>
          <div>
            <TaskInputTable data={data}/>
            {this.teamUsesOutputs() && <TaskOutputTable outputs={data.items} onMark={this.markAsUsed}/>}
            <TaskTable title="Ancestors" tasks={ancestorsData} loading={ancestorsUI.isFetchingData}/>
            <TaskTable title="Descendents" tasks={descendentsData} loading={descendentsUI.isFetchingData}/>
          </div>
        </div>
      </div>
    )
  }
  
  getBatchSizeDisplayText({items, process_type}) {
		const batchAmount = items.reduce((sum, item) => sum + parseInt(item.amount, 10), 0)
    return `Batch Size: ${formatAmount(batchAmount, process_type.unit)}`
  }
  
  // TEMP: For optional printing transition, to allow Dandelion to continue using outputs
  teamUsesOutputs() {
		const {data, ui} = this.props.users
    const teamID = parseInt(data[ui.activeUser].user.team, 10)
    const teamIDsWhoUseOutputs = new Set([1 /* -> Alabama */, 2  /* -> Valencia */])
    return teamIDsWhoUseOutputs.has(teamID)
  }

  startEditing(index) {
    this.props.dispatch(attributeActions.startEditingAttribute(index))
  }

  finishEditing(index) {
    this.props.dispatch(attributeActions.finishEditingAttribute(index))
  }

  saveEditing(index, value) {
    let attr = this.props.data.organized_attrs[index]
    let task = this.props.data.id
    let params = { attribute: attr.attribute, task: task, value: value }
    this.props.dispatch(attributeActions.saveEditingAttribute(index, params))
    this.props.dispatch(attributeActions.finishEditingAttribute(index, params))
  }

  closeTask() {
    this.props.dispatch(actions.closeTask(this.props.data))
  }

  toggleTask() {
    this.props.dispatch(actions.toggleTask(this.props.data))
  }

  deleteTask() {
    this.props.dispatch(actions.deleteTask(this.props.data))
  }

  markAsUsed(index, id) {
    this.props.dispatch(actions.markAsUsed(index, id))
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    users: state.users,
    data: state.task.data,
    ui: state.task.ui,
    ancestorsData: state.taskAncestors.data,
    ancestorsUI: state.taskAncestors.ui,
    descendentsData: state.taskDescendents.data,
    descendentsUI: state.taskDescendents.ui,
    movementsData: state.movements.data,
    movementsUI: state.movements.ui
  }
}
const connectedTask = connect(mapStateToProps)(Task)
export default connectedTask