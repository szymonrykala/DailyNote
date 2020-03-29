import React, { useState, useEffect, useCallback } from 'react';
import Trash from '../icon/Trash';
import Eye from '../icon/Eye';
import Hamburger from '../icon/hamburger';
import './Note.scss';
import './noteHeader.scss';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Brush from '../icon/brush';
import ArrowDown from '../icon/arrowDown';
import ArrowUp from '../icon/arrowUp';


const Note = (props) => {
     const [edit, setEdit] = useState(false);
     const [show, setShow] = useState(false);
     const [themeColor, setColorTheme] = useState(props.color);

     const handleKeyPress = useCallback((event) => {
          const { code, ctrlKey } = event;
          if (code === 'Enter' && !edit) {
               setShow(true);
               window.dispatchEvent(new Event('stopKeyListening'));
          } else if (code === 'KeyE' && ctrlKey) {
               !show && window.dispatchEvent(new Event(edit ? 'startKeyListening' : 'stopKeyListening'));
               event.preventDefault();
               setEdit(!edit);
          }
     }, [edit, show]);

     useEffect(() => {
          props.selected && document.addEventListener('keydown', handleKeyPress);
          return () => document.removeEventListener('keydown', handleKeyPress);
     }, [props.selected, handleKeyPress]);

     const toggleShowNote = useCallback(() => {
          window.dispatchEvent(new Event(show ? 'startKeyListening' : 'stopKeyListening'));
          setShow(!show);
     }, [show]);

     const onDoubleClick = useCallback(() => {
          window.dispatchEvent(new Event(edit ? 'startKeyListening' : 'stopKeyListening'));
          setEdit(!edit);
     }, [edit]);

     const closeNote = ({ code }) => {
          if (code === 'Escape') {
               setEdit(false);
               setShow(false);
               window.dispatchEvent(new Event('startKeyListening'));
          }
     }
     document.addEventListener('keydown', closeNote);

     const changeColorTheme = (color) => {
          setColorTheme(color);
          props.setColor(color);
     }

     const noteStyle = {
          '--themeColor': themeColor,
          '--backgroundColor': themeColor + '44'
     }
     const wrapStyle = {
          gridColumn: `span ${props.spanColumn}`,
          gridRow: `span ${props.spanRow}`,
     }

     return (
          <div className={show ? 'note__wrapper note__wrapper--open' : 'note__wrapper'} style={wrapStyle}>
               <div style={noteStyle}
                    className={'note ' + (props.selected ? ' note--selected ' : '') + (show ? 'note--show' : '')}
                    onMouseEnter={!show ? props.onMouseEnter : undefined}
               >
                    <header className='noteHeader' onDoubleClick={onDoubleClick} >
                         <div className="noteHeader__pin" />
                         <ul className='dropDownMenu'>
                              <li className='dropDownMenu__item'>
                                   <Trash title='Remove!' height='25px' className='noteHeader__icon' onClick={props.onRemove} />
                              </li>
                              <li className='dropDownMenu__item'>
                                   <ul className="innerMenu">
                                        <li className="innerMenu__item">
                                             <ArrowUp className='noteHeader__icon' />
                                        </li>
                                        <li className='innerMenu__item' onClick={() => props.setOrder(-1)} >
                                             <ArrowUp className='noteHeader__icon' />
                                        </li>
                                        <li className='innerMenu__item' onClick={() => props.setOrder(+1)}>
                                             <ArrowDown className='noteHeader__icon' />
                                        </li>
                                   </ul>
                              </li>
                              <li className='dropDownMenu__item'>
                                   <ul className='innerMenu'>
                                        <li className='innerMenu__item ' >
                                             <Brush className='noteHeader__icon' />
                                        </li>
                                        <li className='innerMenu__item innerMenu__item--yellow ' onClick={() => changeColorTheme('#ebcb33')}></li>
                                        <li className='innerMenu__item innerMenu__item--red' onClick={() => changeColorTheme('#eb4433')}></li>
                                        <li className='innerMenu__item innerMenu__item--green' onClick={() => changeColorTheme('#74eb74')}></li>
                                        <li className='innerMenu__item innerMenu__item--purple' onClick={() => changeColorTheme('#8384ab')}></li>
                                   </ul>
                              </li>
                              <li className='dropDownMenu__item'>
                                   <Hamburger className='noteHeader__icon' />
                              </li>
                         </ul>
                         <Eye className='noteHeader__icon' onClick={toggleShowNote} />
                    </header>
                    {
                         edit ?
                              <div className='note__text note__text--edit'>
                                   {/* <CKEdit data={content} onChange={updateContent} /> */}
                                   <CKEditor lang='pl'
                                        editor={ClassicEditor}
                                        type='inline'
                                        data={props.content}
                                        onChange={props.setContent}
                                        config={{ language: 'pl', autofocus: true }} />

                              </div>
                              :
                              <div className='note__text' dangerouslySetInnerHTML={{ __html: props.content }} />
                    }
               </div>
          </div>
     );
}

export default Note;