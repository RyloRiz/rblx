import fs from 'fs'
import FormData from 'form-data';
import * as Util from '../util'
import axios, { AxiosResponse } from 'axios';

const ContentTypes = {
	Audio: {
		mp3: 'audio/mp3',
		ogg: 'audio/ogg'
	},
	Decal: {
		png: 'image/png',
		jpeg: 'image/jpeg',
		bmp: 'image/bmp',
		tga: 'image/tga',
	},
	Model: {
		fbx: 'model/fbx'
	}
}

class AssetManager {
	#apikey: string;
	id: number;
	isGroup: boolean;

	/**
	 * Create a new AssetManager
	 * @param {number} id UserId or GroupId of the AssetManager
	 * @param {number} isGroup Whether this AssetManager is for a User or Group
	 */
	private constructor(id: number, isGroup: boolean = false) {
		this.id = id;
		this.isGroup = isGroup;
	}

	/**
	 * Create a new AssetManager for a User
	 * @param {number} userId UserId of the AssetManager
	 */
	static User(userId: number) {
		return new AssetManager(userId);
	}

	/**
	 * Create a new AssetManager for a Group
	 * @param {number} groupId GroupId of the AssetManager
	 */
	static Group(groupId: number) {
		return new AssetManager(groupId, true);
	}

	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	async createAsset(assetType: Util.AssetType, filePath: string, name: string, desc: string = "Description") {
		if (typeof assetType !== 'string') throw new Error("AssetType must be specified!");
		if (typeof name !== 'string') throw new Error("Name must be a string!");
		if (typeof filePath !== 'string') throw new Error("File path must be a string!");

		let split = filePath.includes('\\') ? filePath.split('\\') : filePath.split('/');
		let fNameExt = split[split.length - 1];
		let creator: Util.CreationContext = this.isGroup ? {
			groupId: this.id.toString()
		} : {
			userId: this.id.toString()
		};

		let fileContent = fs.readFileSync(filePath);
		let reqData = {
			assetType: assetType,
			creationContext: {
				creator: creator
			},
			description: desc,
			displayName: name,
		};

		const form = new FormData();
		form.append("request", JSON.stringify(reqData));
		form.append("fileContent", fileContent, fNameExt);

		const res = await axios.post<string, AxiosResponse<any, any>, FormData>(
			'https://apis.roblox.com/assets/v1/assets',
			form,
			{
				headers: {
					...form.getHeaders(),
					'x-api-key': this.#apikey
				},
				validateStatus: () => true,
			}
		);

		if (res.status === 200) {
			let rt: Util.AssetOperation = res.data;
			rt.operationId = rt.path.split('/')[1];
			return rt;
		} else {
			if (res.data.message === 'AssetName is moderated.') throw new Error(`The name ${name} was moderated by Roblox!`);
			console.error(res.status, res.statusText);
		}
	}

	async getOperation(id: string) {
		if (typeof id !== 'string') throw new Error("Operation id must be specified!");

		let url = Util.URIs.Asset + `/operations/${id}`;
		let res = await Util.octokit(url, {}, {
			method: 'GET',
			headers: {
				'x-api-key': this.#apikey
			}
		});
		if (res.status === 200) {
			let rt: Util.Asset = res.data;
			return rt;
		} else {
			console.error(res.status, res.statusText);
		}
	}

	async updateAsset(assetId: number, filePath: string) {
		if (typeof assetId !== 'number') throw new Error("AssetId must be a number!");
		if (typeof filePath !== 'string') throw new Error("File path must be a string!");

		let split = filePath.includes('\\') ? filePath.split('\\') : filePath.split('/');
		let fNameExt = split[split.length - 1];

		let fileContent = fs.readFileSync(filePath);
		let reqData = {
			assetId: assetId
		};

		let form = new FormData()
		form.append("request", JSON.stringify(reqData));
		form.append('fileContent', fileContent, fNameExt);

		const res = await axios.patch<string, AxiosResponse<any, any>, FormData>(
			'https://apis.roblox.com/assets/v1/assets',
			form,
			{
				headers: {
					...form.getHeaders(),
					'x-api-key': this.#apikey
				},
				validateStatus: () => true,
			}
		);

		if (res.status === 200) {
			let rt: Util.AssetOperation = res.data;
			return rt;
		} else {
			console.log("Only Models can be updated at this time!");
			console.error(res);
		}
	}
}

export default AssetManager;