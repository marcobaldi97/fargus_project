import React, { useState, useEffect } from "react";

import { APIClient } from "../../core/APIClient";
import Loader from "../Loader/Loader";

import styles from "./PostComment.module.css";
import PostCommentResponse from "../PostCommentResponse/PostCommentResponse";

interface PostCommentProps {
	commentId: number;
	original_publication_id: number;
	deleteComment?: () => void;
}

const PostComment = (props: PostCommentProps) => {
	const { commentId, original_publication_id } = props;

	const [content, setContent] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [loading, setLoading] = useState(true);
	const [responseVisible, setResponseVisible] = useState(false);
	const [responses, setResponses] = useState<any>([]);

	useEffect(() => {
		try {
			const apiClient = APIClient.getInstance();

			apiClient.fetchPostComment(commentId).then((response) => {
				setContent(response.publication_content);
				setImageFile(response.image_file);
				setLoading(false);
			});

			apiClient.fetchPostResponses(commentId).then((response) => {
				setResponses(response.data.arrayOfPublications);
			});
		} catch (err) {
			console.log(err);
		}
	}, [commentId]);

	function printResponses(responses: any[] | undefined) {
		if (responses === undefined) return;

		const responsesLinks: JSX.Element[] = responses.map((currentResponse) => {
			const { publication_id } = currentResponse;
			return (
				<h6>
					<a href={`#comment-${publication_id}`}> #{publication_id}</a>
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
				<Loader loading={loading}>
					<img className={styles.imagePreview} src={imageFile} alt={">.<"} onClick={imgOnClick} />
				</Loader>
			</div>

			<div className={styles.rightContent}>
				<div className={styles.topbar}>
					<h5 onClick={() => setResponseVisible(!responseVisible)}>{commentId}</h5>
					<PostCommentResponse
						toRespond={commentId}
						visible={responseVisible}
						original_publication_id={original_publication_id}
						onClose={() => setResponseVisible(false)}
					/>
					<div className={styles.right}>{printResponses(responses)}</div>
				</div>

				<Loader loading={loading}>
					<p>{content}</p>
				</Loader>
			</div>
		</div>
	);
};

export default PostComment;
