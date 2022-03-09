import { throws } from "assert";
import React from "react";

import { Container, InputGroup, FormControl, Form, Spinner } from "react-bootstrap";

import { APIClient } from "../../core/APIClient";

import styles from "./PublicationWriter.module.css";

interface PublicationWriterProps {
	fatherId: number;
	refresh: () => void;
	handleSubmit?: (copyState: PublicationWriterState) => void;
}

export interface PublicationWriterState {
	fatherId: number;
	readyToSubmit: boolean;
	selectedFile: any;
	value: string;
	valueImg: string;
}

class PublicationWriter extends React.Component<PublicationWriterProps, PublicationWriterState> {
	apiClient: APIClient;

	constructor(props: PublicationWriterProps) {
		super(props);

		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.handleChangeImg = this.handleChangeImg.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		const fatherIdWaited = this.props.fatherId;
		this.apiClient = APIClient.getInstance();

		this.state = {
			fatherId: fatherIdWaited,
			readyToSubmit: false,
			selectedFile: null,
			value: "",
			valueImg: "",
		};
	}

	private handleTextAreaChange(event: any) {
		this.setState({ value: event.target.value });
	}

	private getBase64(file: File) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	private async handleChangeImg(event: any) {
		this.setState({ readyToSubmit: false });

		const fileArray = await this.getBase64(event.target.files[0]);

		this.setState({ selectedFile: fileArray, valueImg: fileArray as string });
	}

	private async handleSubmit(event: any) {
		event.preventDefault();

		if (this.props.handleSubmit !== undefined) {
			console.log("Here!");
			const copyState = this.state;
			this.props.handleSubmit(copyState);
			return;
		}

		this.setState({ readyToSubmit: true });

		const { fatherId, value, valueImg } = this.state;

		const params = {
			publication_father: fatherId,
			original_publication_id: fatherId,
			publication_content: value,
			image_file: valueImg,
		};

		await this.apiClient.publishPost(params);

		this.props.refresh();

		this.setState({ value: "", valueImg: "", readyToSubmit: false, selectedFile: null });
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.preview}>{this.state.valueImg ? <img src={this.state.selectedFile} alt="" /> : <h5>Preview</h5>}</div>

				<div className={styles.responseForm}>
					<textarea className={styles.textArea} onChange={this.handleTextAreaChange} />
					<input type="file" name="fileUploader" id="fileUploader" onChange={this.handleChangeImg} />
					<button onClick={this.handleSubmit}>Submit</button>
				</div>
			</div>
		);
	}
}
export default PublicationWriter;
