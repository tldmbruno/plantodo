import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './global.css';

import NavBar from './NavBar/NavBar';

import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import GitPage from './Pages/Git';
import MissingPage from './Pages/Missing';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <BrowserRouter>
      <div className='columns'>

        <div className='margin'></div>
        <div>

          <NavBar />

          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/git' element={<GitPage />} />
              <Route path='*' element={<MissingPage />}/>
            </Routes>
          </main>

        </div>
        <div className='margin'></div>

      </div>
    </BrowserRouter>

  </React.StrictMode>
)