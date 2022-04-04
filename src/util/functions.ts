import axios, { AxiosResponse } from 'axios'
import { OctokitMiscellaneousParams } from './'

async function octokit(schema: string, params: any, misc: OctokitMiscellaneousParams = {
	method: 'GET',
	headers: {}
}): Promise<AxiosResponse<any, any>> {
	for (const [k, v] of Object.entries(params)) {
		if (schema.includes(`{${k}}`)) {
			schema = schema.replaceAll(`{${k}}`, v as string);
		}
	}
	// console.log(JSON.stringify(misc.body));
	// console.log(JSON.stringify(misc.headers));
	try {
		let response: AxiosResponse<any, any>;
		if (misc.method.match(/GET|DELETE/)) {
			response = await axios({
				url: schema,
				method: misc.method,
				headers: misc.headers,
			});
		} else {
			response = await axios({
				url: schema,
				method: misc.method,
				headers: misc.headers,
				data: misc.body
			});
		}
		return response;
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

function err(obj) {
	obj = obj.toJSON();
	console.error(obj.stack);
	console.error("Config", obj.config);
}

export {
	octokit,
	populateQuery,
	err
}