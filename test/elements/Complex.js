/**************************************************
 * Created by nanyuantingfeng on 11/05/2017 01:04.
 **************************************************/
import React, { Component } from 'react'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    type: 'complex'
  }
})
export default class ComplexElement extends Component {
  render () {
    return <div>ComplexElement</div>
  }
}
