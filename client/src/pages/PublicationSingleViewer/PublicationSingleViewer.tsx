import React from "react";
import { withRouter } from "react-router";
import axios from "axios";

import { Card, Button, Accordion } from "react-bootstrap";

import PublicationWriter from "../../components/PublicationWriter/PublicationWriter";

import styles from "./PublicationSingleViewer.module.css";
import PostComment from "../../components/PostComment/PostComment";

interface PublicationSingleViewerState {
	post_id: string;
	imgsrc: string;
	publication_content: string;
	items: [];
	publications: [];
	toComment: boolean;
}

class PublicationSingleViewer extends React.Component<any, PublicationSingleViewerState> {
	constructor(props: any) {
		super(props);

		this.refresh = this.refresh.bind(this);
		this.printFather = this.printFather.bind(this);
		this.printResponses = this.printResponses.bind(this);

		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = {
			post_id: this.props.match.params.id,
			imgsrc: "",
			publication_content: "",
			items: [],
			publications: [],
			toComment: false,
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

	private printResponses() {
		const commentsToPrint: JSX.Element[] = [];

		this.state.publications.forEach((currentItem) => {
			const { publication_id, image_file, publication_content } = currentItem;

			commentsToPrint.push(
				<li className={styles.postComment}>
					<PostComment commentId={publication_id} commentImg={image_file} commentContent={publication_content} />
				</li>
			); //Add the responses.
		});

		return commentsToPrint;
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
			<div className={styles.pageContainer}>
				<div className={styles.cardFather}>
					<div className={styles.opMessageLeft}>
						<img className={styles.fatherImg} src={this.state.imgsrc} alt="\(>.<)/"></img>
					</div>
					<div className={styles.opMessageRight}>
						<b>
							<p className={styles.opTitle} onClick={() => this.setState({ toComment: true })}>
								OP: {this.state.post_id}
							</p>
						</b>
						<p>{this.state.publication_content}</p>
					</div>
				</div>

				{this.state.toComment && <PublicationWriter fatherId={this.state.post_id} refresh={this.refresh} />}

				<ul className={styles.responses}>{this.printResponses()}</ul>
			</div>
		);
	}
}
export default withRouter(PublicationSingleViewer);

//					<DynamicTablePublications elements={this.state.publications} refresh={this.refresh}></DynamicTablePublications>
