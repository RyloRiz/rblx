const dotenv = require('dotenv');
dotenv.config();

const assert = require('assert');

const { Universe } = require('../dist');
// const axios = require('axios').default;

let uni = new Universe(1873399482);
uni.authenticate(process.env.RBXTKN);

describe('Universes', () => {

	it('should list datastores', async () => {
		let dstore = await uni.getDatastores(1);
		assert(dstore.datastores[0]?.uid === uni.id, "DataStore id not identical to Universe id or DataStore doesn't exist")
	})

})

describe('DataStores', () => {

	it('should list keys', async () => {
		let dstore = await uni.getDatastores(1);
		let keys = await dstore.datastores[0].listKeys(1);
		console.log(JSON.stringify(keys));
	})

})

// let res = await axios.get('https://apis.roblox.com/datastores/v1/1873399482/standard-datastores?scope=global', {
		// 	headers: {
		// 		'x-api-key': process.env.RBXTKN
		// 	}
		// });
		// console.log(JSON.stringify(res.status));
		// console.log(JSON.stringify(res.statusText));
		// console.log(JSON.stringify(res.headers));
		// console.log(JSON.stringify(res.data));