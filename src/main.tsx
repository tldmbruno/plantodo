import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './reset.css';
import './global.css';

import NavBar from './components/NavBar/NavBar';

import WelcomePage from './pages/WelcomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import MissingPage from './pages/MissingPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='*' element={<MissingPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)