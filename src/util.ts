import axios, { Axios, AxiosResponse } from 'axios'

interface OctokitMiscellaneousParams {
	method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE',
	headers: any,
	data?: any,
	callback?: Function
}

const URIs = {
	DataStore: "https://apis.roblox.com/datastores/v1"
}

async function octokit(schema: string, params: any, misc: OctokitMiscellaneousParams = {
	method: 'GET',
	headers: {}
}): Promise<AxiosResponse<any, any>> {
	for (const [k,v] of Object.entries(params)) {
		if (schema.includes(`{${k}}`)) {
			schema.replaceAll(`{${k}}`, v as string);
		}
	}
	if (misc.method.match(/[(GET)(DELETE)]/)) {
		return await axios({
			url: schema,
			method: misc.method,
			headers: misc.headers
		});
	} else {
		return await axios({
			url: schema,
			method: misc.method,
			headers: misc.headers,
			data: misc.data
		});
	}
}

function populateQuery(list: any): string {
	let query = '';
	for (const [k,v] of Object.entries(list)) {
		if (v !== null && v !== undefined) {
			query += `${query.length === 0 ? '?' : '&'}${k.toString()}=${v.toString()}`;
		}
	}
	return query;
}

export {
	// Functions
	octokit as octokit,
	populateQuery as populateQuery,

	// Interfaces
	OctokitMiscellaneousParams as OctokitMiscellaneousParams,

	// Classes
	URIs as URIs
};