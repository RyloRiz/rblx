enum URIs {
	Asset = "https://apis.roblox.com/assets/v1",
	DataStore = "https://apis.roblox.com/datastores/v1/universes",
	OrderedDataStore = "https://apis.roblox.com/ordered-data-stores/v1/universes",
	PlaceManagement = "https://apis.roblox.com/universes/v1/{universeId}/places/{placeId}/versions",
	MessagingService = "https://apis.roblox.com/messaging-service/v1/universes/{universeId}/topics/{topic}"
}

enum AssetType {
	Audio = "Audio",
	Decal = "Decal",
	Model = "Model"
}

enum ErrLevel {
	None,
	Info,
	Warning,
	Error,
	Critical
}

/**
 * @NOTICE Cannot figure out the "non-binary" gender string that the API will accept - if you find this, please make a PR to the repo and I will add it after testing
 */
enum Gender {
	Male,
	Female
}

enum OrderType {
	Ascending,
	Descending
}

enum PromotionChannelPrivacy {
	NoOne = "NoOne",
	Friends = "Friends",
	FriendsAndFollowing = "FriendsAndFollowing",
	FriendsAndFollowingAndFollowers = "FriendsAndFollowingAndFollowers",
	AllUsers = "AllUsers"
}

enum TradeStatus {
	Completed = "Completed",
	Inactive = "Inactive",
	Inbound = "Inbound",
	Outbound = "Outbound"
}

export {
	AssetType,
	URIs,
	ErrLevel,
	Gender,
	OrderType,
	PromotionChannelPrivacy,
	TradeStatus
}