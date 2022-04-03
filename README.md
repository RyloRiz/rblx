# About

The rblx library is meant for easy interactions with the Roblox Open Cloud API. Currently, this includes all of the Datastore API functions & Place Management APIs.

This module is also taking its first steps in terms of development. I've been writing this module since yesterday in between writing a speech ~~and haven't gotten around to adding place management functionality yet~~. Stay tuned for updates!

# Installation + Setup

## Step 1
* Install via npm: `npm install rblx` (includes type declarations)

## Step 2 (optional, but more secure)
Create a new file<sup>*</sup> in the root of your project called `.env` with the following content:
`RBXTKN=` + your API key

<sup>*</sup>Don't forget to add this to your .gitignore!
# Docs

<details>
<summary>Universe {Class}</summary>

## `new Universe(id: number)`
Creates a new Universe object

## `Universe.authenticate(apikey: string)`
Pass the API key through this function, or use the npm dotenv package and `process.env.RBXTKN` from above

## `Universe.getDatastores(limit?: number, prefix?: string, cursor?: string)`
Return an object containing the previous page cursor, next page cursor, and datastore objects.

## `Universe.save(placeId: number, pathToFile: string)`
Save the `rblx` file located at `pathToFile` to Roblox, therefore **not** publishing.

## `Universe.publish(placeId: number, pathToFile: string)`
Publish the `rblx` file located at `pathToFile` to Roblox, therefore **also** saving to Roblox.
</details>

<details>
<summary>DataStore {Class}</summary>

## `new DataStore(uid: number, name: string, scope: string = "global")`
Creates a new DataStore class - THIS IS NOT MEANT TO BE CALLED MANUALLY

## `DataStore.authenticate(apikey: string)`
Authenticate the DataStore with your API key

## `DataStore.listKeys(limit?: number, allScopes?: boolean, prefix?: string, cursor?: string)`
Return an object containing the previous page cursor, next page cursor, and keys on the current page

## `DataStore.get(key: string)`
Get the value of a key

## `DataStore.set(key: string, value: any = null, exclusiveCreate?: boolean, matchVersion?: string)`
Set/update the value of a key

**NOTE:** You cannot use `exclusiveCreate` and `matchVersion` in the same request!

## `DataStore.increment(key: string, incrementBy: number = 1)`
Increment a value by `incrementBy` units

## `DataStore.delete(key: string)`
Delete a key from the DataStore

## `DataStore.listVersions(key: string, limit: number = 1, sortOrder: 'Ascending'|'Descending' = 'Ascending', cursor?: string, startTime?: string, endTime?: string)`
List all versions of a key (with versionIds for `get`ting)

**Note:** `startTime` and `endTime` must be ISO dates in UTC time!

## `DataStore.getVersion(key: string, versionId: string)`
Get the value of `key` at version `versionId`
</details>

# Example Usage

```javascript
const { Universe } = require('rblx');

let uni = new Universe(0000);
uni.authenticate(process.env.RBXTKN);

let dstore = (await uni.getDatastores(1)).datastores[0];
let newKey = await dstore.set('newkey', 100);

await dstore.increment('newkey', 50);

let newValue = await dstore.get('newkey');

console.log(newValue); // 150
```

## Links

* GitHub Repository: https://github.com/RyloRiz/rblx
* NPM: https://www.npmjs.com/package/rblx

## Closing

Thanks for reading! If you have any suggestions or bug reports, please file an issue and I'll get back to you ASAP!