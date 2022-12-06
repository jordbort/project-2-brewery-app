import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const Map = (props) => {
    console.log(props)
    const { name, latitude, longitude } = props
    let mapPosition = [Number(latitude), Number(longitude)]
    return (
        <div className="map-container">
            <h2>Map here</h2>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} style={{height: "50vh"}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={mapPosition}>
                    <Popup>
                        {name} <br/>
                    </Popup>
                </Marker>
            </MapContainer>
            
        </div>
    )
}

export default Map