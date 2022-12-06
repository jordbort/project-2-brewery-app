import './App.css';

// React tools
// import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom" 

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Brewery from './pages/Brewery';
import SearchResults from './pages/SearchResults';

// Components
import Nav from './components/Nav';
import Search from './components/Search';

function App() {
  return (
    <div>
      <h1>Project 2: Brewery App!</h1>
      <Nav />
      <Search />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/brewery' element={ <Brewery /> } />
        <Route path='/breweries' element={ <SearchResults /> } />
      </Routes>
    </div>
  );
}

export default App;
