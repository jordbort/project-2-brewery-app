import {Link} from "react-router-dom"

const Nav = (props) => {
    return (
        <div className="nav-bar">
            <div className="nav">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/about">
                    <p>About</p>
                </Link>
                <Link to="/breweries/by_city=brooklyn&sort=name:asc&per_page=20&page=1">
                    <p>Breweries search results (this will be replaced with real search)</p>
                </Link>
                <Link to="/brewery/random">
                    <p>I'm feeling drunky (random brewery link)</p>
                </Link>
            </div>
        </div>
    )
}

export default Nav