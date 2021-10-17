import React from "react";

import { APIClient } from "../../core/APIClient";

import { Container, Table, Button } from "react-bootstrap";

interface DynamicTablePublicationsProps {
	elements: any[];
	refresh: () => void;
}

class DynamicTablePublications extends React.Component<DynamicTablePublicationsProps> {
	apiClient: APIClient;
	constructor(props: DynamicTablePublicationsProps) {
		super(props);

		this.deleteRecord = this.deleteRecord.bind(this);

		this.apiClient = APIClient.getInstance();
	}

	private printItems(elements: any) {
		const tributeArray = [];

		for (let i = 0; i < elements.length; i++) {
			const base64boi = elements[i].image_file;
			const imgToShow = base64boi;

			tributeArray.push(
				<tr id={elements[i].publication_id} key={elements[i].publication_id}>
					<td>
						<p>{elements[i].publication_id}</p>
					</td>

					<td>
						<img className="imgInTable" src={imgToShow} alt="a"></img>
					</td>

					<td>
						<p>{elements[i].publication_content}</p>
					</td>

					<td>
						<Button onClick={async () => this.deleteRecord(elements[i].publication_id)} variant="danger">
							Delete
						</Button>
					</td>
				</tr>
			);
		}

		return tributeArray;
	}

	private async deleteRecord(itemToDelete: number) {
		let params = {
			idPost: itemToDelete,
		};

		const deleteConfirmation = await this.apiClient.deletePost(params);

		if (deleteConfirmation) await this.props.refresh();
	}

	render() {
		const publications = this.printItems(this.props.elements);

		return (
			<Container id="Table" fluid>
				<Table bordered hover responsive>
					<thead>
						<tr>
							<th style={{ width: "80px" }}>#PostId</th>

							<th style={{ width: "100px" }}>Img</th>

							<th>Content</th>

							<th style={{ width: "80px" }}>Delete</th>
						</tr>
					</thead>

					<tbody>{publications}</tbody>
				</Table>
			</Container>
		);
	}
}
export default DynamicTablePublications;
