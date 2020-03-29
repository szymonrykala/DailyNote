import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import AppInfo from '../appInfo/AppInfo';
import NoteWrap from '../noteWrap/NoteWrap';
import './App.scss';

const App = () => {
     function checkFirstUse() {
          const storage = window.localStorage;
          if (storage.getItem('firstUse') === null) {
               window.location = '/info';
          }
          storage.setItem('firstUse', 'true');
     }
     // setTimeout(checkFirstUse,500);
     checkFirstUse();

     return (
          <Router >
               <div className="App">
                    <Header />
                    <main>
                         <Switch>
                              <Route exact path="/" component={NoteWrap} />
                              <Route path="/info" component={AppInfo} />
                         </Switch>
                    </main>
               </div>
          </Router>
     );
}
export default App;
