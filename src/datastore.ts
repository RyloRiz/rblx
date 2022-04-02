import crypto from 'crypto'
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
			let rt: {
				keys: Util.EntryKey[],
				previousPageCursor: string|null,
				nextPageCursor: string|null
			} = {
				keys: res.data.keys as Util.EntryKey[],
				previousPageCursor: previousCursor,
				nextPageCursor: nextCursor
			}
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async get(key: string) {
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope,
			entryKey: key
		});
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			return res.data;
		} else if (res.status === 204) {
			return {
				level: Util.ErrLevel.Warning,
				message: `Key ${key} is marked as removed/deleted`
			}
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async set(key: string, value: any = null, exclusiveCreate?: boolean, matchVersion?: string) {
		let jsonData = JSON.stringify(value);
		let checksum = crypto.createHash('md5').update(jsonData).digest('base64');
		// console.log(key, value);
		// console.log(jsonData);
		// console.log(checksum);
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope === 'global' ? undefined : this.scope,
			entryKey: key,
			exclusiveCreate: exclusiveCreate,
			matchVersion: !exclusiveCreate ? matchVersion : undefined
		});
		// const headers = {
		// 	'x-api-key': this.#apikey,
		// 	'content-type': 'application/json',
		// 	'content-md5': checksum,
		// 	'roblox-entry-userids': '[]',
		// 	'roblox-entry-attributes': JSON.stringify({})
		// }
		// console.log(JSON.stringify(headers));
		let res = await Util.octokit(url, {}, {
			method: 'POST',
			body: jsonData,
			headers: {
				'x-api-key': this.#apikey,
				'content-type': 'application/json',
				// 'Content-Type': 'application/json; charset=UTF-8',
				'content-md5': checksum,
				// 'roblox-entry-userids': JSON.stringify([]),
				// 'roblox-entry-attributes': JSON.stringify({})
			}
		});
		if (res.status === 200) {
			return res.data as Util.EntryVersion;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async increment(key: string, incrementBy: number = 1) {
		// let jsonData = JSON.stringify(value);
		// let checksum = crypto.createHash('md5').update(jsonData).digest('base64');
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry/increment` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope === 'global' ? undefined : this.scope,
			entryKey: key,
			incrementBy: incrementBy
		});
		let res = await Util.octokit(url, {}, {
			method: 'POST',
			body: {},
			headers: {
				'x-api-key': this.#apikey,
				'content-type': 'application/json',
				'content-length': '0',
				// 'Content-Type': 'application/json; charset=UTF-8',
				// 'content-md5': checksum,
				// 'roblox-entry-userids': JSON.stringify([]),
				// 'roblox-entry-attributes': JSON.stringify({})
			}
		});
		if (res.status === 200) {
			return res.data as Util.EntryVersion;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async delete(key: string) {
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope === 'global' ? undefined : this.scope,
			entryKey: key
		});
		let res = await Util.octokit(url, {}, {
			method: 'DELETE',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 204) {
			return res.data;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async listVersions(key: string, limit: number = 1, sortOrder: 'Ascending'|'Descending' = 'Ascending', cursor?: string, startTime?: string, endTime?: string) {
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry/versions` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope === 'global' ? undefined : this.scope,
			entryKey: key,
			limit: limit,
			sortOrder: sortOrder,
			cursor: cursor,
			startTime: startTime,
			endTime: endTime
		});
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			let rt: {
				versions: Util.EntryVersion[];
				previousPageCursor: string|null;
				nextPageCursor: string | null;
			} = {
				versions: res.data.versions as Util.EntryVersion[],
				previousPageCursor: res.data.previousPageCursor,
				nextPageCursor: res.data.nextPageCursor
			}
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async getVersion(key: string, versionId: string) {
		let url = Util.URIs.DataStore + `/${this.uid}/standard-datastores/datastore/entries/entry/versions/version` + Util.populateQuery({
			datastoreName: this.name,
			scope: this.scope === 'global' ? undefined : this.scope,
			entryKey: key,
			versionId: versionId
		});
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			return res.data;
		} else if (res.status === 204) {
			return {
				level: Util.ErrLevel.Warning,
				message: `Key ${key} is marked as removed/deleted`
			}
		} else {
			console.error(res.status, res.statusText);
		}
	}
}

export default DataStore;