import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

//my stuff ↓↓↓
import Topnavbar from "./myComponents/top-navbar/Topnavbar";
import PublicationViewer from "./myComponents/PublicationViewer/PublicationViewer";
import MainCategory from "./myComponents/MainCategory/MainCategory";
import PublicationSingleViewer from "./myComponents/PublicationSingleViewer/PublicationSingleViewer";
//my stuff ↑↑↑

interface AppProps {} //no real props here

interface AppState {}

class App extends React.Component<AppProps, AppState> {
	render() {
		return (
			<Router>
				<Topnavbar />
				<Switch>
					<Route path="/singleViewer:id">
						<PublicationSingleViewer />
					</Route>
					<Route path="/mainCategories">
						<MainCategory />
					</Route>
					<Route path="/allPublications">
						<PublicationViewer />
					</Route>
					<Route path="/">
						<div className="selfContainedWellPadded">
							<p>The Objective of this APP is to show the skills I'm learning in React+Express+Node.js+PostgreSQL</p>
							<p>Please go to: Views/Publications to create "Father" publications.</p>
							<p>The database backup is the FARGUS_PROJECT github. The original was created on PostgreSQL.</p>
						</div>
					</Route>
				</Switch>
			</Router>
		);
	}
}
export default App;