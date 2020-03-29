import React from 'react';
import { Link } from 'react-router-dom';

import Info from '../icon/Info.js';
import './Header.scss';

const Header = () => {
     function checkFirstUse() {
          const storage = window.localStorage;
          if (storage.getItem('firstUse') === null) {
              document.querySelector('#info').click();
          }
          storage.setItem('firstUse', 'true');
     }
     setTimeout(checkFirstUse,500);
     // checkFirstUse()
     return (
          <header className='header'>
               <Link to="/dailynote"><h1 className='header__h1'>
                    #Daily Note
               </h1></Link>
               <p className='header__aforyzm'> "Oblivion is a brain hygiene"</p>
               <Link id='info' to="/dailynote/info" title="info"><Info className='header__icon' width={40} /></Link>
          </header>
     );
}

export default Header;