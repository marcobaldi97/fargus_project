import React from "react";
import { Redirect } from "react-router-dom";

import { APIClient } from "../../core/APIClient";
import PublicationWriter, { PublicationWriterState } from "../../components/PublicationWriter/PublicationWriter";

import { Spinner } from "react-bootstrap";

import "./MakeNewPost.css";

interface MakeNewPostProps {}

interface MakeNewPostState {
	result: any;
	loading: boolean;
	publishMessage: string;
	redirection: boolean;
}

class MakeNewPost extends React.Component<MakeNewPostProps, MakeNewPostState> {
	apiClient: APIClient;

	constructor(props: MakeNewPostProps) {
		super(props);

		this.apiClient = APIClient.getInstance();

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			result: "",
			loading: false,
			publishMessage: "",
			redirection: false,
		};
	}

	private async handleSubmit(copyState: PublicationWriterState) {
		this.setState({ loading: true });

		const response = await this.apiClient.publishPost({
			publication_content: copyState.value,
			publication_father: 0,
			original_publication_id: 0,
			image_file: copyState.valueImg,
		});

		this.setState({ loading: false });

		if (response !== null) {
			this.setState({ publishMessage: "Publish succeded!" });
			setTimeout(() => {
				this.setState({ redirection: true });
			}, 5000);
		} else {
			this.setState({ publishMessage: "Error: A problem occurred!" });
			setTimeout(() => {
				this.setState({ publishMessage: "" });
			}, 5000);
		}
	}

	render() {
		return (
			<div className="MakeNewPost-mainContainer">
				<div>
					<h1>Publish a new Post: {this.state.loading && <Spinner animation="border" variant="success" />}</h1>
				</div>
				<PublicationWriter fatherId={0} refresh={() => {}} handleSubmit={this.handleSubmit} />
				<div>
					<h1>{this.state.publishMessage}</h1>
					{this.state.redirection && <Redirect to="/mainCategories" />}
				</div>
			</div>
		);
	}
}
export default MakeNewPost;
