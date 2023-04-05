import FormData from 'form-data';
import * as Util from '../util'

const ContentTypes = {
	Audio: {
		mp3: 'audio/mp3',
		ogg: 'audio/ogg'
	},
	Decal: {
		'png': 'image/png',
		'jpeg': 'image/jpeg',
		'bmp': 'image/bmp',
		'tga': 'image/tga',
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

	static User(userId: number) {
		return new AssetManager(userId);
	}

	static Group(groupId: number) {
		return new AssetManager(groupId, true);
	}

	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	async createAsset(assetType: Util.AssetType, name: string, desc: string = "Description") {
		if (typeof assetType !== 'string') throw new Error("AssetType must be specified!");
		if (typeof name !== 'string') throw new Error("Name must be a string!");
		let url = Util.URIs.Asset + `/assets`;
		let formData = new FormData();
		let creator = this.isGroup ? {
				groupId: this.id
			} : {
				userId: this.id
			};
		formData.append("request", {
			assetType: assetType,
			displayName: name,
			description: desc,
			creationContext: {
				creator: creator
			}
		});
		formData.append("fileContent", "", {
			contentType: 'model/fbx'
		})
		let res = await Util.octokit(url, {}, {
			method: 'POST',
			formData: formData,
			headers: {
				'x-api-key': this.#apikey
			}
		});
	}
}