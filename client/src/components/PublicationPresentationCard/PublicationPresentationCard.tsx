import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./PublicationPresentationCard.module.css";

interface PublicationPresentationCardProps {
	publicationImg: any;
	publicationId: string;
	publicationContent: string;
	linkDirection: string;
	mdWidth?: number;
}

interface PublicationPresentationCardState {}

class PublicationPresentationCard extends React.Component<PublicationPresentationCardProps, PublicationPresentationCardState> {
	render() {
		return (
			<div className={styles.postCard} key={this.props.publicationId}>
				<div className={styles.imgContainer}>
					<img className={styles.previewImage} src={this.props.publicationImg} />
				</div>

				<div className={styles.body}>
					<h3>#{this.props.publicationId}</h3>

					<h5>{this.props.publicationContent}</h5>

					<Link to={this.props.linkDirection}>
						<button className={styles.normalButton}>
							<p>View</p>
						</button>
					</Link>
				</div>
			</div>
		);
	}
}
export default PublicationPresentationCard;
