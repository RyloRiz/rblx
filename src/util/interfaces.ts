import type FormData from 'form-data'

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

interface LimitOptions {
	limit: number,
	useV2Limit: boolean
}

interface OctokitMiscellaneousParams {
	body?: any,
	callback?: Function,
	formData?: FormData,
	headers: any,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
}

interface OrderedDataStoreListEntry {
	id: string,
	path: string,
	value: string
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
	LimitOptions,
	OctokitMiscellaneousParams,
	OrderedDataStoreListEntry,
	TradeOffer
}