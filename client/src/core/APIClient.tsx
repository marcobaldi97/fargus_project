import axios from "axios";

export type Publication = {
	publication_id: number;
	publication_content: string;
	publication_father: number;
	image_file: string;
	original_publication_id: number;
};

export class APIClient {
	private static instance: APIClient;

	private constructor() {}

	public static getInstance() {
		return this.instance ?? (this.instance = new APIClient());
	}

	public async fetchPublications(params: { publication_id: number }): Promise<any> {
		try {
			//const response = await axios.post(`${this.apiServer}/publications/publish/list`, params);
			const response = await axios.post(`/publications/publish/list`, params);

			return response;
		} catch (error) {
			console.log(error);

			return null;
		}
	}

	public async fetchPost(publication_id: number): Promise<any> {
		try {
			const response = await axios.post(`/publications/publish/viewSinglePost`, { publication_id: publication_id });

			return response;
		} catch (error) {
			console.log(error);

			return null;
		}
	}

	public async fetchPostResponses(publication_id: number, onlyIds: boolean = false): Promise<any> {
		try {
			const response = await axios.post(`/publications/publish/viewCommentResponses`, { publication_id: publication_id, onlyIds: onlyIds });

			return response;
		} catch (error) {
			console.log(error);

			return [];
		}
	}

	public async fetchPostComment(publication_id: number): Promise<any> {
		try {
			const response = await await this.fetchPost(publication_id);

			return { ...response.data.arrayOfPublications[0] };
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async publishPost(params: {
		publication_content: string;
		publication_father: number;
		original_publication_id: number;
		image_file: any;
	}): Promise<any> {
		try {
			const response = await axios.post("/publications/publish/", params);

			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public async deletePost(params: { publication_id: number }): Promise<boolean> {
		try {
			await axios.post(`/publications/publish/deletePost/`, params); //url + parametros
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
