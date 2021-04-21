import React from 'react';
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
    try{
      let params = {
        idToDelete: itemToDelete
      };
      axios
        .post('/publications/publish/deletePost/', params)//url + parametros
        .then(response=>{
          console.log(response.data);
          this.handleSubmit();
        })
        .catch(err => {
          console.log(err);//codigo de que hacer en caso de error.
        });
    }catch(err){
      console.log(err);
    }
  }

  printItems(elements){
    this.setState({items: []});//wash your hands(array) before entering this house!
    const tributeArray = [];
    for (let i = 0; i < elements.length; i++) {
      tributeArray.push(
        <tr id={elements[i].publication_id}>
          <td>{elements[i].publicationFather}</td>
          <td>{elements[i].publication_id}</td>
          <td><img class="imgInTable" src={elements[i].imgsrc} alt="\(-_-)/"></img></td>
          <td>{elements[i].publication_content}</td>
          <td><Button onClick={() => this.deleteRecord(elements[i].publication_id)} variant="danger">Delete</Button></td>
        </tr>
      );
    }
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
              <th width="80">#ResTo</th>
              <th width="80">#PostId</th>
              <th width="100">Img</th>
              <th>Content</th>
              <th width="80">Delete</th>
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