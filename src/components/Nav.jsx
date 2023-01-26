import { Link } from "react-router-dom"
import "../sassStyles/components/_nav.scss"

export default function Nav() {
    return (
        <div>
            <div className="nav">
                <p>
                    <Link to="/">Home</Link>
                </p>
                <p>
                    <Link to="/about">About</Link>
                </p>
                <p>
                    <Link to="/brewery/random">I'm feeling drunky</Link>
                </p>
            </div>
        </div>
    )
}
