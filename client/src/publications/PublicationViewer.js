import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Table} from 'react-bootstrap';

class PublicationViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_value: 1,
      value: '',
      post_id: '',
      post_content: '' ,
      items: []   
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.printItems = this.printItems.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  
  }

  handleNext(event){
    let counter = this.state.current_value;
    counter++;
    this.setState({current_value: counter});
  }

  deleteRecord(itemToDelete){
    //txt

    console.log('Deleted '+itemToDelete+'!');
  }

  printItems(elements){
    this.setState({items: []});//wash your hands(array) before entering this house!
    const tributeArray = [];
    for (const [index, value] of elements.entries()) {
      tributeArray.push(
        <tr>
          <td>{index}</td>
          <td>{value}</td>
          <td><Button onClick={() => this.deleteRecord(index)} variant="danger">Delete</Button></td>
        </tr>
      );//end array. Using => to pass a parameter is insanity
    }//for some reason I cannot push into th  e array inside the state
    this.setState({items: this.state.items.concat(tributeArray)});
  }

  handleSubmit(event) {
    let params = {
      itemToSearch: this.state.current_value
    };
    console.log(params.itemToSearch);
    axios
      .post('/publications/publish/list', params)//url + parametros
      .then(response=>{
        console.log(response.data);
        this.printItems(response.data.arrayOfPublications);
        this.setState({post_id: response.data.postId});
        this.setState({post_content: response.data.postContent}); //deprecated
      })
      .catch(err => {
        console.log(err);//codigo de que hacer en caso de error.
      });
    event.preventDefault();
  }

  render() {
    return (
      <Container id='Table' fluid>
        <Row>
          <Col ><button class="btn btn-outline-success" onClick={this.handleSubmit}>Refresh</button></Col>
          <Col ><button class="btn btn-outline-success" onClick={this.handleNext}>Next</button></Col>
          <Col ><p>{this.state.current_value}</p></Col>
        </Row>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#PostId</th>
              <th>Content</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items}
          </tbody>
        </Table>
      </Container>      
    );
  }
}
export default PublicationViewer;

/* DUMP
<tr>
  <td>{this.state.post_id}</td>
  <td>{this.state.post_content}</td>
</tr>
*/