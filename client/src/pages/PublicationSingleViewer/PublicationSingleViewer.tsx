import React from "react";
import { withRouter } from "react-router";

import PublicationWriter from "../../components/PublicationWriter/PublicationWriter";

import styles from "./PublicationSingleViewer.module.css";
import PostComment from "../../components/PostComment/PostComment";
import { APIClient } from "../../core/APIClient";

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
		this.setFather = this.setFather.bind(this);
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

	async componentDidMount() {
		try {
			APIClient.getInstance()
				.fetchPost(parseInt(this.state.post_id, 10))
				.then((response) => {
					this.setFather(response.data.arrayOfPublications);
				});
		} catch (err) {
			console.log(err);
		}
		this.refresh();
	}

	private refresh() {
		try {
			APIClient.getInstance()
				.fetchPostResponses(parseInt(this.state.post_id, 10), true)
				.then((response) => {
					this.setState({ publications: response.data.arrayOfPublications });
				});
		} catch (err) {
			console.log(err);
		}
	}

	/**Prints father */
	private setFather(elements: any) {
		this.setState({ publication_content: elements[0].publication_content, imgsrc: elements[0].image_file });
	}

	private printResponses() {
		const commentsToPrint: JSX.Element[] = [];

		this.state.publications.forEach((currentItem) => {
			const { publication_id } = currentItem;

			commentsToPrint.push(
				<li className={styles.postComment}>
					<PostComment commentId={publication_id} />
				</li>
			); //Add the responses.
		});

		return commentsToPrint;
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
