interface Birthdate {
	birthMonth: number,
	birthDay: number,
	birthYear: number
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

interface TradeOffer {
	userId: number,
	userAssetIds: number[],
	robux: number
}

export {
	Birthdate,
	EntryKey,
	EntryVersion,
	OctokitMiscellaneousParams,
	TradeOffer
}