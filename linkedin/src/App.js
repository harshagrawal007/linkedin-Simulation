import React, { Component } from 'react';
//import logo from './logo.svg';
import Main from './Components/Main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';




//App Component
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
