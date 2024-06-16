import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Center from './components/Center.js';
import SLogIn from './components/SLogin.js';
import Txt from './components/Txt.js';
import Summary from './components/Summary.js';
import Chat from './components/Chat.js';
import Question from './components/Question.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false, // 파일 제출 여부
    };
  }
  render() {

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={ <Center /> }/>
          </Routes>
        </Router>
      </div>
    );
  }
}
