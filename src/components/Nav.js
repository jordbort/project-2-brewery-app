import {Link} from "react-router-dom"

const Nav = (props) => {
    return (
        <div className="nav">
            <h4>vvv START OF NAV COMPONENT vvv</h4>
            <Link to="/">
                <p>Home</p>
            </Link>
            <Link to="/about">
                <p>About</p>
            </Link>
            <Link to="/breweries/per_page=20&page=1">
                <p>Breweries search results (this will be replaced with real search)</p>
            </Link>
            <Link to="/brewery/random">
                <p>I'm feeling drunky (random brewery link)</p>
            </Link>
            <h4>^^^ END OF NAV COMPONENT ^^^</h4>
        </div>
    )
}

export default Nav