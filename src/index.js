import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DATA = [
  {id:"todo-0", name: "Eat", completed:true },
  {id:"todo-1", name: "Sleep", completed:false },
  {id:"todo-2", name: "Repeat", completed:false }
]

const BUTTON = [
  { id:"btn-1", status: "All"},
  { id:"btn-2", status: "Active"},
  { id:"btn-3", status: "Completed"},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} status={BUTTON}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
