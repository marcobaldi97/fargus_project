import React from "react";

import "./PostComment.css";

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
		this.setState({ imgRezise: !this.state.imgRezise });
	}

	render() {
		return (
			<div id={`comment-${this.props.commentId}`} key={`comment-${this.props.commentId}`} className="commentContainer">
				<div className="topBar">
					<div className="topBar-left">
						<h6>{this.props.commentId}</h6>
					</div>
					<div className="topBar-right">{this.printResponses(this.props.responses)}</div>
				</div>

				<div className="content">
					<div className="leftContent">
						<img
							className={this.state.imgRezise ? "imgExpanded" : "imgNotExpanded"}
							src={this.props.commentImg}
							alt={">.<"}
							onClick={() => this.imgOnClick()}
						/>
					</div>

					<div className="rightContent">
						<p>{this.props.commentContent}</p>
					</div>
				</div>
			</div>
		);
	}
}
export default PostComment;
