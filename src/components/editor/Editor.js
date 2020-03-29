import React, { useState } from 'react';
import EditorJs from '@editorjs/editorjs';

import Embed from '@editorjs/embed'
// import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
// import Warning from '@editorjs/warning' y y 
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
// import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
     embed: Embed,
     //   table: Table,
     paragraph: Paragraph,
     list: List,
     //   warning: Warning,
     code: Code,
     linkTool: LinkTool,
     //   image: Image,
     //   raw: Raw,
     header: Header,
     //   quote: Quote,
     marker: Marker,
     checklist: CheckList,
     //   delimiter: Delimiter,
     inlineCode: InlineCode,
     simpleImage: SimpleImage
}

const Editor = ({ data, onSave ,EditorID}) => {
     
     const editor = new EditorJs({
          holder: `${EditorID}`,
          tools:EDITOR_JS_TOOLS,

          placeholder: 'Let`s write some notes!!',
          onChange:()=>saveData()
     });

     async function saveData(){
          const cleanData = await editor.save();
          console.log(cleanData);
     }
     
     const style={
          width:'100%',
          height:'100%'
     }

     return (
          <div style={style} id={`${EditorID}`}>

          </div>
     );
}
export default Editor;
