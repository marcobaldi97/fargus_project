import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import DynamicTablePublications from '../DynamicTablePublications/DynamicTablePublications'
import PublicationWriter from "../PublicationWriter/PublicationWriter";

interface Props {

}

interface State {
  current_value:number,
  value:string,
  post_id:string,
  post_content:string,
  items:any,
  publications:[],
  loaded:boolean
}

class PublicationViewer extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      current_value: 0,
      value: '',
      post_id: '',
      post_content: '' ,
      items: [],
      publications: [],
      loaded: false,
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.printItems = this.printItems.bind(this);
    if (!this.state.loaded){
      this.refresh();
    };
  }

  handleChange(event:any) {
    this.setState({value: event.target.value});  
  }

  handleNext(event:any){
    let counter = this.state.current_value;
    counter++;
    this.setState({current_value: counter});
  }

  deleteRecord(itemToDelete:number){
    try{
      let params = {
        idToDelete: itemToDelete
      };
      axios
        .post('/publications/publish/deletePost/', params)//url + parametros
        .then(response=>{
          this.refresh();
        })
        .catch(err => {
          console.log(err);//codigo de que hacer en caso de error.
        });
    }catch(err){
      console.log(err);
    }
  }

  printItems(elements:any){
    this.setState({items: []});//wash your hands(array) before entering this house!
    const tributeArray = [];
    for (let i = 0; i < elements.length; i++) {
      tributeArray.push(
        <tr id={elements[i].publication_id}>
          <td>{elements[i].publicationFather}</td>
          <td>{elements[i].publication_id}</td>
          <td><img className="imgInTable" src={elements[i].imgsrc} alt="\(-_-)/"></img></td>
          <td>{elements[i].publication_content}</td>
          <td><Button onClick={() => this.deleteRecord(elements[i].publication_id)} variant="danger">Delete</Button></td>
        </tr>
      );
    }
    this.setState({items: this.state.items.concat(tributeArray)});
  }

  refresh() {
    console.log("Refresh!");
    this.setState({loaded: true});
    let params = {
      itemToSearch: this.state.current_value
    };
    axios
      .post('/publications/publish/list', params)//url + parametros
      .then(response=>{
        this.setState({publications: response.data.arrayOfPublications});
        //this.printItems(response.data.arrayOfPublications);
      })
      .catch(err => {
        console.log(err);//codigo de que hacer en caso de error.
      });
  };

  render() {
    return (
      <div>
        <PublicationWriter fatherId='0' refresh={() => this.refresh}/>
        <button className="btn btn-outline-success iNeedMoreMargins" onClick={() => this.refresh}> Refresh </button>
        <DynamicTablePublications elements={this.state.publications} deleteRecord={() => this.deleteRecord} refresh={() => this.refresh}></DynamicTablePublications>
      </div>    
    );
  };
};
export default PublicationViewer;

/* DUMP
<tr>
  <td>{this.state.post_id}</td>
  <td>{this.state.post_content}</td>
</tr>
*/