import React from 'react';
import { defaultRanges, DateRange } from 'react-date-range';
import {Menu} from 'react-toolbox/lib/menu';
import moment from 'moment-timezone';

export default class Datepicker extends React.Component {

  constructor() {
    super();
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.isActive = this.isActive.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined')
    this.handleInit = this.handleInit.bind(this)

    this.state = {
      predefined: {},
      active: false,
      x: 0,
      y: 0,
    }
  }

  handleInit(which, payload) {
    console.log(payload)
    let newPL = { startDate: moment.tz(new Date(this.props.initialDates.start), 'UTC'), 
                  endDate : moment.tz(new Date(this.props.initialDates.end), 'UTC')}

    this.setState({predefined: newPL})
    this.props.onChange(this.props.initialDates)
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload
    });

    console.log(payload)

    this.props.onChange({start: payload["startDate"].format("YYYY-MM-DD").toString(),
                          end: payload["endDate"].format("YYYY-MM-DD").toString()})
  }

  handleMenuOpen(e) {
     this.setState({ active: !this.state.active, x: e.pageX, y: e.pageY });
  }

  handleMenuHide() {
    this.setState({ active: false });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  isActive() {
    if (this.state.active)
      return { backgroundColor: "red" }
    else return {}
  }

  render() {
    const format = 'MM/DD/YY';
    const {  predefined } = this.state;

    return (

      <div onClick={this.handleMenuOpen} >

        <div className="dates" style={{ borderColor: this.state.active?"$primary":"" }}>
          <span>
          { 
            (predefined['startDate'] && predefined['startDate'].format(format).toString()) + " - " + 
            (predefined['endDate'] && predefined['endDate'].format(format).toString()) 
          }
          </span>
          <i className="material-icons">date_range</i>
        </div>

        <div style={{position: 'absolute', top: this.state.y, right: this.state.x }} className="datepicker">
          <Menu position="auto" active={this.state.active} onHide={this.handleMenuHide}>
            <div className="menuContentWrapper" style={{display: "inline-block"}} onClick={ this.stopPropagation } >
              <DateRange
                linkedCalendars={ true }
                ranges={ defaultRanges }
                onInit={ this.handleInit}
                onChange={ this.handleChange }
                theme={{
                  Calendar : { width: 200 },
                  PredefinedRanges : { marginLeft: 10, marginTop: 10 }
                }}
              />
            </div>
          </Menu>
        </div>


      </div>
    );
  }

}