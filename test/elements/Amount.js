/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:16.
 **************************************************/
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'
import Big from 'big.js'

@EnhanceField({
  descriptor: {
    name: 'amount',
  }
})
export default class AmountElement extends PureComponent {

  constructor (props) {
    super(props)
    this.handleValueChange = ::this.handleValueChange
  }

  preSetValue (value) {
    return new Big(value).valueOf()
  }

  preGetValue () {
    return this.props.value
  }

  handleValueChange (value) {
    debugger
  }

  render () {
    return (<Input type='number' onChange={this.handleValueChange}/>)
  }
}
