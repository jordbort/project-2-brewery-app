// Styling
import './App.css'

// Components
import Nav from './components/Nav'

// React tools
import { Route, Routes } from "react-router-dom" 

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Brewery from './pages/Brewery'

function App() {
    return (
        <div>
            <Nav />
            <div className="App-container">
                <div className="App">
                    <h1>Brewery Buddy 🍻</h1>
                    <Routes>
                        <Route path='*' element={ <Home /> } />
                        <Route path='/about' element={ <About /> } />
                        <Route path='/brewery/:brewery' element={ <Brewery /> } />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
