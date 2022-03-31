class DataStore {
	#apikey: string;
	uid: number;
	scope: string = "global";

	constructor(uid: number, scope: string = "global") {
		this.uid = uid;
		this.scope = scope;
	}

	// @WONTFIX No method for retrieving the API Key
	authenticate(apikey: string) {
		this.#apikey = apikey;
	}

	
}