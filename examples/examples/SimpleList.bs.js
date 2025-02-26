// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Cx from "rescript-classnames/src/Cx.bs.js";
import * as Dnd from "../../src/Dnd.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as ArrayExt from "../libs/ArrayExt.bs.js";
import * as Belt_Map from "rescript/lib/es6/belt_Map.js";
import * as Identity from "../libs/Identity.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";

var TodoId = Identity.Make({});

var Todo = {};

var Item_eq = TodoId.eq;

var Item_cmp = TodoId.cmp;

var Item = {
  eq: Item_eq,
  cmp: Item_cmp
};

var Container = Dnd.MakeSingletonContainer({});

var include = Dnd.Make(Item, Container);

var DndManager = include.DndManager;

var DraggableItem = include.DraggableItem;

var DroppableContainer = include.DroppableContainer;

var Todos_DndContext = include.DndContext;

var Todos = {
  Item: Item,
  Container: Container,
  DndContext: Todos_DndContext,
  DndManager: DndManager,
  DraggableItem: DraggableItem,
  DroppableContainer: DroppableContainer
};

function reducer(state, action) {
  var match = action._0;
  if (match === undefined) {
    return state;
  }
  if (match.TAG !== /* SameContainer */0) {
    return state;
  }
  var placement = match._1;
  return {
          todosIndex: ArrayExt.reinsert(state.todosIndex, match._0, placement ? ({
                    NAME: "Before",
                    VAL: placement._0
                  }) : "Last"),
          todosMap: state.todosMap
        };
}

function SimpleList(Props) {
  var n = Props.n;
  var axis = Props.axis;
  var initialState = React.useMemo((function () {
          return {
                  todosIndex: Belt_Array.range(1, n),
                  todosMap: Belt_Array.reduce(Belt_Array.range(1, n), Curry._1(TodoId.$$Map.make, undefined), (function (map, id) {
                          return Belt_Map.set(map, id, {
                                      id: id,
                                      title: "Todo " + Curry._1(TodoId.toString, id)
                                    });
                        }))
                };
        }), []);
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(DndManager.make, {
              onDragStart: (function (_itemId) {
                  
                }),
              onDropStart: (function (_itemId) {
                  
                }),
              onDropEnd: (function (_itemId) {
                  
                }),
              onReorder: (function (result) {
                  Curry._1(dispatch, /* ReorderTodos */{
                        _0: result
                      });
                }),
              children: React.createElement(DroppableContainer.make, {
                    id: undefined,
                    axis: axis,
                    className: (function (draggingOver) {
                        return Cx.cx([
                                    "todos",
                                    draggingOver ? "active" : ""
                                  ]);
                      }),
                    children: Belt_Array.mapWithIndex(state.todosIndex, (function (index, id) {
                            var todo = Belt_Map.getExn(state.todosMap, id);
                            return React.createElement(DraggableItem.make, {
                                        id: todo.id,
                                        containerId: undefined,
                                        index: index,
                                        className: (function (dragging) {
                                            return Cx.cx([
                                                        "todo",
                                                        dragging ? "dragging" : ""
                                                      ]);
                                          }),
                                        children: {
                                          NAME: "Children",
                                          VAL: todo.title
                                        },
                                        key: Curry._1(TodoId.toString, todo.id)
                                      });
                          }))
                  })
            });
}

var make = SimpleList;

export {
  TodoId ,
  Todo ,
  Todos ,
  reducer ,
  make ,
}
/* TodoId Not a pure module */
