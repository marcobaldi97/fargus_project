import React from "react";
import axios from "axios";

import { Container, Row, Spinner } from "react-bootstrap";

import { APIClient } from "../../core/APIClient";

import "./MainCategoryStyles.css";

import PublicationPresentationCard from "../../myComponents/PublicationPresentationCard/PublicationPresentationCard";

interface MainCategoryProps {}

interface MainCategoryState {
	current_value: number;
	value: string;
	post_id: string;
	post_content: string;
	items: any[];
	loading: boolean;
}

class MainCategory extends React.Component<MainCategoryProps, MainCategoryState> {
	apiClient: APIClient;

	constructor(props: MainCategoryProps) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.printItems = this.printItems.bind(this);
		this.loadPosts = this.loadPosts.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.apiClient = APIClient.getInstance();

		this.state = {
			current_value: 0,
			value: "",
			post_id: "",
			post_content: "",
			items: [],
			loading: false,
		};
	}

	private handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	private printItems(elements: any[]) {
		this.setState({ items: [] }); //wash your hands(array) before entering this house!
		const tributeArray = [];

		for (let i = 0; i < elements.length; i++) {
			const desiredLength = 80;
			if (elements[i].publication_content.length > desiredLength) {
				elements[i].publication_content = elements[i].publication_content.substring(0, desiredLength - 3);
				let finalPoints = "...";
				elements[i].publication_content = elements[i].publication_content + finalPoints;
			}
			const linkDirection = "/singleViewer" + elements[i].publication_id;

			tributeArray.push(
				<PublicationPresentationCard
					publicationId={elements[i].publication_id}
					publicationImg={elements[i].image_file}
					publicationContent={elements[i].publication_content}
					linkDirection={linkDirection}
					mdWidth={3}
				/>
			);
		}
		this.setState({ items: this.state.items.concat(tributeArray) });
	}

	private async loadPosts() {
		this.setState({ loading: true });

		const params = {
			itemToSearch: this.state.current_value,
		};

		const response = await this.apiClient.fetchPublications(params);

		if (response !== null) this.printItems(response.data.arrayOfPublications);

		this.setState({ loading: false });
	}

	componentDidMount() {
		this.loadPosts();
	}

	render() {
		return this.state.loading ? (
			<Spinner animation="border" variant="success" />
		) : (
			<Container id="Table" fluid>
				<Row className="publicationCard3way">{this.state.items}</Row>
			</Container>
		);
	}
}
export default MainCategory;
