import { injectReducer } from '@ursip/utils'
import { combineReducers } from 'redux'

export function arrayToTree(items, config = { id: 'key', parentId: 'parentId' }) {
  const rootItems = [];
  const lookup = {};
  for (let i = 0, _items = items; i < _items.length; i++) {
    const item = _items[i];
    const itemId = item[config.id];
    const parentId = item[config.parentId];
    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      lookup[itemId] = { data: null, children: [] };
    }
    lookup[itemId].data = item;
    const treeItem = lookup[itemId];
    if (parentId === null || parentId === '' || !parentId) {
      rootItems.push(treeItem);
    } else {
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        lookup[parentId] = { data: null, children: [] };
      }
      lookup[parentId].children.push(treeItem);
    }
  }
  const unnestData = (item) => {
    return {
      ...item.data,
      children: item.children && item.children.length ? item.children.map(unnestData) : [],
    }
  }
  const removeChildrenProp = ({ children, ...rest}) => {
    return children.length === 0 ? { ...rest } : { children: children.map(removeChildrenProp), ...rest}
  }
  let niceFormat = rootItems.map(unnestData).map(removeChildrenProp)
  return {
    rootItems: niceFormat,
    lookup,
  };
}

export const simpleInject = (item) => injectReducer({
  key: item.name,
  reducer: combineReducers(item.reducers),
})


export const SORTERS = {
  string: (a, b) => {
    if (typeof a !== 'string') {
      return 1
    }
    if (typeof b !== 'string') {
      return -1
    }
    return b.localeCompare(a)
  },
  number: (a, b) => b - a,
  date: (a, b) => {
    // moment here?
    // temp
    return b - a;
  },
  // Хз как сортировать по этому полю.
  ref_link: () => {},
  boolean: (a, b) => Number(b) - Number(a),
}