import React from "react";

import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./PublicationPresentationCard.css";

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
			<Col md={this.props.mdWidth ?? 4} key={this.props.publicationId}>
				<div className="postCard">
					<Card border="success" style={{ width: "18rem" }}>
						<Card.Img className="imgInPostCard" variant="top" src={this.props.publicationImg} />
						<Card.Body>
							<Card.Title>#{this.props.publicationId}</Card.Title>
							<Card.Text>{this.props.publicationContent}</Card.Text>
							<Link to={this.props.linkDirection}>
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
}
export default PublicationPresentationCard;
