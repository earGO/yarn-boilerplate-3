import { success } from 'redux-saga-requests'
import { ru_ursip } from '../../package.json'

export const controller = 'elements'
const { name, context } = ru_ursip
const namespace = `${name}/${controller}`

/* Types */
const GET_ALL_BY_CATALOG_ID = `${namespace}/GET_ALL_BY_CATALOG_ID`

export const types = {
  GET_ALL_BY_CATALOG_ID,
}

/* Action creators */
export const actions = {
  getAllByCatalogId(args = {}) {
    const { id, attrId } = args.payload || {}
    return {
      type: GET_ALL_BY_CATALOG_ID,
      payload: {
        request: {
          url: `${context}/${controller}/getAllByCatalogId?id=${id}&attrId=${attrId}`,
        },
      },
      meta: args.meta,
    }
  },
}

export const stateSelector = state => {
  return state[name] && state[name][controller]
}

/* reducer */
function reducer(state = {}, { type, payload, meta = {} }) {
  switch (type) {
    case success(GET_ALL_BY_CATALOG_ID):
      return meta.normalize ? meta.normalize(payload.data) : payload.data

    default:
      return state
  }
}

export default reducer
