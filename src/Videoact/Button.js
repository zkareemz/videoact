import React from 'react';

const HelloWorld = props => (
  <button {...props}>{props.children}</button>
);

export default HelloWorld;