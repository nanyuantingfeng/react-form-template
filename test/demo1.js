/**************************************************
 * Created by nanyuantingfeng on 06/05/2017 00:17.
 **************************************************/
import './template.less';
import React, { Children, PureComponent } from 'react';
import { Button, Form, Spin } from 'antd';
import { elements } from './elements';
import { Dynamic } from '../lib';

function Loading() {
  return <div style={{
    height: 420, width: '100%',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center'
  }}><Spin/></div>;
}

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 12},
};

function wrapper(props, C) {
  let {field} = props;
  let {label, optional, visible} = field;
  let style = {};
  // visible === undefined 当做 true  处理

  if (visible === false) {
    style.display = 'none';
  }

  return (
    <Form.Item  {...layout} label={label} required={!optional} style={style}>
      {Children.only(C)}
    </Form.Item>
  );
}

function create(T) {
  return Form.create()(T);
}

function groupWrapper(props, components, index) {
  return (
    <div style={{border: '1px solid #f00', margin: 20}} key={index}>
      {components}
    </div>
  );
}

export default class DEMO extends PureComponent {

  constructor(props) {
    super(props);
    this.bus = props.bus;
  }

  componentWillMount() {
    this.bus.on('property:click', ::this.handlePropertyClick);
    this.bus.on('ref:click', ::this.handleREFClick);
    this.bus.on('details:add:click', ::this.handleDetailsAddClick);
  }

  componentWillUnmount() {
    this.bus.un('property:click');
    this.bus.un('ref:click');
    this.bus.un('details:add:click');
  }

  handlePropertyClick(field) {
    console.log('--handlePropertyClick', field);
  }

  handleREFClick(field) {
    console.log('--handleREFClick', field);
  }

  handleDetailsAddClick(field) {
    this.bus.getValue().then(d => {
      let {details} = d;
      details = details || [];
      details.push({aaa: {b: {c: Math.random()}}});
      this.bus.setValue({details});
    });
  }

  handleGetValue() {

    this.bus.getValue().then(d => {
      console.log('getValue', d);
    });

    this.bus.getFieldsValue().then(d => {
      console.log('getFieldsValue', d);
    });

  }

  handleGetValueWithValidate() {
    this.bus.getValueWithValidate(99).then(d => {
      console.log('getValueWithValidate', d);
    });
  }

  handleSetValue() {
    this.bus.setValueWithReference({
      departmentId: {label: 'uuuuuuuuuLABEL', id: 'xbbxbhsbbshdbasdmID'},
      expenseDate: Date.now(),
      iiiiiiii: 'xxxxasdasdasdad',
      details: [{}, {}, {}, {}],
    });
  }

  handleIsEqualReferenceValue() {
    this.bus.isEqualWithReference().then(bool => {
      console.log('-=-=-=-=-=-=-=-=-=-=isEqualReferenceValue', bool);
    });
  }

  handleClearValidate() {
    this.bus.clearValidate();
  }

  handleResetFields() {
    this.bus.resetFields();
  }

  render() {
    let {bus, template, value} = this.props;
    return (
      <div className="layout-content">

        <Dynamic bus={bus}
                 template={template}
                 value={value}
                 elements={elements}
                 create={create}
                 wrapper={wrapper}
                 groupWrapper={groupWrapper}
                 loading={Loading}/>

        <Button type="primary" onClick={::this.handleGetValue}>
          GetValue
        </Button>
        <Button type="primary" onClick={::this.handleGetValueWithValidate}>
          GetValueWithValidate
        </Button>
        <Button type="primary" onClick={::this.handleSetValue}>
          setValueAsReference
        </Button>
        <Button type="primary" onClick={::this.handleClearValidate}>
          ClearValidate
        </Button>
        <Button type="primary" onClick={::this.handleResetFields}>
          resetFields
        </Button>
        <Button type="primary" onClick={::this.handleIsEqualReferenceValue}>
          isEqual
        </Button>

      </div>
    );
  }
}

