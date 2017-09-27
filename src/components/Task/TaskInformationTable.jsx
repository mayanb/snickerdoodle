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
            cancelEditing={() => this.props.cancelEditing(attr, i)}
            startEditing={() => this.props.startEditing(attr, i)}
            saveEditing={(val) => this.props.saveEditing(attr, i, val)}
          />
        })
      }
      </div>
    )
  }
}



// export default function TaskInformationTable(props) {
//   return (
//     <div>
//     {
//       props.attributes.map(function(attr, i) {
//         let isEmpty = (attr.value == "")
//         return (
//           <div key={i} className="task-attribute-table-row">
//             <span className="information-table-title">{attr.name}</span>
//             <span className={"information-table-answer " + (isEmpty?"empty-answer":"")}>{isEmpty?"n/a":attr.value}</span>
//           </div>
//         )
//       })
//     }
//     </div>
//   )
// }
