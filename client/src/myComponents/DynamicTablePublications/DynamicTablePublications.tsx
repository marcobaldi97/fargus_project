import { Container, Table, Button } from "react-bootstrap";
import React from "react";
import axios from "axios";

interface DynamicTablePublicationsProps {
	elements: any[];
	refresh: () => void;
}

class DynamicTablePublications extends React.Component<DynamicTablePublicationsProps> {
	private arrayBufferToBase64(buffer: any) {
		let binary = "";
		let bytes = new Uint8Array(buffer);
		let len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	private printItems(elements: any) {
		const tributeArray = [];
		for (let i = 0; i < elements.length; i++) {
			let base64boi = elements[i].image_file; //Fuuuuuuuck!
			let imgToShow = base64boi;
			//let imgToShow = elements[i].imgsrc;
			tributeArray.push(
				<tr key={elements[i].publication_id}>
					<td>{elements[i].publication_id}</td>
					<td>
						<img className="imgInTable" src={imgToShow} alt="a"></img>
					</td>
					<td>{elements[i].publication_content}</td>
					<td>
						<Button onClick={() => this.deleteRecord(elements[i].publication_id)} variant="danger">
							Delete
						</Button>
					</td>
				</tr>
			);
		}

		return tributeArray;
	}

	private deleteRecord(itemToDelete: number) {
		try {
			let params = {
				idToDelete: itemToDelete,
			};
			axios
				.post("/publications/publish/deletePost/", params) //url + parametros
				.then((response) => {
					this.props.refresh();
				})
				.catch((err) => {
					console.log(err); //codigo de que hacer en caso de error.
				});
		} catch (err) {
			console.log(err);
		}
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
