/**************************************************
 * Created by nanyuantingfeng on 10/05/2017 13:30.
 **************************************************/

export default class Cellar {

  constructor(elements = []) {
    this.elements = elements;
    this.elementsNameMap = {};
    this.elementsTestLst = [];
    this.elementsTypeMap = {};
    this.elementsUnknown = null;

    this.initialize();
  }

  register(...args) {
    this.elements.push(...args);
    return this;
  }

  initialize() {
    let elements = this.elements;
    let elementsNameMap = {};
    let elementsTestLst = [];
    let elementsTypeMap = {};

    elements.forEach(ec => {
      let {descriptor} = ec;

      let {name, type, test} = descriptor;

      if (typeof test === 'function') {
        elementsTestLst.push(ec);
      }

      if (name) {
        elementsNameMap[name] = ec;
      }

      if (type) {
        elementsTypeMap[type] = ec;
      }
    });

    this.elementsNameMap = elementsNameMap;
    this.elementsTestLst = elementsTestLst;
    this.elementsTypeMap = elementsTypeMap;
    this.elementsUnknown = elementsTypeMap['unknown'];

    return this;
  }

  getComponent(field) {

    let {elementsNameMap, elementsTestLst, elementsTypeMap} = this;

    let {name, type, dataType} = field;

    if (elementsNameMap[name]) {
      return elementsNameMap[name];
    }

    let i = -1;
    while (++i < elementsTestLst.length) {
      let element = elementsTestLst[i];
      let {descriptor} = element;
      if (descriptor.test(field)) {
        return element;
      }
    }

    type = type || dataType.type || undefined;

    if (elementsTypeMap[type]) {
      return elementsTypeMap[type];
    }

    console.warn(`%c没有找到 ${name}:${type} 注册的控件,将使用注册的 <unknown> 控件渲染`, 'color:red;');
    return this.getUnknown();
  }

  getUnknown() {
    return this.elementsUnknown;
  }
}
