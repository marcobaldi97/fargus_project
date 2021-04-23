import React from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Button, Accordion} from 'react-bootstrap';

import DynamicTablePublications from "../myComponents/DynamicTablePublications";
import PublicationWriter from "./PublicationWriter";

class PublicationSingleViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id : this.props.post_id,
      imgsrc: '',
      publication_content: '',
      items: [],
      publications: [],
      loaded: false
    };//this.state
    this.refresh = this.refresh.bind(this);
    this.printFather = this.printFather.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  deleteRecord(r){
    console.log('record '+r+' deleted');
  };

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
          this.setState({publications: response.data.arrayOfPublications})
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
    this.setState({imgsrc : elements[0].image_file});
    this.setState({loaded : true});
  };//printFather

  changeImgSize(event) {
    console.log("here!");
    const currentClasses = event.target.className;
    if (currentClasses === "flexBox fatherImg") event.target.className = "flexBox fatherImgExpand";
    else event.target.className = "flexBox fatherImg";
  }

  render() {
    this.initialLoad();
    return (
      <div id='PublicationSingleViewerContainer'>
        <div className="cardFather">
          <Card>
            <Card.Header>OP: {this.state.post_id}</Card.Header>
            <Card.Body>
            <Container fluid="md">
            </Container>
              <blockquote className="blockquote mb-0">
                <Row>
                  <Col md="auto">
                    <img className="flexBox fatherImg" src={this.state.imgsrc} alt="\(>.<)/" onClick={this.changeImgSize}></img>
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
        <div className="cardFather respondClass">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="btn btn-outline-success" eventKey="0">
                  Respond
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <PublicationWriter fatherId={this.state.post_id}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="cardFather">
          <button className="btn btn-outline-success" onClick={this.refresh}>Refresh</button> 
        </div>
        <div className="cardFather">
          <DynamicTablePublications className="c5pxmarginstop" elements={this.state.publications} refresh={this.refresh.bind()} deleteRecord={this.deleteRecord.bind()}></DynamicTablePublications>
        </div>
      </div>
    );
  }
}
export default PublicationSingleViewer;