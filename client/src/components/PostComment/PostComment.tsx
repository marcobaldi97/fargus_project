import React from "react";

import styles from "./PostComment.module.css";

interface PostCommentProps {
	commentId: number;
	commentImg: any;
	commentContent: string;
	responses?: number[];
	deleteComment?: () => void;
}

interface PostCommentState {
	imgRezise: boolean;
}

class PostComment extends React.Component<PostCommentProps, PostCommentState> {
	constructor(props: PostCommentProps) {
		super(props);

		this.imgOnClick = this.imgOnClick.bind(this);

		this.state = {
			imgRezise: false,
		};
	}

	private printResponses(responses: number[] | undefined) {
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

	private imgOnClick() {
		window.open(this.props.commentImg, "_blank");
	}

	render() {
		return (
			<div id={`comment-${this.props.commentId}`} key={`comment-${this.props.commentId}`} className={styles.container}>
				<div className={styles.leftContent}>
					<img className={styles.imagePreview} src={this.props.commentImg} alt={">.<"} onClick={() => this.imgOnClick()} />
				</div>

				<div className={styles.rightContent}>
					<div className={styles.topbar}>
						<h5>{this.props.commentId}</h5>
						<div className={styles.right}>{this.printResponses(this.props.responses)}</div>
					</div>

					<p>{this.props.commentContent}</p>
				</div>
			</div>
		);
	}
}
export default PostComment;
