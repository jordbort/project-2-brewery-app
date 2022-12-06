import {Link} from "react-router-dom"

const Nav = (props) => {
    return (
        <div className="nav">
            <h2>Nav here</h2>
            <Link to="/">
                <div>Home</div>
            </Link>
            <Link to="/about">
                <div>About</div>
            </Link>
            <Link to="/breweries/">
                <div>Breweries</div>
            </Link>
            <Link to="/brewery/random">
                <div>Random Brewery</div>
            </Link>
        </div>
    )
}

export default Nav