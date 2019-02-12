import controllers from './controllers'
import { ru_ursip } from '../package.json'

function extract(controllers) {
  return Object.keys(controllers).reduce(
    (acc, key) => {
      acc.types[key] = controllers[key].types
      acc.actions[key] = controllers[key].actions
      acc.selectors[key] = controllers[key].stateSelector
      acc.reducers[key] = controllers[key].default

      return acc
    },
    {
      types: {},
      actions: {},
      selectors: {},
      reducers: {},
    },
  )
}

const { selectors, actions, reducers, types } = extract(controllers)
const name = ru_ursip.name

export default {
  name,
  types,
  actions,
  selectors,
  reducers,
}
