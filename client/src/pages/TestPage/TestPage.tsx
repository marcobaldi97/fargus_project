import React from "react";

import PostComment from "../../components/PostComment/PostComment";

interface TestPageProps {}

interface TestPageState {}

class TestPage extends React.Component<TestPageProps, TestPageState> {
	render() {
		return (
			<div className="TestPage-mainContainer">
				<PostComment commentId={69} />
			</div>
		);
	}
}
export default TestPage;
