import React from 'react';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';

class PublicationWriter extends React.Component {
  constructor(props) {
    super(props);
    const fatherIdWaited = this.props.fatherId;
    this.state = {
      value: '',
      valueImg: '',
      fatherId: fatherIdWaited,
      selectedFile: null,
      readyToSubmit: true
    };//this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
 
  async handleChangeImg(event) {
    this.setState({readyToSubmit: false});
    const beginT = performance.now();
    const fileArray = await this.getBase64(event.target.files[0]);
    const endT = performance.now();
    console.log("Time taken to getBase64: "+(endT - beginT)+"ms");
    this.setState({selectedFile: fileArray, valueImg: event.target.value, readyToSubmit: false});
  };

  handleSubmit(event) {
    let params = {
      textToInput: this.state.value,
      srcToInput: this.state.valueImg,
      responseTo: this.state.fatherId,
      imgFile: this.state.selectedFile
    };
    if (params.srcToInput === '') {
      params.srcToInput = 'data:image/png;base64,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';
    }; 
    axios
      .post('/publications/publish/', params)//url + parametros
      .then(response => {
        this.props.refresh();
        this.setState({}); 
      })
      .catch(err => {
        console.log(err);//codigo de que hacer en caso de error.
      });
    event.preventDefault();
  }

  render() {
    return (
      <Container fluid >
        <form onSubmit={this.handleSubmit} className="publicationWriterBorders">
        <Row className="align-items-center letMeSomeSpace publicationWriterPost">
          <Col xs={12}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text >Post:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" value={this.state.value} onChange={this.handleChange} />
            </InputGroup>
          </Col>
          <Col xs={0}>
          </Col>
        </Row>
        <Row className="align-items-center letMeSomeSpace publicationWriterImageSource">
          <Col xs={6}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text >Image Source:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.File id="custom-file" label={this.state.valueImg} custom onChange={this.handleChangeImg} />
            </InputGroup>
          </Col>
          <Col xs={2}>
            <div className="alignMe">
              <input disabled={this.state.readyToSubmit} className="btn btn-outline-success" type="submit" value="Submit" />
            </div> 
          </Col>
          <Col xs={4}>
            <img src={this.state.selectedFile} className="previewImg" alt="Preview..."></img>
          </Col>
        </Row>
        </form>
      </Container>      
    );
  }
}
export default PublicationWriter;