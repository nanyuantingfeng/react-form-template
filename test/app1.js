/**************************************************
 * Created by nanyuantingfeng on 10/07/2017 23:42.
 **************************************************/
import './template.less';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Button, Select } from 'antd';
import MessageCenter from 'message-center.js';
import DEMO from './demo1';

const templates = require('./d1.json');

class App extends PureComponent {

  constructor(props, ...args) {
    super(props, ...args);

    this.bus = new MessageCenter();
  }

  state = {
    value: {
      title: 22222,
      'PROPERTY:jes5olISkk0I00': {
        id: '127376139123902183021381', label: 'KKK/DEMO'
      },
      departmentId: 'popopoppopopopopopopoppopop',
      specificationId: 'askjhdiuadn23r82br'
    },
    template: templates.items[0],
  };

  handleSetValue() {
    let value = {
      title: 33333,
      payments: 8888,
      'PROPERTY:jes5olISkk0I00': {
        id: '127376139123902183021381', label: 'KKK/DEMO/PPP'
      },
      departmentId: '66666',
    };
    this.setState({value});
  }

  handleGetValue = () => {
    this.bus.getValue().then(d => {
      console.log('App:handleGetValue', d);
    });

    this.bus.getFieldsValue().then(d => {
      console.log('App:getFieldsValue', d);
    });
  };

  handleSetTemplate(value) {
    let t = templates.items.find(line => line.id === value);
    this.setState({template: undefined});
    this.bus.getValue().then(data => {
      this.setState({template: t, value: data});
    });
  }

  render() {
    let {value, template} = this.state;
    return (
      <section>

        <Select style={{width: 300}} defaultValue={templates.items[0].id}
                onChange={::this.handleSetTemplate}>
          {templates.items.map(line => {
            let {id, name} = line;
            return <Select.Option key={id} value={id}>{name}</Select.Option>;
          })}
        </Select>


        <DEMO bus={this.bus}
              template={template}
              value={value}/>

        <Button type="primary" onClick={::this.handleSetValue}>
          SetPropsValue
        </Button>


        <Button type="primary" onClick={::this.handleGetValue}>
          GetValue
        </Button>

      </section>
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  render(<App/>, el);
});
