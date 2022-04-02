import * as fs from 'fs';

import DataStore from './datastore'
import * as Util from './util'

async function modifyPlace(apikey: string, uid: number, pid: number, versionType: 'Saved'|'Published', pathToFile: string) {
	// File verification
	let exists = fs.existsSync(pathToFile);
	if (!exists) {
		console.error('File does not exist!');
	}

	let url = Util.URIs.PlaceManagement + Util.populateQuery({
		versionType: versionType
	});
	let res = await Util.octokit(url, {
		universeId: uid,
		placeId: pid
	}, {
		method: 'POST',
		headers: {
			'x-api-key': apikey,
			'Content-Type': 'application/octet-stream'
		},
		body: fs.readFileSync(pathToFile)
	});
	if (res.status === 200) {
		return res.data;
	} else {
		console.error(res.status, res.statusText);
	}
}

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

	async save(placeId: number, pathToFile: string) {
		return await modifyPlace(this.#apikey, this.id, placeId, 'Saved', pathToFile);
	}

	async publish(placeId: number, pathToFile: string) {
		return await modifyPlace(this.#apikey, this.id, placeId, 'Published', pathToFile);
	}
}

export default Universe;