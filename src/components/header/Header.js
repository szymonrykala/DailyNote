import React from 'react';
import { Link } from 'react-router-dom';

import Info from '../icon/Info.js';
import './Header.scss';

const Header = () => {
     return (
          <header className='header'>
               <Link to="/"><h1 className='header__h1'>
                    #Daily Note
               </h1></Link>
               <p className='header__aforyzm'> "Zapomnienie jest higieną mózgu"</p>
               <Link to="/info"><Info className='header__icon' width={40} /></Link>

          </header>
     );
}

export default Header;