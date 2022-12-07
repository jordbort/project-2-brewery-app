import './App.css';

// React tools
// import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom" 

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Brewery from './pages/Brewery'
import SearchResults from './pages/SearchResults'

// Components
import Nav from './components/Nav'

function App() {
  return (
    <div>
      <Nav />
      <h1>Brewery Buddy 🍻</h1>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/brewery/:brewery' element={ <Brewery /> } />
        <Route path='/breweries/sort=:sortMethod::sortDirection&per_page=:perPage&page=:pageNumber' element={ <SearchResults /> } /> {/* per_page=:perPage&page=:page */}
      </Routes>
    </div>
  );
}

export default App;
