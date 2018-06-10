/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:14.
 **************************************************/
import React, { Component } from 'react'
import { Input } from 'antd'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    type: 'label'
  }
})
export default class LabelElement extends Component {

  handleChange () {

  }

  render () {
    return (
      <Input disabled onChange={::this.handleChange}/>
    )
  }

}
