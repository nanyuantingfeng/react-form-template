/**************************************************
 * Created by nanyuantingfeng on 17/05/2017 11:07.
 **************************************************/
import React, { PureComponent } from 'react';

const noop = (props, component) => component;

function fnCallOrReturn(f, ...args) {
  if (typeof  f === 'function') {
    return f(...args);
  }
  return f;
}

function fnWrapperRule(line, bus) {
  let fx = () => bus.getValidateLevel();

  if (typeof line === 'function') {
    return {validator: line, get level() {return fx();}};
  }

  if (line !== null && typeof line === 'object') {
    return {...line, get level() {return fx();}};
  }
}

function fnBuildRequired(required, field, props) {
  let {optional} = field;
  if (typeof required === 'string') {
    return {required: !optional, message: required};
  }
  if (typeof required === 'function') {
    return fnCallOrReturn(required, field, props);
  }
  return required;
}

function fnBuildValidator(validator, field, props) {
  if (validator && typeof validator === 'function') {
    let oo = validator(field, props);
    oo = Array.isArray(oo) ? oo : [oo];
    return oo.filter(line => !!line).map(line => fnWrapperRule(line, props.bus));
  }
  return false;
}

export const EnhanceField = (config) => (Component) => class extends PureComponent {
  static displayName = 'EnhanceField';
  static descriptor = config.descriptor;

  render() {
    let {initialValue, field, form, bus, wrapper, ...others} = this.props;
    let {name, visible} = field;

    initialValue = fnCallOrReturn(initialValue || config.initialValue || noop, this.props);

    let cfg = {initialValue, rules: []};

    let {validator, required} = config;

    let requiredRule = fnBuildRequired(required, field, this.props);
    let validatorRules = fnBuildValidator(validator, field, this.props);

    if (requiredRule) {
      cfg.rules.push(requiredRule);
    }

    if (validatorRules) {
      cfg.rules.push(...validatorRules);
    }

    wrapper = wrapper || config.wrapper || noop;

    let component;

    if (!name) {
      let style = {};
      // visible === undefined 当做 true  处理
      if (visible === false) {
        style.display = 'none';
      }
      component = (
        <Component {...others} field={field} bus={bus} style={style}/>);
    } else {
      let {getFieldDecorator} = form;
      let decorator = getFieldDecorator(name, cfg);
      // 调用 Form::getFieldDecorator API 使其支持校验等功能
      component = decorator(<Component {...others} form={form} field={field}
                                       bus={bus}/>);
    }

    return wrapper(this.props, component);
  }
};
