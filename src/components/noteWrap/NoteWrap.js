import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import IndexedDataBase from './IndexedDB';
import Note from '../note/Note';
import './NoteWrap.scss';

class NoteWrap extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               selected: 1,
               notes: [],
          }
          this.setNoteColor = this.setNoteColor.bind(this);
          this.setNoteOrder = this.setNoteOrder.bind(this);
          this.setNoteContent = this.setNoteContent.bind(this);
          this.setNoteSize = this.setNoteSize.bind(this);
          this.setSelected = this.setSelected.bind(this);
          this.addNote = this.addNote.bind(this);
          this.removeNote = this.removeNote.bind(this);
     }

     componentDidMount() {
          //connect to DataBase
          this.IDB = new IndexedDataBase("NAppDataBase", { notes: "++idn,key,indexcontent,color,spanColumn,spanRow" })
          !this.IDB.init() && window.location.reload(); // if connection refused --> reload

          this.IDB.getData(data => this.setState({ ...this.state, notes: data.sort((a, b) => a.index - b.index) }));

          window.addEventListener('keydown', this.keyPressHandler);
          window.addEventListener('stopKeyListening', () => window.removeEventListener('keydown', this.keyPressHandler));
          window.addEventListener('startKeyListening', () => window.addEventListener('keydown', this.keyPressHandler));

          this.buildTemplateRows();
          window.addEventListener('resize', this.buildTemplateRows);
     }

     buildTemplateRows() {
          document.querySelector(".noteWrap").setAttribute('style', `
               grid-template-rows: repeat(${Math.floor((window.innerHeight - 45) / (35))}, 25px);`);
     }

     componentWillUnmount = () => {
          window.removeEventListener('resize', this.buildTemplateRows);
          window.removeEventListener('keydown', this.keyPressHandler);
     }

     keyPressHandler = (key) => {
          switch (key.code) {
               case 'ArrowRight':
                    key.ctrlKey ? this.setNoteSize('spanColumn', +1) :
                         key.shiftKey ? this.setNoteOrder(+1) :
                              this.setSelected(+1);
                    break;
               case 'ArrowLeft':
                    key.ctrlKey ? this.setNoteSize('spanColumn', -1) :
                         key.shiftKey ? this.setNoteOrder(-1) :
                              this.setSelected(-1);
                    break;
               case 'ArrowUp':
                    key.ctrlKey && this.setNoteSize('spanRow', -1);
                    break;
               case 'ArrowDown':
                    key.ctrlKey && this.setNoteSize('spanRow', +1);
                    break;
               default:
                    break;
          }
     }

     // #####################################################################################
     indexControl = (index, direction, arrLength) => {
          let nextIndex = index;
          if (index + direction > arrLength - 1) {
               nextIndex = 0;
          } else if (index + direction < 0) {
               nextIndex = arrLength - 1;
          } else {
               nextIndex += direction;
          }
          return nextIndex;
     }
     setSelected = (direction, index = this.state.selected) => {
          this.setState({ ...this.state, selected: this.indexControl(index, direction, this.state.notes.length) });
     }

     setNoteOrder = (direction = 1, prevPos = this.state.selected) => {
          const { notes } = this.state;
          const nextPos = this.indexControl(prevPos, direction, notes.length);

          notes.splice(nextPos, 0, ...notes.splice(prevPos, 1));
          notes.forEach((item, i) => item.index = i);

          this.setState({ notes: notes, selected: nextPos });
          this.IDB.updateTable(notes);
     }

     setNoteSize = (spanDirection, num, index = this.state.selected, ) => {
          const { notes } = this.state;
          notes[index][spanDirection] += num;

          //minimum and maximum size control
          if (notes[index][spanDirection] < 5) { notes[index][spanDirection] = 5; }
          if (notes[index][spanDirection] > 19) { notes[index][spanDirection] = 19; }

          this.setState({ ...this.state, notes: notes });
          this.IDB.updateTable(notes);
     }

     setNoteContent = (index, data) => {
          const { notes } = this.state;
          notes[index].content = data;

          this.setState({ ...this.state, notes: notes })
          this.IDB.updateRow('key', notes[index]);
     }

     setNoteColor = (index, color) => {
          const { notes } = this.state;
          notes[index].color = color;

          this.setState({ ...this.state, notes: notes });
          this.IDB.updateRow('key', { ...notes[index], color: color });
     }

     addNote = () => {
          const newNote = {
               index: this.state.notes.length,
               key: Date.now(),
               color: '#ebcb33',
               content: "<h3> (～￣▽￣)～ I'am Yours...</h3>",
               spanColumn: 5,
               spanRow: 6
          }
          this.setState({ ...this.state, notes: [...this.state.notes, newNote] });
          this.IDB.insertData(newNote);
     }

     removeNote = (index) => {
          const deletedNote = this.state.notes.splice(index, 1);

          this.IDB.deleteData('key', ...deletedNote);//extract from [{note}]
          this.setState({ ...this.state, notes: this.state.notes })
     }
     // #####################################################################################

     render() {
          const { selected, notes } = this.state;
          return (
               <>
                    <TransitionGroup className='noteWrap'>
                         {
                              notes.map((item, i) =>
                                   <CSSTransition key={item.key} classNames='noteAnimation' timeout={300} >
                                        <Note
                                             key={item.key}
                                             {...item} //key,order,color,spanRow,spanColumn,content
                                             setOrder={this.setNoteOrder}
                                             setContent={(event, editor) => this.setNoteContent(i, editor.getData())}
                                             setColor={(color) => this.setNoteColor(i, color)}
                                             selected={selected === i}
                                             onMouseEnter={() => this.setState({ ...this.state, selected: i })}
                                             onRemove={() => this.removeNote(i)}
                                        />
                                   </CSSTransition>
                              )
                         }
                    </TransitionGroup>
                    <button onClick={this.addNote} className='noteWrap__button' title="Add note">+</button>
               </>
          );
     }

}
export default NoteWrap;
