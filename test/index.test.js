const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const assert = require('assert');
const crypto = require('crypto');

const { OpenCloudAssetManager, OpenCloudUniverse } = require('../dist');
const { AssetType } = require('../dist/util');
// const axios = require('axios').default;

let uni = new OpenCloudUniverse(
	3638269484
	// 1873399482
);
uni.authenticate(process.env.RBXTKN);

let manager = OpenCloudAssetManager.User(2668631199);
manager.authenticate(process.env.RBXTKN);

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

	it('should send MessagingService', async () => {
		let res = await uni.publishToTopic('newtopic1', { hello: "world" });
		console.log(res);
	});

})

describe('DataStores', () => {

	it('should list keys', async () => {
		let dstores = await uni.getDatastores(2);
		let dstore = dstores.datastores[1];
		let keys = await dstore.listKeys({
			limit: 3,
			useV2Limit: true
		});
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

describe('OrderedDataStores', () => {

	it('should list entries', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.listEntries(50);
		console.log("Entries:", JSON.stringify(data));
		assert(data.entries[0].path, "OrderedDatastore should have entries");
	})

	it('should create entries', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.createEntry("Johnny", 99);
		console.log("Created Entry:", JSON.stringify(data));
		assert(data.path, "OrderedDatastore should have created an entry");
	})

	it('should get one entry', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.getEntry("Johnny");
		console.log("Singular Entry:", JSON.stringify(data));
		assert(data.path, "OrderedDatastore should have fetched an entry");
	})

	it('should delete entries', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.deleteEntry("Johnny");
		console.log("Deleted Entry (n/a):", JSON.stringify(data));
		assert(data, "OrderedDatastore should have deleted an entry");
	})

	it('should update entries', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.updateEntry("Johnny", 44);
		console.log("Updated Entry:", JSON.stringify(data));
		assert(data.path, "OrderedDatastore should have updated an entry");
	})

	it('should increment entries', async () => {
		let odstore = await uni.getOrderedDatastore("Points");
		let data = await odstore.incrementEntry("Johnny", 23);
		console.log("Incremented Entry:", JSON.stringify(data));
		assert(data.path, "OrderedDatastore should have incremented an entry");
	})

})

describe('Asset', () => {

	it('should upload assets', async () => {
		let operation = await manager.createAsset(AssetType.Decal, path.join(__dirname, 'decal.png'), "Another New Decal", "This was uploaded through Open Cloud!");
		let id = operation.operationId;
		console.log("Operation:", JSON.stringify(operation));
		let asset = await manager.getOperation(id);
		console.log("Fetched Asset:", JSON.stringify(asset));
		assert(asset, "AssetManager should have created an asset");
	})

	it('should update assets', async () => {
		let data = await manager.updateAsset(13236665337, path.join(__dirname, 'decal1.png'));
		console.log("Updated Asset:", data);
		assert(data, "AssetManager should have updated an asset");
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