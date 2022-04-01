import axios, { AxiosResponse } from 'axios'

enum ErrLevel {
	None,
	Info,
	Warning,
	Error,
	Critical
}

interface EntryKey {
	scope: string;
	key: string;
}

interface EntryVersion {
	version: string,
	deleted: boolean,
	contentLength: number,
	createdTime: string,
	objectCreatedTime: string
}

interface OctokitMiscellaneousParams {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	headers: any,
	body?: any,
	callback?: Function
}

const URIs = {
	DataStore: "https://apis.roblox.com/datastores/v1"
}

async function octokit(schema: string, params: any, misc: OctokitMiscellaneousParams = {
	method: 'GET',
	headers: {}
}): Promise<AxiosResponse<any, any>> {
	for (const [k, v] of Object.entries(params)) {
		if (schema.includes(`{${k}}`)) {
			schema.replaceAll(`{${k}}`, v as string);
		}
	}
	console.log(schema);
	try {
		if (misc.method.match(/[(GET)(DELETE)]/)) {
			return await axios({
				url: schema,
				method: misc.method,
				headers: misc.headers,
			});
		} else {
			return await axios({
				url: schema,
				method: misc.method,
				headers: misc.headers,
				data: misc.body
			});
		}
	} catch (e) {
		throw e;
	}
}

function populateQuery(list: any): string {
	let query = '';
	for (const [k, v] of Object.entries(list)) {
		if (v !== null && v !== undefined) {
			query += `${query.length === 0 ? '?' : '&'}${k.toString()}=${v.toString()}`;
		}
	}
	return query;
}

export {
	// Enums
	ErrLevel as ErrLevel,

	// Functions
	octokit as octokit,
	populateQuery as populateQuery,

	// Interfaces
	EntryKey as EntryKey,
	EntryVersion as EntryVersion,
	OctokitMiscellaneousParams as OctokitMiscellaneousParams,

	// Classes/Misc
	URIs as URIs
};