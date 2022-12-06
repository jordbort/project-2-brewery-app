import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Map from "../components/Map"

const Brewery = (props) => {
    const [brewery, setBrewery] = useState([])
    const selectedBrewery = useParams()

    useEffect (() => {
        if (selectedBrewery.brewery !== 'random') {
            fetch (`https://api.openbrewerydb.org/breweries/${selectedBrewery.brewery}`)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json)})
        } else {
            fetch (`https://api.openbrewerydb.org/breweries/random`)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json[0])
                }
                )
        }
    }, [])

    const { name, street, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery

    if (!brewery) {
        <p>Loading brewery info...</p>
    }

    return (
        <div className="brewery-container">
        <h2>Brewery details:</h2>
        <h1>{name}</h1>
        <h3>{street}</h3>
        <h3>{city}, {state} {postal_code}</h3>
        <h3>{country}</h3>
        {phone ? <h3>{phone}</h3> : null}
        {website_url ? <h3><a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></h3> : null}
        <h4>last updated on: {updated_at}</h4>
        {latitude ? <div className="map-container">
            <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code}/>
        </div> : null}
        </div>
    )
}

export default Brewery