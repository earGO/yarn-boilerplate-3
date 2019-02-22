import controllers from './controllers'
import { ru_ursip } from '../package.json'

function extract(controllers) {
  return Object.keys(controllers).reduce(
    (acc, key) => {
      acc.types[key] = controllers[key].types
      acc.actions[key] = controllers[key].actions
      acc.selectors[key] = controllers[key].stateSelector
      acc.reducers[key] = controllers[key].default
      acc.reselectors[key] = controllers[key].reselectors

      return acc
    },
    {
      types: {},
      actions: {},
      selectors: {},
      reducers: {},
      reselectors: {},
    },
  )
}

const { selectors, actions, reducers, types, reselectors } = extract(controllers)
const name = ru_ursip.name

export default {
  reselectors,
  name,
  types,
  actions,
  selectors,
  reducers,
}
