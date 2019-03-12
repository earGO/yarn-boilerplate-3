import { success } from 'redux-saga-requests'
import { createSelector } from 'reselect'
import { ru_ursip } from '../../package.json'

export const controller = 'catalogs'
const { name, context } = ru_ursip

const namespace = `${name}/${controller}`

/* Types */
const GET_ALL = `${namespace}/GET_ALL`
const CREATE = `${namespace}/CREATE`
const MARK_DELETED = `${namespace}/MARK_DELETED`
const UPDATE = `${namespace}/UPDATE`

export const types = {
  GET_ALL,
  CREATE,
  MARK_DELETED,
  UPDATE,
}

/* Action creators */
export const actions = {
  getAll(args = {}) {
    return {
      type: GET_ALL,
      payload: {
        request: {
          url: `${context}/${controller}/getAll`,
        },
      },
      meta: args.meta,
    }
  },

  create(args = {}) {
    return {
      type: CREATE,
      payload: {
        request: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          url: `${context}/${controller}/create`,
          body: JSON.stringify(args.payload),
        },
      },
      meta: args.meta,
    }
  },

  markDeleted(args = {}) {
    return {
      type: MARK_DELETED,
      payload: {
        request: {
          method: 'POST',
          url: `${context}/${controller}/markDeleted`,
          body: args.payload,
        },
      },
      meta: args.meta,
    }
  },

  update(args = {}) {
    return {
      type: UPDATE,
      payload: {
        request: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          url: `${context}/${controller}/update`,
          body: JSON.stringify(args.payload),
        },
      },
      meta: args.meta,
    }
  },
}

export const stateSelector = state => {
  return state[name] && state[name][controller]
}

const id = (_, id) => id

const getCatalogById = createSelector(
  stateSelector,
  id,
  (catalogsList, id) => (catalogsList || []).find(item => item.id === id) || {}
)

export const reselectors = {
  getCatalogById,
}

/* reducer */
export default function reducer(state = [], { type, payload, meta = {} }) {
  switch (type) {
    case success(GET_ALL):
      return meta.normalize && typeof meta.normalize === 'function' ? meta.normalize(payload.data) : payload.data
    case success(CREATE): {
      // #Пиздос
      // Я хз, это какое то говно
      // Короче, вот поэтому клепать дефолтный уи без своих sagas в nsi-ui - не очень выйдет.
      // Банально негде запихнуть вот этот redirect на страницу справочника после создания.
      // Конечно, если делать все виджетами, и держать логику не в nsi-ui, а в app, такой траблы не будет.
      // Но тогда мне не очень понятно, как писать сами компоненты. Будет очень сложно, как мне кажется.
      // meta.onSuccess === (catalogId) => history.push(`/nsi/${catalogId}`)
      setTimeout(() => { meta.onSuccess && meta.onSuccess(payload.data.id) }, 0)
      return [ ...state, payload.data ]
    }
    case success(UPDATE):
      return state.map(item => item.id === payload.data.id ? payload.data : item)
    default:
      return state
  }
}
