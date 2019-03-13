import { success } from 'redux-saga-requests'
import { ru_ursip } from '../../package.json'

export const controller = 'rows'
const { name, context } = ru_ursip
const namespace = `${name}/${controller}`

/* Types */
const GET_ALL_BY_CATALOG_ID = `${namespace}/GET_ALL_BY_CATALOG_ID`
const CREATE_ROW = `${namespace}/CREATE_ROW`
const UPDATE_ROW = `${namespace}/UPDATE_ROW`
const DELETE_ROW = `${namespace}/DELETE_ROW`

export const types = {
  GET_ALL_BY_CATALOG_ID,
  CREATE_ROW,
  UPDATE_ROW,
  DELETE_ROW,
}

/* Action creators */
export const actions = {
  getAllByCatalogId(args = {}) {
    const { id, catalogId } = args.payload || {}
    return {
      type: GET_ALL_BY_CATALOG_ID,
      payload: {
        request: {
          url: `${context}/${controller}/getAllByCatalogId?catalogId=${catalogId}`,
        },
        catalogId,
      },
      meta: args.meta,
    }
  },
  createRow(args = {}) {
    const { newRow, catalogId } = args.payload || {}
    return {
      type: CREATE_ROW,
      payload: {
        request: {
          url: `${context}/${controller}/create`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRow),
        },
        catalogId
      },
      meta: args.meta,
    }
  },
  updateRow(args = {}) {
    const { updatedRow, catalogId } = args.payload || {}
    return {
      type: UPDATE_ROW,
      payload: {
        request: {
          url: `${context}/${controller}/update`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedRow),
        },
        catalogId,
      },
      meta: args.meta,
    }
  },
  deleteRow(args = {}) {
    const { deletedRow, catalogId } = args.payload || {}
    return {
      type: DELETE_ROW,
      payload: {
        request: {
          url: `${context}/${controller}/markDeleted`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deletedRow),
        },
        catalogId,
        keyToRemove: deletedRow.key,
      },
    }
  }
}

export const stateSelector = state => {
  return state[name] && state[name][controller]
}

/* reducer */
function reducer(state = {}, { type, payload, meta = {} }) {
  switch (type) {
    case success(GET_ALL_BY_CATALOG_ID): {
      return {
        ...state,
        [meta.requestAction.payload.catalogId]: payload.data
      }
    }

    case success(CREATE_ROW): {
      const slice = state[meta.requestAction.payload.catalogId] || []
      return {
        ...state,
        [meta.requestAction.payload.catalogId]: [...slice, payload.data]
      }
    }

    case success(UPDATE_ROW): {
      const slice = state[meta.requestAction.payload.catalogId]
      return {
        ...state,
        [meta.requestAction.payload.catalogId]: slice.map(row => row.key === payload.data.key ? payload.data : row)
      }
    }

    case success(DELETE_ROW): {
      const slice = state[meta.requestAction.payload.catalogId]
      const keyToRemove = meta.requestAction.payload.keyToRemove
      return {
        ...state,
        [meta.requestAction.payload.catalogId]: slice.filter(row => row.key !== keyToRemove),
      }
    }

    default:
      return state
  }
}

export default reducer
