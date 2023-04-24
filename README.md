# About

The rblx library is meant for easy interactions with the Roblox Open Cloud & Web APIs. Currently, this includes all of the Open Cloud Datastore API functions, Open Cloud OrderedDatastore API functions, Open Cloud Place Management API functions, Open Cloud MessagingService API functions, and almost all Web API functions.

# Installation + Setup

## Step 1
* Install via npm: `npm install rblx` (includes type declarations)

## Step 2 (optional, but more secure)
Create a new file<sup>*</sup> in the root of your project called `.env` with the following content:

`RBXTKN=` + your Open Cloud API key

`RBXROBLOXSECURITY=` + your *bot account's* (do **NOT** use your own) `.ROBLOXSECURITY` token (cookie value)

<sup>*</sup>Don't forget to add this .env file to your .gitignore!
# Docs

### Open Cloud
<details>
<summary>OpenCloudAssetManager {Class}</summary>

### `new OpenCloudAssetManager(id: number)`
Creates a new OpenCloudUniverse object

### `OpenCloudAssetManager.authenticate(apikey: string)`
Pass the API key through this function, or use the npm dotenv package and `process.env.RBXTKN` from above

### `OpenCloudAssetManager.createAsset(assetType: Util.AssetType, filePath: string, name: string, desc: string)`
Create a new asset

### `OpenCloudAssetManager.getOperation(id: string)`
Get operation data related to an asset uplooad

### `OpenCloudAssetManager.updateAsset(assetId: number, filePath: string)`
Update an asset (currently locked to only Models on Roblox's end)
</details>

<details>
<summary>OpenCloudUniverse {Class}</summary>

### `new OpenCloudUniverse(id: number)`
Creates a new OpenCloudUniverse object

### `OpenCloudUniverse.authenticate(apikey: string)`
Pass the API key through this function, or use the npm dotenv package and `process.env.RBXTKN` from above

### `OpenCloudUniverse.getDatastores(limit?: number, prefix?: string, cursor?: string)`
Return an object containing the previous page cursor, next page cursor, and datastore objects.

### `OpenCloudUniverse.getOrderedDatastore(name: string, scope: string)`
Return an OrderedDataStore.

### `OpenCloudUniverse.save(placeId: number, pathToFile: string)`
Save the `rblx` file located at `pathToFile` to Roblox, therefore **not** publishing.

### `OpenCloudUniverse.publish(placeId: number, pathToFile: string)`
Publish the `rblx` file located at `pathToFile` to Roblox, therefore **also** saving to Roblox.

### `OpenCloudUniverse.publishToTopic(topic: string, data: any)`
Publish some data to a MessagingService topic (this only works in Live Servers as of 7/8/22)
</details>

<details>
<summary>OpenCloudDataStore {Class}</summary>

### `new OpenCloudDataStore(uid: number, name: string, scope: string = "global")`
Creates a new OpenCloudDataStore class - THIS IS NOT MEANT TO BE CALLED MANUALLY

### `OpenCloudDataStore.authenticate(apikey: string)`
Authenticate the OpenCloudDataStore with your API key

### `OpenCloudDataStore.listKeys(limit?: number | LimitOptions, allScopes?: boolean, prefix?: string, cursor?: string)`
IF LIMIT IS NUMBER: Return an object containing the previous page cursor, next page cursor, and keys on the current page

IF LIMIT IS LIMITOPTIONS: Return an object with the number of keys specified

`LimitOptions` is used if you want to receive the number of keys you made as the limit. The intended functionality of Roblox's limit parameter does not guarantee you will receive as many keys as you have requested, but using LimitOptions instead of a number value will do so.

`LimitOptions` follows this schema:
```js
{
	limit: number,
	useV2Limit: boolean // true to get all keys specified
}
```

### `OpenCloudDataStore.get(key: string)`
Get the value of a key

### `OpenCloudDataStore.set(key: string, value: any = null, exclusiveCreate?: boolean, matchVersion?: string)`
Set/update the value of a key

**NOTE:** You cannot use `exclusiveCreate` and `matchVersion` in the same request!

### `OpenCloudDataStore.increment(key: string, incrementBy: number = 1)`
Increment a value by `incrementBy` units

### `OpenCloudDataStore.delete(key: string)`
Delete a key from the OpenCloudDataStore

### `OpenCloudDataStore.listVersions(key: string, limit: number = 1, sortOrder: 'Ascending'|'Descending' = 'Ascending', cursor?: string, startTime?: string, endTime?: string)`
List all versions of a key (with versionIds for `get`ting)

**Note:** `startTime` and `endTime` must be ISO dates in UTC time!

### `OpenCloudDataStore.getVersion(key: string, versionId: string)`
Get the value of `key` at version `versionId`
</details>

<details>
<summary>OpenCloudOrderedDataStore {Class}</summary>

### `new OpenCloudOrderedDataStore(uid: number, name: string, scope: string = "global")`
Creates a new OpenCloudOrderedDataStore class - THIS IS NOT MEANT TO BE CALLED MANUALLY

### `OpenCloudOrderedDataStore.authenticate(apikey: string)`
Authenticate the OpenCloudOrderedDataStore with your API key

### `OpenCloudOrderedDataStore.listEntries(maxPageSize: number, cursor: string, order: OrderType, filter: string)`
List all entries in an OpenCloudOrderedDataStore

### `OpenCloudOrderedDataStore.createEntry(id: string, value: number)`
Create a new entry in an OpenCloudOrderedDataStore

### `OpenCloudOrderedDataStore.getEntry(id: string)`
Get an entry from an OpenCloudOrderedDataStore

### `OpenCloudOrderedDataStore.deleteEntry(id: string)`
Delete a new entry from an OpenCloudOrderedDataStore

### `OpenCloudOrderedDataStore.updateEntry(id: string, value: number, allowMissing: boolean = true)`
Update an entry in an OpenCloudOrderedDataStore

### `OpenCloudOrderedDataStore.incrementEntry(id: string, amount: number)`
Increment an entry in an OpenCloudOrderedDataStore by a certain amount

</details>

### Web API

<details>
<summary>Client {Class}</summary>

### `new Client()`
Creates a new Client class

### `Client.login(token: string)`
Authenticate the Client with your .ROBLOSECURITY token (recommended: store in .env file)

### `Client.acceptRequest(userId: number)`
Accept a friend request from `userId`

### `Client.acceptTrade(tradeId: number)`
Accept a trade of id `tradeId`

### `Client.addFriend(userId: number)`
Send a friend request to `userId`

### `Client.block(userId: number)`
Block ❌ `userId`

### `Client.canTradeWith(userId: number)`
See if you can trade with `userId`

### `Client.claimOwnership(groupId: number)`
Claim ownership of group `groupId`

### `Client.counterTrade(tradeId: number, offers: TradeOffer[])`
Counter a trade of id `tradeId` with your `offers`

### `Client.declineAllRequests()`
Decline all friend requests

### `Client.declineRequest(userId: number)`
Decline a friend request from a single user of id `userId`

### `Client.declineTrade(tradeId: number)`
Decline trade of id `tradeId`

### `Client.getBirthdate()`
Get your account's birthdate

### `Client.getConsecutiveLoginDays()`
Get your account's (xbox) consecutive login days

### `Client.getDescription()`
Get your account's description

### `Client.getDisplayName()`
Get your account's display name

### `Client.getFriendCount()`
Get your account's friend count

### `Client.getFriendRequests()`
Get your account's friend requests

### `Client.getFriendRequestsCount()`
Get your account's number of friend requests

### `Client.getGender()`
Get your account's gender

### `Client.getLocale()`
Get your account's locale (language)

### `Client.getPhone()`
Get your account's phone number (if applicable)

### `Client.getPromotionChannels()`
Get your account's social links (if applicable)

### `Client.getStatus()`
Get your account's status

### `Client.getTrade(tradeId: number)`
Get a trade with id `tradeId`

### `Client.getTrades(tradeStatusType: TradeStatus = TradeStatus.Inbound)`
Get your account's trades

### `Client.getTradesCount(tradeStatusType: TradeStatus = TradeStatus.Inbound)`
Get your account's trades count

### `Client.getUserId()`
Get your account's user id

### `Client.getUsername()`
Get your account's username

### `Client.isFollowing(userId: number)`
Check if you are following `userId`

### `Client.removeFriend(userId: number)`
Remove friend with id `userId`

### `Client.removePrimaryGroup()`
Remove your primary group

### `Client.sendTrade(offers: TradeOffer[])`
Send trades (specify who in the form of an id in the `offers` parameter's options)

### `Client.setBirthdate(birthdate: Birthdate)`
Set your account's birthdate

### `Client.setDescription(description: string)`
Set your account's description

### `Client.setDisplayName(displayName: string)`
Set your account's display name

### `Client.setGender(gender: Gender)`
Set your account's gender

### `Client.setPrimaryGroup(groupId: number)`
Set your account's primary group to the group of id `groupId`

### `Client.setPromotionChannels(tbl: { [key: string]: string }, privacy: PromotionChannelPrivacy)`
Set your account's social links

### `Client.setStatus(status: string)`
Set your account's status

### `Client.unblock(userId: number)`
Unblock the user of id `userId`
</details>

# Example Usage

```javascript
// Open Cloud
const { OpenCloudUniverse } = require('rblx');

let uni = new OpenCloudUniverse(0000);
uni.authenticate(process.env.RBXTKN);

let dstore = (await uni.getDatastores(1)).datastores[0];
let newKey = await dstore.set('newkey', 100);

await dstore.increment('newkey', 50);

let newValue = await dstore.get('newkey');

console.log(newValue); // 150

// Web API
const { Client } = require('rblx')

let bot = new Client();
bot.login(process.env.RBXROBLOXSECURITY)
	.then(async () => {
		let status = await bot.getStatus();
		let newStatus = status.replace('day 1', 'day 2');
		await bot.setStatus(newStatus);
	});
```

## Links

* GitHub Repository: https://github.com/RyloRiz/rblx
* NPM: https://www.npmjs.com/package/rblx

## Closing

Thanks for reading! If you have any suggestions or bug reports, please file an issue and I'll get back to you ASAP!