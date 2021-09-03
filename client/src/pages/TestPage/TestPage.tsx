import React from "react";

import { APIClient } from "../../core/APIClient";
import PostComment from "../../myComponents/PostComment/PostComment";
import MakeNewPost from "../MakeNewPost/MakeNewPost";

interface TestPageProps {}

interface TestPageState {}

class TestPage extends React.Component<TestPageProps, TestPageState> {
	/*constructor(props: TestPageProps) {
		super(props);
    }*/

	render() {
		return (
			<div className="TestPage-mainContainer">
				<PostComment commentId={69} commentImg={"lololo"} commentContent={"La Li Lu Le Lo"} responses={[1, 2, 3, 4]} />
			</div>
		);
	}
}
export default TestPage;
