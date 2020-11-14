import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';

class PublicationWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'    
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    let params = {
      textToInput : this.state.value
    }
    axios
      .post('/publications/publish/', params)//url + parametros
      .then(response=>{
        console.log(response);//codigo de que hacer con la respuesta.
      })
      .catch(err => {
        console.log(err);//codigo de que hacer en caso de error.
      });
    event.preventDefault();
  }

  render() {
    return (
      <Container fluid>
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Col><label> Post </label></Col>
        </Row>
        <Row>
          <Col ><textarea value={this.state.value} onChange={this.handleChange} /></Col>
        </Row>
        <Row>
          <Col><input class="btn btn-outline-success" type="submit" value="Submit" /></Col>
        </Row>
        </form>
      </Container>      
    );
  }
}
export default PublicationWriter;