import React from 'react';
import './AppInfo.scss';
import pic from '../../public/app.jpg';
const AppInfo = () => {
     return (
          <div className='info'>
               <div className="info__pin info__pin--left" />
               <div className="info__pin info__pin--right" />
               <div className="info__textWrap">
                    <h1>About the app</h1>
                    <img className='info__img' src={pic} alt="App presentation" />
                    <h3>App features:</h3>
                    <ul className="info__list info__list--features">
                         <li>
                              <h4 className="info__textWrap--h4">Double click to edit!</h4>
                              <p className='info__textWrap--paragraph'>
                                   By double clicking the note banner you will
                                   enter its editing mode!
                              </p>
                         </li>
                         <li>
                              <h4 className="info__textWrap--h4">Change color theme</h4>
                              <p className='info__textWrap--paragraph'>
                                   You have four colors to choose.<br/>
                                   Hover your mouse over burger icon on the note banner and select color!
                              </p>
                         </li>
                         <li>
                              <h4 className="info__textWrap--h4">Live data saving</h4>
                              <p className='info__textWrap--paragraph'>
                                   Write a note whitout thinking about saving it!<br />
                                   Don't worry about saving the order, color or size of your notes
                                   - I've already done it for You 😉😎
                              </p>
                         </li>
                         <li>
                              <h4 className="info__textWrap--h4">Change the order of notes </h4>
                              <p className='info__textWrap--paragraph'>
                                   Now You can move Your notes and decide what is the most important to You.
                                   To do that, hover hamburger icon on note You want to move.
                                  Second way is select note and  <b>press shift + leftArrow or rightArrow </b>
                                  to move.<br />
                                  Remember that the notes are attracted to the upper left corner!
                              </p>
                         </li>
                         <li>
                              <h4 className="info__textWrap--h4">Resizing notes</h4>
                              <p className='info__textWrap--paragraph'>
                                   If the note is important or just takes a lot of space,
                                   increase its horizontally or vertically size!
                                   Do this by <b>press ctr + arrowUp/arrowDown or ctr + arrowRight/arrowLeft </b>
                              </p>
                         </li>
                         <li>
                              <h4 className="info__textWrap--h4">Keyboard schortcuts!</h4>
                              <ul className='info__list info__list--shortcuts'>
                                   <li>Toggle Edit mode: Ctrl + E</li>
                                   <li>Resizing: Ctrl + Arrow Right/Left/Up/Down</li>
                                   <li>Order: Shift + Arrow Right/Left </li>
                                   <li>Open note: Enter on selected</li>
                                   <li>Change selected: Arrow Right/Left</li>
                                   <li>close note: Esc</li>
                              </ul>
                         </li>
                    </ul>
                    <small>
                         <h3>Technical information:</h3>
                         <ul>
                              <li>PWA ➡ Works offline</li>
                              <li>Using client
                              <a className='info__textWrap--link' href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"> IndexedDB </a>
                               ➡ <a className='info__textWrap--link' href="https://dexie.org/">Dexie.js</a> </li>
                              <li>Uses keyboard shortcuts</li>
                              <li>Developed with <a className='info__textWrap--link' href="https://reactjs.org/">React.js</a></li>
                              <li>Mobile friendly design (RWD)</li>
                              <li>GitHub link ➡ <a className='info__textWrap--link' href="https://github.com/szymonrykala/DailyNote">click!</a> </li>
                         </ul>
                    </small>

               </div>
          </div>
     )
}

export default AppInfo;