import React from 'react'
import Select from 'react-select'
import {mountQR, printQRs_dymo} from './qr.jsx'
import {Label} from './Label.jsx'
import {fetch} from './APIManager.jsx'
import api from '../WaffleconeAPI/api'
import DymoPrinterInstructions from '../DymoPrinter/DymoPrinterInstructions'

let QRCode = window.QRCode

var getOptions = function(input, callback) {
    if (input.length < 2) {
      callback(null, { optionss: [] })
    } else {
      let params = {
      limit: true,
      ordering: '-created_at',
      label: input,
    }
      api.get("/ics/tasks/search/")
        .query(params)
        .end(function (err,data) {
        var options = data.body.results.map(function (x) {
          return { value: x.id, label: x.display, data: x}
        })
        callback(null, {options : options, complete: false})
      })
    }
  }

class TaskSelect extends React.Component {

  render () {
    return (
      <div className="multiselect">
        <Select.Async
          name="form-field-name"
          value={this.props.value}
          optionRenderer={(option, i) => option.label}
          loadOptions={getOptions}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default class LabelPrinter extends React.Component {
  constructor(props) {
    super(props)
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleTaskChange = this.handleTaskChange.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePrint = this.handlePrint.bind(this)
    this.state = {
      expanded: false,
      numberLabels: "",
      notes: "",
      task: "",
      qrValue: "",
      items: [],
      selectedItem: "",
      instructionsDialog: false,
    }
  }

  componentWillMount() {
    mountQR()
  }

  componentDidMount() {
    let q = new QRCode(document.getElementById("qrtest"), {
      text: "",
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.Q
    })
    this.setState({qrcode : q})
  }

  handlePrint() {

    let numLabels = parseInt(this.state.numberLabels, 10) || -1

    if (!this.state.expanded && !(numLabels > 0 && numLabels < 101)) {
      alert("Please enter a valid number between 0 and 100!")
      return
    }

    if (this.state.task === "" || this.state.task.data === undefined || this.state.task.data.id === undefined) {
      alert("Please print labels for a valid task.")
      return
    }

    if(!this.state.task.data.items || this.state.task.data.items.length < 1) {
      alert("Cannot print labels for this task because it has no associated qr code.")
      return
    }

    if (this.state.expanded && 
      (this.state.selectedItem === "" || this.state.selectedItem.data === undefined || this.state.selectedItem.data.id === undefined)) {
        alert("Please choose a valid specific item to reprint.")
        return 
    }
    this.setState({disabled: true})

    if (this.state.expanded) {
      let uuid = this.state.selectedItem.data.item_qr
      printQRs_dymo([uuid], this.state.qrcode)
      this.setState({disabled: false})
      return
    }

    let thisObj = this
    let data = Array(numLabels).fill(this.state.task.data.items[0].item_qr)
    printQRs_dymo(data, thisObj.state.qrcode)
    thisObj.setState({disabled: false})
    return

  }

  handleChange(which, payload) {
    this.setState({[which] : payload})
  }

  handleExpandClick() {
    let ns = {
      expanded: !this.state.expanded, 
      numberLabels: "",
      notes: "",
      task: "",
      qrValue: "",
      items: [],
      selectedItem: ""
    }
    this.setState(ns)
  }

  handleTaskChange(value) {
    var v;
    if (value !== undefined && value != null && value.length !== 0)
      v = value
    else 
      v = ""

    this.setState({
      task : v, 
      items: [],
      selectedItem: ""})

    console.log(v)

    if (this.state.expanded) {
      let url = api.host +  "/ics/tasks/" + v.value
      let component = this
      fetch(url, {})
        .done(function (data) {
          component.reloadItems(data)
        })
      //component.reloadItems(v.data) 
    }
  }

  handleItemChange(value) {
    this.state.qrcode.clear()
    var v;
    if (value !== undefined && value != null && value.length !== 0)
      v = value
    else 
      v = ""

    console.log("hello")
    console.log(v)

    if (v) {
      this.state.qrcode.makeCode(v)
    }
    this.setState({selectedItem : v})
  }

  reloadItems(task) {
    let options = {}
    if (task.items) {
      options = task.items.map (function (x) {
        return {id: x.id, label: getQR(x), data: x}
      })
    }
    this.setState({items: options})

  }

  handleToggleInstructionsDialog() {
    console.log("hello")
    this.setState({instructionsDialog: !this.state.instructionsDialog})
  }

  render() {
    return (
      <div className="labelPrinter">

        {this.state.instructionsDialog ?
        <DymoPrinterInstructions onToggle={this.handleToggleInstructionsDialog.bind(this)} />
        : false }


        <div className="marginer">
          <div className="stuff">          

            <div className={"regularPrint"} style={{display: (this.state.expanded?"none":"initial")}}>
              <h2> Print me some labels - Dymo</h2>
              <span className="inputLabel">Number of labels</span>
              <input type="text" 
                placeholder="eg. 20" 
                style={{width: "100%"}} 
                value={this.state.numberLabels} 
                onChange={(e) => this.handleChange("numberLabels", e.target.value)}
              />
              <span className="inputLabel">Task</span>
              <TaskSelect placeholder="Task (eg. R-CVB-1010)" onChange={this.handleTaskChange} value={this.state.task}/>
              
              <span className="inputLabel">Extra notes</span>
              <input type="text" 
                placeholder="max 20 characters" 
                style={{width: "100%"}} 
                value={this.state.notes}
                onChange={(e) => this.handleChange("notes", e.target.value.substr(0,20))}
              />
              <button type="submit" id="printButton" onClick={this.handlePrint}> {this.state.disabled?"Printing...":"Print!"} </button>
              <button className="expandReprint" onClick={this.handleExpandClick}>
                <span>I need to reprint a label</span>
              </button>
              <button className="expandReprint" onClick={this.handleToggleInstructionsDialog.bind(this)}>
                <span>My printer isn't working</span>
              </button>
            </div>

            <div className={"reprint " + (this.state.expanded?"expanded":"")} style={{display: (!this.state.expanded?"none":"initial")}}>
              
              <button className="expandReprint" onClick={this.handleExpandClick}>
                <i className="material-icons">arrow_back</i><span>Back to regular printing</span>
              </button>
              <span className="inputLabel">Task</span>
              <TaskSelect placeholder="Task (eg. R-CVB-1010)" onChange={this.handleTaskChange} value={this.state.task}/>
              <span className="inputLabel">Item</span>
              <Select className="select" 
                name="item-select" 
                placeholder="Choose an item" 
                options={this.state.items} 
                valueKey="id"
                value={this.state.selectedItem}
                onChange={this.handleItemChange}
              />
              <button type="submit" id="printButton" onClick={this.handlePrint} > {this.state.disabled?"Printing...":"Print!"}  </button>
            </div>

          </div>

          <div className="playground" style={{position: "relative", margin: "20px"}}>
            <Label taskLabel={short(this.state.task.label)} 
              taskLabelLong={this.state.task.label}
              originLabel={getCode(this.state.task.label || "")} 
              notesLabel={this.state.expanded?"":this.state.notes}
            />
            <div id="canvastest">
              <canvas height="241" width="431"></canvas>
            </div>
            <div id="qrtest"></div>
            <div id="blocker" />
          </div>

          </div>
      </div>
    )
  }
}

function short(str) {
  if (!str)
    return ""
  var codes = str.split('-')
  if (codes.length > 2) {
    codes.splice(1, 1)
  }
  return codes.join('-')
}

function getCode(str) {
  var codes = str.split('-')
  if (codes[1])
    return codes[1]
  return str
}

function getQR(item) {
  if (item && item.item_qr) {
    var len = item.item_qr.length
    return item.item_qr.substr(len-6, len)
  }
  return ""
}