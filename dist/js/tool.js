/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    router.addRoutes([{
        name: 'nova-translation-editor',
        path: '/nova-translation-editor',
        component: __webpack_require__(3)
    }]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddRowModal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddRowModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AddRowModal__);
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
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: { AddRowModal: __WEBPACK_IMPORTED_MODULE_0__AddRowModal___default.a },
  metaInfo: function metaInfo() {
    return {
      title: this.title + ' - ' + this.currentGroup
    };
  },

  data: function data() {
    return {
      title: 'Nova Translation Editor',
      apiUrl: '/nova-vendor/nova-translation-editor/',
      translations: null,
      currentGroup: null,
      showNewModal: false,
      loaded: false,
      languages: []
    };
  },
  mounted: function mounted() {
    this.getData();
  },

  computed: {
    existingKeys: function existingKeys() {
      return Object.keys(this.translations[this.currentGroup]);
    },
    showTable: function showTable() {
      return this.translations && Object.keys(this.translations).length > 0;
    }
  },
  methods: {
    getData: function getData() {
      var _this = this;

      Nova.request().get(this.apiUrl + 'index').then(function (response) {
        _this.loaded = true;
        if (response.data && response.data.translations) {
          _this.translations = response.data.translations;
          _this.languages = response.data.languages;
          _this.currentGroup = Object.keys(_this.translations)[0];
        }
      });
    },
    addRow: function addRow(name) {
      var row = {};
      for (var i in this.languages) {
        row[this.languages[i]] = '';
      }
      this.translations[this.currentGroup][name] = row;
      this.showNewModal = false;
    },
    save: function save(group) {
      var _this2 = this;

      var data = {};
      if (group) {
        data[group] = this.translations[group];
      } else {
        data = this.translations;
      }

      Nova.request().post(this.apiUrl + 'save', { data: data }).then(function (response) {
        _this2.$toasted.show('Saved', { type: 'success' });
      }).catch(function (error) {
        _this2.$toasted.show(error, { type: 'error' });
      });
    }
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(11)
/* template */
var __vue_template__ = __webpack_require__(12)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2cead4ce"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/AddRowModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2cead4ce", Component.options)
  } else {
    hotAPI.reload("data-v-2cead4ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("5703dfd6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2cead4ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AddRowModal.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2cead4ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AddRowModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AddRowModal",
  props: {
    group: {},
    existingKeys: {}
  },
  data: function data() {
    return {
      keyName: ''
    };
  },

  methods: {
    handleClose: function handleClose() {
      this.$emit('close');
    },
    handleSubmit: function handleSubmit() {
      this.keyName = this.keyName.trim();
      if (this.existingKeys.indexOf(this.keyName) != -1) {
        this.$toasted.show('This key is already in use', { type: 'error' });
      } else {
        this.$emit('create', this.keyName);
      }
    }
  },
  /**
   * Mount the component.
   */
  mounted: function mounted() {
    this.$refs.keyNameInput.focus();
  }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal", [
    _c(
      "form",
      {
        staticClass: "bg-white rounded-lg shadow-lg overflow-hidden",
        attrs: { autocomplete: "off" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.handleSubmit($event)
          }
        }
      },
      [
        _c(
          "div",
          [
            _c(
              "heading",
              {
                staticClass: "border-b border-40 py-4 px-2",
                attrs: { level: 2 }
              },
              [
                _vm._v(
                  _vm._s(_vm.__("Create")) + ' "' + _vm._s(_vm.group) + '"'
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "p-3" }, [
              _c(
                "label",
                {
                  staticClass:
                    "inline-block text-80 mb-2 leading-tight nova-form-label"
                },
                [_vm._v(_vm._s(_vm.__("Key of new translation")))]
              ),
              _c("br"),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.keyName,
                    expression: "keyName"
                  }
                ],
                ref: "keyNameInput",
                staticClass:
                  "w-full form-control form-input form-input-bordered",
                attrs: { type: "text", required: "" },
                domProps: { value: _vm.keyName },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.keyName = $event.target.value
                  }
                }
              })
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
          _c("div", { staticClass: "flex items-center ml-auto" }, [
            _c(
              "button",
              {
                staticClass: "btn text-80 font-normal h-9 px-3 mr-3 btn-link",
                attrs: { type: "button" },
                on: { click: _vm.handleClose }
              },
              [_vm._v("\n          " + _vm._s(_vm.__("Cancel")) + "\n        ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default btn-primary",
                attrs: { type: "submit" }
              },
              [_c("span", [_vm._v(_vm._s(_vm.__("Create")))])]
            )
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2cead4ce", module.exports)
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _vm.showTable
        ? _c(
            "card",
            { staticClass: "my-6" },
            [
              _c(
                "nav",
                { staticClass: "bg-white px-8 pt-2 border-b-2 border-50" },
                [
                  _c(
                    "div",
                    {
                      staticClass: "-mb-px flex justify-center cursor-pointer"
                    },
                    _vm._l(_vm.translations, function(translation, group) {
                      return _c(
                        "a",
                        {
                          key: group,
                          staticClass:
                            "no-underline border-b-2 uppercase tracking-wide font-bold text-s py-3 mx-2 px-3 inline-block",
                          class:
                            _vm.currentGroup === group
                              ? "text-primary border-primary"
                              : " text-grey border-transparent",
                          on: {
                            click: function($event) {
                              _vm.currentGroup = group
                            }
                          }
                        },
                        [_vm._v("\n          " + _vm._s(group) + "\n        ")]
                      )
                    }),
                    0
                  )
                ]
              ),
              _vm._v(" "),
              _vm._l(_vm.translations, function(translation, group) {
                return _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentGroup === group,
                        expression: "currentGroup === group"
                      }
                    ],
                    key: group + "tab"
                  },
                  [
                    _c("table", { staticClass: "table w-full" }, [
                      _c("thead", [
                        _c(
                          "tr",
                          [
                            _c("th", { staticClass: "text-left w-1/5" }, [
                              _vm._v("Key")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.languages, function(lang) {
                              return _c("th", { staticClass: "text-left" }, [
                                _vm._v("Translation " + _vm._s(lang))
                              ])
                            }),
                            _vm._v(" "),
                            _c("th", { staticClass: "hidden" })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        _vm._l(translation, function(trans, key) {
                          return _c(
                            "tr",
                            [
                              _c("td", { staticClass: "text-left py-2" }, [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(key) +
                                    "\n              "
                                ),
                                _c(
                                  "p",
                                  {
                                    staticClass: "text-xs\tmt-2 text-dark-grey"
                                  },
                                  [_vm._v(_vm._s(group) + "." + _vm._s(key))]
                                )
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.languages, function(lang) {
                                return _c("td", { staticClass: "text-left" }, [
                                  _c("textarea", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: trans[lang],
                                        expression: "trans[lang]"
                                      }
                                    ],
                                    staticClass:
                                      "w-full form-input form-input-bordered py-3 m-1 h-auto",
                                    attrs: { type: "text" },
                                    domProps: { value: trans[lang] },
                                    on: {
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          trans,
                                          lang,
                                          $event.target.value
                                        )
                                      }
                                    }
                                  })
                                ])
                              }),
                              _vm._v(" "),
                              _c("td", { staticClass: "hidden" })
                            ],
                            2
                          )
                        }),
                        0
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center p-3" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default btn-primary",
                          on: {
                            click: function($event) {
                              _vm.showNewModal = true
                            }
                          }
                        },
                        [_vm._v("Add row")]
                      )
                    ])
                  ]
                )
              })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showTable
        ? _c("div", { staticClass: "text-right my-2" }, [
            _c(
              "a",
              {
                staticClass:
                  "btn btn-link dim cursor-pointer text-80 ml-auto mr-6 router-link-active nova-router-link nova-cancel-button",
                on: {
                  click: function($event) {
                    return _vm.$router.go()
                  }
                }
              },
              [_vm._v("\n      " + _vm._s(_vm.__("Cancel")) + "\n    ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default btn-primary mr-3",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.save(_vm.currentGroup)
                  }
                }
              },
              [
                _vm._v(
                  _vm._s(_vm.__("Save")) + ' "' + _vm._s(_vm.currentGroup) + '"'
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.save }
              },
              [_vm._v(_vm._s(_vm.__("Save all")))]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.showTable && _vm.loaded
        ? _c("div", { staticClass: "toasted nova error" }, [
            _c("p", { staticClass: "mb-2" }, [
              _vm._v(
                "You have not translation groups (aka translation file) activated in your `config/nova-translation-editor.php` config file."
              )
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "Please add at least one group to the `groups` array element (for example `auth`, `validation`, etc.)."
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.showNewModal
        ? _c("add-row-modal", {
            attrs: {
              group: _vm.currentGroup,
              "existing-keys": _vm.existingKeys
            },
            on: {
              close: function($event) {
                _vm.showNewModal = false
              },
              create: _vm.addRow
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ })
/******/ ]);