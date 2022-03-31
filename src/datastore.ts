import * as Util from './util'

class DataStore {
	#apikey: string;
	uid: number;
	name: string;
	scope: string = "global";

	/**
	 * Create a new DataStore instance
	 * @param {number} uid UniverseId of the DataStore
	 * @param {string} name Name of the DataStore
	 * @param {string} scope Scope of the DataStore (only usable when calling the DataStore constructor)
	 */
	constructor(uid: number, name: string, scope: string = "global") {
		this.uid = uid;
		this.name = name;
		this.scope = scope;
	}

	// @WONTFIX No method for retrieving the API Key
	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	async listKeys(limit?: number, allScopes?: boolean, prefix?: string, cursor?: string) {
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope,
			limit: limit,
			allScopes: allScopes,
			prefix: prefix,
			cursor: cursor
		});
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			let previousCursor = res.data.previousPageCursor;
			let nextCursor = res.data.nextPageCursor;
			// let ds = res.data.datastores as any[];
			// let rt: {
			// 	datastores: DataStore[],
			// 	previousPageCursor: string|null,
			// 	nextPageCursor: string|null
			// } = {
			// 	datastores: [],
			// 	previousPageCursor: previousCursor,
			// 	nextPageCursor: nextCursor
			// }
			// ds.map((d) => {
			// 	rt.datastores.push(new DataStore(this.id, d.name))
			// });
			// return rt;
			return res.data;
		} else {
			console.error(res.status, res.statusText);
		}
	}
}

export default DataStore;