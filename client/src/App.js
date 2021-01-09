import React from 'react';

import './App.css';
import axios from 'axios';

//my stuff ↓↓↓
import Topnavbar from "./top-navbar/Topnavbar";
import PublicationWriter from './publications/PublicationWriter';
import PublicationViewer from './publications/PublicationViewer';
import MainCategory from './categories/MainCategory';
//my stuff ↑↑↑

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: ''    
    };//this.state
    this.handleToUpdateState  = this.handleToUpdate.bind(this);
  }

  handleToUpdate(someArg){
    this.setState({currentView:someArg});
  }

  render(){
    let handleToUpdate=this.handleToUpdateState;
    switch (this.state.currentView) {
      case 'Publications':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <PublicationWriter />
            <PublicationViewer /> 
          </div>
        );
      case 'Main Category':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <MainCategory />
          </div>
        );  
      case '':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <div className="selfContainedWellPadded">
              <p>The Objective of this APP is to show the skills I'm learning in React+Express+Node.js+PostgreSQL</p>
              <p>Please go to: Views/Publications</p>
            </div>
          </div>
        );
      default:
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <p>Nothing to be seen here boi!</p>
          </div>
        );
    }
  };
}
export default App;
