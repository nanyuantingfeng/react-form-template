/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:15.
 **************************************************/
import React, { Component } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    type: 'ref'
  },
  initialValue (props) {
    return 'akjsdadkaksdkasdkakdjkadkakkjdkajsdksajdkasd'
  }
})
export default class REFElement extends Component {

  constructor (props) {
    super(props)
    this.handleClick = ::this.handleClick
  }

  handleClick () {
    let {bus, field} = this.props
    bus.emit('ref:click', field)
  }

  preGetValue () {
    let {value} = this.props
    return getFieldValue(value)
  }

  render () {
    let {value} = this.props
    let label = getShowValue(value)
    return (
      <Input value={label} onChange={() => {}} onClick={this.handleClick}/>
    )
  }
}

function getFieldValue (value) {
  if (!value) {
    return undefined
  }

  if (typeof value === 'string') {
    return value
  }

  return value['id']
}

function getShowValue (value) {

  if (!value) {
    return undefined
  }

  if (typeof value === 'string') {
    return value
  }

  return value['label']
}
