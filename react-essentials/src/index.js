import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


function AppTwo(){
  return <h1>This is from AppTwo</h1>
}


ReactDOM.render(
  // React.createElement("h1", {style: {color:"blue"}},"Hey!!!"),

  //React.Fragment help to wrap multi components into 1 for render to work (like div but it's virtual)
  <React.Fragment>
    <App/>
    <AppTwo/>
  </React.Fragment>
  ,
  document.getElementById('root')
);

