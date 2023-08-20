import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from './containers/signin';
import Signup from './containers/signup';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Newsapp from './containers/newsapp';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Signin />),
  },
  {
    path: "signup",
    element: (<Signup />),
  },
  {
    path: "/home",
    element: (<Newsapp />)
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //     <Signin />
    //     <Signup />
    //   </header>
    // </div>
  );
}

export default App;
