/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 22:53.
 **************************************************/
import React, { Component } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    type: 'number'
  }
})
export default class NumberElement extends Component {

  constructor (props) {
    super(props)
    let {value} = props
    this.state = {value}
    this.handleValueChange = ::this.handleValueChange
  }

  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value
      this.setState({value})
    }
  }

  handleValueChange (e) {
    let value = e.target.value
    if (!('value' in this.props)) {
      this.setState({value})
    }
    this.triggerValueChange(value)
  }

  triggerValueChange (value) {
    let {onChange} = this.props
    onChange && onChange(value)
  }

  render () {
    let {value} = this.state
    return (<Input type="number" value={value} onChange={this.handleValueChange}/>)
  }

}
