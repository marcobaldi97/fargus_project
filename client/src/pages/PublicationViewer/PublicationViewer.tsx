import React from "react";

import { APIClient } from "../../core/APIClient";

import DynamicTablePublications from "../../components/DynamicTablePublications/DynamicTablePublications";
import PublicationWriter from "../../components/PublicationWriter/PublicationWriter";

interface Props {}

interface State {
	current_value: number;
	items: any;
	post_content: string;
	post_id: string;
	publications: [];
	value: string;
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
			items: [],
			post_content: "",
			post_id: "",
			publications: [],
			value: "",
		};
	}

	async componentDidMount() {
		await this.refresh();
	}

	private handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	private handleNext(event: any) {
		let counter = this.state.current_value;
		counter++;
		this.setState({ current_value: counter });
	}

	private async refresh() {
		let params = {
			publication_id: this.state.current_value,
		};

		const response = await this.apiClient.fetchPublications(params);

		if (response !== null) this.setState({ publications: response.data.arrayOfPublications });

		console.log(this.state.publications);
	}

	render() {
		return (
			<div>
				<PublicationWriter fatherId={0} refresh={async () => this.refresh()} />

				<button className="btn btn-outline-success iNeedMoreMargins" onClick={async () => this.refresh()}>
					Refresh
				</button>

				<DynamicTablePublications elements={this.state.publications} refresh={async () => this.refresh()} />
			</div>
		);
	}
}
export default PublicationViewer;
