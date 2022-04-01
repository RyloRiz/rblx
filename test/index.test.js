const dotenv = require('dotenv');
dotenv.config();

const assert = require('assert');
const crypto = require('crypto');

const { Universe } = require('../dist');
// const axios = require('axios').default;

let uni = new Universe(
	2471977469
	// 1873399482
);
uni.authenticate(process.env.RBXTKN);

describe('Universes', () => {

	it('should list datastores', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		console.log("Datastore Name:", dstore?.name);
		assert(dstore?.uid === uni.id, "DataStore id not identical to Universe id or DataStore doesn't exist")
	})

})

describe('DataStores', () => {

	it('should list keys', async () => {
		let dstore = await uni.getDatastores(1);
		let keys = await dstore.datastores[0].listKeys(5);
		console.log("Keys:", JSON.stringify(keys.keys));
		assert(keys.keys[0].scope, "Datastore should have keys")
	})

	it('should get values', async () => {
		let dstore = await uni.getDatastores(1);
		let val = await dstore.datastores[0].get(
			// 'User 1673261094\'s Value'
			// '1673261094'
			'hello'
		);
		console.log(`Value:`, val);
		assert(val !== null, "Value doesn't exist");
	})

	it('should set values', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let entryVersion = await dstore.set(
			// 'User 1673261094\'s Value'
			'hello'
			,
			// Math.ceil(Math.random() * 100)
			'newpassword'
		); // Originally 100
		console.log(`EntryVersion:`, JSON.stringify(entryVersion));
		assert(entryVersion !== null, "EntryVersion does not exist");
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