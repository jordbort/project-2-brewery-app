import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router"
import Map from "../components/Map"

const Brewery = (props) => {
    const [ brewery, setBrewery ] = useState([])
    const [ randomBrewery, setRandomBreweryState ] = useState()
    const [ randomNumber, setRandomNumber ] = useState()    
    const selectedBrewery = useParams()

    const randNum = () => {
        return Math.floor(Math.random()*8163)
    }
    const handleRandomFetch = useCallback(async () => {
        const newNum = randNum()
        setRandomNumber(newNum)
        const randURL = `https://api.openbrewerydb.org/breweries/?page=${newNum}&per_page=1`
        // console.log('randURL is', randURL)
        fetch (randURL)
        .then ((res) => res.json())
        .then ((data) => setRandomBreweryState(data))
        .catch((err) => console.log(err))
    },[])

    const handleNormalFetch = useCallback(async () => {
        const urlForFetch = 'https://api.openbrewerydb.org/breweries/'+selectedBrewery.brewery
        fetch (urlForFetch)
            .then ((res) => res.json())
            .then ((json) => { 
                setBrewery(json)})  
    },[selectedBrewery.brewery])

    const handleClick = () => {
        handleRandomFetch()
        setBrewery(randomBrewery[0])
        }
        useEffect (() => {
            if (selectedBrewery.brewery !== 'random') {
                handleNormalFetch() 
        } else if (selectedBrewery.brewery === "random") {
            handleRandomFetch()
        }
    }, [handleNormalFetch, handleRandomFetch, selectedBrewery.brewery]) 
    
    // using this console log to clear error message
    // not sure how else to use randomNumber in code otherwise
    // console.log(`random number is`, randomNumber)

    const { name, street, city, state, postal_code, latitude, longitude, country, phone, website_url, updated_at } = brewery

    if (!brewery) {
        <p>Loading brewery info...</p>
    }

    if (brewery) {
        return (
            <div>
                <h2>Brewery details:</h2>
                <button onClick={handleClick}>Random Brewery</button>
            <div className="brewery-container">
                <div>
                    <h3>{ name }</h3>
                    <p>{ street }</p>
                    { city ? <p>{city}, {state} {postal_code}</p> : null }
                    <p>{ country }</p>
                    { phone ? <p>{phone}</p> : null }
                    { website_url ? <p><a href={website_url} target="_blank" rel="noreferrer">{website_url}</a></p> : null}
                    { updated_at ? <h4>last updated on: <br/>{updated_at}</h4> : null}
                    </div>
                    { latitude ? <div className="map-container">
                        <Map name={name} latitude={latitude} longitude={longitude} city={city} state={state} postal_code={postal_code}/>
                    </div> : <div className="map-container"></div>}
                </div>
            </div>
        )    
    }
}

export default Brewery