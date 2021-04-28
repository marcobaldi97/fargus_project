import React from 'react';

import './App.css';

//my stuff ↓↓↓
import Topnavbar from "./top-navbar/Topnavbar";
import PublicationViewer from './publications/PublicationViewer';
import MainCategory from './categories/MainCategory';
import PublicationSingleViewer from './publications/PublicationSingleViewer';
//my stuff ↑↑↑

interface Props {
};//no real props here

interface State {
  currentView: string;
  currentPostId: string;
}

class App extends React.Component<Props, State> {
  handleToUpdateState:any;
  constructor(props:any){
    super(props);
    this.state = {
      currentView: '',
      currentPostId: ''    
    };
    this.handleToUpdateState  = this.handleToUpdate.bind(this);
  }

  handleToUpdate(someArg:string, post_id:string){
    this.setState({currentView:someArg, currentPostId:post_id});
  }

  render(){
    const handleToUpdate:any=this.handleToUpdateState;
    if (this.state === null) {
      this.setState({
        currentView: '',
        currentPostId: ''    
      });
    };
    switch (this.state.currentView) {
      case 'Publications':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <PublicationViewer /> 
          </div>
        );
      case 'Main Category':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <MainCategory handleToUpdate={handleToUpdate.bind(this)}/>
          </div>
        );  
      case 'Current post':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <PublicationSingleViewer post_id={this.state.currentPostId}/>
          </div>
        );  
      case '':
        return(
          <div id="appDiv">
            <Topnavbar handleToUpdate={handleToUpdate.bind(this)}/>
            <div className="selfContainedWellPadded">
              <p>The Objective of this APP is to show the skills I'm learning in React+Express+Node.js+PostgreSQL</p>
              <p>Please go to: Views/Publications to create "Father" publications.</p>
              <p>The database backup is the FARGUS_PROJECT github. The original was created on PostgreSQL.</p>
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
