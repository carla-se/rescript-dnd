// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_List from "rescript/lib/es6/belt_List.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Dnd__Geometry from "./Dnd__Geometry.bs.js";
import * as Webapi__Dom__HtmlElement from "rescript-webapi/src/Webapi/Dom/Webapi__Dom__HtmlElement.bs.js";

function getScrollPosition(param) {
  return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
}

function getMaxScroll(param) {
  var element = document.documentElement;
  return {
          x: element.scrollWidth,
          y: element.scrollHeight
        };
}

var $$Window = {
  getScrollPosition: getScrollPosition,
  getMaxScroll: getMaxScroll
};

function isScrollable(style) {
  return Belt_List.some({
              hd: style.overflow,
              tl: {
                hd: style.overflowX,
                tl: {
                  hd: style.overflowY,
                  tl: /* [] */0
                }
              }
            }, (function (x) {
                switch (x) {
                  case "auto" :
                  case "scroll" :
                      return true;
                  default:
                    return false;
                }
              }));
}

function getScrollPosition$1(element) {
  return {
          x: element.scrollLeft,
          y: element.scrollTop
        };
}

function getMaxScroll$1(element) {
  return {
          x: element.scrollWidth,
          y: element.scrollHeight
        };
}

function getClosestScrollable(element) {
  return Belt_Option.flatMap(Caml_option.nullable_to_opt(element.parentElement), (function (element) {
                var style = window.getComputedStyle(element);
                if (!isScrollable(style)) {
                  return getClosestScrollable(Belt_Option.getExn(Webapi__Dom__HtmlElement.ofElement(element)));
                }
                var element$1 = Belt_Option.getExn(Webapi__Dom__HtmlElement.ofElement(element));
                var rect = element$1.getBoundingClientRect();
                var maxScroll = getMaxScroll$1(element$1);
                var windowScrollPosition = getScrollPosition(undefined);
                var elementScrollPosition = getScrollPosition$1(element$1);
                return {
                        element: element$1,
                        geometry: Dnd__Geometry.getGeometry(rect, style, windowScrollPosition),
                        scroll: {
                          initial: elementScrollPosition,
                          current: elementScrollPosition,
                          delta: {
                            x: 0,
                            y: 0
                          },
                          max: maxScroll
                        }
                      };
              }));
}

var $$Element = {
  isScrollable: isScrollable,
  getScrollPosition: getScrollPosition$1,
  getMaxScroll: getMaxScroll$1,
  getClosestScrollable: getClosestScrollable
};

var Geometry;

export {
  Geometry ,
  $$Window ,
  $$Element ,
}
/* Webapi__Dom__HtmlElement Not a pure module */
