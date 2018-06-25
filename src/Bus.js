/**************************************************
 * Created by nanyuantingfeng on 11/05/2017 14:21.
 **************************************************/
import MessageCenter from 'message-center.js';
import deepEqual from 'deep-equal';
import clone from 'clone';

function fnDeepCompare(a, b) {
  return deepEqual(a, b, {strict: true});
}

function fnDeepClone(d) {
  return clone(d);
}

export default function (bus = new MessageCenter()) {

  bus.getValue = function () {
    return this.invoke('@form:getFieldsValue');
  };

  bus.getFieldsValue = function () {
    return this.invoke('@form:get:value');
  };

  bus.getValueWithValidate = function (levelOrFields) {
    return this.invoke('@form:getValueWithValidate', levelOrFields);
  };

  bus.setValue = function (values) {
    return this.invoke('@form:setFieldsValue', values);
  };

  bus.setFieldsValue = function (values) {
    return this.invoke('@form:set:value', values);
  };

  bus.setValueWithReference = function (values) {
    return this.setValue(values)
      .then(() => this.getValue()).then(d => this.setReference(d));
  };

  bus.setReference = function (data) {
    if (data) {
      this._$REFERENCE_VALUE = fnDeepClone(data);
      return Promise.resolve(data);
    }
    return this.getValue().then(data => {
      this._$REFERENCE_VALUE = fnDeepClone(data);
      return data;
    });
  };

  bus.isEqualWithReference = function () {
    return this.getValue().then(data => {
      return fnDeepCompare(this._$REFERENCE_VALUE, data);
    });
  };

  bus.clearValidate = function () {
    return this.invoke('@form:clear:validate');
  };

  bus.resetFields = function () {
    return this.invoke('@form:reset:fields');
  };

  //为校验级别增加的Hook
  bus.getValidateLevel = function () {
    return this.__$VALIDATE_LEVEL$__ || 0;
  };

  bus.setValidateLevel = function (level) {
    this.__$VALIDATE_LEVEL$__ = level || 0;
    return this;
  };

  return bus;
}
