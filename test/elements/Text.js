/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:14.
 **************************************************/
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'

function required (field, props) {
  return (rule, value, callback) => {
    let {level} = rule

    if (level > 0) {
      return callback()
    }

    if (value || value.length) {
      return callback()
    }

    callback('不可为空*(*(xxxxxxx')
  }
}

function verify0 (field, props) {
  return (rule, value, callback) => {

    if (value && value.length === 14) {
      callback()
      return
    }
    callback('Len :: 14 !!')
  }
}

function verify1 (field, props) {
  return (rule, value, callback) => {
    let {level} = rule
    if (level > 0) {
      if (value && String(value).startsWith('99')) {
        return callback()
      } else {
        callback('startsWith :: 99')
      }
    }
    callback()
  }
}

@EnhanceField({
  descriptor: {type: 'text'},
  validator (...args) {
    return [required(...args), verify0(...args), verify1(...args)]
  },
})
export default class TextElement extends PureComponent {

  constructor (props) {
    super(props)
    let {value} = props
    this.state = {value}
    this.handleValueChange = ::this.handleValueChange
  }

  preGetValue () {
    let {value} = this.props
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value)
      }, 3000)
    })
  }

  handleValueChange (e) {
    let value = e.target.value
    this.triggerValueChange(value)
  }

  triggerValueChange (value) {
    let {onChange} = this.props
    onChange && onChange(value)
  }

  render () {
    let {value, field} = this.props
    let {label, optional, visible} = field
    return (
      <Input type="text" value={value} onChange={this.handleValueChange}/>
    )
  }

}

 
