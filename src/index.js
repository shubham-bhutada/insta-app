import React from 'react'
import reactDOM from 'react-dom'
import App from './App' 
import UserProvider from './Context/UserProvider';

import { BrowserRouter } from 'react-router-dom';

reactDOM.render(
<UserProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</UserProvider>
, document.getElementById("root"));

