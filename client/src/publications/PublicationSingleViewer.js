import React from 'react';
import axios from 'axios';
import { Button, Container, Table, Card, Row, Col} from 'react-bootstrap';

class PublicationSingleViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id : this.props.post_id,
      imgsrc: '',
      publication_content: '',
      items: [],
      loaded: false
    };//this.state
    this.refresh = this.refresh.bind(this);
    this.printItems = this.printItems.bind(this);
    this.printFather = this.printFather.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
  }

  initialLoad(){
    if (!this.state.loaded) {
      this.refresh();
    };
  };

  refresh(){
    try{
      let aux = this.state.post_id;
      let params = {
        post_id: aux
      };
      axios
        .post('/publications/viewSinglePostResponses/', params)//url + parametros
        .then(response=>{
          this.printItems(response.data.arrayOfPublications)
        })
        .catch(err => {
          console.log(err);//codigo de que hacer en caso de error.
        });
    }catch(err){
      console.log(err);
    };
    if (!this.state.loaded) {
      try{
        let aux = this.state.post_id;
        let params = {
          post_id: aux
        };
        axios
          .post('/publications/viewSinglePost/', params)//url + parametros
          .then(response=>{
            this.printFather(response.data.arrayOfPublications)
          })
          .catch(err => {
            console.log(err);//codigo de que hacer en caso de error.
          });
      }catch(err){
        console.log(err);
      };
    };
  };//refresh.
  
  printFather(elements) {
    this.setState({publication_content : elements[0].publication_content});
    this.setState({imgsrc : elements[0].imgsrc});
    this.setState({loaded : true});
  };//printFather

  printItems(elements) {
    this.setState({items: []});//wash your hands(array) before entering this house!
    const tributeArray = [];
    for (let i = 0; i < elements.length; i++) {
      tributeArray.push(
        <tr key={elements[i].publication_id}>
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

  render() {
    this.initialLoad();
    return (
      <div id='PublicationSingleViewerContainer'>
        <div class="postCard">
          <Card>
            <Card.Header>OP: {this.state.post_id}</Card.Header>
            <Card.Body>
            <Container fluid="md">
            </Container>
              <blockquote className="blockquote mb-0">
                <Row>
                  <Col md="auto">
                    <img className="flexBox" src={this.state.imgsrc} alt="\(>.<)/"></img>
                  </Col>
                  <Col md="auto">
                    <p>
                      {this.state.publication_content}
                    </p>
                  </Col>
                </Row>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
        <Container id='Table' fluid>
          <button class="btn btn-outline-success iNeedMoreMargins" onClick={this.refresh}>Refresh</button>          
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
      </div>
     
    );
  }
}
export default PublicationSingleViewer;
