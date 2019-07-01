import { endpoints } from '../../../services/project-card'
import * as types from './types'

export const selectTab = (tabs, selectedTab) => {
  return {
    type: types.SELECT_TAB,
    payload: { tabs: tabs, selectedTab: selectedTab },
  }
}
