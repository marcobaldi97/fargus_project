import React from "react";
import axios from "axios";

import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./MainCategoryStyles.css";

interface MainCategoryProps {}

interface MainCategoryState {
	current_value: number;
	value: string;
	post_id: string;
	post_content: string;
	items: any[];
}

class MainCategory extends React.Component<MainCategoryProps, MainCategoryState> {
	constructor(props: MainCategoryProps) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.printItems = this.printItems.bind(this);
		this.loadPosts = this.loadPosts.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = {
			current_value: 0,
			value: "",
			post_id: "",
			post_content: "",
			items: [],
		}; //this.state
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
				var finalPoints = "...";
				elements[i].publication_content = elements[i].publication_content + finalPoints;
			}
			const linkDirection = "/singleViewer" + elements[i].publication_id;
			tributeArray.push(
				<Col md={4} key={elements[i].publication_id}>
					<div className="postCard">
						<Card border="success" style={{ width: "18rem" }}>
							<Card.Img className="imgInPostCard" variant="top" src={elements[i].image_file} />
							<Card.Body>
								<Card.Title>#{elements[i].publication_id}</Card.Title>
								<Card.Text>{elements[i].publication_content}</Card.Text>
								<Link to={linkDirection}>
									<button className="normalButton">
										<p>View</p>
									</button>
								</Link>
							</Card.Body>
						</Card>
					</div>
				</Col>
			);
		}
		this.setState({ items: this.state.items.concat(tributeArray) });
	}

	private loadPosts() {
		let params = {
			itemToSearch: this.state.current_value,
		};
		axios
			.post("/publications/publish/list", params) //url + parametros
			.then((response) => {
				this.printItems(response.data.arrayOfPublications);
			})
			.catch((err) => {
				console.log(err); //codigo de que hacer en caso de error.
			});
	}

	componentDidMount() {
		this.loadPosts();
	}

	render() {
		return (
			<Container id="Table" fluid>
				<Row className="publicationCard3way">{this.state.items}</Row>
			</Container>
		);
	}
}
export default MainCategory;
