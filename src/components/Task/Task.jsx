import React from 'react'
import { TaskSelect } from '../OldComponents/Inputs.jsx'
import {display, icon, TaskTable, OutputTable, InputTable, subs, Table, pl} from './TaskHelpers.jsx'
import moment from 'moment'
import {Dialog} from '../OldComponents/Dialog.jsx'
import { connect } from 'react-redux'
import * as actions from './TaskActions'
import * as attributeActions from './TaskAttributeActions'
import TaskInformationTable from './TaskInformationTable'



let dialogs = {
  deleteTask: {
    title: "Are you sure you want to delete this task?",
    text: "You can't undo this action.",
    okText: "Yes, I'm sure"
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
    this.markAsUsed = this.markAsUsed.bind(this)
    this.closeTask = this.closeTask.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.startEditing = this.startEditing.bind(this)
    this.finishEditing = this.finishEditing.bind(this)
    this.saveEditing = this.saveEditing.bind(this)
  }

  componentWillMount() {
    //mountQR()
  }

  componentDidMount() {
    // let q = new QRCode(document.getElementById("qrtest"), {
    //   text: "",
    //   width: 128,
    //   height: 128,
    //   colorDark : "#000000",
    //   colorLight : "#ffffff",
    //   correctLevel : QRCode.CorrectLevel.Q
    // })
    // this.setState({qrcode: q})
    let id = this.props.match.params.id
    this.props.dispatch(actions.getTask(id))
    this.props.dispatch(actions.getTaskAncestors(id))
    this.props.dispatch(actions.getTaskDescendents(id))
  }

  printQR(index, id) {
    let qr = this.state.task.items[index].item_qr
    // printQRs([qr], this.state.qr)
  }

  render() {
    let { data, ui, ancestorsData, ancestorsUI, descendentsData, descendentsUI, movementsData, movementsUI } = this.props
    if (!data || (data.length===0)) {
      return (
        <div className="task-detail">
          <TaskSelect placeholder="Search for a task" onChange={this.handleSearch} />
        </div>
      )
    }

    let dialog = false;
    // if(this.state.showDialog) {
    //   dialog = <Dialog {...this.state.activeDialog} />
    // }
    return (
      <div className="task-detail">
        {dialog}
        <TaskSelect placeholder="Search for a task" onChange={this.handleSearch} />
        <div className="task-header">
          <div className="header-left">
            <img src={icon(data.process_type.icon)} />
            <span>{data.display}</span>
          </div>
          <span>{moment(data.created_at).format('dddd, MMMM Do YYYY, h:mm a')}</span>
        </div>
        <div className="task-content">
          <div>
            <TaskInformationTable 
              attributes={data.organized_attrs}
              editingAttribute={ui.editingAttribute} 
              startEditing={this.startEditing} 
              saveEditing={this.saveEditing}
            />

            <button className="task_button" onClick={this.closeTask}>Close Task</button>
            <button className="task_button" onClick={this.toggleTask}>Toggle flag</button>
            <button className="task_button" onClick={this.deleteTask}>Delete Task</button>
          </div>
          <div>
            <InputTable inputs={data.inputs}/>
            <OutputTable outputs={data.items} onMark={this.markAsUsed}/>
            <TaskTable title="Ancestors" tasks={ancestorsData} loading={ancestorsUI.isFetchingData}/>
            <TaskTable title="Descendents" tasks={descendentsData} loading={descendentsUI.isFetchingData}/>
          </div>
        </div>
      </div>
    )
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

  handleSearch(val) {
    if (val.value && val.value != parseInt(this.props.match.params.id)) {
      window.location.href = window.location.origin + "/task/" + val.value
    }
  }

  markAsUsed(index, id) {
    this.props.dispatch(actions.markAsUsed(index, id))
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
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