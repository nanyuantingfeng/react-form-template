/**************************************************
 * Created by nanyuantingfeng on 05/05/2017 19:22.
 **************************************************/
import React, { createElement, PureComponent } from 'react';
import deepEqual from 'deep-equal';

function fnDeepCompare(a, b) {
  return deepEqual(a, b, {strict: true});
}

function fnGetFields(template) {
  if (Array.isArray(template)) {
    return template;
  }

  if (template && template.fields) {
    return template.fields;
  }
  return [];
}

function fnIsMultiArray(array = []) {
  let i = -1;
  while (++i < array.length) {
    if (!(array[i] instanceof Array)) {
      return false;
    }
  }
  return true;
}

export default class Template extends PureComponent {

  static defaultProps = {
    template: {fields: []},
    value: {},
    tags: {},
    className: '',
  };

  constructor(props, ...args) {
    super(props, ...args);
    let {bus} = props;
    this.bus = bus;
  }

  componentWillMount() {
    this.bus.watch('@form:set:value', this.setValueMap);
    this.bus.watch('@form:get:value', this.getValueMap);
    this.bus.watch('@form:validate', this.validateFAS);
    this.bus.watch('@form:clear:validate', this.resetValidate);
    this.bus.watch('@form:reset:fields', this.resetFields);
  }

  componentWillUnmount() {
    this.bus.un('@form:set:value');
    this.bus.un('@form:get:value');
    this.bus.un('@form:validate');
    this.bus.un('@form:clear:validate');
    this.bus.un('@form:reset:fields');
  }

  componentDidMount() {
    this.bus.emit('@form:did:mount');
  }

  componentWillReceiveProps(nextProps) {
    let v0 = this.props.value;
    let v1 = nextProps.value;
    let t0 = this.props.template;
    let t1 = nextProps.template;
    if (!fnDeepCompare(t0, t1) || !fnDeepCompare(v0, v1)) {
      this.preSetValueMap(t1, v1);
    }
  }

  getValueMap = () => {
    let {form} = this.props;
    return form.getFieldsValue();
  };

  preSetValueMap(template, value) {
    let fields = fnGetFields(template);
    let keys = fields.filter(nn => !!nn.name).map(nn => nn.name);
    let oo = {};
    keys.forEach(key => {oo[key] = value[key];});
    this.setValueMap(oo);
  }

  setValueMap = (values) => {
    let {form} = this.props;
    form.setFieldsValue(values);
  };

  resetValidate = () => {
    let value = this.getValueMap();
    this.resetFields();
    this.setValueMap(value);
  };

  resetFields = () => {
    let {form} = this.props;
    form.resetFields();
  };

  validateFAS = (level) => {
    return new Promise((resolve, reject) => {
      let {form, bus} = this.props;
      let {validateFields, validateFieldsAndScroll} = form;
      let fn = validateFieldsAndScroll || validateFields;
      bus.setValidateLevel(level);
      fn({force: true}, (e, values) => {
        bus.setValidateLevel(); //设置默认值为0
        e ? reject(e) : resolve(values);
      });
    });
  };

  renderSimpleFields(fields, prefixKey = '') {
    let {value, cellar, tags, ...others} = this.props;
    return fields.map((field, index) => {
      let {name} = field;
      let e = cellar.getComponent(field);
      if (!e) return null;
      let tag = tags[name];
      let initialValue = value[name];
      let key = `${prefixKey}_${name}_${index}`;
      return createElement(e, {...others, initialValue, field, tag, key,});
    });
  }

  renderMultiFields(multiFields = []) {
    let oo = [];
    let i = -1;
    while (++i < multiFields.length) {
      let fields = multiFields[i];
      let array = this.renderSimpleFields(fields, i);
      oo.concat(array);
    }
    return oo;
  }

  renderFields(fields) {
    if (fnIsMultiArray(fields)) {
      return this.renderMultiFields(fields);
    }
    return this.renderSimpleFields(fields);
  }

  renderGroup() {
    let {groupWrapper, template} = this.props;
    let fields = fnGetFields(template);

    let multiFields;

    if (fnIsMultiArray(fields)) {
      multiFields = fields;
    }

    if (groupWrapper && multiFields) {
      return multiFields.map((line, index) => groupWrapper(
        this.props,
        this.renderSimpleFields(line, index),
        index)
      );
    }

    return this.renderFields(multiFields || fields);
  }

  render() {
    let {className, rootWrapper = 'div'} = this.props;
    return createElement(rootWrapper, {className}, this.renderGroup());
  }
}
