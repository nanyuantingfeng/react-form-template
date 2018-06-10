/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:19.
 **************************************************/
import './Details.less'
import React, { PureComponent } from 'react'
import { EnhanceField } from '../../src'

@EnhanceField({
  descriptor: {
    name: 'details'
  },
  label: null,
  layout: {}
})
export default class DetailsElement extends PureComponent {

  constructor (props) {
    super(props)
    this.handleClick = ::this.handleClick
  }

  handleClick () {
    let {bus, field} = this.props
    bus.emit('details:add:click', field)
  }

  renderItems () {
    let {value} = this.props
    value = value || []
    return value.map((line, index) => {
      return <div className="item" key={index}>{JSON.stringify(line)}</div>
    })
  }

  render () {
    return (
      <section className="dynamic-field-details">
        <div className="add" onClick={this.handleClick}/>
        {this.renderItems()}
      </section>
    )
  }
}
