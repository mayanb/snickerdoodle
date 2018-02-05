import React from 'react';
import { defaultRanges, Calendar, DateRange } from 'react-date-range';
import moment from 'moment-timezone';
import ButtonDropdown from '../Card/ButtonDropdown'
import './datepicker.css'

export default class Datepicker extends React.Component {

  constructor() {
    super();
    this.stopPropagation = this.stopPropagation.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined')
    this.handleInit = this.handleInit.bind(this)

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)


    this.state = {
      predefined: {},
      expanded: false,
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

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded})
  }



  renderDatesButton() {
    let format = 'MM/DD/YY';
    let {expanded, predefined} = this.state
    return (
      <div className="dates" style={{ borderColor: expanded?"$primary":"" }}>
        <span>
        { 
          (predefined['startDate'] && predefined['startDate'].format(format).toString()) + " - " + 
          (predefined['endDate'] && predefined['endDate'].format(format).toString()) 
        }
        </span>
        <i className="material-icons">date_range</i>
      </div>
    )
  }

  render() {
    const format = 'MM/DD/YY';
    const { expanded, predefined } = this.state;

    return (
      <ButtonDropdown 
        secondary
        expanded={expanded} 
        onToggleDropdown={this.handleDropdownToggle}
        button={this.renderDatesButton()} 
      >
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
      </ButtonDropdown>
    )
  }

}

/*

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

        <div style={{position: 'absolute', top: this.state.y, left: this.state.x }} className="datepicker">
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
*/