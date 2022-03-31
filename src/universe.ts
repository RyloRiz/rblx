import DataStore from './datastore'
import * as Util from './util'

class Universe {
	#apikey: string;
	id: number;

	constructor(id: number) {
		this.id = id;
	}

	// @WONTFIX No method for retrieving the API Key
	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	async getDatastores(limit?: number, prefix?: string, cursor?: string) {
		/* (
			prefix ?
			`?prefix=${prefix.toString()}` :
			''
		) + (
			limit ?
			`?limit=${limit.toString()}` :
			''
		) + (
			cursor ?
			`?cursor=${cursor.toString()}` :
			''
		) */
		let url = Util.URIs.DataStore + `/${this.id}/standard-datastores` + Util.populateQuery({
			prefix: prefix,
			limit: limit,
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
			let ds = res.data.datastores as any[];
			let rt: {
				datastores: DataStore[],
				previousPageCursor: string|null,
				nextPageCursor: string|null
			} = {
				datastores: [],
				previousPageCursor: previousCursor,
				nextPageCursor: nextCursor
			}
			ds.map((d) => {
				let ds = new DataStore(this.id, d.name);
				ds.authenticate(this.#apikey);
				rt.datastores.push(ds);
			});
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}
}

export default Universe;