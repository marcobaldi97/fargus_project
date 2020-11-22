import React from 'react';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Alert} from 'react-bootstrap';

class PublicationWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''    
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  
  }

  handleSubmit(event) {
    if (this.state.value === 'La Li Lu Le Lo'){
      alert('The Patriots?');
    }
    if (this.state.value === 'The Patriots?'){
      alert('La Li Lu Le Lo');
    }
    alert('A post shall be submitted: ' + this.state.value);
    let params = {
      textToInput : this.state.value
    }
    axios
      .post('/publications/publish/', params)//url + parametros
      .then(response=>{
        console.log(response);//codigo de que hacer con la respuesta.
        this.setState({value: ''}); 
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
        <Row className="align-items-center letMeSomeSpace">
          <Col xs={8}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text >Post:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" value={this.state.value} onChange={this.handleChange} />
            </InputGroup>
          </Col>
          <Col xs={4}>
            <div className="alignMe">
              <input className="btn btn-outline-success" type="submit" value="Submit" />
            </div> 
          </Col>
        </Row>
        </form>
      </Container>      
    );
  }
}
export default PublicationWriter;