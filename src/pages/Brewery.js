import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Map from "../components/Map"

const Brewery = (props) => {
    const [brewery, setBrewery] = useState([])
    // const [rand, setRand] = useState([])
    const selectedBrewery = useParams()
    console.log(`Params`,selectedBrewery)

    const urlForFetch = 'https://api.openbrewerydb.org/breweries/'+selectedBrewery.brewery

    useEffect (() => {
        if (selectedBrewery.brewery !== 'random') {
            console.log(selectedBrewery.brewery)
            fetch (urlForFetch)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json)})
                console.log(`Normal Brewery's data`,brewery)   
        } else {
            fetch (urlForFetch)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json[0])
                console.log(`Random brewery's data`,brewery)
            }
            )
        }
    }, [selectedBrewery.brewery, brewery, urlForFetch])

    // },[])

    const { name, street, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery
    
    // const { nameR, streetR, cityR, stateR, postal_codeR, latitudeR, longitudeR, countryR, phoneR, website_urlR, updated_atR } = rand
    
    // if (!brewery && !rand) {
    if (!brewery) {
        <p>Loading brewery info...</p>
    }

    if (brewery) {
        return (
            <div>
                <h2>Brewery details:</h2>
            <div className="brewery-container">
            <div>
            <h1>{name}</h1>
            <h3>{street}</h3>
            <h3>{city}, {state} {postal_code}</h3>
            <h3>{country}</h3>
            {phone ? <h3>{phone}</h3> : null}
            {website_url ? <h3><a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></h3> : null}
            <h4>last updated on: {updated_at}</h4>
            </div>
            {latitude ? <div className="map-container">
                <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code}/>
            </div> : null}
            </div>
            </div>
        )    
    }
    // if (rand) {
    //     return (
    //         <div className="brewery-container">
    //         <h2>Brewery details:</h2>
    //         <h1>{nameR}</h1>
    //         <h3>{streetR}</h3>
    //         <h3>{cityR}, {stateR} {postal_codeR}</h3>
    //         <h3>{countryR}</h3>
    //         {phone ? <h3>{phone}</h3> : null}
    //         {website_url ? <h3><a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></h3> : null}
    //         <h4>last updated on: {updated_at}</h4>
    //         {latitude ? <div className="map-container">
    //             <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code}/>
    //         </div> : null}
    //         {console.log(rand)}
    //         </div>
    //     )
    // }
}

export default Brewery