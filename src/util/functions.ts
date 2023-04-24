import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
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
			let arg = {
				url: schema,
				method: misc.method,
			}
			if (misc.formData) {
				arg['data'] = misc.formData;
				arg['headers'] = misc.formData.getHeaders();
				for (const [k,v] of Object.entries(misc.headers)) {
					arg['headers'][k] = v;
				}
			} else {
				arg['data'] = misc.body;
				arg['headers'] = misc.headers;
			}
			response = await axios(arg);
		}
		return response;
	} catch (e) {
		throw e;
	}
}

function populateQuery(list: any): string {
	let query = '';
	for (const [k, v] of Object.entries(list)) {
		// console.log(k, v, typeof k, typeof v);
		if (v !== null && v !== undefined) {
			query += `${query.length === 0 ? '?' : '&'}${k.toString()}=${v.toString()}`;
		}
	}
	return query;
}

function err(obj: any) {
	obj = obj.toJSON();
	console.error(obj.stack);
	console.error("Config", obj.config);
}

export {
	octokit,
	populateQuery,
	err
}