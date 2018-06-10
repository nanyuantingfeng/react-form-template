/**************************************************
 * Created by nanyuantingfeng on 16/05/2017 11:16.
 **************************************************/
import React, { PureComponent } from 'react';
import Dynamic from './Dynamic';
import Bus from './Bus';

/**********************************************************************************
 * @param config
 * @constructor
 *
 * config : {
 *  create : Function //表单 wrapper 方法
 *  cellar : Array[Components] // 组建仓库
 *  loading : Component // 异步时候展示组件
 *  wrapper : Function(props,component) // 运行时侯的 wrapper 修正
 *  template ?: Object //模板描述(可选),
 *  groupWrapper ?: Function(props,components, index)
 * }
 *********************************************************************************/
export const EnhanceTemplate = (config = {}) => (Component) => class extends PureComponent {

  constructor(props, ...args) {
    super(props, ...args);
    this.bus = Bus(props.bus);
  }

  render() {
    let {props, bus} = this;
    return (
      <Component {...props} bus={bus}>
        <Dynamic  {...config} {...props} bus={bus}/>
      </Component>
    );
  }
};

EnhanceTemplate.displayName = 'EnhanceTemplate';

export const EnhanceDynamic = EnhanceTemplate;
