const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
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

	it('should publish', async () => {
		let uniForPM = new Universe(3470458899);
		uniForPM.authenticate(process.env.RBXTKN);

		let p = path.join(__dirname, 'new.rbxl');
		let versionId = await uniForPM.publish(9265551929, p, 'Published');
		console.log('Version Id:', versionId);
		assert(versionId !== null, "VersionId is null");
	})

})

describe('DataStores', () => {

	it('should list keys', async () => {
		let dstore = await uni.getDatastores(1);
		let keys = await dstore.datastores[0].listKeys(5);
		console.log("Keys:", JSON.stringify(keys.keys));
		assert(keys.keys[0].scope, "Datastore should have keys")
	})

	it('should create values', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let entryVersion = await dstore.set('testing', 1, true);
		console.log(`EntryVersion:`, JSON.stringify(entryVersion));
		assert(entryVersion !== null, "EntryVersion does not exist");
	})

	it('should get values', async () => {
		let dstore = await uni.getDatastores(1);
		let val = await dstore.datastores[0].get(
			'testing'
		);
		console.log(`Value:`, val);
		assert(val !== null, "Value doesn't exist");
	})

	it('should set values', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let entryVersion = await dstore.set('testing', 750); // orig 750
		console.log(`EntryVersion:`, JSON.stringify(entryVersion));
		assert(entryVersion !== null, "EntryVersion does not exist");
	})

	it('should increment values', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let entryVersion = await dstore.increment('testing', 150);
		console.log(`EntryVersion:`, JSON.stringify(entryVersion));
		assert(entryVersion !== null, "EntryVersion does not exist");
	})


	it('should delete values', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		dstore.delete('testing');
	})

	it('should list versions', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let ver = await dstore.listVersions('testing');
		console.log("Version:", ver);
		assert(ver !== null, "Version does not exist");
	})

	it('should get versions', async () => {
		let dstore = (await uni.getDatastores(1)).datastores[0];
		let verData = await dstore.getVersion('testing', '08DA148634E1EBC4.0000000001.08DA148634E1EBC4.01');
		console.log("Version Data:", verData);
		assert(verData !== null, "Version Data does not exist");
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