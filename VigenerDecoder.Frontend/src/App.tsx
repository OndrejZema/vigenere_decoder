import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { UploadCryptogram } from './scenes/uploadCryptogram/UploadCryptogram';
import { Result } from './scenes/result/Result';
import { Decode } from './scenes/decode/Decode';
import { GlobalContextProvider } from './store/GlobalContextProvider';
import { UploadLanguge } from './scenes/uploadLanguage/UploadLanguage';
import { CustomRoute } from './components/CustomRoute';
import { NotificationsPanel } from './components/NotificationsPanel';

function App() {
  return (
    <GlobalContextProvider>
      <NotificationsPanel />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomRoute> <UploadCryptogram /> </CustomRoute>}></Route>
          <Route path="/language" element={<CustomRoute><UploadLanguge /></CustomRoute>}></Route>
          <Route path="/result" element={<CustomRoute><Result /></CustomRoute>}></Route>
          <Route path="/decode" element={<CustomRoute><Decode /></CustomRoute>}></Route>
        </Routes>
      </BrowserRouter>

    </GlobalContextProvider>

  );
}

export default App;
