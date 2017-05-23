!function(){"use strict";function e(t,n){function r(e,t){return function(){return e.apply(t,arguments)}}var a;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=t,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],o=this,u=0,l=s.length;l>u;u++)o[s[u]]=r(o[s[u]],o);i&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,i,n){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,i.hijacked||i,n):r.call(t,e,i,n)},t.addEventListener=function(e,i,n){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,i.hijacked||(i.hijacked=function(e){e.propagationStopped||i(e)}),n):r.call(t,e,i,n)}),"function"==typeof t.onclick&&(a=t.onclick,t.addEventListener("click",function(e){a(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,i=navigator.userAgent.indexOf("Android")>0&&!t,n=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,r=n&&/OS 4_\d(_\d)?/.test(navigator.userAgent),a=n&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(n&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!i;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var i,n;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),n=t.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(e),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,e.dispatchEvent(i)},e.prototype.determineEventType=function(e){return i&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;n&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,i;if(t=e.fastClickScrollParent,!t||!t.contains(e)){i=e;do{if(i.scrollHeight>i.offsetHeight){t=i,e.fastClickScrollParent=i;break}i=i.parentElement}while(i)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,i,a;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),i=e.targetTouches[0],n){if(a=window.getSelection(),a.rangeCount&&!a.isCollapsed)return!0;if(!r){if(i.identifier&&i.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=i.pageX,this.touchStartY=i.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],i=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>i||Math.abs(t.pageY-this.touchStartY)>i},e.prototype.onTouchMove=function(e){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0)},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,s,o,u,l,c=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,s=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,a&&(l=e.changedTouches[0],c=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||c,c.fastClickScrollParent=this.targetElement.fastClickScrollParent),o=c.tagName.toLowerCase(),"label"===o){if(t=this.findControl(c)){if(this.focus(c),i)return!1;c=t}}else if(this.needsFocus(c))return e.timeStamp-s>100||n&&window.top!==window&&"input"===o?(this.targetElement=null,!1):(this.focus(c),this.sendClick(c,e),n&&"select"===o||(this.targetElement=null,e.preventDefault()),!1);return!(!n||r||(u=c.fastClickScrollParent,!u||u.fastClickLastScrollTop===u.scrollTop))||(this.needsClick(c)||(e.preventDefault(),this.sendClick(c,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return!this.targetElement||(!!e.forwardedTouchEvent||(!(e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick))||(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1)))},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail||(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;i&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,n,r,a;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!i)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction||(a=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],!!(a>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth)))||("none"===e.style.touchAction||"manipulation"===e.style.touchAction))},e.attach=function(t,i){return new e(t,i)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),/*!
 * clipboard.js v1.5.15
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Clipboard=e()}}(function(){var e;return function e(t,i,n){function r(s,o){if(!i[s]){if(!t[s]){var u="function"==typeof require&&require;if(!o&&u)return u(s,!0);if(a)return a(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[s]={exports:{}};t[s][0].call(c.exports,function(e){var i=t[s][1][e];return r(i?i:e)},c,c.exports,e,t,i,n)}return i[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t){function i(e,t){for(;e&&e!==document;){if(e.matches(t))return e;e=e.parentNode}}if(Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=i},{}],2:[function(e,t){function i(e,t,i,r,a){var s=n.apply(this,arguments);return e.addEventListener(i,s,a),{destroy:function(){e.removeEventListener(i,s,a)}}}function n(e,t,i,n){return function(i){i.delegateTarget=r(i.target,t),i.delegateTarget&&n.call(e,i)}}var r=e("./closest");t.exports=i},{"./closest":1}],3:[function(e,t,i){i.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},i.nodeList=function(e){var t=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===t||"[object HTMLCollection]"===t)&&"length"in e&&(0===e.length||i.node(e[0]))},i.string=function(e){return"string"==typeof e||e instanceof String},i.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},{}],4:[function(e,t){function i(e,t,i){if(!e&&!t&&!i)throw new Error("Missing required arguments");if(!s.string(t))throw new TypeError("Second argument must be a String");if(!s.fn(i))throw new TypeError("Third argument must be a Function");if(s.node(e))return n(e,t,i);if(s.nodeList(e))return r(e,t,i);if(s.string(e))return a(e,t,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function n(e,t,i){return e.addEventListener(t,i),{destroy:function(){e.removeEventListener(t,i)}}}function r(e,t,i){return Array.prototype.forEach.call(e,function(e){e.addEventListener(t,i)}),{destroy:function(){Array.prototype.forEach.call(e,function(e){e.removeEventListener(t,i)})}}}function a(e,t,i){return o(document.body,e,t,i)}var s=e("./is"),o=e("delegate");t.exports=i},{"./is":3,delegate:2}],5:[function(e,t){function i(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName)e.focus(),e.setSelectionRange(0,e.value.length),t=e.value;else{e.hasAttribute("contenteditable")&&e.focus();var i=window.getSelection(),n=document.createRange();n.selectNodeContents(e),i.removeAllRanges(),i.addRange(n),t=i.toString()}return t}t.exports=i},{}],6:[function(e,t){function i(){}i.prototype={on:function(e,t,i){var n=this.e||(this.e={});return(n[e]||(n[e]=[])).push({fn:t,ctx:i}),this},once:function(e,t,i){function n(){r.off(e,n),t.apply(i,arguments)}var r=this;return n._=t,this.on(e,n,i)},emit:function(e){var t=[].slice.call(arguments,1),i=((this.e||(this.e={}))[e]||[]).slice(),n=0,r=i.length;for(n;n<r;n++)i[n].fn.apply(i[n].ctx,t);return this},off:function(e,t){var i=this.e||(this.e={}),n=i[e],r=[];if(n&&t)for(var a=0,s=n.length;a<s;a++)n[a].fn!==t&&n[a].fn._!==t&&r.push(n[a]);return r.length?i[e]=r:delete i[e],this}},t.exports=i},{}],7:[function(t,i,n){!function(r,a){if("function"==typeof e&&e.amd)e(["module","select"],a);else if("undefined"!=typeof n)a(i,t("select"));else{var s={exports:{}};a(s,r.select),r.clipboardAction=s.exports}}(this,function(e,t){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=i(t),a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(){function e(t){n(this,e),this.resolveOptions(t),this.initSelection()}return s(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var i=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.addEventListener("focus",window.scrollTo(0,i)),this.fakeElem.style.top=i+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,r["default"])(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,r["default"])(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":a(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}();e.exports=o})},{select:5}],8:[function(t,i,n){!function(r,a){if("function"==typeof e&&e.amd)e(["module","./clipboard-action","tiny-emitter","good-listener"],a);else if("undefined"!=typeof n)a(i,t("./clipboard-action"),t("tiny-emitter"),t("good-listener"));else{var s={exports:{}};a(s,r.clipboardAction,r.tinyEmitter,r.goodListener),r.clipboard=s.exports}}(this,function(e,t,i,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var i="data-clipboard-"+e;if(t.hasAttribute(i))return t.getAttribute(i)}var l=r(t),c=r(i),m=r(n),d=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),p=function(e){function t(e,i){a(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.resolveOptions(i),n.listenClick(e),n}return o(t,e),d(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText}},{key:"listenClick",value:function(e){var t=this;this.listener=(0,m["default"])(e,"click",function(e){return t.onClick(e)})}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l["default"]({action:this.action(t),target:this.target(t),text:this.text(t),trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return u("action",e)}},{key:"defaultTarget",value:function(e){var t=u("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return u("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}]),t}(c["default"]);e.exports=p})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)}),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&module.exports?module.exports=t():e.Rellax=t()}(this,function(){var e=function(t,i){var n=Object.create(e.prototype);if("undefined"==typeof window.orientation){var r=0,a=0,s=[],o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){setTimeout(e,1e3/60)};if(n.options={speed:-2},i&&Object.keys(i).forEach(function(e){n.options[e]=i[e]}),-10>n.options.speed?n.options.speed=-10:10<n.options.speed&&(n.options.speed=10),t||(t=".rellax"),document.getElementsByClassName(t.replace(".","")))n.elems=document.getElementsByClassName(t.replace(".",""));else{if(!1===document.querySelector(t))throw Error("The elements you're trying to select don't exist.");n.elems=querySelector(t)}var u=function(e){var t=0+e.getBoundingClientRect().top,i=e.clientHeight||e.offsetHeight||e.scrollHeight,r=e.dataset.rellaxSpeed?e.dataset.rellaxSpeed:n.options.speed,s=Math.round(100*r*(1-(0-t+a)/(i+a)));return e=e.style.cssText.slice(11),{base:s,top:t,height:i,speed:r,style:e}},l=function(){var e=r;return r=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,e!=r},c=function(){l()&&m(),o(c)},m=function(){for(var e=0;e<n.elems.length;e++){var t="translate3d(0,"+(Math.round(100*s[e].speed*(1-(r-s[e].top+a)/(s[e].height+a)))-s[e].base)+"px,0)"+s[e].style;n.elems[e].style.cssText="-webkit-transform:"+t+";-moz-transform:"+t+";transform:"+t+";"}};return function(){a=window.innerHeight,l();for(var e=0;e<n.elems.length;e++){var t=u(n.elems[e]);s.push(t)}window.addEventListener("resize",function(){m()}),c(),m()}(),Object.freeze(),n}};return e});var Lorem;!function(){Lorem=function(){this.type=null,this.query=null,this.data=null},Lorem.IMAGE=1,Lorem.TEXT=2,Lorem.TYPE={PARAGRAPH:1,SENTENCE:2,WORD:3},Lorem.WORDS=["lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","ut","aliquam,","purus","sit","amet","luctus","venenatis,","lectus","magna","fringilla","urna,","porttitor","rhoncus","dolor","purus","non","enim","praesent","elementum","facilisis","leo,","vel","fringilla","est","ullamcorper","eget","nulla","facilisi","etiam","dignissim","diam","quis","enim","lobortis","scelerisque","fermentum","dui","faucibus","in","ornare","quam","viverra","orci","sagittis","eu","volutpat","odio","facilisis","mauris","sit","amet","massa","vitae","tortor","condimentum","lacinia","quis","vel","eros","donec","ac","odio","tempor","orci","dapibus","ultrices","in","iaculis","nunc","sed","augue","lacus,","viverra","vitae","congue","eu,","consequat","ac","felis","donec","et","odio","pellentesque","diam","volutpat","commodo","sed","egestas","egestas","fringilla","phasellus","faucibus","scelerisque","eleifend","donec","pretium","vulputate","sapien","nec","sagittis","aliquam","malesuada","bibendum","arcu","vitae","elementum","curabitur","vitae","nunc","sed","velit","dignissim","sodales","ut","eu","sem","integer","vitae","justo","eget","magna","fermentum","iaculis","eu","non","diam","phasellus","vestibulum","lorem","sed","risus","ultricies","tristique","nulla","aliquet","enim","tortor,","at","auctor","urna","nunc","id","cursus","metus","aliquam","eleifend","mi","in","nulla","posuere","sollicitudin","aliquam","ultrices","sagittis","orci,","a","scelerisque","purus","semper","eget","duis","at","tellus","at","urna","condimentum","mattis","pellentesque","id","nibh","tortor,","id","aliquet","lectus","proin","nibh","nisl,","condimentum","id","venenatis","a,","condimentum","vitae","sapien","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","sed","tempus,","urna","et","pharetra","pharetra,","massa","massa","ultricies","mi,","quis","hendrerit","dolor","magna","eget","est","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","integer","eget","aliquet","nibh","praesent","tristique","magna","sit","amet","purus","gravida","quis","blandit","turpis","cursus","in","hac","habitasse","platea","dictumst","quisque","sagittis,","purus","sit","amet","volutpat","consequat,","mauris","nunc","congue","nisi,","vitae","suscipit","tellus","mauris","a","diam","maecenas","sed","enim","ut","sem","viverra","aliquet","eget","sit","amet","tellus","cras","adipiscing","enim","eu","turpis","egestas","pretium","aenean","pharetra,","magna","ac","placerat","vestibulum,","lectus","mauris","ultrices","eros,","in","cursus","turpis","massa","tincidunt","dui","ut","ornare","lectus","sit","amet","est","placerat","in","egestas","erat","imperdiet","sed","euismod","nisi","porta","lorem","mollis","aliquam","ut","porttitor","leo","a","diam","sollicitudin","tempor","id","eu","nisl","nunc","mi","ipsum,","faucibus","vitae","aliquet","nec,","ullamcorper","sit","amet","risus","nullam","eget","felis","eget","nunc","lobortis","mattis","aliquam","faucibus","purus","in","massa","tempor","nec","feugiat","nisl","pretium","fusce","id","velit","ut","tortor","pretium","viverra","suspendisse","potenti","nullam","ac","tortor","vitae","purus","faucibus","ornare","suspendisse","sed","nisi","lacus,","sed","viverra","tellus","in","hac","habitasse","platea","dictumst","vestibulum","rhoncus","est","pellentesque","elit","ullamcorper","dignissim","cras","tincidunt","lobortis","feugiat","vivamus","at","augue","eget","arcu","dictum","varius","duis","at","consectetur","lorem","donec","massa","sapien,","faucibus","et","molestie","ac,","feugiat","sed","lectus","vestibulum","mattis","ullamcorper","velit","sed","ullamcorper","morbi","tincidunt","ornare","massa,","eget","egestas","purus","viverra","accumsan","in","nisl","nisi,","scelerisque","eu","ultrices","vitae,","auctor","eu","augue","ut","lectus","arcu,","bibendum","at","varius","vel,","pharetra","vel","turpis","nunc","eget","lorem","dolor,","sed","viverra","ipsum","nunc","aliquet","bibendum","enim,","facilisis","gravida","neque","convallis","a","cras","semper","auctor","neque,","vitae","tempus","quam","pellentesque","nec","nam","aliquam","sem","et","tortor","consequat","id","porta","nibh","venenatis","cras","sed","felis","eget","velit","aliquet","sagittis","id","consectetur","purus","ut","faucibus","pulvinar","elementum","integer","enim","neque,","volutpat","ac","tincidunt","vitae,","semper","quis","lectus","nulla","at","volutpat","diam","ut","venenatis","tellus","in","metus","vulputate","eu","scelerisque","felis","imperdiet","proin","fermentum","leo","vel","orci","porta","non","pulvinar","neque","laoreet","suspendisse","interdum","consectetur","libero,","id","faucibus","nisl","tincidunt","eget","nullam","non","nisi","est,","sit","amet","facilisis","magna","etiam","tempor,","orci","eu","lobortis","elementum,","nibh","tellus","molestie","nunc,","non","blandit","massa","enim","nec","dui","nunc","mattis","enim","ut","tellus","elementum","sagittis","vitae","et","leo","duis","ut","diam","quam","nulla","porttitor","massa","id","neque","aliquam","vestibulum","morbi","blandit","cursus","risus,","at","ultrices","mi","tempus","imperdiet","nulla","malesuada","pellentesque","elit","eget","gravida","cum","sociis","natoque","penatibus","et","magnis","dis","parturient","montes,","nascetur","ridiculus","mus","mauris","vitae","ultricies","leo","integer","malesuada","nunc","vel","risus","commodo","viverra","maecenas","accumsan,","lacus","vel","facilisis","volutpat,","est","velit","egestas","dui,","id","ornare","arcu","odio","ut","sem","nulla","pharetra","diam","sit","amet","nisl","suscipit","adipiscing","bibendum","est","ultricies","integer","quis","auctor","elit","sed","vulputate","mi","sit","amet","mauris","commodo","quis","imperdiet","massa","tincidunt","nunc","pulvinar","sapien","et","ligula","ullamcorper","malesuada","proin","libero","nunc,","consequat","interdum","varius","sit","amet,","mattis","vulputate","enim","nulla","aliquet","porttitor","lacus,","luctus","accumsan","tortor","posuere","ac","ut","consequat","semper","viverra","nam","libero","justo,","laoreet","sit","amet","cursus","sit","amet,","dictum","sit","amet","justo","donec","enim","diam,","vulputate","ut","pharetra","sit","amet,","aliquam","id","diam","maecenas","ultricies","mi","eget","mauris","pharetra","et","ultrices","neque","ornare","aenean","euismod","elementum","nisi,","quis","eleifend","quam","adipiscing","vitae","proin","sagittis,","nisl","rhoncus","mattis","rhoncus,","urna","neque","viverra","justo,","nec","ultrices","dui","sapien","eget","mi","proin","sed","libero","enim,","sed","faucibus","turpis","in","eu","mi","bibendum","neque","egestas","congue","quisque","egestas","diam","in","arcu","cursus","euismod","quis","viverra","nibh","cras","pulvinar","mattis","nunc,","sed","blandit","libero","volutpat","sed","cras","ornare","arcu","dui","vivamus","arcu","felis,","bibendum","ut","tristique","et,","egestas","quis","ipsum","suspendisse","ultrices","gravida","dictum","fusce","ut","placerat","orci","nulla","pellentesque","dignissim","enim,","sit","amet","venenatis","urna","cursus","eget","nunc","scelerisque","viverra","mauris,","in","aliquam","sem","fringilla","ut","morbi","tincidunt","augue","interdum","velit","euismod","in","pellentesque","massa","placerat","duis","ultricies","lacus","sed","turpis","tincidunt","id","aliquet","risus","feugiat","in","ante","metus,","dictum","at","tempor","commodo,","ullamcorper","a","lacus","vestibulum","sed","arcu","non","odio","euismod","lacinia","at","quis","risus","sed","vulputate","odio","ut","enim","blandit","volutpat","maecenas","volutpat","blandit","aliquam","etiam","erat","velit,","scelerisque","in","dictum","non,","consectetur","a","erat","nam","at","lectus","urna","duis","convallis","convallis","tellus,","id","interdum","velit","laoreet","id","donec","ultrices","tincidunt","arcu,","non","sodales","neque","sodales","ut","etiam","sit","amet","nisl","purus,","in","mollis","nunc","sed","id","semper","risus","in","hendrerit","gravida","rutrum","quisque","non","tellus","orci,","ac","auctor","augue","mauris","augue","neque,","gravida","in","fermentum","et,","sollicitudin","ac","orci","phasellus","egestas","tellus","rutrum","tellus","pellentesque","eu","tincidunt","tortor","aliquam","nulla","facilisi","cras","fermentum,","odio","eu","feugiat","pretium,","nibh","ipsum","consequat","nisl,","vel","pretium","lectus","quam","id","leo","in","vitae","turpis","massa","sed","elementum","tempus","egestas","sed","sed","risus","pretium","quam","vulputate","dignissim","suspendisse","in","est","ante","in","nibh","mauris,","cursus","mattis","molestie","a,","iaculis","at","erat","pellentesque","adipiscing","commodo","elit,","at","imperdiet","dui","accumsan","sit","amet","nulla","facilisi","morbi","tempus","iaculis","urna,","id","volutpat","lacus","laoreet","non","curabitur","gravida","arcu","ac","tortor","dignissim","convallis","aenean","et","tortor","at","risus","viverra","adipiscing","at","in","tellus","integer","feugiat","scelerisque","varius","morbi","enim","nunc,","faucibus","a","pellentesque","sit","amet,","porttitor","eget","dolor","morbi","non","arcu","risus,","quis","varius","quam","quisque","id","diam","vel","quam","elementum","pulvinar","etiam","non","quam","lacus","suspendisse","faucibus","interdum","posuere","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","duis","tristique","sollicitudin","nibh","sit","amet","commodo","nulla","facilisi","nullam","vehicula","ipsum","a","arcu","cursus","vitae","congue","mauris","rhoncus","aenean","vel","elit","scelerisque","mauris","pellentesque","pulvinar","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","maecenas","pharetra","convallis","posuere","morbi","leo","urna,","molestie","at","elementum","eu,","facilisis","sed","odio","morbi","quis","commodo","odio","aenean","sed","adipiscing","diam","donec","adipiscing","tristique","risus","nec","feugiat","in","fermentum","posuere","urna","nec","tincidunt","praesent","semper","feugiat","nibh","sed","pulvinar","proin","gravida","hendrerit","lectus","a","molestie"],Lorem.prototype.randomInt=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},loremStart=!0,Lorem.prototype.createText=function(e,t,i){switch(t){case Lorem.TYPE.PARAGRAPH:for(var n=new Array,r=0;r<e;r++){var a=this.randomInt(10,20),s=this.createText(a,Lorem.TYPE.SENTENCE,r);n.push("<p>"+s+"</p>"),loremStart=!1}return n.join("\n");case Lorem.TYPE.SENTENCE:for(var o=new Array,r=0;r<e;r++){var u=this.randomInt(5,10),l=this.createText(u,Lorem.TYPE.WORD,r).split(" ");l[0]=l[0].substr(0,1).toUpperCase()+l[0].substr(1);var c=l.join(" ");o.push(c)}return(o.join(". ")+".").replace(/(\.\,|\,\.)/g,".");case Lorem.TYPE.WORD:var m=this.randomInt(0,Lorem.WORDS.length-e-1);return 0==i&&loremStart?"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua":Lorem.WORDS.slice(m,m+e).join(" ").replace(/\.|\,/g,"")}},Lorem.prototype.createLorem=function(e){var t,i=new Array;if(/\d+-\d+[psw]/.test(this.query)){var n=this.query.replace(/[a-z]/,"").split("-");t=Math.floor(Math.random()*parseInt(n[1]))+parseInt(n[0])}else t=parseInt(this.query);if(/\d+p/.test(this.query))var r=Lorem.TYPE.PARAGRAPH;else if(/\d+s/.test(this.query))var r=Lorem.TYPE.SENTENCE;else if(/\d+w/.test(this.query))var r=Lorem.TYPE.WORD;if(i.push(this.createText(t,r)),i=1==r?i.join(" "):"<p>"+i.join(" ")+"</p>",e)if(this.type==Lorem.TEXT)e.innerHTML=i;else if(this.type==Lorem.IMAGE){var a="",s=this.query.split(" ");"gray"==s[0]&&(a+="/g",s[0]=""),e.getAttribute("width")&&(a+="/"+e.getAttribute("width")),e.getAttribute("height")&&(a+="/"+e.getAttribute("height")),a+="/"+s.join(" ").replace(/(^\s+|\s+$)/,""),e.src="http://lorempixum.com"+a.replace(/\/\//,"/")}if(null==e)return i},"undefined"!=typeof jQuery&&!function(e){e.fn.lorem=function(){e(this).each(function(){var t=new Lorem;t.type=e(this).is("img")?Lorem.IMAGE:Lorem.TEXT,t.query=e(this).data("lorem"),t.createLorem(this)})},e(document).ready(function(){e("[data-lorem]").lorem()})}(jQuery)}(),function(){function e(){a&&a.addEventListener("click",i),s&&s.addEventListener("click",function(e){var t=e.target;u&&t!==a&&i()}),o&&(o.addEventListener("mouseenter",n),o.addEventListener("mouseleave",n))}function t(e){e.preventDefault(),e.stopPropagation()}function i(){u?(r.classList.remove("menu-is-open"),r.removeEventListener("touchmove",t)):(r.classList.add("menu-is-open"),r.addEventListener("touchmove",t)),u=!u}function n(){u?(r.classList.remove("lang-is-open"),r.removeEventListener("touchmove",t)):(r.classList.add("lang-is-open"),r.addEventListener("touchmove",t)),u=!u}var r=document.body,a=document.getElementsByClassName("js-menu-button")[0],s=document.getElementsByClassName("js-body-overlay")[0],o=document.getElementsByClassName("js-menu-language")[0],u=!1;e()}();var rellax=new Rellax(".parallax-item",{speed:4}),generator=document.getElementsByClassName("js-generator-text")[0];if(generator){var query=window.location.search.substring(1),params=query.split("&"),number=params[0].split("=").pop(),type=params[1].split("=").pop(),input=document.getElementsByClassName("js-generator-input")[0],select=document.getElementsByClassName("js-generator-select")[0];input.value=number,select.value=type;var lorem=new Lorem;lorem.type=Lorem.TEXT,lorem.query=number+type,lorem.createLorem(document.getElementsByClassName("js-generator-text")[0])}