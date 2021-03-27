import React from 'react';
import MapView from './Mapview/Mapview';
import NavBar from './Widgets/Navbar';
import { BrowserRouter } from 'react-router-dom';

import DisplayProvider from './Providers/DisplayProvider'

function App() {
  return (
    <div>
      <BrowserRouter>      
          <NavBar />
      </BrowserRouter>
    </div>
  );
}




export default App;
