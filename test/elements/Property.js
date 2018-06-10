/**************************************************
 * Created by nanyuantingfeng on 11/05/2017 01:53.
 **************************************************/
import React, { Component } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    test ({name}) {
      return /PROPERTY:.*/.test(name)
    }
  },
  initialValue (props) {
    return {label: 787878}
  }
})
export default class PropertyElement extends Component {

  constructor (props) {
    super(props)
    this.handleClick = ::this.handleClick
  }

  preGetValue () {
    let {value} = this.props
    return value ? value.id : undefined
  }

  handleClick () {
    let {bus, field} = this.props
    bus.emit('property:click', field)
  }

  render () {
    let {value} = this.props
    value = value || {}
    let {label} = value
    return (
      <Input value={label} onChange={() => {}} onClick={this.handleClick}/>
    )
  }
}
