/**************************************************
 * Created by nanyuantingfeng on 11/05/2017 00:05.
 **************************************************/
import React, { Component } from 'react'

export default class WhiteSpace extends Component {
  render () {
    let {field} = this.props
    let {dataType} = field
    let {height, backgroundColor} = dataType
    return (<div style={{width: '100%', height, backgroundColor}}/>)
  }
}

WhiteSpace.descriptor = {
  type: 'whitespace'
}
