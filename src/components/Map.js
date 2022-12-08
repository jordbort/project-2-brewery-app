import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useEffect} from "react"
import "leaflet/dist/leaflet.css"

const Map = (props) => {
    const { name, latitude, longitude, city, state, postal_code } = props
    let mapPosition = [Number(latitude), Number(longitude)]

    useEffect(() => {
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

//   COREY to look at night of Wed Dec 7
    // possible solve using info from:
    // https://www.codegrepper.com/tpc/react+leaflet+recenter+map
    // const ChangeView = ({center}) => {
    //     const map = useMap()
    //     map.setView(center)
    // }

    return (
        <div className="map">
            <MapContainer center={mapPosition} zoom={14} scrollWheelZoom={false} style={{height: "350px", width:"350px"}}>
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