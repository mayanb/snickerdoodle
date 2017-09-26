import React from 'react'
import { TaskSelect } from '../OldComponents/Inputs.jsx'
import {display, icon, TaskTable, InformationTable, OutputTable, InputTable, subs, Table, pl} from './TaskHelpers.jsx'
import moment from 'moment'
//import {mountQR, printQRs} from './qr.jsx'
import {Dialog} from '../OldComponents/Dialog.jsx'
import { connect } from 'react-redux'
import * as actions from './TaskActions.jsx'



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
    console.log(this.props.match.params.id)
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
    var { data, ui, ancestorsData, ancestorsUI, descendentsData, descendentsUI, movementsData, movementsUI } = this.props
    if (!data || (data.length===0)) {
      return (
        <div className="task-detail">
          <TaskSelect placeholder="Search for a task" onChange={this.handleSearch} />
        </div>
      )
    }

    var dialog = false;
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
            <InformationTable attributes={this.organizeAttributes(data)} />

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

            // <button className="task_button" onClick={() => this.showDialog(dialogs.deleteTask, this.closeTask)}>Close Task</button>


  closeTask() {
    console.log("close")
    console.log(this.props.data)
    this.props.dispatch(actions.closeTask(this.props.data))

    //change is_open
  }

  toggleTask() {
    console.log("toggle")
    console.log(this.props.data)
    this.props.dispatch(actions.toggleTask(this.props.data))

    //change is_flagged

  }

  deleteTask() {
    console.log("delete")
    console.log(this.props.data)
    this.props.dispatch(actions.deleteTask(this.props.data))

  }

  handleSearch(val) {
    console.log(val)
    if (val.value && val.value != parseInt(this.props.match.params.id)) {
      console.log("yay")
      window.location.href = window.location.origin + "/task/" + val.value
    }
  }

  organizeAttributes(taskData) {
    let attributes = taskData.process_type.attributes
    let values = taskData.attribute_values
    let organized = [
      {attribute: -1, value: taskData.process_type.name, name: "Process", editable: false},
      {attribute: -1, value: taskData.product_type.name, name: "Product", editable: false},
      {attribute: -1, value: taskData.process_type.created_by_name, name: "Production Team", editable: false},
      {attribute: -1, value: moment(taskData.created_at).format('MM/DD/YY h:mm a'), name: "Created at", editable: false},
      {attribute: -1, value: moment(taskData.updated_at).format('MM/DD/YY h:mm a'), name: "Updated at", editable: false},
    ]

    attributes.map(function (attr, i) {
      let val = values.find(function (e) {
        return (e.attribute == attr.id)
      })
      organized.push({attribute: attr.id, value: val?val.value:"", name: attr.name, editable: true})
    })

    organized.push({attribute: -1, value: pl(taskData.inputs.length, taskData.inputUnit), name: "# INPUTS", editable: false})
    organized.push({attribute: -1, value: pl(taskData.items.length, taskData.process_type.unit), name: "# OUTPUTS", editable: false})

    return organized
  }

  markAsUsed(index, id) {
    this.props.dispatch(actions.markAsUsed(index, id))
  }
}

const mapStateToProps = (state/*, props*/) => {
  console.log(state)
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