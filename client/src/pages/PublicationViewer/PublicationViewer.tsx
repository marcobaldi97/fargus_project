import React from "react";

import { Button } from "react-bootstrap";

import { APIClient } from "../../core/APIClient";

import DynamicTablePublications from "../../myComponents/DynamicTablePublications/DynamicTablePublications";
import PublicationWriter from "../../myComponents/PublicationWriter/PublicationWriter";

interface Props {}

interface State {
	current_value: number;
	value: string;
	post_id: string;
	post_content: string;
	items: any;
	publications: [];
	loaded: boolean;
}

class PublicationViewer extends React.Component<Props, State> {
	apiClient: APIClient;

	constructor(props: Props) {
		super(props);

		this.apiClient = APIClient.getInstance();

		this.refresh = this.refresh.bind(this);

		this.handleNext = this.handleNext.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			current_value: 0,
			value: "",
			post_id: "",
			post_content: "",
			items: [],
			publications: [],
			loaded: false,
		}; //this.state
		if (!this.state.loaded) {
			this.refresh();
		}
	}

	private handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	private handleNext(event: any) {
		let counter = this.state.current_value;
		counter++;
		this.setState({ current_value: counter });
	}

	private async deleteRecord(itemToDelete: number) {
		const params = {
			idPost: itemToDelete,
		};

		const deleteConfirmation = await this.apiClient.deletePost(params);

		if (deleteConfirmation) await this.refresh();
	}

	private async refresh() {
		console.log("Refresh!");
		this.setState({ loaded: true });

		let params = {
			itemToSearch: this.state.current_value,
		};

		const response = await this.apiClient.fetchPublications(params);

		if (response !== null) this.setState({ publications: response.data.arrayOfPublications });

		console.log(this.state.publications);
	}

	render() {
		return (
			<div>
				<PublicationWriter fatherId="0" refresh={async () => this.refresh()} />
				<button className="btn btn-outline-success iNeedMoreMargins" onClick={async () => this.refresh()}>
					{" "}
					Refresh{" "}
				</button>
				<DynamicTablePublications elements={this.state.publications} refresh={async () => this.refresh()}></DynamicTablePublications>
			</div>
		);
	}
}
export default PublicationViewer;

/* DUMP
<tr>
  <td>{this.state.post_id}</td>
  <td>{this.state.post_content}</td>
</tr>
*/
