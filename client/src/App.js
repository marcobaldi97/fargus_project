import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  let responseFromServer = 'ssds';
  let counter = 0;
  function hitBackend() {
    //axios.get('/testAPI').then((response) => { console.log(response.data); });
    axios.get('/testAPI').then((response) => {
      console.log(response.data);  
      responseFromServer = response.data;
      document.getElementById("response").innerHTML = responseFromServer + ' ' +counter;
      counter++;
    });
  }
  return ( 
    <div>
      <button onClick={hitBackend}>Click me!</button>
      <p id='response'></p>
    </div>
  );
}
export default App;
