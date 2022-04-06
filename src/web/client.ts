import { Http, err, PromotionChannelPrivacy, Birthdate, Gender, TradeOffer, TradeStatus } from '../util'

class Client {
	http: Http;
	constructor() {
		this.http = new Http();
	}

	async acceptRequest(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://friends.roblox.com/v1/users/${userId}/accept-friend-request`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async acceptTrade(tradeId: number) {
		if (!Number(tradeId)) { throw new Error("Invalid tradeId"); }
		return await this.http.request('POST', `https://trades.roblox.com/v1/trades/${tradeId}/accept`, {
			tradeId: tradeId
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async addFriend(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://friends.roblox.com/v1/users/${userId}/request-friendship`, {
			friendshipRequestModel: {
				friendshipOriginSourceType: "Unknown"
			}
		})
			.then((response) => { return response.success; })
			.catch((error) => err(error))
			;
	}

	async block(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://accountsettings.roblox.com/v1/users/${userId}/block`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async canTradeWith(userId: number) {
		return await this.http.get(`https://trades.roblox.com/v1/users/${userId}/can-trade-with`)
			.then((response) => { return response.canTrade; })
			.catch((error) => err(error))
			;
	}

	async claimOwnership(groupId: number) {
		if (!Number(groupId)) { throw new Error("Invalid groupId"); }
		return await this.http.request('POST', `https://groups.roblox.com/v1/groups/${groupId}/claim-ownership`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async counterTrade(tradeId: number, offers: TradeOffer[]) {
		return await this.http.request('POST', `https://trades.roblox.com/v1/trades/${tradeId}/counter`, {
			offers: offers
		})
			.then((response) => { return response.id; })
			.catch((error) => err(error))
			;
	}

	async declineAllRequests() {
		return await this.http.request('POST', 'https://friends.roblox.com/v1/user/friend-requests/decline-all', {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async declineRequest(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://friends.roblox.com/v1/users/${userId}/decline-friend-request`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async declineTrade(tradeId: number) {
		if (!Number(tradeId)) { throw new Error("Invalid tradeId"); }
		return await this.http.request('POST', `https://trades.roblox.com/v1/trades/${tradeId}/decline`, {
			tradeId: tradeId
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async getBirthdate() {
		return await this.http.get('https://accountinformation.roblox.com/v1/birthdate')
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async getConsecutiveLoginDays() {
		return await this.http.get('https://accountinformation.roblox.com/v1/xbox-live/consecutive-login-days')
			.then((response) => { return response.count; })
			.catch((error) => err(error))
			;
	}

	async getDescription() {
		return await this.http.get('https://accountinformation.roblox.com/v1/description')
			.then((response) => { return response.description; })
			.catch((error) => err(error))
			;
	}

	async getDisplayName() {
		return await this.http.get('https://users.roblox.com/v1/users/authenticated')
			.then((response) => { return response.displayName; })
			.catch((error) => err(error))
			;
	}

	async getFriendCount() {
		return await this.http.get('https://friends.roblox.com/v1/my/friends/count')
			.then((response) => { return response.count; })
			.catch((error) => err(error))
			;
	}

	async getFriendRequests() {
		return await this.http.get('https://friends.roblox.com/v1/my/friends/requests?fetchMutualFriends=true&sortOrder=Desc&limit=100')
			.then((response) => {
				let requests = [];
				response.data.forEach(element => {
					if (element.isBanned) {
						return;
					}
					requests.push({
						displayName: element.displayName,
						username: element.username,
						userId: element.id,
					})
				});
				return requests;
			})
			.catch((error) => err(error))
			;
	}

	async getFriendRequestsCount() {
		return await this.http.get('https://friends.roblox.com/v1/user/friend-requests/count')
			.then((response) => { return response.count; })
			.catch((error) => err(error))
			;
	}

	async getGender() {
		let map = {
			'1': 'other',
			'2': 'male',
			'3': 'female'
		}
		return await this.http.get('https://accountinformation.roblox.com/v1/gender')
			.then((response) => { return map[response.gender.toString()]; })
			.catch((error) => err(error))
			;
	}

	async getLocale() {
		return await this.http.get('https://locale.roblox.com/v1/locales/user-locale')
			.then((response) => { return response.supportedLocale?.locale; })
			.catch((error) => err(error))
			;
	}

	async getPhone() {
		return await this.http.get('https://accountinformation.roblox.com/v1/phone')
			.then((response) => { return response.phone; })
			.catch((error) => err(error))
			;
	}

	async getPromotionChannels() {
		return await this.http.get('https://accountinformation.roblox.com/v1/promotion-channels')
			.then((response) => { return { facebook: response.facebook, twitter: response.twitter, youtube: response.youtube, twitch: response.twitch, privacy: response.promotionChannelsVisibilityPrivacy }; })
			.catch((error) => err(error))
			;
	}

	async getStatus() {
		let userId = this.getUserId();
		return await this.http.get(`https://users.roblox.com/v1/users/${userId}/status`)
			.then((response) => { return response.status; })
			.catch((error) => err(error))
			;
	}

	async getTrade(tradeId: number) {
		return await this.http.get(`https://trades.roblox.com/v1/trades/${tradeId}`)
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async getTrades(tradeStatusType: TradeStatus = TradeStatus.Inbound) {
		// let map = {
		// 	"0": "Completed",
		// 	"1": "Inactive",
		// 	"2": "Inbound",
		// 	"3": "Outbound"
		// };
		return await this.http.get(`https://trades.roblox.com/v1/trades/${tradeStatusType}?sortOrder=Asc&limit=100`)
			.then((response) => { return response.data; })
			.catch((error) => err(error))
			;
	}

	async getTradesCount(tradeStatusType: TradeStatus = TradeStatus.Inbound) {
		let map = {
			"0": "Completed",
			"1": "Inactive",
			"2": "Inbound",
			"3": "Outbound"
		};
		return await this.http.get(`https://trades.roblox.com/v1/trades/${tradeStatusType}/count`)
			.then((response) => { return response.count; })
			.catch((error) => err(error))
			;
	}

	async getUserId() {
		return await this.http.get('https://users.roblox.com/v1/users/authenticated')
			.then((response) => { return response.id; })
			.catch((error) => err(error))
			;
	}

	async getUsername() {
		return await this.http.get('https://users.roblox.com/v1/users/authenticated')
			.then((response) => { return response.name; })
			.catch((error) => err(error))
			;
	}

	async isFollowing(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://friends.roblox.com/v1/user/following-exists`, {
			targetUserIds: [userId]
		})
			.then((response) => {
				for (let index = 0; index < response.followings.length; index++) {
					const following = response.followings[index];
					if (following.isFollowing && following.userId == userId) {
						return true;
					}
				}
				return false;
			})
			.catch((error) => err(error))
			;
	}

	async removeFriend(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://friends.roblox.com/v1/users/${userId}/unfriend`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async removePrimaryGroup() {
		return await this.http.delete(`https://groups.roblox.com/v1/user/groups/primary`)
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async sendTrade(offers: TradeOffer[]) {
		return await this.http.request('POST', `https://trades.roblox.com/v1/trades/send`, {
			offers: offers
		})
			.then((response) => { return response.id; })
			.catch((error) => err(error))
			;
	}

	async setBirthdate(birthdate: Birthdate) {
		return await this.http.request('POST', `https://accountinformation.roblox.com/v1/birthdate`, {
			birthMonth: birthdate.birthMonth,
			birthDay: birthdate.birthDay,
			birthYear: birthdate.birthYear
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async setDescription(description: string) {
		return await this.http.request('POST', 'https://accountinformation.roblox.com/v1/description', {
			description: description
		})
			.then((response) => { return response.description; })
			.catch((error) => err(error))
			;
	}

	async setDisplayName(displayName: string) {
		let userId = this.getUserId();
		return await this.http.get(`https://users.roblox.com/v1/users/${userId}/display-names/validate?displayName=${displayName}`)
			.then(async () => {
				return await this.http.request('POST', `https://users.roblox.com/v1/users/${userId}/display-names`, {
					newDIsplayName: displayName
				})
					.then((response) => { return response; })
					.catch((error) => err(error))
					;
			})
			.catch((error) => err(error))
			;
	}

	async setGender(gender: Gender) {
		// No non-binary, read hover/JSDoc for Gender type
		let map = {
			'0': 'male',
			'1': 'female',
		}
		return await this.http.request('POST', 'https://accountinformation.roblox.com/v1/gender', {
			gender: map[gender.toString()]
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async setPrimaryGroup(groupId: number) {
		if (!Number(groupId)) { throw new Error("Invalid groupId"); }
		return await this.http.request('POST', `https://groups.roblox.com/v1/user/groups/primary`, {
			groupId: groupId
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async setPromotionChannels(tbl: { [key: string]: string }, privacy: PromotionChannelPrivacy) {
		let socials = await this.getPromotionChannels();
		return await this.http.request('POST', 'https://accountinformation.roblox.com/v1/promotion-channels', {
			facebook: tbl['facebook'] || socials['facebook'] || "",
			twitter: tbl['twitter'] || socials['twitter'] || "",
			youtube: tbl['youtube'] || socials['youtube'] || "",
			twitch: tbl['twitch'] || socials['twitch'] || "",
			promotionChannelsVisibilityPrivacy: privacy.toString() || PromotionChannelPrivacy[socials['privacy'].toUpperCase() || "NoOne"]
		})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async setStatus(status: string) {
		let userId = this.getUserId();
		return await this.http.request(`PATCH`, `https://users.roblox.com/v1/users/${userId}/status`, {
			status: status
		})
			.then((response) => { return response.status; })
			.catch((error) => err(error))
			;
	}

	async login(token: string) {
		return await this.http.setToken(token)
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}

	async unblock(userId: number) {
		if (!Number(userId)) { throw new Error("Invalid userId"); }
		return await this.http.request('POST', `https://accountsettings.roblox.com/v1/users/${userId}/unblock`, {})
			.then((response) => { return response; })
			.catch((error) => err(error))
			;
	}
}

export default Client;