enum URIs {
	DataStore = "https://apis.roblox.com/datastores/v1",
	PlaceManagement = "https://apis.roblox.com/universes/v1/{universeId}/places/{placeId}/versions"
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
	URIs,
	ErrLevel,
	Gender,
	PromotionChannelPrivacy,
	TradeStatus
}