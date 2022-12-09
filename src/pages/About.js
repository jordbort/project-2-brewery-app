const About = (props) => {
    return (
        <nav className="about-container">
        <h3>Developed by</h3>
        <ul>
            <li>Jordan Bortner</li>
            <li>Corey Loftus</li>
        </ul>
        <h3>for their Software Engineering Intensive</h3>
        <h4> class of 10-31-22</h4>
        <h4>with General Assembly</h4>
        <h3><a href="https://github.com/jordbort/project-2-brewery-app" target="_blank" rel="noreferrer">Check out the Github Repo here</a></h3>
        <h4>Made possible thanks to the following APIs:</h4>
        <ul>
            <li><a href="https://www.openbrewerydb.org" target="_blank" rel="noreferrer">Open Brewery DB</a></li>
            <li><a href="https://leafletjs.com" target="_blank" rel="noreferrer">LeafletJS</a></li>
            <li><a href="https://react-leaflet.js.org" target="_blank" rel="noreferrer">React Leaflet</a></li>
        </ul>
        <h3>Please search responsibly.</h3>
        <h3>Cheers!</h3>
        <div className="inner-bubbles inner-bubble-1"></div>
        <div className="inner-bubbles inner-bubble-2"></div>
        <div className="inner-bubbles inner-bubble-3"></div>
        <div className="inner-bubbles inner-bubble-4"></div>
        <div className="inner-bubbles inner-bubble-5"></div>
        <div className="inner-bubbles inner-bubble-6"></div>
        </nav>
    )
}

export default About