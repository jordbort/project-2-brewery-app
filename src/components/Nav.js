import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <div className="nav-bar">
            <div className="nav">
                <p><Link to="/">Home</Link></p>
                <p><Link to="/about">About</Link></p>
                <p><Link to="/brewery/random">I'm feeling drunky</Link></p>
            </div>
        </div>
    )
}

export default Nav