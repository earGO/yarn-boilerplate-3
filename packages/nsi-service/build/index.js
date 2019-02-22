'use strict';

var reduxSagaRequests = require('redux-saga-requests');
var reselect = require('reselect');

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$1);

var defineProperty$3 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty = unwrapExports(defineProperty$3);

var ru_ursip = {
	name: "nsi-service",
	context: "http://develop.ursip.local/api/bim-nsi-dev/v1"
};

var controller = 'catalogs';
var name$1 = ru_ursip.name,
    context = ru_ursip.context;


var namespace = name$1 + '/' + controller;

/* Types */
var GET_ALL = namespace + '/GET_ALL';
var CREATE = namespace + '/CREATE';
var MARK_DELETED = namespace + '/MARK_DELETED';
var UPDATE = namespace + '/UPDATE';

var types = {
  GET_ALL: GET_ALL,
  CREATE: CREATE,
  MARK_DELETED: MARK_DELETED,
  UPDATE: UPDATE

  /* Action creators */
};var actions = {
  getAll: function getAll() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
      type: GET_ALL,
      payload: {
        request: {
          url: context + '/' + controller + '/getAll'
        }
      },
      meta: args.meta
    };
  },
  create: function create() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
      type: CREATE,
      payload: {
        request: {
          method: 'POST',
          url: context + '/' + controller + '/create',
          body: args.payload
        }
      },
      meta: args.meta
    };
  },
  markDeleted: function markDeleted() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
      type: MARK_DELETED,
      payload: {
        request: {
          method: 'POST',
          url: context + '/' + controller + '/markDeleted',
          body: args.payload
        }
      },
      meta: args.meta
    };
  },
  update: function update() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
      type: UPDATE,
      payload: {
        request: {
          method: 'POST',
          url: context + '/' + controller + '/update',
          body: args.payload
        }
      },
      meta: args.meta
    };
  }
};

var stateSelector = function stateSelector(state) {
  return state[name$1] && state[name$1][controller];
};

var id = function id(_, _id) {
  return _id;
};

var getCatalogById = reselect.createSelector(stateSelector, id, function (catalogsList, id) {
  return (catalogsList || []).find(function (item) {
    return item.id === id;
  }) || {};
});

var reselectors = {
  getCatalogById: getCatalogById

  /* reducer */
};function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload,
      _ref$meta = _ref.meta,
      meta = _ref$meta === undefined ? {} : _ref$meta;

  switch (type) {
    case reduxSagaRequests.success(GET_ALL):
      return meta.normalize && typeof meta.normalize === 'function' ? meta.normalize(payload.data) : payload.data;
    default:
      return state;
  }
}

var catalogs = /*#__PURE__*/Object.freeze({
	controller: controller,
	types: types,
	actions: actions,
	stateSelector: stateSelector,
	reselectors: reselectors,
	default: reducer
});

var controller$1 = 'elements';
var name$2 = ru_ursip.name,
    context$1 = ru_ursip.context;

var namespace$1 = name$2 + '/' + controller$1;

/* Types */
var GET_ALL_BY_CATALOG_ID = namespace$1 + '/GET_ALL_BY_CATALOG_ID';

var types$1 = {
  GET_ALL_BY_CATALOG_ID: GET_ALL_BY_CATALOG_ID

  /* Action creators */
};var actions$1 = {
  getAllByCatalogId: function getAllByCatalogId() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = args.payload || {},
        id = _ref.id,
        attrId = _ref.attrId;

    return {
      type: GET_ALL_BY_CATALOG_ID,
      payload: {
        request: {
          url: context$1 + '/' + controller$1 + '/getAllByCatalogId?id=' + id + '&attrId=' + attrId
        }
      },
      meta: args.meta
    };
  }
};

var stateSelector$1 = function stateSelector(state) {
  return state[name$2] && state[name$2][controller$1];
};

/* reducer */
function reducer$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var type = _ref2.type,
      payload = _ref2.payload,
      _ref2$meta = _ref2.meta,
      meta = _ref2$meta === undefined ? {} : _ref2$meta;

  switch (type) {
    case reduxSagaRequests.success(GET_ALL_BY_CATALOG_ID):
      return meta.normalize ? meta.normalize(payload.data) : payload.data;

    default:
      return state;
  }
}

var elements = /*#__PURE__*/Object.freeze({
	controller: controller$1,
	types: types$1,
	actions: actions$1,
	stateSelector: stateSelector$1,
	default: reducer$1
});

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _library = true;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id$1 = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

unwrapExports(assign$1);

var _extends = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

var controller$2 = 'rows';
var name$3 = ru_ursip.name,
    context$2 = ru_ursip.context;

var namespace$2 = name$3 + '/' + controller$2;

/* Types */
var GET_ALL_BY_CATALOG_ID$1 = namespace$2 + '/GET_ALL_BY_CATALOG_ID';

var types$2 = {
  GET_ALL_BY_CATALOG_ID: GET_ALL_BY_CATALOG_ID$1

  /* Action creators */
};var actions$2 = {
  getAllByCatalogId: function getAllByCatalogId() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = args.payload || {},
        id = _ref.id,
        catalogId = _ref.catalogId;

    return {
      type: GET_ALL_BY_CATALOG_ID$1,
      payload: {
        request: {
          url: context$2 + '/' + controller$2 + '/getAllByCatalogId?catalogId=' + catalogId
        },
        catalogId: catalogId
      },
      meta: args.meta
    };
  }
};

var stateSelector$2 = function stateSelector(state) {
  return state[name$3] && state[name$3][controller$2];
};

/* reducer */
function reducer$2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var type = _ref2.type,
      payload = _ref2.payload,
      _ref2$meta = _ref2.meta,
      meta = _ref2$meta === undefined ? {} : _ref2$meta;

  switch (type) {
    case reduxSagaRequests.success(GET_ALL_BY_CATALOG_ID$1):
      {
        return _extends$1({}, state, _defineProperty({}, meta.requestAction.payload.catalogId, payload.data));
      }

    default:
      return state;
  }
}

var rows = /*#__PURE__*/Object.freeze({
	controller: controller$2,
	types: types$2,
	actions: actions$2,
	stateSelector: stateSelector$2,
	default: reducer$2
});

var _catalogs$controller$;

var controllers = (_catalogs$controller$ = {}, _defineProperty(_catalogs$controller$, controller, catalogs), _defineProperty(_catalogs$controller$, controller$1, elements), _defineProperty(_catalogs$controller$, controller$2, rows), _catalogs$controller$);

function extract(controllers$$1) {
  return Object.keys(controllers$$1).reduce(function (acc, key) {
    acc.types[key] = controllers$$1[key].types;
    acc.actions[key] = controllers$$1[key].actions;
    acc.selectors[key] = controllers$$1[key].stateSelector;
    acc.reducers[key] = controllers$$1[key].default;
    acc.reselectors[key] = controllers$$1[key].reselectors;

    return acc;
  }, {
    types: {},
    actions: {},
    selectors: {},
    reducers: {},
    reselectors: {}
  });
}

var _extract = extract(controllers),
    selectors = _extract.selectors,
    actions$3 = _extract.actions,
    reducers = _extract.reducers,
    types$3 = _extract.types,
    reselectors$1 = _extract.reselectors;

var name$4 = ru_ursip.name;

var index = {
  reselectors: reselectors$1,
  name: name$4,
  types: types$3,
  actions: actions$3,
  selectors: selectors,
  reducers: reducers
};

module.exports = index;
//# sourceMappingURL=index.js.map
