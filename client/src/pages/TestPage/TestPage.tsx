import React from "react";

import { APIClient } from "../../core/APIClient";
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
				<MakeNewPost></MakeNewPost>
			</div>
		);
	}
}
export default TestPage;
