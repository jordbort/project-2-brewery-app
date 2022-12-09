// Styling
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                    <h1>🍻 Brewery Buddy 🍻</h1>
                    <Routes>
                        <Route path='*' element={ <Home /> } />
                        <Route path='/about' element={ <About /> } />
                        <Route path='/brewery/:brewery' element={ <Brewery /> } />
                    </Routes>
                    <div className="inner-bubbles inner-bubble-1"></div>
                    <div className="inner-bubbles inner-bubble-2"></div>
                    <div className="inner-bubbles inner-bubble-3"></div>
                    <div className="inner-bubbles inner-bubble-4"></div>
                    <div className="inner-bubbles inner-bubble-5"></div>
                    <div className="inner-bubbles inner-bubble-6"></div>
                </div>
            </div>
        </div>
    )
}

export default App
