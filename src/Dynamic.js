/**************************************************
 * Created by nanyuantingfeng on 21/07/2017 11:25.
 **************************************************/
import React, { createElement, PureComponent } from 'react'
import deepEqual from 'deep-equal'
import Template from './Template'
import Bus from './Bus'
import Cellar from './Cellar'
import PromiseMap from './PromiseMap'

function fnDeepCompare (a, b) {
  return deepEqual(a, b, {strict: true})
}

function preGetValue (value) {
  return value !== undefined ? value : this.props.value
}

function preSetValue (value) {
  return value
}

function isValue (v) {
  return v !== undefined
}

export default class Dynamic extends PureComponent {
  static displayName = 'Dynamic'
  static defaultProps = {
    elements: [],
    create: T => T,
    loading: null,
  }

  constructor (props, ...args) {
    super(props, ...args)
    this.bus = Bus(props.bus)
    let {create, elements} = props

    if (!create) {
      throw new TypeError('create is not a function')
    }

    if (!Array.isArray(elements)) {
      throw new TypeError('elements is not an array')
    }

    this.TEMPLATE = create(Template)

    this.cellar = new Cellar(elements)
  }

  componentWillMount () {
    this.bus.watch('@form:getFieldsValue', this.getValue)
    this.bus.watch('@form:setFieldsValue', this.setValue)
    this.bus.watch('@form:getValueWithValidate', this.getValueWithValidate)
  }

  componentWillUnmount () {
    this.bus.un('@form:getFieldsValue')
    this.bus.un('@form:setFieldsValue')
    this.bus.un('@form:getValueWithValidate')
  }

  componentWillReceiveProps (nextProps) {
    if (!fnDeepCompare(this.props.template, nextProps.template)) {
      this.TEMPLATE = nextProps.create(Template)
    }
  }

  eachInstances = (fn) => {
    let {template} = this.refs

    if (!template) {
      console.warn('call eachInstances at a wrong opportunity')
      return false
    }

    let {instances} = template
    let i = -1
    let keys = Object.keys(instances)

    while (++i < keys.length) {
      let key = keys[i]
      let one = instances[key]
      fn(one, key, i)
    }
  }

  setValue = (values) => {
    if (!values) {
      throw new TypeError('setFieldsValue must be a Object')
    }

    let oo = {}

    this.eachInstances((one, key) => {
      let f = one.preSetValue || preSetValue
      if (isValue(values[key])) {
        oo[key] = f.call(one,values[key])
      }
    })

    return this.bus.invoke('@form:set:value', oo)
  }

  validateFields = (level) => {
    return this.bus.invoke('@form:validate', level)
  }

  getValue = () => {
    let oo = {}
    this.eachInstances((one, key) => {
      let f = one.preGetValue || preGetValue
      oo[key] = f.call(one)
    })
    return PromiseMap(oo)
  }

  getValueWithValidate = (level) => {
    return this.validateFields(level).then(this.getValue)
  }

  renderLoading () {
    let {loading, ...others} = this.props
    return createElement(loading, {...others, bus: this.bus})
  }

  render () {
    let {template, value, ...others} = this.props

    if (!template) {
      return this.renderLoading()
    }

    let {TEMPLATE, bus, cellar} = this

    return (
      <TEMPLATE ref="template" {...others}
                bus={bus} cellar={cellar}
                template={template} value={value}
      />
    )
  }
}
