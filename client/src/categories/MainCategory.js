import React from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card} from 'react-bootstrap';

class MainCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_value: 0,
      value: '',
      post_id: '',
      post_content: '' ,
      items: []   
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printItems = this.printItems.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});  
  }

  printItems(elements){
    this.setState({items: []});//wash your hands(array) before entering this house!
    const tributeArray = [];
    for (let i = 0; i < elements.length; i++) {
      const desiredLength = 80;
      if (elements[i].publication_content.length > desiredLength) {
        elements[i].publication_content = elements[i].publication_content.substring(0,desiredLength-3);
        var finalPoints = '...';
        elements[i].publication_content = elements[i].publication_content + finalPoints;
      };
      tributeArray.push(
        <Col md={4} key={elements[i].publication_id}>
          <div className="postCard">
            <Card border='success' style={{ width: '18rem'}}>
            <Card.Img className="imgInPostCard" variant="top" src={elements[i].image_file} />
            <Card.Body >
                <Card.Title>#{elements[i].publication_id}</Card.Title>
                <Card.Text>
                  {elements[i].publication_content}
                </Card.Text>
                <Button variant="primary" onClick={() => this.props.handleToUpdate('Current post',elements[i].publication_id)}>View</Button>
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
    axios
      .post('/publications/publish/list', params)//url + parametros
      .then(response=>{
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
        <button className="btn btn-outline-success iNeedMoreMargins" onClick={this.handleSubmit}>Refresh</button>
        <Row className="publicationCard3way">
          {this.state.items}
        </Row>
      </Container>      
    );
  }
}
export default MainCategory;