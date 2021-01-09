import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card} from 'react-bootstrap';

class MainCategory extends React.Component {
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
        <Col md={4} id={elements[i].publication_id}>
          <div class="postCard">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={elements[i].imgsrc} />
            <Card.Body>
                <Card.Title>#{elements[i].publication_id}</Card.Title>
                <Card.Text>
                  {elements[i].publication_content}
                </Card.Text>
                <Button variant="primary">View</Button>
            </Card.Body>
            </Card>
          </div>
        </Col>
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
        <button class="btn btn-outline-success" onClick={this.handleSubmit}>Refresh</button>
        <Row>
          {this.state.items}
        </Row>
      </Container>      
    );
  }
}
export default MainCategory;