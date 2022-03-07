import axios from "axios";

export class APIClient {
	private static instance: APIClient;

	private constructor() {}

	public static getInstance() {
		return this.instance ?? (this.instance = new APIClient());
	}

	public async deletePost(params: { idPost: number }): Promise<boolean> {
		try {
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

	public async fetchPost(idPost: number): Promise<any> {
		try {
			const response = await axios.post(`/publications/publish/viewSinglePost`, { idPost: idPost });

			return response;
		} catch (error) {
			console.log(error);

			return null;
		}
	}

	public async fetchPostResponses(idPost: number, onlyIds: boolean = false): Promise<any> {
		try {
			const response = await axios.post(`/publications/publish/viewSinglePostResponses`, { idPost: idPost, onlyIds: onlyIds });

			return response;
		} catch (error) {
			console.log(error);

			return [];
		}
	}

	public async fetchPostComment(idPost: number): Promise<any> {
		try {
			const response = await await this.fetchPost(idPost);

			console.dir({ ...response.data.arrayOfPublications[0] });
			return { ...response.data.arrayOfPublications[0] };
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
