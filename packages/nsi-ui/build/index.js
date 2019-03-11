'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var designSystem = require('@ursip/design-system');
var redux = require('redux');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var utils = require('@ursip/utils');
var nsi = _interopDefault(require('@ursip/nsi-service'));
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
require('reselect');
var propTypes = _interopDefault(require('prop-types'));
var ReactDOM = _interopDefault(require('react-dom'));

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

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
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
  mode: 'pure',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
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

var classCallCheck = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _redefine = _hide;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
}

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$1);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$4 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$4($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

unwrapExports(symbol$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$1);



var _symbol2 = _interopRequireDefault(symbol$1);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var setPrototypeOf$1 = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf, __esModule: true };
});

unwrapExports(setPrototypeOf$1);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$1 = _core.Object;
var create = function create(P, D) {
  return $Object$1.create(P, D);
};

var create$1 = createCommonjsModule(function (module) {
module.exports = { "default": create, __esModule: true };
});

unwrapExports(create$1);

var inherits = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



var _create2 = _interopRequireDefault(create$1);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

// Пока нет datepicker, input.number, ref_link.
var ElementsMap = {
  string: designSystem.Input,
  date: designSystem.Input,
  number: designSystem.Input,
  boolean: designSystem.Toggle,
  ref_link: designSystem.Input

  // Запихнем id ряда, id колонки в хендлер, поменяем данные в контейнере.
};var EditableCell = function EditableCell(_ref) {
  var attribute = _ref.attribute,
      rowData = _ref.rowData,
      rowFromState = _ref.rowFromState,
      handleEditableRowChange = _ref.handleEditableRowChange;

  var curriedHandler = handleEditableRowChange(rowData.key, attribute.key);
  var Element = ElementsMap[attribute.type];
  return React.createElement(Element, { value: rowFromState[attribute.key], onChange: curriedHandler });
};

var objectWithoutProperties = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};
});

var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

function arrayToTree(items) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: 'key', parentId: 'parentId' };

  var rootItems = [];
  var lookup = {};
  for (var i = 0, _items = items; i < _items.length; i++) {
    var item = _items[i];
    var itemId = item[config.id];
    var parentId = item[config.parentId];
    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      lookup[itemId] = { data: null, children: [] };
    }
    lookup[itemId].data = item;
    var treeItem = lookup[itemId];
    if (parentId === null || parentId === '' || !parentId) {
      rootItems.push(treeItem);
    } else {
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        lookup[parentId] = { data: null, children: [] };
      }
      lookup[parentId].children.push(treeItem);
    }
  }
  var unnestData = function unnestData(item) {
    return _extends$1({}, item.data, {
      children: item.children && item.children.length ? item.children.map(unnestData) : []
    });
  };
  var removeChildrenProp = function removeChildrenProp(_ref) {
    var children = _ref.children,
        rest = _objectWithoutProperties(_ref, ['children']);

    return children.length === 0 ? _extends$1({}, rest) : _extends$1({ children: children.map(removeChildrenProp) }, rest);
  };
  var niceFormat = rootItems.map(unnestData).map(removeChildrenProp);
  return {
    rootItems: niceFormat,
    lookup: lookup
  };
}

var Catalog = function (_React$Component) {
  _inherits(Catalog, _React$Component);

  function Catalog(props) {
    _classCallCheck(this, Catalog);

    var _this = _possibleConstructorReturn(this, (Catalog.__proto__ || Object.getPrototypeOf(Catalog)).call(this, props));

    _this.getTableColumns = function () {
      var attributes = _this.props.selectedCatalog.attributes;

      return (attributes || []).map(function (attribute) {
        // Magic numbers
        var minWidth = attribute.title.length < 21 ? 160 : attribute.title.length * 10;
        return React.createElement(
          designSystem.Table.Column,
          { key: attribute.key, flexGrow: 1, minWidth: minWidth },
          React.createElement(
            designSystem.Table.HeaderCell,
            null,
            attribute.title
          ),
          React.createElement(
            designSystem.Table.Cell,
            null,
            function (rowData) {
              return rowData.key === _this.state.editableRowId ? React.createElement(EditableCell, {
                attribute: attribute,
                rowData: rowData,
                handleEditableRowChange: _this.handleEditableRowChange,
                rowFromState: _this.state.editableRowData[rowData.key]
              }) : React.createElement(
                'div',
                { style: { wordBreak: 'break-word ' } },
                rowData[attribute.key]
              );
            }
          )
        );
      });
    };

    _this.onRowAdd = function (addedRow) {
      _this.setState({
        editableRowId: addedRow.id
      });
    };

    _this.handleAddRow = function () {
      console.log('Trying to add the row', _this.props);
      /* this.props.createRow({
        catalogId: this.props.catalogId
      }) 
      */
      // Ответ добавит новый row в пропсы автоматом.
    };

    _this.handleEditRow = function (rowData) {
      console.log('Trying to edit the row');
      _this.setState(_extends$1({}, _this.state, {
        editableRowId: rowData.key,
        editableRowData: _extends$1({}, _this.state.editableRowData, _defineProperty({}, rowData.key, rowData))
      }));
    };

    _this.handleEditableRowChange = function (rowKey, attributeKey) {
      return function (value) {
        _this.setState(_extends$1({}, _this.state, {
          editableRowData: _extends$1({}, _this.state.editableRowData, _defineProperty({}, rowKey, _extends$1({}, _this.state.editableRowData[rowKey], _defineProperty({}, attributeKey, value))))
        }));
      };
    };

    _this.state = {
      loading: false,
      selected: null,
      editableRowId: null,
      editableRowData: {}
    };
    return _this;
  }

  _createClass(Catalog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getAllByCatalogId({
        payload: {
          catalogId: this.props.catalogId
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.catalogId !== this.props.catalogId) {
        this.props.getAllByCatalogId({
          payload: {
            catalogId: this.props.catalogId
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        designSystem.Box,
        null,
        React.createElement(
          designSystem.Flex,
          { height: 24, alignItems: 'center' },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 48px' },
            React.createElement(
              designSystem.Text,
              { fontSize: 1 },
              '\u0413\u0440\u0443\u043F\u043F\u0430:'
            )
          ),
          React.createElement(
            designSystem.Text,
            { fontSize: 1, ml: 4 },
            'idk \u0442\u0443\u0442 \u043D\u0435\u0442 \u043F\u043E\u043B\u0435 \u0433\u0440\u0443\u043F\u043F\u0430'
          )
        ),
        React.createElement(
          designSystem.Flex,
          { height: 24, alignItems: 'center' },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 48px' },
            React.createElement(
              designSystem.Text,
              { fontSize: 1 },
              '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:'
            )
          ),
          React.createElement(
            designSystem.Text,
            { fontSize: 1, ml: 4 },
            this.props.selectedCatalog.description
          )
        ),
        React.createElement(
          designSystem.Box,
          { className: 'tableWrap', border: '1px solid #ecebeb', mt: 32 },
          React.createElement(
            designSystem.Flex,
            { className: 'controls', justifyContent: 'space-between', alignItems: 'center', mt: 16 },
            React.createElement(
              designSystem.Box,
              { ml: 3, width: '336px' },
              React.createElement(designSystem.Input, { size: 'small', placeholder: '\u041F\u043E\u0438\u0441\u043A', prefix: React.createElement(designSystem.Icon, { name: 'question-circle' }) })
            ),
            React.createElement(
              designSystem.Flex,
              null,
              React.createElement(
                designSystem.Box,
                { width: '144px' },
                React.createElement(
                  designSystem.Button,
                  { type: 'secondary', size: 'small', block: true, onClick: this.handleAddRow },
                  React.createElement(designSystem.Icon, { mr: 2, name: 'plus-circle' }),
                  '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443'
                )
              ),
              React.createElement(
                designSystem.Box,
                { width: '160px' },
                React.createElement(
                  designSystem.Button,
                  { type: 'flat', size: 'small' },
                  React.createElement(designSystem.Icon, { mr: 2, name: 'chevron-down' }),
                  '\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A'
                )
              ),
              React.createElement(
                designSystem.Flex,
                { width: '16px', alignItems: 'center' },
                React.createElement(designSystem.Icon, { mr: 2, name: 'ellipsis-v' })
              )
            )
          ),
          React.createElement(
            designSystem.Box,
            { mt: 16 },
            React.createElement(
              designSystem.Table,
              { data: this.props.catalogRows, width: 832, isTree: true, wordWrap: true, height: 376 },
              this.getTableColumns(),
              React.createElement(
                designSystem.Table.Column,
                { fixed: 'right' },
                React.createElement(
                  designSystem.Table.HeaderCell,
                  { style: { paddingLeft: '16px' } },
                  '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F'
                ),
                React.createElement(
                  designSystem.Table.Cell,
                  null,
                  function (rowData) {
                    // Popover пока нет в библиотеке. Тут еще должно быть удаление row.
                    return React.createElement(designSystem.Icon, { name: 'ellipsis-h', title: '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C', onClick: function onClick() {
                        return _this2.handleEditRow(rowData);
                      } });
                  }
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Catalog;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var id = ownProps.match.params.id;

  var catalogRows = state[nsi.name].rows[id] || [];
  var treeRows = arrayToTree(catalogRows);
  return _extends$1({
    catalogId: id
  }, ownProps, {
    catalogs: nsi.selectors.catalogs(state),
    selectedCatalog: nsi.reselectors.catalogs.getCatalogById(state, id),
    catalogRows: treeRows.rootItems
  });
};

var enhance = redux.compose(utils.injectReducer({
  key: nsi.name,
  reducer: redux.combineReducers(nsi.reducers)
}), reactRedux.connect(mapStateToProps, _extends$1({}, nsi.actions.catalogs, nsi.actions.rows)), reactRouterDom.withRouter);

var Catalog$1 = enhance(Catalog);

// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

var $Object$2 = _core.Object;
var defineProperties = function defineProperties(T, D) {
  return $Object$2.defineProperties(T, D);
};

var defineProperties$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperties, __esModule: true };
});

unwrapExports(defineProperties$1);

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.5 Object.freeze(O)

var meta = _meta.onFreeze;

_objectSap('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  };
});

var freeze = _core.Object.freeze;

var freeze$1 = createCommonjsModule(function (module) {
module.exports = { "default": freeze, __esModule: true };
});

unwrapExports(freeze$1);

var taggedTemplateLiteral = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperties2 = _interopRequireDefault(defineProperties$1);



var _freeze2 = _interopRequireDefault(freeze$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (strings, raw) {
  return (0, _freeze2.default)((0, _defineProperties2.default)(strings, {
    raw: {
      value: (0, _freeze2.default)(raw)
    }
  }));
};
});

var _taggedTemplateLiteral = unwrapExports(taggedTemplateLiteral);

var _templateObject = _taggedTemplateLiteral(['\n    background: ', ';\n  '], ['\n    background: ', ';\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  min-height: 32px;\n  align-items: center;\n  ', '\n  ', '\n'], ['\n  min-height: 32px;\n  align-items: center;\n  ', '\n  ', '\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  text-decoration: none;\n  color: inherit;\n  :visited {\n    color: inherit;\n  }\n'], ['\n  text-decoration: none;\n  color: inherit;\n  :visited {\n    color: inherit;\n  }\n']);

var Panel = designSystem.Collapse.Panel;

var isActive = function isActive(_ref) {
  var id = _ref.id,
      activeCatalogId = _ref.activeCatalogId,
      rest = _objectWithoutProperties(_ref, ['id', 'activeCatalogId']);

  return id && activeCatalogId && id === activeCatalogId && styled.css(_templateObject, rest.theme.colors.lightGrey);
};

var CollapseItem = styled__default(designSystem.Flex)(_templateObject2, function (props) {
  return 'border-bottom: 1px solid ' + props.theme.colors.border;
}, isActive);

var StyledLink = styled__default(reactRouterDom.Link)(_templateObject3);

var CatalogsList = function (_React$Component) {
  _inherits(CatalogsList, _React$Component);

  function CatalogsList() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, CatalogsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CatalogsList.__proto__ || Object.getPrototypeOf(CatalogsList)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      isLoading: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CatalogsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.getAll({ meta: { asPromise: true } }).finally(function () {
        return _this2.setState({ isLoading: false });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var activeCatalogId = this.props.match.params.id;

      if (this.state.isLoading) {
        return React.createElement(
          designSystem.Text,
          null,
          'Loading...'
        );
      }
      /** На самом деле там никаких разделений нет, поле type хз что значит, но можно по нему разбить в 2 группы */
      var customCatalogs = this.props.data.filter(function (catalog) {
        return catalog.type;
      });
      var systemCatalogs = this.props.data.filter(function (catalog) {
        return !catalog.type;
      });
      return React.createElement(
        designSystem.Box,
        { width: '100%' },
        React.createElement(
          designSystem.Collapse,
          { defaultActiveKeys: ['system', 'custom'] },
          React.createElement(
            Panel,
            {
              key: 'system',
              ml: 24,
              title: React.createElement(
                CollapseItem,
                null,
                React.createElement(
                  designSystem.Text,
                  { bold: true, fontSize: 1 },
                  '\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435'
                )
              )
            },
            systemCatalogs.map(function (item) {
              return React.createElement(
                CollapseItem,
                { key: item.id, id: item.id, activeCatalogId: activeCatalogId },
                React.createElement(
                  designSystem.Text,
                  { fontSize: 1 },
                  React.createElement(
                    StyledLink,
                    { to: '/nsi/' + item.id },
                    item.name
                  )
                )
              );
            })
          ),
          React.createElement(
            Panel,
            {
              key: 'custom',
              ml: 24,
              title: React.createElement(
                CollapseItem,
                null,
                React.createElement(
                  designSystem.Text,
                  { bold: true, fontSize: 1 },
                  '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435'
                )
              )
            },
            customCatalogs.map(function (item) {
              return React.createElement(
                CollapseItem,
                { key: item.id, id: item.id, activeCatalogId: activeCatalogId },
                React.createElement(
                  designSystem.Text,
                  { fontSize: 1 },
                  React.createElement(
                    StyledLink,
                    { to: '/nsi/' + item.id },
                    item.name
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return CatalogsList;
}(React.Component);

var enhance$1 = redux.compose(utils.injectReducer({
  key: nsi.name,
  reducer: redux.combineReducers(nsi.reducers)
}), reactRedux.connect(function (state) {
  return {
    data: nsi.selectors.catalogs(state)
  };
}, nsi.actions.catalogs), reactRouterDom.withRouter);

var CatalogsList$1 = enhance$1(CatalogsList);

var typeOptions = [{ label: 'Строка', value: 'string' }, { label: 'Дата', value: 'date' }, { label: 'Целое число', value: 'number' }, { label: 'Логическое', value: 'boolean' }, { label: 'Другой справочник', value: 'ref_link' }];

var CatalogTable = function CatalogTable(_ref) {
  var handleItemChange = _ref.handleItemChange,
      handleItemDelete = _ref.handleItemDelete,
      attributes = _ref.attributes;

  return React.createElement(
    designSystem.Table,
    { data: attributes, minHeight: 72 + 48, rowHeight: 72, autoHeight: true, rowKey: 'id' },
    React.createElement(
      designSystem.Table.Column,
      { width: 160, sort: true },
      React.createElement(
        designSystem.Table.HeaderCell,
        { style: { paddingLeft: '16px' } },
        '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
      ),
      React.createElement(
        designSystem.Table.Cell,
        { style: { paddingLeft: '16px' }, dataKey: 'title' },
        function (rowData) {
          return React.createElement(designSystem.Input, { value: rowData.title, onChange: handleItemChange('title', rowData.id) });
        }
      )
    ),
    React.createElement(
      designSystem.Table.Column,
      { width: 160, sort: true },
      React.createElement(
        designSystem.Table.HeaderCell,
        { style: { paddingLeft: '16px' } },
        '\u0422\u0438\u043F'
      ),
      React.createElement(
        designSystem.Table.Cell,
        { style: { paddingLeft: '16px', flex: 1 }, dataKey: 'type', flexGrow: 1 },
        function (rowData) {
          return React.createElement(
            designSystem.Box,
            { flex: '1' },
            React.createElement(designSystem.Select, {
              options: typeOptions
              // temp
              , value: typeOptions.find(function (item) {
                return item.value === rowData.type;
              })
              // value={rowData.type}
              , menuPortalTarget: document.getElementById('tableWrapper'),
              onChange: handleItemChange('type', rowData.id)
            })
          );
        }
      )
    ),
    React.createElement(
      designSystem.Table.Column,
      { width: 128, sort: true },
      React.createElement(
        designSystem.Table.HeaderCell,
        { style: { justifyContent: 'center' } },
        '\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
      ),
      React.createElement(
        designSystem.Table.Cell,
        { style: { paddingLeft: 16, justifyContent: 'center' }, dataKey: 'required' },
        function (rowData) {
          return React.createElement(designSystem.Toggle, { checked: rowData.required, onChange: handleItemChange('required', rowData.id) });
        }
      )
    ),
    React.createElement(
      designSystem.Table.Column,
      { width: 128, sort: true },
      React.createElement(
        designSystem.Table.HeaderCell,
        { style: { justifyContent: 'center' } },
        '\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
      ),
      React.createElement(
        designSystem.Table.Cell,
        { style: { paddingLeft: 16, justifyContent: 'center' }, dataKey: 'unique' },
        function (rowData) {
          return React.createElement(designSystem.Toggle, { checked: rowData.unique, onChange: handleItemChange('unique', rowData.id) });
        }
      )
    ),
    React.createElement(
      designSystem.Table.Column,
      { width: 160, sort: true },
      React.createElement(
        designSystem.Table.HeaderCell,
        { style: { paddingLeft: '16px' } },
        '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435'
      ),
      React.createElement(
        designSystem.Table.Cell,
        { dataKey: 'description' },
        function (rowData) {
          return React.createElement(designSystem.Input, { value: rowData.description, onChange: handleItemChange('description', rowData.id) });
        }
      )
    ),
    React.createElement(
      designSystem.Table.Column,
      { width: 96 },
      React.createElement(
        designSystem.Table.HeaderCell,
        null,
        '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F'
      ),
      React.createElement(
        designSystem.Table.Cell,
        null,
        function (rowData) {
          return React.createElement(designSystem.Icon, {
            name: 'ellipsis-h',
            onClick: function onClick() {
              alert(rowData.id);
            }
          });
        }
      )
    )
  );
};

CatalogTable.propTypes = {
  attributes: propTypes.array,
  handleItemChange: propTypes.func,
  handleItemDelete: propTypes.func
};

var createForm = designSystem.Form.createForm;

// attributes: [{key: "2a0d678e-464d-4b7b-aea6-eb37f5855feb"}]
// description: "Описания нужны."
// group: "Группаааа"
// name: "Тестовый каталог"
// type: false

var CatalogForm = function (_React$Component) {
  _inherits(CatalogForm, _React$Component);

  function CatalogForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CatalogForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CatalogForm.__proto__ || Object.getPrototypeOf(CatalogForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // В оригинальном коде эти uuid генерились, через пакет uuid().
      uuid: 2
    }, _this.handleAddRow = function () {
      var form = _this.props.form;

      var attributes = form.getFieldValue('attributes') || [];
      form.setFieldsValue({
        attributes: attributes.concat({ id: _this.state.uuid })
      });
      _this.setState(function (prevState) {
        return {
          uuid: prevState.uuid + 1
        };
      });
    }, _this.handleItemChange = function (field, id) {
      return function (value) {
        var form = _this.props.form;

        var attributes = form.getFieldValue('attributes');
        var attributeIndex = attributes.findIndex(function (item) {
          return item.id === id;
        });
        var updatedAttribute = _extends$1({}, attributes[attributeIndex], _defineProperty({}, field, value));
        var attributesCopy = attributes.slice();
        attributesCopy[attributeIndex] = updatedAttribute;
        form.setFieldsValue({
          attributes: attributesCopy
        });
      };
    }, _this.handleItemDelete = function (id) {
      var form = _this.props.form;

      var attributes = form.getFieldValue('attributes');
      console.log('Deleting row with id', id);
      form.setFieldsValue({
        attributes: attributes.filter(function (attr) {
          return attr.id !== id;
        })
      });
    }, _this.handleSave = function (form) {
      console.log('I can handle catalog save now!', form.getFieldsValue());
    }, _this.renderSaveButton = function () {
      var targetNode = document.getElementById('createCatalogButtonContainer');
      return targetNode ? ReactDOM.createPortal(React.createElement(
        designSystem.Button,
        { onClick: function onClick() {
            return _this.handleSave(_this.props.form);
          } },
        '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'
      ), document.getElementById('createCatalogButtonContainer')) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CatalogForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Mounts the save button!
      setTimeout(function () {
        _this2.forceUpdate();
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _props$catalogToEdit = this.props.catalogToEdit,
          catalogToEdit = _props$catalogToEdit === undefined ? {} : _props$catalogToEdit;

      return React.createElement(
        designSystem.Box,
        null,
        React.createElement(
          designSystem.Flex,
          { className: 'fieldWrapper', alignItems: 'center' },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 64px', fontSize: 1 },
            '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:'
          ),
          React.createElement(
            designSystem.Box,
            { ml: 2, flex: 1 },
            getFieldDecorator('name', {
              initialValue: catalogToEdit.name || '',
              rules: [{ message: 'Заполните поле name' }]
            })(React.createElement(designSystem.Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435' }))
          )
        ),
        React.createElement(
          designSystem.Flex,
          { className: 'fieldWrapper', mt: 3, alignItems: 'center' },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 64px', fontSize: 1 },
            '\u0413\u0440\u0443\u043F\u043F\u0430:'
          ),
          React.createElement(
            designSystem.Box,
            { ml: 2, flex: 1 },
            getFieldDecorator('group', {
              initialValue: catalogToEdit.group || '',
              rules: [{ message: 'Заполните поле name' }]
            })(React.createElement(designSystem.Select, { placeholder: '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0433\u0440\u0443\u043F\u043F\u0443' }))
          )
        ),
        React.createElement(
          designSystem.Flex,
          { className: 'fieldWrapper', mt: 3, alignItems: 'center' },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 64px', fontSize: 1 },
            '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:'
          ),
          React.createElement(
            designSystem.Box,
            { ml: 2, flex: 1 },
            getFieldDecorator('description', {
              initialValue: catalogToEdit.description || '',
              rules: [{ message: 'Заполните поле name' }]
            })(React.createElement(designSystem.Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435' }))
          )
        ),
        getFieldDecorator('attributes', { initialValue: catalogToEdit.attributes })(React.createElement(designSystem.Input, { style: { display: 'none' } })),
        React.createElement(
          designSystem.Box,
          { mt: 4, id: 'tableWrapper' },
          React.createElement(CatalogTable, {
            attributes: this.props.form.getFieldValue('attributes'),
            handleItemChange: this.handleItemChange,
            handleItemDelete: this.handleItemDelete
          }),
          React.createElement(designSystem.Divider, null),
          React.createElement(
            designSystem.Box,
            { mt: 3, alignItems: 'center' },
            React.createElement(
              designSystem.Button,
              { type: 'secondary', block: true, onClick: this.handleAddRow },
              React.createElement(designSystem.Icon, { name: 'plus-circle', mr: 2 }),
              '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u043E\u043B\u0431\u0435\u0446'
            )
          )
        ),
        this.renderSaveButton()
      );
    }
  }]);

  return CatalogForm;
}(React.Component);

var mapStateToProps$1 = function mapStateToProps(state, ownProps) {
  var id = ownProps.match.params.id;

  if (id) {
    var catalogToEdit = nsi.reselectors.catalogs.getCatalogById(state, id);
    return _extends$1({}, ownProps, {
      catalogToEdit: catalogToEdit
    });
  }
  return _extends$1({}, ownProps);
};

var enhanced = redux.compose(createForm(), reactRouterDom.withRouter, reactRedux.connect(mapStateToProps$1));

var CatalogForm$1 = enhanced(CatalogForm);

var _templateObject$1 = _taggedTemplateLiteral(['\n  margin: 0 160px;\n  height: 87px;\n  align-items: center;\n  border-bottom: 1px solid #ecebeb;\n'], ['\n  margin: 0 160px;\n  height: 87px;\n  align-items: center;\n  border-bottom: 1px solid #ecebeb;\n']);

/** Вот как из отсюда забрать данные из формы?
 * Как вариант - пихать состояние формы в редакс,
 * по клику Создать - забирать оттуда значения, отправлять. */
/* НО ПОКА- ИДЕАЛЬНОЕ РЕШЕНИЕ! */
var CreateHeader = function CreateHeader(props) {
  return React.createElement(
    designSystem.Flex,
    { justifyContent: 'space-between', flex: 1, alignItems: 'center' },
    React.createElement(
      designSystem.Text,
      { fontSize: 3 },
      '\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430'
    ),
    React.createElement(
      designSystem.Box,
      { className: 'buttonsWrapper' },
      React.createElement(designSystem.Box, { style: { display: 'inline-block ' }, id: 'createCatalogButtonContainer' }),
      React.createElement(
        designSystem.Button,
        { type: 'bordered', ml: 3, onClick: function onClick() {
            return props.history.goBack();
          } },
        '\u041E\u0442\u043C\u0435\u043D\u0430'
      )
    )
  );
};

var EditHeader = function EditHeader(props) {
  var history = props.history;

  return React.createElement(
    designSystem.Flex,
    { justifyContent: 'space-between', flex: 1, alignItems: 'center' },
    React.createElement(
      designSystem.Text,
      { fontSize: 3 },
      '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430'
    ),
    React.createElement(
      designSystem.Box,
      { className: 'buttonsWrapper' },
      React.createElement(
        designSystem.Button,
        null,
        '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C'
      ),
      React.createElement(
        designSystem.Button,
        { type: 'bordered', ml: 3, onClick: function onClick() {
            return history.goBack();
          } },
        '\u041E\u0442\u043C\u0435\u043D\u0430'
      )
    )
  );
};

var ViewHeader = function ViewHeader(props) {
  var history = props.history,
      location = props.location;

  console.log('ViewHeader', props);
  return React.createElement(
    designSystem.Flex,
    { justifyContent: 'space-between', flex: 1, alignItems: 'center' },
    React.createElement(
      designSystem.Text,
      { fontSize: 3 },
      'C\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A'
    ),
    React.createElement(
      designSystem.Box,
      { className: 'buttonsWrapper' },
      React.createElement(
        designSystem.Button,
        { type: 'flat', onClick: function onClick() {
            history.push(location.pathname + '/edit');
          } },
        React.createElement(designSystem.Icon, { mr: 3, name: 'edit' }),
        '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C'
      ),
      React.createElement(
        designSystem.Button,
        { type: 'flat', ml: 3 },
        React.createElement(designSystem.Icon, { mr: 3, name: 'save' }),
        '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433'
      )
    )
  );
};

var Placeholder = function Placeholder(props) {
  return React.createElement(
    designSystem.Box,
    null,
    '\u041D\u0415\u0422 \u0422\u0410\u041A\u041E\u0413\u041E \u0412 \u041C\u0410\u041A\u0415\u0422\u0415 \u0423\u0420\u0423\u0420\u0423'
  );
};

var HeaderWrapper = styled__default(designSystem.Flex)(_templateObject$1);

var Header = function Header(props) {
  return React.createElement(
    HeaderWrapper,
    null,
    React.createElement(
      reactRouterDom.Switch,
      null,
      React.createElement(reactRouterDom.Route, { exact: true, path: '/nsi/create', component: CreateHeader }),
      React.createElement(reactRouterDom.Route, { exact: true, path: '/nsi/:id/edit', component: EditHeader }),
      React.createElement(reactRouterDom.Route, { path: '/nsi/:id', component: ViewHeader }),
      React.createElement(reactRouterDom.Route, { exact: true, path: '/nsi', component: Placeholder })
    )
  );
};

var Header$1 = reactRouterDom.withRouter(Header);

var BaseNSITemplate = function (_React$Component) {
  _inherits(BaseNSITemplate, _React$Component);

  function BaseNSITemplate() {
    _classCallCheck(this, BaseNSITemplate);

    return _possibleConstructorReturn(this, (BaseNSITemplate.__proto__ || Object.getPrototypeOf(BaseNSITemplate)).apply(this, arguments));
  }

  _createClass(BaseNSITemplate, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        designSystem.Flex,
        { flexDirection: 'column', width: '1440px', mx: 'auto' },
        React.createElement(Header$1, null),
        React.createElement(
          designSystem.Flex,
          { mt: 3, mx: 160 },
          React.createElement(
            designSystem.Box,
            { flex: '0 0 256px' },
            React.createElement(reactRouterDom.Route, { path: '/nsi/:id?', component: CatalogsList$1 })
          ),
          React.createElement(
            designSystem.Box,
            { ml: '32px', flex: '1' },
            React.createElement(
              reactRouterDom.Switch,
              null,
              React.createElement(reactRouterDom.Route, { exact: true, path: '/nsi/create', component: CatalogForm$1 }),
              React.createElement(reactRouterDom.Route, { exact: true, path: '/nsi/:id/edit', component: CatalogForm$1 }),
              React.createElement(reactRouterDom.Route, { path: '/nsi/:id', component: Catalog$1 })
            )
          )
        )
      );
    }
  }]);

  return BaseNSITemplate;
}(React.Component);

/* Возможно, будет лучше такой вариант? */
// const CreateCatalog = () => (
//   <Flex flexDirection="column" width="1440px" mx="auto">
//     <CreateCatalogHeader />
//   <Flex mt={3} mx={160}>
//     <Box flex="0 0 256px">
//       <CatalogsList />
//     </Box>
//     <Box ml="32px" flex="1">
//       <CatalogForm />
//     </Box>
//   </Flex>
// </Flex>
// )
// const mstp = (state) => ({...state})
// const ConnectedCatalog = connect(mstp)(CreateCatalog)
// class __BaseNSITemplate extends React.Component {
//   render() {
//     return (
//       <Switch>
//         <Route exact path="/nsi/create" component={ConnectedCatalog} />
//         <Route exact path="/nsi/:id/edit" component={EditCatalog} />
//         <Route path="/nsi/:id" component={ViewCatalogs} />
//       </Switch>
//     )
//   }
// }

var index = reactRouterDom.withRouter(BaseNSITemplate);

exports.Catalog = Catalog$1;
exports.CatalogsList = CatalogsList$1;
exports.BaseNSITemplate = index;
//# sourceMappingURL=index.js.map
