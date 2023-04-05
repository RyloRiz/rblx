import * as Util from '../util'

class OrderedDataStore {
	#apikey: string;
	uid: number;
	name: string;
	scope: string = "global";

	/**
	 * Create a new OrderedDataStore instance
	 * @param {number} uid UniverseId of the OrderedDataStore
	 * @param {string} name Name of the OrderedDataStore
	 * @param {string} scope Scope of the OrderedDataStore (only usable when calling the constructor)
	 */
	constructor(uid: number, name: string, scope: string = "global") {
		this.uid = uid;
		this.name = name;
		this.scope = scope;
	}

	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	async listEntries(maxPageSize: number, cursor: string, order: Util.OrderType, filter: string) {
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries` + Util.populateQuery({
			max_page_size: maxPageSize,
			page_token: cursor,
			order_by: order === 1 ? 'desc' : undefined,
			filter: filter
		});
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			let entries: Util.OrderedDataStoreListEntry[] = res.data.entries;
			let cursor: string | undefined = res.data.nextPageToken;
			let rt: {
				cursor: string | undefined,
				entries: Util.OrderedDataStoreListEntry[],
			} = {
				cursor: cursor,
				entries: entries,
			}
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async createEntry(id: string, value: number) {
		if (typeof id !== 'string') throw new Error("Id must be a string!");
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries` + Util.populateQuery({
			id: id
		});
		let res = await Util.octokit(url, {}, {
			method: 'POST',
			body: {
				value: value
			},
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': this.#apikey,
			}
		});
		if (res.status === 200) {
			let rt: Util.OrderedDataStoreListEntry = res.data;
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async getEntry(id: string) {
		if (typeof id !== 'string') throw new Error("Id must be a string!");
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries/${id}`;
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey,
			}
		});
		if (res.status === 200) {
			let rt: Util.OrderedDataStoreListEntry = res.data;
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async deleteEntry(id: string) {
		if (typeof id !== 'string') throw new Error("Id must be a string!");
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries/${id}`;
		let res = await Util.octokit(url, {}, {
			method: 'DELETE',
			headers: {
				'x-api-key': this.#apikey,
			}
		});
		if (res.status === 200) {
			return true;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async updateEntry(id: string, value: number, allowMissing: boolean = true) {
		if (typeof id !== 'string') throw new Error("Id must be a string!");
		if (typeof value !== 'number') throw new Error("Value must be a number!");
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries/${id}` + Util.populateQuery({
			allow_missing: allowMissing
		});
		let res = await Util.octokit(url, {}, {
			method: 'PATCH',
			body: {
				value: value
			},
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': this.#apikey,
			}
		});
		if (res.status === 200) {
			let rt: Util.OrderedDataStoreListEntry = res.data;
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async incrementEntry(id: string, amount: number) {
		if (typeof id !== 'string') throw new Error("Id must be a string!");
		if (typeof amount !== 'number') throw new Error("Value must be a number!");
		let url = Util.URIs.OrderedDataStore + `/${this.uid}/orderedDataStores/${this.name}/scopes/${this.scope}/entries/${id}:increment`;
		let res = await Util.octokit(url, {}, {
			method: 'POST',
			body: {
				amount: amount
			},
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': this.#apikey,
			}
		});
		if (res.status === 200) {
			let rt: Util.OrderedDataStoreListEntry = res.data;
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}
}

export default OrderedDataStore;