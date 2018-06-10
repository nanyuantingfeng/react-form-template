/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:14.
 **************************************************/
import React, { Component } from 'react'
import { DatePicker } from 'antd'
import { EnhanceField } from '../../src'
import moment, { isMoment } from 'moment'

@EnhanceField({
  descriptor: {
    type: 'date',
  }
})
export default class DateElement extends Component {

  constructor (props) {
    super(props)

    this.handleValueChange = ::this.handleValueChange
  }

  preSetValue (value) {
    if (typeof value === 'number') {
      value = moment(value)
    }
    return value
  }

  preGetValue () {
    let {value} = this.props

    if (!isMoment(value)) {
      value = moment(value)
    }

    return value.valueOf()
  }

  handleValueChange (value) {
    let {onChange} = this.props
    onChange && onChange(value)
  }

  renderRange () {
    return (
      <DatePicker.RangePicker/>
    )
  }

  render () {
    let {value, field} = this.props
    let {dataType} = field
    let {type, dateRange, withTime} = dataType

    if (dateRange) {
      return this.renderRange()
    }

    if (!isMoment(value)) {
      value = moment(value)
    }

    return (<DatePicker value={value} onChange={this.handleValueChange}/>)
  }
}
