import {Link} from "react-router-dom"

const Nav = (props) => {
    return (
        <div className="nav-bar">
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/brewery/random">I'm feeling drunky</Link>
            </div>
        </div>
    )
}

export default Nav