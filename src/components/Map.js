import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"

const Map = (props) => {
    const { name, latitude, longitude, city, state, postal_code } = props
    let mapPosition = [Number(latitude), Number(longitude)]

// calls in the marker image files from Leaflet files (otherwise you get a broken image)
    useEffect(() => {
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

    return (
        // returns the map component using API data
            // marker is the pin drop on map position
            // popup is the text box w/ info that opens when the marker is clicked
        <div className="map">
            <MapContainer center={mapPosition} zoom={14} scrollWheelZoom={false} style={{height: "300px", width:"300px"}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker openOn={'map'} position={mapPosition}>
                    <Popup openOn={'map'}>
                        {name} <br/> {city}, {state} {postal_code}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map