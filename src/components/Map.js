const Map = (props) => {
    return (
        <div className="map-container">
            <h2>Map here</h2>
            <iframe
                width="600"
                height="450"
                style="border:0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=API_KEY
                    &q=Space+Needle,Seattle+WA">
                </iframe>
        </div>
    )
}

export default Map