/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:16.
 **************************************************/
import React, { PureComponent } from 'react'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    type: 'isX',
  }
})
export default class BooleanWrapper extends PureComponent {

  constructor (props) {
    super(props)
    this.handleValueChange = ::this.handleValueChange
  }

  handleValueChange (e) {
    let {onChange} = this.props
    onChange(e.target.checked)
  }

  render () {
    return (<input type='checkbox' onChange={this.handleValueChange}/>)
  }
}
