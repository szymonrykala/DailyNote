import React from 'react';


Info.defaultProps = {
     height: '100%',
     width: '100%',
     fill: 'cyan',
     viewBox: '0 0 34.875 34.875',
     alt: 'edit'
}

export default function Info(props) {
     return (
          <svg
               className={props.className}
               onClick={props.onClick}
               xmlns="http://www.w3.org/2000/svg"
               width={props.width}
               height={props.height}
               fill={props.fill}
               viewBox={props.viewBox}
               alt={props.alt}
          >
               <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M18,.563A17.438,17.438,0,1,0,35.438,18,17.44,17.44,0,0,0,18,.563ZM18,8.3a2.953,2.953,0,1,1-2.953,2.953A2.953,2.953,0,0,1,18,8.3Zm3.938,17.859a.844.844,0,0,1-.844.844H14.906a.844.844,0,0,1-.844-.844V24.469a.844.844,0,0,1,.844-.844h.844v-4.5h-.844a.844.844,0,0,1-.844-.844V16.594a.844.844,0,0,1,.844-.844h4.5a.844.844,0,0,1,.844.844v7.031h.844a.844.844,0,0,1,.844.844Z" transform="translate(-0.563 -0.563)" />
          </svg>
     );
}
