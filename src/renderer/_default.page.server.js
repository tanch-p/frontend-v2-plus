export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname", "urlParsed", "theme"];

import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { createVPSApp } from "./app";

async function render(pageContext) {
  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "明日方舟一图流";
  const desc = (documentProps && documentProps.description) || "明日方舟一图流";

  const { Page } = pageContext;
  let appHtml;
  if (Page) {
    const app = createVPSApp(pageContext, false);
    appHtml = await renderToString(app);
  } else {
    appHtml = `<div id="client_only" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 200px;">
                <img style="width: 128px;" src="/image/website/icon-large.webp" />
                <div style="font-size: 32px; font-weight: bold; font-family: sans-serif; margin: 40px 0 10px 0;">${title}</div>
                <div style="font-size: 32px; font-family: sans-serif;">加载中……</div>
              </div>`;
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" class="${pageContext.theme}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=0.68, maximum-scale=0.68, user-scalable=no" />
        <meta name="description" content="${desc}" />
        <meta name="keywords" content="素材获取,一图流,明日方舟,攒抽计算器,公招招募计算,基建排班生成器,刷图推荐,性价比,公开招募,掉率" />
        <title>${title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="stylesheet" href="https://cdn.staticfile.org/element-plus/2.3.2/index.min.css" />
        __VITE_PLUGIN_SSR__ASSETS_FIRST__
        <script>
(function(self, undefined) {function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a)}function IsCallable(n){return"function"==typeof n}"use strict";var origSort=Array.prototype.sort;CreateMethodProperty(Array.prototype,"sort",function r(t){if(t!==undefined&&!1===IsCallable(t))throw new TypeError("The comparison function must be either a function or undefined");if(t===undefined)origSort.call(this);else{var e=Array.prototype.map.call(this,function(r,t){return{item:r,index:t}});origSort.call(e,function(r,e){var i=t.call(undefined,r.item,e.item);return 0===i?r.index-e.index:i});for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&e[i].item!==this[i]&&(this[i]=e[i].item)}return this});function ToObject(e){if(null===e||e===undefined)throw TypeError();return Object(e)}var Iterator=function(){var e=function(){return this.length=0,this},t=function(e){if("function"!=typeof e)throw new TypeError(e+" is not a function");return e},_=function(e,n){if(!(this instanceof _))return new _(e,n);Object.defineProperties(this,{__list__:{writable:!0,value:e},__context__:{writable:!0,value:n},__nextIndex__:{writable:!0,value:0}}),n&&(t(n.on),n.on("_add",this._onAdd.bind(this)),n.on("_delete",this._onDelete.bind(this)),n.on("_clear",this._onClear.bind(this)))};return Object.defineProperties(_.prototype,Object.assign({constructor:{value:_,configurable:!0,enumerable:!1,writable:!0},_next:{value:function(){var e;if(this.__list__)return this.__redo__&&(e=this.__redo__.shift())!==undefined?e:this.__nextIndex__<this.__list__.length?this.__nextIndex__++:void this._unBind()},configurable:!0,enumerable:!1,writable:!0},next:{value:function(){return this._createResult(this._next())},configurable:!0,enumerable:!1,writable:!0},_createResult:{value:function(e){return e===undefined?{done:!0,value:undefined}:{done:!1,value:this._resolve(e)}},configurable:!0,enumerable:!1,writable:!0},_resolve:{value:function(e){return this.__list__[e]},configurable:!0,enumerable:!1,writable:!0},_unBind:{value:function(){this.__list__=null,delete this.__redo__,this.__context__&&(this.__context__.off("_add",this._onAdd.bind(this)),this.__context__.off("_delete",this._onDelete.bind(this)),this.__context__.off("_clear",this._onClear.bind(this)),this.__context__=null)},configurable:!0,enumerable:!1,writable:!0},toString:{value:function(){return"[object Iterator]"},configurable:!0,enumerable:!1,writable:!0}},{_onAdd:{value:function(e){if(!(e>=this.__nextIndex__)){if(++this.__nextIndex__,!this.__redo__)return void Object.defineProperty(this,"__redo__",{value:[e],configurable:!0,enumerable:!1,writable:!1});this.__redo__.forEach(function(t,_){t>=e&&(this.__redo__[_]=++t)},this),this.__redo__.push(e)}},configurable:!0,enumerable:!1,writable:!0},_onDelete:{value:function(e){var t;e>=this.__nextIndex__||(--this.__nextIndex__,this.__redo__&&(t=this.__redo__.indexOf(e),-1!==t&&this.__redo__.splice(t,1),this.__redo__.forEach(function(t,_){t>e&&(this.__redo__[_]=--t)},this)))},configurable:!0,enumerable:!1,writable:!0},_onClear:{value:function(){this.__redo__&&e.call(this.__redo__),this.__nextIndex__=0},configurable:!0,enumerable:!1,writable:!0}})),Object.defineProperty(_.prototype,Symbol.iterator,{value:function(){return this},configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(_.prototype,Symbol.toStringTag,{value:"Iterator",configurable:!1,enumerable:!1,writable:!0}),_}();var ArrayIterator=function(){var e=function(t,r){if(!(this instanceof e))return new e(t,r);Iterator.call(this,t),r=r?String.prototype.includes.call(r,"key+value")?"key+value":String.prototype.includes.call(r,"key")?"key":"value":"value",Object.defineProperty(this,"__kind__",{value:r,configurable:!1,enumerable:!1,writable:!1})};return Object.setPrototypeOf&&Object.setPrototypeOf(e,Iterator.prototype),e.prototype=Object.create(Iterator.prototype,{constructor:{value:e,configurable:!0,enumerable:!1,writable:!0},_resolve:{value:function(e){return"value"===this.__kind__?this.__list__[e]:"key+value"===this.__kind__?[e,this.__list__[e]]:e},configurable:!0,enumerable:!1,writable:!0},toString:{value:function(){return"[object Array Iterator]"},configurable:!0,enumerable:!1,writable:!0}}),e}();"Symbol"in self&&"iterator"in Symbol&&"function"==typeof Array.prototype[Symbol.iterator]?CreateMethodProperty(Array.prototype,"values",Array.prototype[Symbol.iterator]):CreateMethodProperty(Array.prototype,"values",function r(){var r=ToObject(this);return new ArrayIterator(r,"value")});!function(){function e(e){return e&&e.Object==Object&&e}var t=e("object"==typeof c&&c),o=e("object"==typeof window&&window),b=e("object"==typeof self&&self),l=e("object"==typeof global&&global),c=t||o||b||l||Function("return this")();try{Object.defineProperty(c,"globalThis",{configurable:!0,enumerable:!1,writable:!0,value:c})}catch(n){c.globalThis=c}}();})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
        </script>
        <script defer src="https://cdn.staticfile.org/vue/3.2.47/vue.global.prod.min.js"></script>
        <script defer src="https://cdn.staticfile.org/element-plus/2.3.2/index.full.min.js"></script>
        <script defer src="https://cdn.staticfile.org/axios/1.3.4/axios.min.js"></script>
        <script defer src="https://cdn.staticfile.org/js-cookie/3.0.1/js.cookie.min.js"></script>
        <script defer src="https://cdn.staticfile.org/echarts/5.4.2/echarts.min.js"></script>
        <script defer src="https://cdn.staticfile.org/element-plus-icons-vue/2.1.0/index.iife.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.min.js"></script>
<script>eruda.init()</script>
      
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}

//手机控制台调试库
{
  /*  */
}
