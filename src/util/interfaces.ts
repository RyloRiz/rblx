import type FormData from 'form-data'

type ProtobufAnyIdentifier = `${string}/${string}`;

interface Asset {
	assetType: number,
	assetId: number,
	creationContext: CreationContext,
	description: string,
	displayName: string,
	path: string,
	revisionId: string,
	revisionCreateTime: string
}

interface AssetOperation {
	done: boolean,
	error: AssetStatus,
	metadata: ProtobufAny,
	operationId: string,
	path: string,
	response: ProtobufAny
}

interface AssetStatus {
	code: number,
	details: ProtobufAny[],
	message: string
}

interface Birthdate {
	birthMonth: number,
	birthDay: number,
	birthYear: number
}

interface CreationContext {
	groupId?: string,
	userId?: string
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

interface ProtobufAny {
	'@type': ProtobufAnyIdentifier;
	[key: string]: string;
}

interface TradeOffer {
	userId: number,
	userAssetIds: number[],
	robux: number
}

export {
	Asset,
	AssetOperation,
	AssetStatus,
	Birthdate,
	CreationContext,
	EntryKey,
	EntryVersion,
	LimitOptions,
	OctokitMiscellaneousParams,
	OrderedDataStoreListEntry,
	ProtobufAny,
	TradeOffer
}