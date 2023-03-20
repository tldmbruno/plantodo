import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './reset.css';
import './global.css';

import NavBar from './NavBar/NavBar';
import ConfirmationPopUp from './ConfirmationPopUp/ConfirmationPopUp';

import HomePage from './Pages/Home';
import EditPage from './Pages/Edit';
import AboutPage from './Pages/About';
import GitPage from './Pages/Git';
import MissingPage from './Pages/Missing';
import WelcomePage from './Pages/Welcome';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      <NavBar />
      
      <div className='container'>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/edit/*' element={<EditPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/git' element={<GitPage />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='*' element={<MissingPage />}/>
          </Routes>
        </main>
      </div>

    </BrowserRouter>
  </React.StrictMode>
)