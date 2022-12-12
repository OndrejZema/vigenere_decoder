import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Upload } from './scenes/upload/Upload';
import { Result } from './scenes/result/Result';
import { Decode } from './scenes/decode/Decode';
import { GlobalContextProvider } from './store/GlobalContextProvider';

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/decode" element={<Decode />}></Route>
        </Routes>
      </BrowserRouter>

    </GlobalContextProvider>

  );
}

export default App;
