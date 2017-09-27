import React from 'react'
import TaskAttribute from '../TaskAttribute/TaskAttribute'

export default class TaskInformationTable extends React.Component {

  render() {
    return (
      <div>
      {
        this.props.attributes.map(function(attr, i) {
          return <TaskAttribute 
            key={i} 
            {...attr} 
            isEditing={this.props.editingAttribute===i}
            finishEditing={() => this.props.finishEditing(i)}
            startEditing={() => this.props.startEditing(i)}
            saveEditing={(val) => this.props.saveEditing(i, val)}
          />
        }, this)
      }
      </div>
    )
  }
}

