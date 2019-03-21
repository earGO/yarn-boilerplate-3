import { success } from 'redux-saga-requests'
import { createSelector } from 'reselect'
import { ru_ursip } from '../../package.json'
import produce from 'immer'

export const controller = 'elements'
const { name, context } = ru_ursip
const namespace = `${name}/${controller}`
const emptyList = [];
/* Types */
const GET_ALL_BY_CATALOG_ID = `${namespace}/GET_ALL_BY_CATALOG_ID`

export const types = {
  GET_ALL_BY_CATALOG_ID,
}

/* Action creators */
export const actions = {
  getAllByCatalogId(args = {}) {
    const { catalogId, attributeId } = args.payload || {}
    return {
      type: GET_ALL_BY_CATALOG_ID,
      payload: {
        request: {
          url: `${context}/${controller}/getAllByCatalogId?id=${catalogId}&attrId=${attributeId}`,
        },
        catalogId,
        attributeId,
      },
      meta: args.meta,
    }
  },
}

export const stateSelector = state => {
  return state[name] && state[name][controller]
}

const id = (_, id) => id;
const extraId = (_, __, id) => id;

export const getByCatalogAndAttribute = createSelector(
  stateSelector,
  id,
  extraId,
  (state, catalogId, attributeId) => {
    if (state[catalogId]) {
      return state[catalogId][attributeId]
    }
    return emptyList
  }
)

export const reselectors = {
  getByCatalogAndAttribute,
}

/* reducer */
function reducer(state = {}, { type, payload, meta = {} }) {
  switch (type) {
    case success(GET_ALL_BY_CATALOG_ID): {
      const { catalogId, attributeId } = meta.requestAction.payload
      return produce(state, draft => {
        if (draft[catalogId] === undefined) {
          draft[catalogId] = {};
        }
        draft[catalogId][attributeId] = payload.data;
      })
    }

    default:
      return state
  }
}

export default reducer
