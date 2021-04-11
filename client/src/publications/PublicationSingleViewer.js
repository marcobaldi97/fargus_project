import React from 'react';
import axios from 'axios';
import { Button, Container, Table} from 'react-bootstrap';

class PublicationSingleViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id : this.props.post_id,
      items : []
    };//this.state
    this.refresh = this.refresh.bind(this);
    this.printItems = this.printItems.bind(this);
  }

  refresh(){
    try{
      let aux = this.state.post_id;
      let params = {
        post_id: aux
      };
      axios
        .post('/publications/viewSinglePost/', params)//url + parametros
        .then(response=>{
          this.printItems(response.data.arrayOfPublications)
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

  render() {
    return (
      <div id='PublicationSingleViewerContainer'>
        <Container id='Table' fluid>
          <p>{this.props.post_id}</p>
          <button class="btn btn-outline-success" onClick={this.refresh}>Refresh</button>          
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
