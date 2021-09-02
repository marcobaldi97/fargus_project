import React from "react";
import { withRouter } from "react-router";
import axios from "axios";

import { Card, Button, Accordion } from "react-bootstrap";

import DynamicTablePublications from "../../myComponents/DynamicTablePublications/DynamicTablePublications";
import PublicationWriter from "../../myComponents/PublicationWriter/PublicationWriter";

import "./PublicationSingleViewerStyle.css";

interface PublicationSingleViewerState {
	post_id: string;
	imgsrc: string;
	publication_content: string;
	items: [];
	publications: [];
}

class PublicationSingleViewer extends React.Component<any, PublicationSingleViewerState> {
	constructor(props: any) {
		super(props);

		this.refresh = this.refresh.bind(this);
		this.printFather = this.printFather.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = {
			post_id: this.props.match.params.id,
			imgsrc: "",
			publication_content: "",
			items: [],
			publications: [],
		}; //this.state
	}

	private refresh() {
		try {
			let aux = this.state.post_id;
			let params = {
				post_id: aux,
			};
			axios
				.post("/publications/viewSinglePostResponses/", params) //url + parametros
				.then((response) => {
					const { arrayOfPublications } = response.data;
					this.setState({ publications: arrayOfPublications });
				})
				.catch((err) => {
					console.log(err); //codigo de que hacer en caso de error.
				});
		} catch (err) {
			console.log(err);
		}
	}

	/**Prints father */
	private printFather(elements: any) {
		this.setState({ publication_content: elements[0].publication_content, imgsrc: elements[0].image_file });
	}

	async componentDidMount() {
		try {
			let aux = this.state.post_id;
			let params = {
				post_id: aux,
			};
			axios
				.post("/publications/viewSinglePost/", params)
				.then((response) => {
					this.printFather(response.data.arrayOfPublications);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
		await this.refresh();
	}

	render() {
		return (
			<div className="publicationSingleViewerContainer">
				<div className="cardFather">
					<div className="opMessageLeft">
						<img className="fatherImg" src={this.state.imgsrc} alt="\(>.<)/"></img>
					</div>
					<div className="opMessageRight">
						<b>
							<p className="opTitle">OP: {this.state.post_id}</p>
						</b>
						<p>{this.state.publication_content}</p>
					</div>
				</div>

				<div className="respondContainer">
					<Accordion className="respondCardContainer">
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="btn btn-outline-success" eventKey="0">
									Respond
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body className="respondCardBody">
									<PublicationWriter fatherId={this.state.post_id} refresh={this.refresh} />
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</div>

				<div className="responsesContainer">
					<DynamicTablePublications elements={this.state.publications} refresh={this.refresh}></DynamicTablePublications>
				</div>
			</div>
		);
	}
}
export default withRouter(PublicationSingleViewer);
