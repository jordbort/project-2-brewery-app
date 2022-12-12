// Styling
import './App.css'

// Components
import Nav from './components/Nav'

// React tools
import { Link, Route, Routes } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapLocationDot, faBeerMugEmpty, faGear, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Brewery from './pages/Brewery'

function App() {
    library.add(faMapLocationDot, faBeerMugEmpty, faGear, faPhone, faGlobe)
    return (
        <>
            <Nav />
            <div className="site-content">
                <div className="beer-glass">
                    <div className="header-div">
                        <h1 className='logo'><Link to="/">Brewery Buddy 🍻</Link></h1>
                    </div>
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
        </>
    )
}

export default App
