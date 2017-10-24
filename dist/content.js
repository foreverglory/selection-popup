webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

exports.default = {
  methods: {}
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.json = json;
exports.resource = resource;
/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
function json(data) {
  if (data === null) {
    return '{}';
  }
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    return JSON.stringify(data, null, 2);
  }
  return data;
}

function resource(path) {
  return browser.extension.getURL(path);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(18);

var _vuex2 = _interopRequireDefault(_vuex);

var _isEmpty = __webpack_require__(8);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _storage = __webpack_require__(15);

var _storage2 = _interopRequireDefault(_storage);

var _query = __webpack_require__(17);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default); /* 
                                    * This file is part of the current project.
                                    * 
                                    * (c) ForeverGlory <http://foreverglory.me/>
                                    * 
                                    * For the full copyright and license information, please view the LICENSE
                                    * file that was distributed with this source code.
                                    */

var store = new _vuex2.default.Store({
  state: {
    types: [],
    selected: false,
    popped: false,

    loading: false,

    word: '',
    typeId: '',
    error: '',
    result: null
  },
  getters: {
    type: function type(state) {
      return state.types.find(function (type) {
        return type.id == state.typeId;
      });
    }
  },
  mutations: {
    reset: function reset(state) {
      state.word = '';
      state.typeId = '';
      state.error = '';
      state.selected = false;
      state.popped = false;
      state.loading = false;
      state.result = null;
    },
    selected: function selected(state, boolean) {
      state.selected = boolean;
    },
    update: function update(state, result) {
      state.result = result;
    },
    loading: function loading(state, boolean) {
      state.loading = boolean;
    },
    error: function error(state, _error) {
      state.error = _error;
    },
    updataTypes: function updataTypes(state, types) {
      state.types = types;
    },
    startSubmit: function startSubmit(state, _ref) {
      var word = _ref.word,
          typeId = _ref.typeId;

      state.word = word.trim();
      state.typeId = typeId;
      state.error = null;
      state.loading = true;
    },
    stopSubmit: function stopSubmit(state, _ref2) {
      var word = _ref2.word,
          typeId = _ref2.typeId,
          error = _ref2.error,
          result = _ref2.result;

      if (error) {
        state.error = error;
      } else {
        state.result = result;
      }
      state.loading = false;
    }
  },
  actions: {
    initTypes: function initTypes(context) {
      return _storage2.default.getTypes().then(function (types) {
        context.commit('updataTypes', types);
        return types;
      });
    },
    init: function init(context) {
      return Promise.all([context.dispatch('initTypes')]
      //todo: other init...
      );
    },
    submit: function submit(context) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var word = parameters.word,
          typeId = parameters.typeId;

      context.commit('startSubmit', { word: word, typeId: typeId });
      var type = context.getters.type;
      return (0, _query2.default)(word, type).then(function (result) {
        context.commit('stopSubmit', { word: word, typeId: typeId, result: result });
        return context.commit('update', result);
      }).catch(function (error) {
        context.commit('stopSubmit', { word: word, typeId: typeId, error: error });
        throw error;
      });
    },
    updateType: function updateType(context, type) {
      return context.dispatch('initTypes').then(function (types) {
        if ((0, _isEmpty2.default)(type.id)) {
          type.id = Date.now().toString(36);
          types.push(type);
        } else {
          types = types.map(function (item) {
            if (item.id == type.id) {
              item = type;
            }
            return item;
          });
        }
        return _storage2.default.saveTypes(types).then(function (types) {
          context.commit('updataTypes', types);
          return types;
        });
      });
    },
    removeType: function removeType(context, _ref3) {
      var id = _ref3.id;

      return context.dispatch('initTypes').then(function (types) {
        types = types.filter(function (type) {
          return type.id != id;
        });
        return _storage2.default.saveTypes(types).then(function (types) {
          context.commit('updataTypes', types);
          return types;
        });
      });
    }
  }
});
exports.default = store;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(7);

var _lodash2 = _interopRequireDefault(_lodash);

var _types = __webpack_require__(16);

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
exports.default = {
  getTypes: function getTypes() {
    return browser.storage.local.get('types').then(function (items) {
      if (_lodash2.default.has(items, 'types')) {
        return items['types'];
      } else {
        return [];
      }
    }).catch(function () {
      return [];
    });
  },
  saveTypes: function saveTypes(types) {
    var _this = this;

    return browser.storage.local.set({
      types: types
    }).then(function () {
      //      todo: sync
      //      browser.storage.sync.set({
      //        types: types
      //      });
      return _this.getTypes();
    });
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = [{"id":"www.baidu.com","name":"百度搜索","icon":"https://www.baidu.com/img/baidu.svg","request":{"uri":"https://www.baidu.com/s","method":"GET","data":{"ie":"utf-8","wd":"{word}"},"headers":{}},"response":{"type":"html","mappings":{"container":"#content_left .c-container","title":".t","link":".t a","image":".c-row .c-img","content":".c-abstract","source":".c-showurl"}},"source":"system"},{"id":"www.bing.com","name":"必应搜索","icon":"https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico","request":{"uri":"https://www.bing.com/search?q={word}","method":"GET","data":{},"headers":{}},"response":{"type":"html","mappings":{"container":"#b_results .b_algo","title":"h2 a","link":"h2 a","image":"","content":".b_caption p","source":".b_attribution cite"}},"source":"system"},{"id":"www.iciba.com","name":"金山词霸","icon":"http://www.iciba.com/favicon.ico","request":{"uri":"https://dict-co.iciba.com/api/dictionary.php?w={word}&type=json&key=74806BF56A907DCFCE164EDB2F6DDAB9","method":"GET","data":{},"headers":{}},"response":{"type":"json","mappings":{},"template":"<h3>{{result.word_name}}</h3><p v-for='item in result.symbols[0].parts'><em>{{item.part}}</em> <span v-for='mean in item.means'>{{mean}}; </span></p>"},"source":"system"},{"id":"mdn","name":"MDN web docs","icon":"https://cdn.mdn.mozilla.net/static/img/favicon32-local.329e8131018f.png","request":{"uri":"https://developer.mozilla.org/zh-CN/search?q={word}&topic=js&topic=api&topic=webdev&topic=http&topic=webext","method":"GET","data":{},"headers":{}},"response":{"type":"html","mappings":{"container":".result-list>li","title":".result-list-item h4","link":".result-list-item h4 a","image":"","content":".result-list-item p","source":".search-meta"}},"source":"system"}]

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* 
                                                                                                                                                                                                                                                                               * This file is part of the current project.
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               * (c) ForeverGlory <http://foreverglory.me/>
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                               * file that was distributed with this source code.
                                                                                                                                                                                                                                                                               */


var _lodash = __webpack_require__(7);

var _lodash2 = _interopRequireDefault(_lodash);

var _urijs = __webpack_require__(26);

var _urijs2 = _interopRequireDefault(_urijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceWord(data, word) {
  switch (typeof data === 'undefined' ? 'undefined' : _typeof(data)) {
    case 'string':
      data = data.replace('{word}', word);
      break;
    case 'object':
      if (Array.isArray(data)) {
        data = data.map(function (item) {
          return replaceWord(item, word);
        });
      } else {
        var newData = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            newData[key] = replaceWord(value, word);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        data = newData;
      }
      break;
  }
  return data;
}

function query(word, type) {
  var contentTypes = {
    json: 'application/json',
    jsonp: 'application/jsonp',
    xml: 'text/xml'
  };

  var input = replaceWord(type.request.uri, word);
  var headers = new Headers(replaceWord(type.request.headers, word));
  if (!headers.has('Content-Type') && _lodash2.default.has(contentTypes, type.response.type)) {
    headers.append('Content-Type', contentTypes[type.response.type]);
  }
  var method = type.request.method.toUpperCase();
  var init = {
    method: method,
    headers: headers,
    cache: 'default'
  };
  if (method === 'GET') {
    input = (0, _urijs2.default)(input).addQuery(replaceWord(type.request.data, word)).href();
  } else {
    init.body = JSON.stringify(replaceWord(type.request.data, word));
  }
  var request = new Request(input, init);
  switch (type.response.type) {
    case 'json':
      return fetch(request).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.debug('response', 'json', json);
        return json;
      });
    case 'xml':
    default:
      return fetch(request).then(function (response) {
        return response.text();
      }).then(function (html) {
        var mappings = type.response.mappings;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var result = [];
        doc.querySelectorAll(mappings.container).forEach(function (node) {
          try {
            var item = {
              title: node.querySelector(mappings.title).innerText,
              content: node.querySelector(mappings.content).innerHTML
            };
            var link = mappings.link ? node.querySelector(mappings.link) : null;
            if (link && link.nodeName == 'A') {
              item.link = link.href;
            }
            var image = mappings.image ? node.querySelector(mappings.image) : null;
            if (image && image.nodeName == 'IMG') {
              item.image = image.src;
            }
            var source = mappings.source ? node.querySelector(mappings.source) : null;
            if (source) {
              item.source = source.innerText;
            }
            result.push(item);
          } catch (error) {
            //some querySelector error, It doesn't matter if you lose an item.
          }
        });
        return result;
      });
  }
}
exports.default = query;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _mixins = __webpack_require__(11);

var _mixins2 = _interopRequireDefault(_mixins);

var _filters = __webpack_require__(12);

var filters = _interopRequireWildcard(_filters);

var _store = __webpack_require__(13);

var _store2 = _interopRequireDefault(_store);

var _Popup = __webpack_require__(60);

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
_vue2.default.mixin(_mixins2.default);
Object.keys(filters).forEach(function (key) {
  _vue2.default.filter(key, filters[key]);
});

browser.runtime.onMessage.addListener(function (message) {
  return Promise.resolve({
    response: "Get it."
  });
});
_vue2.default.config.productionTip = false;
new _vue2.default({
  store: _store2.default,
  el: '#selection-popup',
  template: '<Popup/>',
  components: { Popup: _Popup2.default },
  beforeCreate: function beforeCreate() {
    var element = document.createElement('selection-popup');
    element.id = 'selection-popup';
    document.body.appendChild(element);
  },
  created: function created() {
    this.$store.dispatch('init').then(function () {});
  },
  mounted: function mounted() {
    var vm = this;
  }
});

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Popup_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Popup_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_346e7c9f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Popup_vue__ = __webpack_require__(86);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(61)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Popup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_346e7c9f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Popup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\Popup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-346e7c9f", Component.options)
  } else {
    hotAPI.reload("data-v-346e7c9f", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f2a4f2b6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-346e7c9f\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Popup.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-346e7c9f\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Popup.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n#selection-popup {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n#selection-popup * {\n    box-sizing: content-box;\n    padding: 0;\n    margin: 0;\n}\n#selection-popup ul, #selection-popup ol {\n    margin-top: 0;\n    margin-bottom: 10px;\n}\n#selection-popup ul ul,\n  #selection-popup ol ul,\n  #selection-popup ul ol,\n  #selection-popup ol ol {\n    margin-bottom: 0;\n}\n#selection-popup ul li {\n    list-style: none;\n}\n#selection-popup dl {\n    margin-top: 0;\n    margin-bottom: 20px;\n}\n#selection-popup dt,\n  #selection-popup dd {\n    line-height: 1.42857143;\n}\n#selection-popup dt {\n    font-weight: bold;\n}\n#selection-popup dd {\n    margin-left: 0;\n}\n#selection-popup h1,\n  #selection-popup h2,\n  #selection-popup h3,\n  #selection-popup h4,\n  #selection-popup h5,\n  #selection-popup h6 {\n    font-family: inherit;\n    font-weight: 500;\n    line-height: 1.1;\n    color: inherit;\n}\n#selection-popup h1 small,\n  #selection-popup h2 small,\n  #selection-popup h3 small,\n  #selection-popup h4 small,\n  #selection-popup h5 small,\n  #selection-popup h6 small {\n    font-weight: normal;\n    line-height: 1;\n    color: #777;\n}\n#selection-popup h1,\n  #selection-popup h2,\n  #selection-popup h3 {\n    margin-top: 20px;\n    margin-bottom: 10px;\n}\n#selection-popup h1 small,\n  #selection-popup h2 small,\n  #selection-popup h3 small {\n    font-size: 65%;\n}\n#selection-popup h4,\n  #selection-popup h5,\n  #selection-popup h6 {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n#selection-popup h4 small,\n  #selection-popup h5 small,\n  #selection-popup h6 small {\n    font-size: 75%;\n}\n#selection-popup h1 {\n    font-size: 36px;\n}\n#selection-popup h2 {\n    font-size: 30px;\n}\n#selection-popup h3 {\n    font-size: 24px;\n}\n#selection-popup h4 {\n    font-size: 18px;\n}\n#selection-popup h5 {\n    font-size: 14px;\n}\n#selection-popup h6 {\n    font-size: 12px;\n}\n#selection-popup p {\n    margin: 0 0 10px;\n}\n#selection-popup small {\n    font-size: 85%;\n}\n#selection-popup mark {\n    padding: .2em;\n    background-color: #fcf8e3;\n}\n#selection-popup abbr[title],\n  #selection-popup abbr[data-original-title] {\n    cursor: help;\n    border-bottom: 1px dotted #777;\n}\n#selection-popup blockquote {\n    padding: 10px 20px;\n    margin: 0 0 20px;\n    font-size: 17.5px;\n    border-left: 5px solid #eee;\n}\n#selection-popup blockquote p:last-child,\n  #selection-popup blockquote ul:last-child,\n  #selection-popup blockquote ol:last-child {\n    margin-bottom: 0;\n}\n#selection-popup blockquote footer,\n  #selection-popup blockquote small {\n    display: block;\n    font-size: 80%;\n    line-height: 1.42857143;\n    color: #777;\n}\n#selection-popup blockquote footer:before,\n  #selection-popup blockquote small:before {\n    content: '\\2014   \\A0';\n}\n#selection-popup address {\n    margin-bottom: 20px;\n    font-style: normal;\n    line-height: 1.42857143;\n}\n#selection-popup code,\n  #selection-popup kbd,\n  #selection-popup pre,\n  #selection-popup samp {\n    font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\n#selection-popup code {\n    padding: 2px 4px;\n    font-size: 90%;\n    color: #c7254e;\n    background-color: #f9f2f4;\n    border-radius: 4px;\n}\n#selection-popup kbd {\n    padding: 2px 4px;\n    font-size: 90%;\n    color: #fff;\n    background-color: #333;\n    border-radius: 3px;\n    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n#selection-popup kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n}\n", ""]);

// exports


/***/ }),
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = __webpack_require__(65);

var _Icon2 = _interopRequireDefault(_Icon);

var _Dialog = __webpack_require__(70);

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {
    'selection-popup-icon': _Icon2.default, 'selection-popup-dialog': _Dialog2.default
  },
  computed: {
    selected: {
      get: function get() {
        return this.$store.state.selected;
      },
      set: function set(value) {
        this.$store.state.selected = value;
      }
    },
    popped: function popped() {
      return this.$store.state.popped;
    }
  },
  data: function data() {
    return {
      direction: ['down', 'right'],
      style: {
        left: 0,
        top: 0
      },
      word: '',
      typeId: '',
      immediately: false
    };
  },

  methods: {
    onSubmit: function onSubmit(_ref) {
      var word = _ref.word,
          typeId = _ref.typeId;

      this.word = word;
      this.typeId = typeId;
      this.immediately = true;
      this.$store.state.popped = true;
    }
  },
  mounted: function mounted() {
    var vm = this;
    document.addEventListener('mouseup', function (event) {
      var selection = window.getSelection();
      var word = selection.toString();
      if (word && event.which === 1) {
        vm.selected = true;

        var boxHeight = 400,
            boxWidth = 300;
        var direction = [];

        if (event.screenY + boxHeight > document.documentElement.clientHeight && boxHeight < document.documentElement.clientHeight / 2) {
          //向上
          vm.$set(vm, 'style', {
            left: event.pageX + 'px',
            top: event.pageY - 20 + 'px'
          });
          direction.push('up');
        } else {
          //向下
          vm.$set(vm, 'style', {
            left: event.pageX + 'px',
            top: event.pageY + 20 + 'px'
          });
          direction.push('down');
        }
        if (event.screenX + boxWidth > document.documentElement.clientWidth) {
          //向左
          direction.push('left');
        } else {
          //向右
          direction.push('right');
        }
        vm.$set(vm, 'direction', direction);
      } else {
        vm.$store.commit('reset');
      }
      vm.word = word;
    });
    this.$el.addEventListener('mouseup', function (event) {
      event.stopPropagation();
    });
  }
};

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Icon_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Icon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Icon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75b21176_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Icon_vue__ = __webpack_require__(69);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(66)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Icon_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75b21176_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Icon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75b21176", Component.options)
  } else {
    hotAPI.reload("data-v-75b21176", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f41c5d5c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75b21176\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Icon.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75b21176\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n#selection-popup-icon {\n  position: absolute;\n  z-index: 9998;\n}\n#selection-popup-icon ul {\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    transition: opacity .218s;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n#selection-popup-icon ul.up {\n      flex-direction: column-reverse;\n      bottom: 0;\n      top: auto;\n}\n#selection-popup-icon ul.down {\n      flex-direction: column;\n      top: 0;\n}\n#selection-popup-icon ul.left {\n      right: 0;\n      left: auto;\n}\n#selection-popup-icon ul.right {\n      left: 0;\n}\n#selection-popup-icon ul li {\n      height: 24px;\n      width: 120px;\n      padding: 5px 5px;\n      cursor: pointer;\n}\n#selection-popup-icon ul li:hover {\n        background-color: rgba(0, 0, 0, 0.2);\n}\n#selection-popup-icon ul li img {\n        float: left;\n        margin-right: 5px;\n        width: 24px;\n        height: 24px;\n}\n#selection-popup-icon ul li span {\n        display: inline-block;\n        font-size: 12px;\n        line-height: 24px;\n        height: 24px;\n}\n", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: ['word', 'direction'],
  computed: {
    types: function types() {
      return this.$store.state.types;
    }
  },
  data: function data() {
    return {};
  },

  methods: {
    submit: function submit(id) {
      this.$emit('submit', {
        word: this.word, typeId: id
      });
    }
  }
};

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "selection-popup-icon" } }, [
    _c(
      "ul",
      { class: _vm.direction },
      _vm._l(_vm.types, function(type) {
        return _c(
          "li",
          {
            on: {
              click: function($event) {
                _vm.submit(type.id)
              }
            }
          },
          [
            _c("img", { attrs: { src: type.icon } }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(type.name))])
          ]
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-75b21176", esExports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Dialog_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Dialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Dialog_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_214c5b94_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Dialog_vue__ = __webpack_require__(85);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(71)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Dialog_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_214c5b94_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Dialog_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-214c5b94", Component.options)
  } else {
    hotAPI.reload("data-v-214c5b94", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1bee344c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-214c5b94\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Dialog.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-214c5b94\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n#selection-popup-dialog {\n  position: absolute;\n  z-index: 9999;\n}\n#selection-popup-dialog .wrapper {\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    max-width: 300px;\n    max-height: 400px;\n    overflow: hidden;\n    background-color: #ffffff;\n    margin: 0px;\n    padding: 0;\n    border-radius: 2px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n#selection-popup-dialog .wrapper.up {\n      bottom: 0;\n      top: auto;\n}\n#selection-popup-dialog .wrapper.down {\n      flex-direction: column;\n      top: 0;\n}\n#selection-popup-dialog .wrapper.left {\n      right: 0;\n      left: auto;\n}\n#selection-popup-dialog .wrapper.right {\n      left: 0;\n}\n#selection-popup-dialog .wrapper .dialog-title {\n      background-color: rgba(0, 0, 0, 0.1);\n      height: 30px;\n      line-height: 30px;\n      text-indent: 6px;\n}\n#selection-popup-dialog .wrapper .dialog-title small {\n        font-size: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = __webpack_require__(74);

var _Form2 = _interopRequireDefault(_Form);

var _Result = __webpack_require__(80);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {
    'dialog-form': _Form2.default, 'dialog-result': _Result2.default
  },
  props: ['direction', 'word', 'typeId', 'immediately'],
  data: function data() {
    return {
      error: ''
    };
  },
  mounted: function mounted() {}
};

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5eaa10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Form_vue__ = __webpack_require__(79);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(75)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d5eaa10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d5eaa10", Component.options)
  } else {
    hotAPI.reload("data-v-0d5eaa10", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("244f5d51", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d5eaa10\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Form.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d5eaa10\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n#selection-popup-dialog-form {\n  display: flex;\n  height: 30px;\n  position: relative;\n}\n#selection-popup-dialog-form select {\n    height: 100%;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n}\n#selection-popup-dialog-form input {\n    flex: 1;\n    height: 100%;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-right-width: 0;\n    /* border-radius: 3px; */\n    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);\n    color: inherit;\n    padding: 0 10px;\n    font-size: 15px;\n}\n#selection-popup-dialog-form button {\n    background: url(" + __webpack_require__(77) + ") no-repeat center center;\n    background-size: auto auto;\n    border-radius: 0 3px 3px 0;\n    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);\n    color: inherit;\n    border: 0;\n    position: absolute;\n    right: 0;\n    width: 36px;\n    fill: rgba(12, 12, 13, 0.4);\n    -moz-context-properties: fill;\n    background-size: 16px 16px;\n    height: 100%;\n    offset-inline-end: 0;\n}\n", ""]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljDQogICAtIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXMNCiAgIC0gZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPg0KICA8cGF0aCBmaWxsPSJjb250ZXh0LWZpbGwiIGZpbGwtb3BhY2l0eT0iY29udGV4dC1maWxsLW9wYWNpdHkiIGQ9Ik0xNS43MDcsNy4yOTNsLTYtNkExLDEsMCwwLDAsOC4yOTMsMi43MDdMMTIuNTg2LDdIMUExLDEsMCwwLDAsMSw5SDEyLjU4Nkw4LjI5MywxMy4yOTNhMSwxLDAsMSwwLDEuNDE0LDEuNDE0bDYtNkExLDEsMCwwLDAsMTUuNzA3LDcuMjkzWiIvPg0KPC9zdmc+"

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
  computed: {
    types: function types() {
      return this.$store.state.types;
    }
  },
  props: ['word', 'typeId', 'immediately'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    if (this.immediately) {
      this.submit();
    }
  },

  methods: {
    submit: function submit() {
      this.$store.dispatch("submit", {
        word: this.word,
        typeId: this.typeId
      }).then(function () {});
    }
  }
};

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "selection-popup-dialog-form" } }, [
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.typeId,
            expression: "typeId"
          }
        ],
        on: {
          change: function($event) {
            var $$selectedVal = Array.prototype.filter
              .call($event.target.options, function(o) {
                return o.selected
              })
              .map(function(o) {
                var val = "_value" in o ? o._value : o.value
                return val
              })
            _vm.typeId = $event.target.multiple
              ? $$selectedVal
              : $$selectedVal[0]
          }
        }
      },
      _vm._l(_vm.types, function(type) {
        return _c("option", { domProps: { value: type.id } }, [
          _vm._v(_vm._s(type.name))
        ])
      })
    ),
    _vm._v(" "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.word,
          expression: "word"
        }
      ],
      staticClass: "input",
      attrs: { type: "text", placeholder: "" },
      domProps: { value: _vm.word },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.word = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c("button", { attrs: { type: "button" }, on: { click: _vm.submit } })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0d5eaa10", esExports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Result_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Result_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Result_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51c4b3e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Result_vue__ = __webpack_require__(84);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Result_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51c4b3e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Result_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Result.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51c4b3e9", Component.options)
  } else {
    hotAPI.reload("data-v-51c4b3e9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("28cbde2e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-51c4b3e9\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Result.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-51c4b3e9\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Result.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n#selection-popup-dialog-result {\n  overflow: hidden;\n  overflow-y: auto;\n  position: relative;\n  flex: 1;\n  padding: 5px;\n}\n#selection-popup-dialog-result a {\n    text-decoration: none;\n}\n#selection-popup-dialog-result em, #selection-popup-dialog-result strong {\n    color: #d00;\n    text-decoration: none;\n    font-style: normal;\n}\n#selection-popup-dialog-result .item {\n    list-style: none;\n    padding: 10px;\n    background-color: #fff;\n    margin-top: 10px;\n}\n#selection-popup-dialog-result .item .title {\n      font-size: 18px;\n      line-height: 24px;\n      color: #000;\n}\n#selection-popup-dialog-result .item .title a {\n        color: #000;\n}\n#selection-popup-dialog-result .item .content {\n      display: flex;\n      margin-top: 5px;\n      font-size: 14px;\n      color: #555;\n}\n#selection-popup-dialog-result .item .content a {\n        color: #555;\n}\n#selection-popup-dialog-result .item .content img {\n        width: 100px;\n        height: 100px;\n        margin-right: 5px;\n}\n#selection-popup-dialog-result .item .source {\n      margin-top: 5px;\n}\n#selection-popup-dialog-result .item .source span {\n        margin-right: 5px;\n        font-size: 14px;\n        color: #999;\n}\n#selection-popup-dialog-result #loading {\n    margin: 20px auto;\n    width: 200px;\n    height: 200px;\n    background-color: #fff;\n}\n#selection-popup-dialog-result #loading img {\n      width: 100px;\n      height: 100px;\n      margin: 50px auto;\n      display: block;\n}\n#selection-popup-dialog-result #error {\n    color: #d00;\n}\n#selection-popup-dialog-result .copyright {\n    font-size: 11px;\n    color: #666;\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    renderview: {
      functional: true,
      props: ['template'],
      render: function render(h, context) {
        return _vue2.default.compile('<div v-if="result">' + context.props.template + '</div>').render.apply(context.parent, arguments);
      }
    }
  },
  computed: {
    type: function type() {
      return this.$store.getters.type;
    },
    result: function result() {
      return this.$store.state.result;
    },
    loading: function loading() {
      return this.$store.state.loading;
    },

    error: {
      get: function get() {
        return this.$store.state.error;
      },
      set: function set(value) {
        this.$store.state.error = value;
      }
    },
    template: function template() {
      if (this.$store.getters.type && this.$store.getters.type.response.type == 'html') {
        return '\n<ul>\n<li class="item" v-for="item in result">\n    <div class="title">\n      <a v-bind:href="item.link" target="_blank" v-html="item.title"></a>\n    </div>\n    <div class="content">\n      <img v-if="item.image" v-bind:src="item.image"/>\n      <div v-html="item.content"></div>\n    </div>\n    <div class="source">\n      <span v-if="item.source">{{item.source}}</span> <span v-if="item.date">{{item.date}}</span>\n    </div>\n  </li>\n</ul>\n';
      }
      return this.$store.getters.type.response.template;
    }
  },
  data: function data() {
    return {};
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "selection-popup-dialog-result" } }, [
    _vm.loading
      ? _c("div", { attrs: { id: "loading" } }, [
          _c("img", {
            attrs: { src: _vm._f("resource")("images/loading.gif") }
          })
        ])
      : _vm.error
        ? _c("div", { attrs: { id: "error" } }, [
            _vm._v("\n    " + _vm._s(_vm.error.message()) + "\n  ")
          ])
        : _c(
            "div",
            [
              _vm.result
                ? _c("renderview", { attrs: { template: _vm.template } })
                : _vm._e()
            ],
            1
          ),
    _vm._v(" "),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "copyright" }, [_c("span")])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-51c4b3e9", esExports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "selection-popup-dialog" } }, [
    _c(
      "div",
      { staticClass: "wrapper", class: _vm.direction },
      [
        _vm._m(0),
        _vm._v(" "),
        _c("dialog-form", {
          attrs: {
            word: _vm.word,
            typeId: _vm.typeId,
            immediately: _vm.immediately
          }
        }),
        _vm._v(" "),
        _c("dialog-result")
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dialog-title" }, [
      _vm._v("划词窗 "),
      _c("small", [_vm._v("Selection Popup")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-214c5b94", esExports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "selection-popup" } },
    [
      _vm.selected && !_vm.popped
        ? _c("selection-popup-icon", {
            style: _vm.style,
            attrs: { direction: _vm.direction, word: _vm.word },
            on: { submit: _vm.onSubmit }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.popped
        ? _c("selection-popup-dialog", {
            style: _vm.style,
            attrs: {
              direction: _vm.direction,
              word: _vm.word,
              typeId: _vm.typeId,
              immediately: _vm.immediately
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-346e7c9f", esExports)
  }
}

/***/ })
],[31]);