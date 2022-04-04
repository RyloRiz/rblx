enum ErrLevel {
	None,
	Info,
	Warning,
	Error,
	Critical
}

enum Gender {
	Male,
	Female
}

enum PromotionChannelPrivacy {
	NoOne,
	Friends,
	FriendsAndFollowing,
	FriendsAndFollowingAndFollowers,
	AllUsers
}

enum TradeStatus {
	Completed,
	Inactive,
	Inbound,
	Outbound
}

export {
	ErrLevel,
	Gender,
	PromotionChannelPrivacy,
	TradeStatus
}