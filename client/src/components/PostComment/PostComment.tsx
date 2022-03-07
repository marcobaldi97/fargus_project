import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import { APIClient } from "../../core/APIClient";

import styles from "./PostComment.module.css";

interface PostCommentProps {
	commentId: number;
	responses?: number[];
	deleteComment?: () => void;
}

const PostComment = (props: PostCommentProps) => {
	const { commentId, responses } = props;

	const [content, setContent] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			APIClient.getInstance()
				.fetchPostComment(commentId)
				.then((response) => {
					setContent(response.publication_content);
					setImageFile(response.image_file);
					setLoading(false);
				});
		} catch (err) {
			console.log(err);
		}
	}, [commentId]);

	function printResponses(responses: number[] | undefined) {
		if (responses === undefined) return;

		const responsesLinks: JSX.Element[] = [];

		responses.forEach((currentItem) => {
			responsesLinks.push(
				<h6>
					- <a href={`#comment-${currentItem}`}>#{currentItem}</a>
				</h6>
			);
		});

		return responsesLinks;
	}

	function imgOnClick() {
		window.open(imageFile ?? "", "_blank");
	}

	return (
		<div id={`comment-${commentId}`} key={`comment-${commentId}`} className={styles.container}>
			<div className={styles.leftContent}>
				{loading ? (
					<Spinner animation="border" variant="primary" />
				) : (
					<img className={styles.imagePreview} src={imageFile} alt={">.<"} onClick={imgOnClick} />
				)}
			</div>

			<div className={styles.rightContent}>
				<div className={styles.topbar}>
					<h5>{commentId}</h5>
					<div className={styles.right}>{printResponses(responses)}</div>
				</div>
				{loading ? <Spinner animation="border" variant="primary" /> : <p>{content}</p>}
			</div>
		</div>
	);
};

export default PostComment;
