import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { APIClient } from "../../core/APIClient";
import Loader from "../Loader/Loader";

import styles from "./PostCommentResponse.module.scss";

interface PostCommentResponseProps {
	toRespond: number;
	visible: boolean;
	original_publication_id: number;
	onClose: () => void;
}

const PostCommentResponse: React.FunctionComponent<PostCommentResponseProps> = (props) => {
	const { toRespond, visible, onClose, original_publication_id } = props;
	const [response, setResponse] = useState("");
	const [img, setImg] = useState<string>();
	const [uploading, setUploading] = useState(false);

	function handleChange(event: any): void {
		setResponse(event.target.value ?? "");
	}

	function getBase64(file: File) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	async function handleChangeImg(event: any) {
		setUploading(true);

		const fileArray = await getBase64(event.target.files[0]);

		setImg(fileArray as string);
		setUploading(false);
	}

	function handleSubmmit() {
		try {
			APIClient.getInstance().publishPost({
				publication_content: response,
				publication_father: toRespond,
				original_publication_id: original_publication_id,
				image_file: img ?? "",
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Toast style={{ display: `${visible ? "initial" : "none"}` }} onClose={onClose}>
			<Toast.Header className={styles.header}>
				<strong>Respond to #{toRespond}</strong>
			</Toast.Header>
			<Toast.Body className={styles.body}>
				<textarea onChange={handleChange}></textarea>
				<input type="file" onChange={handleChangeImg} />
				<button disabled={uploading} onClick={handleSubmmit}>
					<Loader loading={uploading}>Respond</Loader>
				</button>
			</Toast.Body>
		</Toast>
	);
};
export default PostCommentResponse;
