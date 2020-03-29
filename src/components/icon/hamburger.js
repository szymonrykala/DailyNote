import React from 'react';

const Hamburger = ({ width, height, className }) => {

     const style = {

          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '3px'

     }
     return (
          <svg
               className={className}
               style={style}
               xmlns="http://www.w3.org/2000/svg"
               width={width}
               height={height}
               viewBox="0 0 30 21">

               <g id="Icon_feather-menu" data-name="Icon feather-menu" transform="translate(-3 -7.5)">
                    <path id="Path_23" data-name="Path 23" className="cls-1" d="M4.5,18h27" />
                    <path id="Path_24" data-name="Path 24" className="cls-1" d="M4.5,9h27" />
                    <path id="Path_25" data-name="Path 25" className="cls-1" d="M4.5,27h27" />
               </g>
          </svg>
     );
}
export default Hamburger;
