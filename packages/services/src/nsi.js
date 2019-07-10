import {success, error} from 'redux-saga-requests';
import pkg from '../../package.json';
import capitlizeObjectKeys from '../utils/capitlizeObjectKeys';
// import mock from './nsi-mock.json'

const name = 'ursip-nsi-service';
export const api = pkg.ru_ursip.services[name];

/* Types */
const LOAD_DICTS = `${name}/LOAD_DICTS`;
const LOAD_DICT_ELEMENTS = `${name}/LOAD_DICT_ELEMENTS`;
const SAVE_DICT = `${name}/SAVE_DICT`;
const SAVE_DICT_ROW = `${name}/SAVE_DICT_ROW`;
const MAKE_REPORT = `${name}/MAKE_REPORT`;

const types = {
	LOAD_DICTS,
	LOAD_DICT_ELEMENTS,
	SAVE_DICT_ROW,
	SAVE_DICT,
	MAKE_REPORT
};

function shittylize(data) {
	const {attributes, ...rest} = data;
	return {
		...rest,
		context:
			data.context === true || data.context === 'SYSTEM'
				? 'SYSTEM'
				: 'COMMON',
		deleted: Number(data.deleted) || 0,
		hierarchyDict: Number(data.hierarchy) || 0,
		metaAttrs: attributes.map(
			({link, array, deleted, required, unique, type, ...attr}) => ({
				...attr,
				typeAttr: type,
				nickDictLink: link || null,
				arrayAttr: Number(array) || 0,
				deleted: Number(deleted) || 0,
				required: Number(required) || 0,
				unique: Number(unique) || 0
			})
		)
	};
}

function shittylizeElement({deleted, values, ...data}) {
	return {
		...data,
		deleted: Number(deleted),
		values: values.map(({deleted, value, nick, ...rest}) => ({
			...rest,
			nickAttr: nick,
			deleted: Number(deleted),
			value: value || null
		}))
	};
}

/* Action creators */
const actions = {
	loadAllDicts() {
		return {
			type: types.LOAD_DICTS,
			payload: {
				request: {
					url: `${api}/nsi/meta/dict`
				}
			}
		};
	},
	loadElements(nick) {
		return {
			type: types.LOAD_DICT_ELEMENTS,
			payload: {
				request: {
					url: `${api}/nsi/dict/${nick}`
				}
			}
		};
	},
	metaDictSave(dict) {
		return {
			type: types.SAVE_DICT,
			payload: {
				request: {
					url: `${api}/nsi/meta/dict/save`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						capitlizeObjectKeys({
							metaDict: {
								transfer: 0,
								...shittylize(dict)
							}
						})
					)
				}
			}
		};
	},
	saveDictRow(data, nickDict) {
		return {
			type: types.SAVE_DICT_ROW,
			payload: {
				request: {
					url: `${api}/nsi/dict/save`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						capitlizeObjectKeys({
							valueDict: {
								nickDict,
								element: [shittylizeElement(data)]
							}
						})
					)
				}
			}
		};
	},
	makeReport(nick) {
		return {
			type: types.MAKE_REPORT,
			payload: {nick}
		};
	}
};

/**
 * Fuk u
 * */
function normalize(response) {
	const data = Array.isArray(response) ? response : [response];
	console.log(data);
	return data.map(
		({
			elements,
			metaAttributes,
			metaAttrs,
			nsiMetaAttrs,
			deleted,
			hierarchyDict,
			transfer,
			...rest
		}) => {
			return {
				...rest,
				deleted: Boolean(deleted),
				hierarchy: Boolean(hierarchyDict),
				transfer: Boolean(transfer),
				elements: (elements || []).map(
					({deleted, values, id, ...rest}) => ({
						...rest,
						elementId: id,
						deleted: Boolean(deleted),
						values: values.map(
							({deleted, valueAttr, value, ...rest}) => ({
								...rest,
								deleted: Boolean(deleted),
								value: value || valueAttr
							})
						)
					})
				),
				attributes: (
					metaAttributes ||
					metaAttrs ||
					nsiMetaAttrs ||
					[]
				).map(
					({
						typeAttr,
						arrayAttr,
						required,
						deleted,
						unique,
						nickDictLink,
						...rest
					}) => ({
						...rest,
						type: typeAttr,
						link: nickDictLink,
						array: Boolean(arrayAttr),
						required: Boolean(required),
						deleted: Boolean(deleted),
						unique: Boolean(unique)
					})
				)
			};
		}
	);
}

/* reducer */
export default function reducer(dicts = [], {type, payload}) {
	switch (type) {
		case success(types.LOAD_DICTS):
			return dicts.concat(normalize(payload.data));

		case success(types.SAVE_DICT):
			return dicts.map(dict => {
				if (dict.nick === payload.data.nick) {
					return normalize([payload.data])[0];
				}

				return dict;
			});

		case success(types.LOAD_DICT_ELEMENTS): {
			const isExists = dicts.find(
				dict => dict.nick === payload.data.dict.nick
			);

			if (isExists) {
				return dicts.map(dict => {
					if (dict.nick === payload.data.dict.nick) {
						console.log(normalize([payload.data.dict])[0]);
						return normalize([payload.data.dict])[0];
					}

					return dict;
				});
			} else {
				return dicts.concat(normalize([payload.data.dict])[0]);
			}
		}

		case error(types.LOAD_DICTS):
		default:
			return dicts;
	}
}

export {name, types, actions};
