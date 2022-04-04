import axios, { AxiosResponse } from 'axios'

class Http {
	#token: string;

	constructor() {
		this.#token = undefined;
	}

	async setToken(token: string) {
		if (!token || !token.includes("WARNING")) {
			throw new Error("Invalid token provided: Please include full warning!");
		}

		let response = await axios({
			method: `GET`,
			url: `https://www.roblox.com/mobileapi/userinfo`,
			headers: {
				cookie: `.ROBLOSECURITY=${token}`
			}
		});

		if (response.data['UserID']) {
			this.#token = token;
			return response.data;
		} else {
			throw new Error('Invalid token provided');
		}
	}

	async get(url: any, callback?: (arg0: any) => any) {
		if (!this.#token) { return new Error('No token set'); }

		let response = await axios({
			method: `GET`,
			url: url,
			headers: {
				cookie: `.ROBLOSECURITY=${this.#token};`
			}
		});

		if (callback) {
			return await callback(response.data);
		} else {
			return response.data;
		}
	}

	async request(verb: any, url: any, payload: any, withHeaders?: boolean, callback?: (arg0: any) => any) {
		if (!this.#token) { return new Error('No token set'); }

		let response: AxiosResponse<any, any>;

		let response1 = await axios({
			method: verb,
			url: `https://auth.roblox.com`,
			headers: {
				Cookie: `.ROBLOSECURITY=${this.#token};`,
				"x-csrf-token": "",
			}
		})
			.catch(async (err) => {
				let header = err.response.headers['x-csrf-token'];
				response = await axios({
					method: verb,
					url: url,
					headers: {
						Cookie: `.ROBLOSECURITY=${this.#token};`,
						"x-csrf-token": header || "",
					},
					data: payload
				});
			})

		if (callback) {
			return await callback(response.data);
		} else {
			if (withHeaders) {
				return { data: response.data, headers: response.headers };
			} else {
				return response.data;
			}
		}
	}

	// async put(url, payload, callback) {
	// 	if (!this.#token) { return new Error('No token set'); }

	// 	let response = await axios({
	// 		method: `PUT`,
	// 		url: url,
	// 		headers: {
	// 			cookie: `.ROBLOSECURITY=${this.#token};`
	// 		},
	// 		data: payload
	// 	});

	// 	if (callback) {
	// 		return await callback(response.data);
	// 	} else {
	// 		return response.data;
	// 	}
	// }

	// async patch(url, payload, callback) {
	// 	if (!this.#token) { return new Error('No token set'); }

	// 	let response = await axios({
	// 		method: `PATCH`,
	// 		url: url,
	// 		headers: {
	// 			cookie: `.ROBLOSECURITY=${this.#token};`
	// 		},
	// 		data: payload
	// 	});

	// 	if (callback) {
	// 		return await callback(response.data);
	// 	} else {
	// 		return response.data;
	// 	}
	// }

	async delete(url: any, callback?: (arg0: any) => any) {
		if (!this.#token) { return new Error('No token set'); }

		let response = await axios({
			method: `DELETE`,
			url: url,
			headers: {
				cookie: `.ROBLOSECURITY=${this.#token};`
			}
		});

		if (callback) {
			return await callback(response.data);
		} else {
			return response.data;
		}
	}
}

export { Http };