(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/extends'), require('babel-runtime/helpers/objectWithoutProperties'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('deep-equal'), require('message-center.js'), require('clone'), require('babel-runtime/core-js/object/keys'), require('is-plain-obj'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/helpers/typeof')) :
  typeof define === 'function' && define.amd ? define(['babel-runtime/core-js/promise', 'babel-runtime/helpers/extends', 'babel-runtime/helpers/objectWithoutProperties', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'deep-equal', 'message-center.js', 'clone', 'babel-runtime/core-js/object/keys', 'is-plain-obj', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/helpers/typeof'], factory) :
  (global.ReactFormTemplate = factory(global._Promise,global._extends,global._objectWithoutProperties,global._Object$getPrototypeOf,global._classCallCheck,global._createClass,global._possibleConstructorReturn,global._inherits,global.React,global.deepEqual,global.MessageCenter,global.clone,global._Object$keys,global.isPlainObject,global._toConsumableArray,global._typeof));
}(this, (function (_Promise,_extends,_objectWithoutProperties,_Object$getPrototypeOf,_classCallCheck,_createClass,_possibleConstructorReturn,_inherits,React,deepEqual,MessageCenter,clone,_Object$keys,isPlainObject,_toConsumableArray,_typeof) { 'use strict';

  _Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
  _extends = _extends && _extends.hasOwnProperty('default') ? _extends['default'] : _extends;
  _objectWithoutProperties = _objectWithoutProperties && _objectWithoutProperties.hasOwnProperty('default') ? _objectWithoutProperties['default'] : _objectWithoutProperties;
  _Object$getPrototypeOf = _Object$getPrototypeOf && _Object$getPrototypeOf.hasOwnProperty('default') ? _Object$getPrototypeOf['default'] : _Object$getPrototypeOf;
  _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
  _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
  _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
  _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
  var React__default = 'default' in React ? React['default'] : React;
  deepEqual = deepEqual && deepEqual.hasOwnProperty('default') ? deepEqual['default'] : deepEqual;
  MessageCenter = MessageCenter && MessageCenter.hasOwnProperty('default') ? MessageCenter['default'] : MessageCenter;
  clone = clone && clone.hasOwnProperty('default') ? clone['default'] : clone;
  _Object$keys = _Object$keys && _Object$keys.hasOwnProperty('default') ? _Object$keys['default'] : _Object$keys;
  isPlainObject = isPlainObject && isPlainObject.hasOwnProperty('default') ? isPlainObject['default'] : isPlainObject;
  _toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
  _typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;

  var _class, _temp, _initialiseProps;

  function fnDeepCompare(a, b) {
    return deepEqual(a, b, { strict: true });
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

  function fnIsMultiArray() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var i = -1;
    while (++i < array.length) {
      if (!(array[i] instanceof Array)) {
        return false;
      }
    }
    return true;
  }

  var Template = (_temp = _class = function (_PureComponent) {
    _inherits(Template, _PureComponent);

    function Template(props) {
      var _ref;

      _classCallCheck(this, Template);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = Template.__proto__ || _Object$getPrototypeOf(Template)).call.apply(_ref, [this, props].concat(args)));

      _initialiseProps.call(_this);

      var bus = props.bus;

      _this.bus = bus;
      return _this;
    }

    _createClass(Template, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.bus.watch('@form:set:value', this.setValueMap);
        this.bus.watch('@form:get:value', this.getValueMap);
        this.bus.watch('@form:validate', this.validateFAS);
        this.bus.watch('@form:clear:validate', this.resetValidate);
        this.bus.watch('@form:reset:fields', this.resetFields);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.bus.un('@form:set:value');
        this.bus.un('@form:get:value');
        this.bus.un('@form:validate');
        this.bus.un('@form:clear:validate');
        this.bus.un('@form:reset:fields');
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.bus.emit('@form:did:mount');
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var v0 = this.props.value;
        var v1 = nextProps.value;
        var t0 = this.props.template;
        var t1 = nextProps.template;
        if (!fnDeepCompare(t0, t1) || !fnDeepCompare(v0, v1)) {
          this.preSetValueMap(t1, v1);
        }
      }
    }, {
      key: 'preSetValueMap',
      value: function preSetValueMap(template, value) {
        var fields = fnGetFields(template);
        var keys = fields.filter(function (nn) {
          return !!nn.name;
        }).map(function (nn) {
          return nn.name;
        });
        var oo = {};
        keys.forEach(function (key) {
          oo[key] = value[key];
        });
        this.setValueMap(oo);
      }
    }, {
      key: 'renderSimpleFields',
      value: function renderSimpleFields(fields) {
        var prefixKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var _props = this.props,
            value = _props.value,
            cellar = _props.cellar,
            tags = _props.tags,
            others = _objectWithoutProperties(_props, ['value', 'cellar', 'tags']);

        return fields.map(function (field, index) {
          var name = field.name;

          var e = cellar.getComponent(field);
          if (!e) return null;
          var tag = tags[name];
          var initialValue = value[name];
          var key = prefixKey + '_' + name + '_' + index;
          return React.createElement(e, _extends({}, others, { initialValue: initialValue, field: field, tag: tag, key: key }));
        });
      }
    }, {
      key: 'renderMultiFields',
      value: function renderMultiFields() {
        var multiFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var oo = [];
        var i = -1;
        while (++i < multiFields.length) {
          var fields = multiFields[i];
          var array = this.renderSimpleFields(fields, i);
        }
        return oo;
      }
    }, {
      key: 'renderFields',
      value: function renderFields(fields) {
        if (fnIsMultiArray(fields)) {
          return this.renderMultiFields(fields);
        }
        return this.renderSimpleFields(fields);
      }
    }, {
      key: 'renderGroup',
      value: function renderGroup() {
        var _this2 = this;

        var _props2 = this.props,
            groupWrapper = _props2.groupWrapper,
            template = _props2.template;

        var fields = fnGetFields(template);

        var multiFields = void 0;

        if (fnIsMultiArray(fields)) {
          multiFields = fields;
        }

        if (groupWrapper && multiFields) {
          return multiFields.map(function (line, index) {
            return groupWrapper(_this2.props, _this2.renderSimpleFields(line, index), index);
          });
        }

        return this.renderFields(multiFields || fields);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            className = _props3.className,
            _props3$rootWrapper = _props3.rootWrapper,
            rootWrapper = _props3$rootWrapper === undefined ? 'div' : _props3$rootWrapper;

        return React.createElement(rootWrapper, { className: className }, this.renderGroup());
      }
    }]);

    return Template;
  }(React.PureComponent), _class.defaultProps = {
    template: { fields: [] },
    value: {},
    tags: {},
    className: ''
  }, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getValueMap = function () {
      var form = _this3.props.form;

      return form.getFieldsValue();
    };

    this.setValueMap = function (values) {
      var form = _this3.props.form;

      form.setFieldsValue(values);
    };

    this.resetValidate = function () {
      var value = _this3.getValueMap();
      _this3.resetFields();
      _this3.setValueMap(value);
    };

    this.resetFields = function () {
      var form = _this3.props.form;

      form.resetFields();
    };

    this.validateFAS = function (level) {
      return new _Promise(function (resolve, reject) {
        var _props4 = _this3.props,
            form = _props4.form,
            bus = _props4.bus;
        var validateFields = form.validateFields,
            validateFieldsAndScroll = form.validateFieldsAndScroll;

        var fn = validateFieldsAndScroll || validateFields;
        bus.setValidateLevel(level);
        fn({ force: true }, function (e, values) {
          bus.setValidateLevel(); //设置默认值为0
          e ? reject(e) : resolve(values);
        });
      });
    };
  }, _temp);
  module.exports = exports['default'];

  function fnDeepCompare$1(a, b) {
    return deepEqual(a, b, { strict: true });
  }

  function fnDeepClone(d) {
    return clone(d);
  }

  function Bus () {
    var bus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new MessageCenter();


    bus.getValue = function () {
      return this.invoke('@form:getFieldsValue');
    };

    bus.getFieldsValue = function () {
      return this.invoke('@form:get:value');
    };

    bus.getValueWithValidate = function (level) {
      return this.invoke('@form:getValueWithValidate', level);
    };

    bus.setValue = function (values) {
      return this.invoke('@form:setFieldsValue', values);
    };

    bus.setFieldsValue = function (values) {
      return this.invoke('@form:set:value', values);
    };

    bus.setValueWithReference = function (values) {
      var _this = this;

      return this.setValue(values).then(function () {
        return _this.getValue();
      }).then(function (d) {
        return _this.setReference(d);
      });
    };

    bus.setReference = function (data) {
      var _this2 = this;

      if (data) {
        this._$REFERENCE_VALUE = fnDeepClone(data);
        return _Promise.resolve(data);
      }
      return this.getValue().then(function (data) {
        _this2._$REFERENCE_VALUE = fnDeepClone(data);
        return data;
      });
    };

    bus.isEqualWithReference = function () {
      var _this3 = this;

      return this.getValue().then(function (data) {
        return fnDeepCompare$1(_this3._$REFERENCE_VALUE, data);
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
  module.exports = exports['default'];

  /**************************************************
   * Created by nanyuantingfeng on 10/05/2017 13:30.
   **************************************************/

  var Cellar = function () {
    function Cellar() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, Cellar);

      this.elements = elements;
      this.elementsNameMap = {};
      this.elementsTestLst = [];
      this.elementsTypeMap = {};
      this.elementsUnknown = null;

      this.initialize();
    }

    _createClass(Cellar, [{
      key: 'register',
      value: function register() {
        var _elements;

        (_elements = this.elements).push.apply(_elements, arguments);
        return this;
      }
    }, {
      key: 'initialize',
      value: function initialize() {
        var elements = this.elements;
        var elementsNameMap = {};
        var elementsTestLst = [];
        var elementsTypeMap = {};

        elements.forEach(function (ec) {
          var descriptor = ec.descriptor;
          var name = descriptor.name,
              type = descriptor.type,
              test = descriptor.test;


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
    }, {
      key: 'getComponent',
      value: function getComponent(field) {
        var elementsNameMap = this.elementsNameMap,
            elementsTestLst = this.elementsTestLst,
            elementsTypeMap = this.elementsTypeMap;
        var name = field.name,
            type = field.type,
            dataType = field.dataType;


        if (elementsNameMap[name]) {
          return elementsNameMap[name];
        }

        var i = -1;
        while (++i < elementsTestLst.length) {
          var element = elementsTestLst[i];
          var descriptor = element.descriptor;

          if (descriptor.test(field)) {
            return element;
          }
        }

        type = type || dataType.type || undefined;

        if (elementsTypeMap[type]) {
          return elementsTypeMap[type];
        }

        console.warn('%c\u6CA1\u6709\u627E\u5230 ' + name + ':' + type + ' \u6CE8\u518C\u7684\u63A7\u4EF6,\u5C06\u4F7F\u7528\u6CE8\u518C\u7684 <unknown> \u63A7\u4EF6\u6E32\u67D3', 'color:red;');
        return this.getUnknown();
      }
    }, {
      key: 'getUnknown',
      value: function getUnknown() {
        return this.elementsUnknown;
      }
    }]);

    return Cellar;
  }();
  module.exports = exports['default'];

  function PromiseMap (map) {

    if (Array.isArray(map)) {
      return _Promise.all(map);
    }

    if (!isPlainObject(map)) {
      return _Promise.resolve(map);
    }

    var keys = _Object$keys(map);
    var promises = keys.map(function (key) {
      return map[key];
    });

    return _Promise.all(promises).then(function (results) {
      return keys.reduce(function (obj, key, i) {
        obj[key] = results[i];
        return obj;
      }, {});
    });
  }
  module.exports = exports['default'];

  var _class$1, _temp$1;

  function fnDeepCompare$2(a, b) {
    return deepEqual(a, b, { strict: true });
  }

  function preGetValue(value) {
    return value !== undefined ? value : this.props.value;
  }

  function preSetValue(value) {
    return value;
  }

  function isValue(v) {
    return v !== undefined;
  }

  var Dynamic = (_temp$1 = _class$1 = function (_PureComponent) {
    _inherits(Dynamic, _PureComponent);

    function Dynamic(props) {
      var _ref;

      _classCallCheck(this, Dynamic);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = Dynamic.__proto__ || _Object$getPrototypeOf(Dynamic)).call.apply(_ref, [this, props].concat(args)));

      _this.eachInstances = function (fn) {
        var template = _this.refs.template;


        if (!template) {
          console.warn('call eachInstances at a wrong opportunity');
          return false;
        }

        var instances = template.instances;

        var i = -1;
        var keys = _Object$keys(instances);

        while (++i < keys.length) {
          var key = keys[i];
          var one = instances[key];
          fn(one, key, i);
        }
      };

      _this.setValue = function (values) {
        if (!values) {
          throw new TypeError('setFieldsValue must be a Object');
        }

        var oo = {};

        _this.eachInstances(function (one, key) {
          var f = one.preSetValue || preSetValue;
          if (isValue(values[key])) {
            oo[key] = f.call(one, values[key]);
          }
        });

        return _this.bus.invoke('@form:set:value', oo);
      };

      _this.validateFields = function (level) {
        return _this.bus.invoke('@form:validate', level);
      };

      _this.getValue = function () {
        var oo = {};
        _this.eachInstances(function (one, key) {
          var f = one.preGetValue || preGetValue;
          oo[key] = f.call(one);
        });
        return PromiseMap(oo);
      };

      _this.getValueWithValidate = function (level) {
        return _this.validateFields(level).then(_this.getValue);
      };

      _this.bus = Bus(props.bus);
      var create = props.create,
          elements = props.elements;


      if (!create) {
        throw new TypeError('create is not a function');
      }

      if (!Array.isArray(elements)) {
        throw new TypeError('elements is not an array');
      }

      _this.TEMPLATE = create(Template);

      _this.cellar = new Cellar(elements);
      return _this;
    }

    _createClass(Dynamic, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.bus.watch('@form:getFieldsValue', this.getValue);
        this.bus.watch('@form:setFieldsValue', this.setValue);
        this.bus.watch('@form:getValueWithValidate', this.getValueWithValidate);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.bus.un('@form:getFieldsValue');
        this.bus.un('@form:setFieldsValue');
        this.bus.un('@form:getValueWithValidate');
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!fnDeepCompare$2(this.props.template, nextProps.template)) {
          this.TEMPLATE = nextProps.create(Template);
        }

        //editable <==> readonly 之间转换....
        if (this.props.elements !== nextProps.elements) {
          this.cellar = new Cellar(nextProps.elements);
        }
      }
    }, {
      key: 'renderLoading',
      value: function renderLoading() {
        var _props = this.props,
            loading = _props.loading,
            others = _objectWithoutProperties(_props, ['loading']);

        return React.createElement(loading, _extends({}, others, { bus: this.bus }));
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            template = _props2.template,
            value = _props2.value,
            others = _objectWithoutProperties(_props2, ['template', 'value']);

        if (!template) {
          return this.renderLoading();
        }

        var TEMPLATE = this.TEMPLATE,
            bus = this.bus,
            cellar = this.cellar;


        return React__default.createElement(TEMPLATE, _extends({ ref: 'template' }, others, {
          bus: bus, cellar: cellar,
          template: template, value: value
        }));
      }
    }]);

    return Dynamic;
  }(React.PureComponent), _class$1.displayName = 'Dynamic', _class$1.defaultProps = {
    elements: [],
    create: function create(T) {
      return T;
    },
    loading: null
  }, _temp$1);
  module.exports = exports['default'];

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
  var EnhanceTemplate = function EnhanceTemplate() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (Component) {
      return function (_PureComponent) {
        _inherits(_class, _PureComponent);

        function _class(props) {
          var _ref;

          _classCallCheck(this, _class);

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || _Object$getPrototypeOf(_class)).call.apply(_ref, [this, props].concat(args)));

          _this.bus = Bus(props.bus);
          return _this;
        }

        _createClass(_class, [{
          key: 'render',
          value: function render() {
            var props = this.props,
                bus = this.bus;

            return React__default.createElement(
              Component,
              _extends({}, props, { bus: bus }),
              React__default.createElement(Dynamic, _extends({}, config, props, { bus: bus }))
            );
          }
        }]);

        return _class;
      }(React.PureComponent);
    };
  };

  EnhanceTemplate.displayName = 'EnhanceTemplate';

  var EnhanceDynamic = EnhanceTemplate;

  var noop = function noop(props, component) {
    return component;
  };

  function fnCallOrReturn(f) {
    if (typeof f === 'function') {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return f.apply(undefined, args);
    }
    return f;
  }

  function fnWrapperRule(line, bus) {
    var fx = function fx() {
      return bus.getValidateLevel();
    };

    if (typeof line === 'function') {
      return { validator: line, get level() {
          return fx();
        } };
    }

    if (line !== null && (typeof line === 'undefined' ? 'undefined' : _typeof(line)) === 'object') {
      return _extends({}, line, { get level() {
          return fx();
        } });
    }
  }

  function fnBuildRequired(required, field, props) {
    var optional = field.optional;

    if (typeof required === 'string') {
      return { required: !optional, message: required };
    }
    if (typeof required === 'function') {
      return fnCallOrReturn(required, field, props);
    }
    return required;
  }

  function fnBuildValidator(validator, field, props) {
    if (validator && typeof validator === 'function') {
      var oo = validator(field, props);
      oo = Array.isArray(oo) ? oo : [oo];
      return oo.filter(function (line) {
        return !!line;
      }).map(function (line) {
        return fnWrapperRule(line, props.bus);
      });
    }
    return false;
  }

  var EnhanceField = function EnhanceField(config) {
    return function (Component) {
      var _class, _temp;

      return _temp = _class = function (_PureComponent) {
        _inherits(_class, _PureComponent);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || _Object$getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: 'render',
          value: function render() {
            var _props = this.props,
                initialValue = _props.initialValue,
                field = _props.field,
                form = _props.form,
                bus = _props.bus,
                wrapper = _props.wrapper,
                others = _objectWithoutProperties(_props, ['initialValue', 'field', 'form', 'bus', 'wrapper']);

            var name = field.name,
                visible = field.visible;


            initialValue = fnCallOrReturn(initialValue || config.initialValue || noop, this.props);

            var cfg = { initialValue: initialValue, rules: [] };

            var validator = config.validator,
                required = config.required;


            var requiredRule = fnBuildRequired(required, field, this.props);
            var validatorRules = fnBuildValidator(validator, field, this.props);

            if (requiredRule) {
              cfg.rules.push(requiredRule);
            }

            if (validatorRules) {
              var _cfg$rules;

              (_cfg$rules = cfg.rules).push.apply(_cfg$rules, _toConsumableArray(validatorRules));
            }

            wrapper = wrapper || config.wrapper || noop;

            var component = void 0;

            if (!name) {
              var style = {};
              // visible === undefined 当做 true  处理
              if (visible === false) {
                style.display = 'none';
              }

              component = React__default.createElement(Component, _extends({}, others, {
                field: field,
                bus: bus,
                style: style }));
            } else {
              var getFieldDecorator = form.getFieldDecorator;

              var decorator = getFieldDecorator(name, cfg);
              // 调用 Form::getFieldDecorator API 使其支持校验等功能
              component = decorator(React__default.createElement(Component, _extends({}, others, {
                form: form,
                field: field,
                bus: bus })));
            }

            return wrapper(this.props, component);
          }
        }]);

        return _class;
      }(React.PureComponent), _class.displayName = 'EnhanceField', _class.descriptor = config.descriptor, _temp;
    };
  };

  /**************************************************
   * Created by nanyuantingfeng on 17/05/2017 11:23.
   **************************************************/

  var index = {
    EnhanceTemplate: EnhanceTemplate,
    EnhanceDynamic: EnhanceDynamic,
    EnhanceField: EnhanceField,
    Template: Template,
    Dynamic: Dynamic,
    Cellar: Cellar,
    Bus: Bus,
    PromiseMap: PromiseMap
  };
  module.exports = exports['default'];

  return index;

})));
