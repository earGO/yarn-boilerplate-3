import * as types from './types';

/* It preselects tab on first loading of a project */
export const preselectTab = (tabs, selectedTab) => {
	return {
		type: types.PRESELECT_TAB,
		payload: {tabs: tabs, selectedTab: selectedTab}
	};
};
