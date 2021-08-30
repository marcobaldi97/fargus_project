import axios from "axios";

export class APIClient {
	private static instance: APIClient;
	private apiServer: string = "http://localhost:9000";

	private constructor() {}

	public static getInstance() {
		return this.instance ?? (this.instance = new APIClient());
	}

	public async deletePost(params: { idPost: number }): Promise<boolean> {
		try {
			//await axios.post(`${this.apiServer}/publications/publish/deletePost/`, params); //url + parametros
			await axios.post(`/publications/publish/deletePost/`, params); //url + parametros
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	public async fetchPublications(params: { itemToSearch: number }): Promise<any> {
		try {
			//const response = await axios.post(`${this.apiServer}/publications/publish/list`, params);
			const response = await axios.post(`/publications/publish/list`, params);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async fetchPostResponses(params: { itemToSearch: number }): Promise<any> {
		try {
			//const response = await axios.post(`${this.apiServer}/publications/publish/list`, params);
			const response = await axios.post(`/publications/publish/list`, params);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async publishPost(params: { textToInput: string; srcToInput: string; responseTo: string; imgFile: any }): Promise<any> {
		try {
			const response = await axios.post("/publications/publish/", params);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
