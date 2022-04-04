import axios, { AxiosResponse } from 'axios'

enum ErrLevel {
	None,
	Info,
	Warning,
	Error,
	Critical
}

enum Gender {
	Male,
	Female
}

enum PromotionChannelPrivacy {
	NoOne,
	Friends,
	FriendsAndFollowing,
	FriendsAndFollowingAndFollowers,
	AllUsers
}

enum TradeStatus {
	Completed,
	Inactive,
	Inbound,
	Outbound
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
	DataStore: "https://apis.roblox.com/datastores/v1",
	PlaceManagement: "https://apis.roblox.com/universes/v1/{universeId}/places/{placeId}/versions"
}

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

export {
	// Enums
	ErrLevel,
	Gender,
	PromotionChannelPrivacy,
	TradeStatus,

	// Functions
	octokit,
	populateQuery,

	// Interfaces
	EntryKey,
	EntryVersion ,
	OctokitMiscellaneousParams,

	// Classes/Misc
	URIs
};