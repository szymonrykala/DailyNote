import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import AppInfo from '../appInfo/AppInfo';
import NoteWrap from '../noteWrap/NoteWrap';
import './App.scss';

const App = () => {

     return (
          <Router >
               <div className="App">
                    <Header />
                    <main>
                         <Switch>
                              <Route exact path="/dailynote" component={NoteWrap} />
                              <Route path="/dailynote/info" component={AppInfo} />
                         </Switch>
                    </main>
               </div>
          </Router>
     );
}
export default App;
